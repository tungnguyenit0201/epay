import { useState, useRef, useEffect } from 'react';
import Navigator from 'navigations/Navigator';
import {
  ERROR_CODE,
  FUNCTION_TYPE,
  SCREEN,
  TRANS_FORM_TYPE,
  TRANS_TYPE,
  CONFIRM_METHODS
} from 'configs/Constants';
import _ from 'lodash';
import { useWallet } from '..';
import { cashIn, getAmountLimit, getBankFee, payinConnectedBank } from 'services/wallet';
import { calculateFee, formatCurrency, formatMoney, fromCurrency, generateTOTP } from 'utils/Functions';
import { checkSmartOTP, confirmOTP, genOtp, genSmartOTP } from 'services/common';
import { useUser } from 'context/User';
import {
  useAsyncStorage,
  useError,
  useLoading,
  useShowModal,
} from 'context/Common/utils';
import { useTranslation } from 'context/Language';
import { useModalSmartOTP, useSmartOTP } from 'context/User/utils';
const DEFAULT_TIMEOUT = 60;

const useTopUpWithdraw = ({ transType }) => {
  const translation = useTranslation();
  const [isContinueEnabled, setContinueEnabled] = useState(false);
  const inputRef = useRef(null);
  const contentRef = useRef({
    bank: null,
    inputValue: '',
    transFormType: null,
    fee: null,
  });
  const { phone } = useUser();
  const { setError } = useError();
  const { setLoading } = useLoading();
  const { dispatch } = useWallet();


  const onSuggestMoney = value => {
    onChangeMoney(value);
    onCheckContinueEnabled();
  };

  const onChangeCash = value => {
    onChangeMoney(value);
    onCheckContinueEnabled();
  };

  const onChangeMoney = value => {
    if (!!value) {
      let originValue = fromCurrency(value);
      inputRef.current?.setValue && inputRef.current.setValue(formatCurrency(originValue));
      contentRef.current.inputValue = originValue;
    } else {
      inputRef.current?.setValue && inputRef.current.setValue('');
      contentRef.current.inputValue = '';
    }

  }

  const onSetBank = ({ bank, transFormType, fee }) => {
    contentRef.current.bank = bank;
    contentRef.current.transFormType = transFormType;
    contentRef.current.fee = fee;
    onCheckContinueEnabled();
  };

  const onCheckContinueEnabled = () => {
    const { bank, inputValue, fee } = contentRef.current;
    const { MinLimit, MaxLimit, DailyLimit } = fee || {};
    let validMoney = false;

    if (+inputValue < MinLimit) {
      inputRef.current?.setError && inputRef?.current?.setError(translation.topup.cashInMinError.replace("%", formatCurrency(MinLimit)));
    } else if (+inputValue > MaxLimit - 10000) {
      inputRef.current?.setError && inputRef?.current?.setError(translation.topup.cashInMaxError.replace("%", formatCurrency(MaxLimit)));
    } else {
      inputRef.current?.setError && inputRef?.current?.setError("");
      validMoney = true;
    }

    if (bank && inputValue && validMoney) {
      !isContinueEnabled && setContinueEnabled(true);
      return;
    }
    isContinueEnabled && setContinueEnabled(false);
  };

  const checkAmountLimit = async () => {
    const { bank, inputValue, transFormType, fee } = contentRef.current;

    setLoading(true);
    const result = await getAmountLimit({
      phone,
      amount: inputValue,
      transType: transType,
      TransFormType: transFormType
    });
    setLoading(false);
    if (result?.ErrorCode !== ERROR_CODE.SUCCESS) {
      setError(result);
      return false;
    }

    dispatch({
      type: 'UPDATE_TRANSACTION_INFO',
      data: {
        transType,
        transFormType,
        amount: inputValue,
        bank,
        fee,
      },
    });
    Navigator.push(SCREEN.CONFIRMATION);
  };

  const onContinue = async () => {
    const { bank, inputValue, transFormType, fee } = contentRef.current;

    dispatch({
      type: 'UPDATE_TRANSACTION_INFO',
      data: {
        transType,
        transFormType,
        amount: inputValue,
        bank,
        fee,
      },
    });
    Navigator.push(SCREEN.CONFIRMATION);
  };



  return {
    inputRef,
    isContinueEnabled,
    onSuggestMoney,
    onContinue,
    onSetBank,
    onChangeCash,
  };
};

const useConfirmation = () => {
  const translation = useTranslation();
  const { transaction } = useWallet();
  const { phone } = useUser();
  const { setError } = useError();

  const {
    transType,
    bank,
    fee,
    amount,
  } = transaction;
  const { onShowModal } = useModalSmartOTP();
  const { onTransaction } = useSmartOTP();
  const transTypeText =
    transType === TRANS_TYPE.CashIn ? 'nạp tiền' : 'rút tiền'; // TODO: translate
  const feeValue = calculateFee({ cash: amount, feeData: fee });
  const total = feeValue + amount;
  const feeDes = feeValue == 0 ? translation.free : formatCurrency(feeValue, translation.topup.currency)
  const data = [
    {
      name: translation.amount,
      value: formatCurrency(amount, translation.topup.currency),
    },
    {
      name: 'Phí giao dịch',
      value: feeDes,
    },
    {
      name: 'Tổng số tiền',
      value: formatCurrency(total, translation.topup.currency),
      bold: true,
    },
  ];

  const onContinue = async () => {
    const result = await checkSmartOTP({ phone });
    const isSmartOTPActived = _.get(result, 'State', 0);
    if (isSmartOTPActived) {
      // Navigator.push(SCREEN.SMART_OTP_PASSWORD, {type: 'transaction'});
      switch (transType) {
        case TRANS_TYPE.CashIn:
          onCashIn();
          break;
        default:
          onShowModal(password => onTransaction({ password }));
          break;
      }
    } else {
      setError({ ErrorCode: -1, ErrorMessage: 'Vui lòng kích hoạt smart otp.' }); // TODO: transalate
      // Navigator.push(SCREEN.OTP, {functionType: FUNCTION_TYPE.RECHARGE_BY_BANK});
    }

  };

  const onCashIn = async () => {
    const { BankConnectId, BankId } = bank || {};
    let result = await cashIn({
      phone,
      BankConnectId,
      BankId,
      amount
    });

    if (result.ErrorCode === ERROR_CODE.CASHIN_REQUIRED_AUTHENTICATION && result.Data) {
      const { ListConfirmMethod = [] } = JSON.parse(result.Data) || {};
      const { ConfirmType } = ListConfirmMethod.sort((lhs, rhs) => {
        return lhs?.Priority > rhs?.Priority
      })?.[0];
      
      console.log("Cash in confirm method: "+ ConfirmType);
      switch (ConfirmType) {
        case CONFIRM_METHODS.BIO_ID:
          onShowModal(password => 
            onTransaction({ password }));
          break;
        case CONFIRM_METHODS.PASSWORD:
          break;
        case CONFIRM_METHODS.SMART_OTP:
          onShowModal(password => onTransaction({ password }));
          break;
        case CONFIRM_METHODS.BANK_OTP:
          return;
      }
      return;
    }

    if (result?.ErrorCode !== ERROR_CODE.SUCCESS) {
      setError(result);
      return;
    }
  }


  const getContinueButtonTitle = () => {
    switch (transType) {
      case TRANS_TYPE.CashIn:
        return translation.transaction.confirm;
      default:
        return translation.continue;
    }
  }

  return {
    transTypeText,
    bank,
    amount,
    fee: feeValue,
    total,
    data,
    onContinue,
    getContinueButtonTitle
  };
};


const useOTPBySmartOTP = () => {
  const { transaction, dispatch } = useWallet();
  const { phone } = useUser();
  const [code, setCode] = useState('');
  const { setError } = useError();
  const { setLoading } = useLoading();
  const { getSmartOTPSharedKey } = useAsyncStorage();
  const [time, setTime] = useState(DEFAULT_TIMEOUT);

  useEffect(() => {
    let interval = null;
    if (!!code) {
      interval = setInterval(() => {

        if (time != 0) {
          setTime(time - 1);
        } else {
          interval && clearInterval(interval);
          generateOTP();
        }
      }, 1000);
    }
    return () => {
      interval && clearInterval(interval);
    }
  }, [code, time])

  const generateOTP = async () => {
    setLoading(true);
    const smartOtpSharedKey = await getSmartOTPSharedKey();
    const otp = generateTOTP({ phone, smartOtpSharedKey });
    await genOtp({
      phone,
      functionType: transaction?.functionType,
    });

    setTime(DEFAULT_TIMEOUT);
    setLoading(false);
    setCode(otp);
  };

  useEffect(() => {
    generateOTP();
  }, []); // eslint-disable-line

  const onConfirm = async () => {
    const result = await confirmOTP({
      phone,
      OtpCode: code,
      functionType: transaction?.functionType,
    });
    if (result?.ErrorCode !== ERROR_CODE.SUCCESS) {
      setError(result);
      return;
    }
    onTransaction();
  };

  const onTransaction = async () => {
    const { transType, transFormType, amount, bank, fee } = transaction;
    let result = null;
    // TopUp
    if (transType == TRANS_TYPE.CashIn) {
      switch (parseInt(transFormType)) {
        case TRANS_FORM_TYPE.CONNECTED_BANK:
        // result = await payinConnectedBank({
        //   phone,
        //   amount: parseInt(amount),
        //   bankID: bank?.BankId,
        //   fixedFee: fee?.FixedFee,
        //   bankFee: fee?.BankFee,
        // });

      }
    }
    // Withdraw
    if (transType == TRANS_TYPE.CashOut) {
    }
    dispatch({
      type: 'UPDATE_TRANSACTION_INFO',
      data: {
        result,
      },
    });
    Navigator.replaceLast(
      result?.ErrorCode === ERROR_CODE.SUCCESS
        ? SCREEN.TRANSACTION_SUCCESS
        : SCREEN.TRANSACTION_FAILURE,
    );
  };

  return { code, onConfirm, time };
};

const useTransactionResult = () => {
  const { transaction } = useWallet();
  const { showModalSmartOTPSuggestion } = useShowModal();
  const { amount, fee, bank, result, transType } = transaction;
  const { showModalSmartOTP } = useShowModal();

  const loadData = () => {
    // TODO: translate
    return [
      { label: 'Mã giao dịch', value: 'Không có' },
      { label: 'Thời gian', value: result?.ResponseTime },
    ];
  };

  const onRetry = () => {
    let screen = null;
    switch (transType) {
      case TRANS_TYPE.CashIn:
        screen = SCREEN.TOP_UP;
        break;
    }
    Navigator.navigate(screen);
  };

  const onBackHome = () => {
    showModalSmartOTPSuggestion(true);
    Navigator.navigate(SCREEN.TAB_NAVIGATION);
    Navigator.navigate(SCREEN.HOME);
  };

  return { data: loadData(), message: result?.ErrorMessage, onRetry, onBackHome };
};


export {
  useTopUpWithdraw,
  useConfirmation,
  useOTPBySmartOTP,
  useTransactionResult,
};
