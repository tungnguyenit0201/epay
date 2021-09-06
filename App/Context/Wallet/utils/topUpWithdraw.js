import {useState, useRef, useEffect} from 'react';
import Navigator from 'navigations/Navigator';
import {
  ERROR_CODE,
  FUNCTION_TYPE,
  SCREEN,
  TRANS_FORM_TYPE,
  TRANS_TYPE,
} from 'configs/Constants';
import _ from 'lodash';
import {useWallet} from '..';
import {getBankFee, payinConnectedBank} from 'services/wallet';
import {calculateFee, formatMoney, generateTOTP} from 'utils/Functions';
import {checkSmartOTP, confirmOTP, genOtp, genSmartOTP} from 'services/common';
import {useUser} from 'context/User';
import {useAsyncStorage, useError, useLoading} from 'context/Common/utils';

const useTopUpWithdraw = ({transType}) => {
  const [isContinueEnabled, setContinueEnabled] = useState(false);
  const inputRef = useRef(null);
  const contentRef = useRef({
    bank: null,
    inputValue: '',
    transFormType: null,
    fee: null,
  });
  const {dispatch} = useWallet();

  const onSuggestMoney = value => {
    inputRef.current?.setValue && inputRef.current.setValue(`${value}`);
    contentRef.current.inputValue = value;
    onCheckContinueEnabled();
  };

  const onChangeCash = value => {
    contentRef.current.inputValue = value;
    onCheckContinueEnabled();
  };

  const onSetBank = ({bank, transFormType, fee}) => {
    contentRef.current.bank = bank;
    contentRef.current.transFormType = transFormType;
    contentRef.current.fee = fee;
    onCheckContinueEnabled();
  };

  const onCheckContinueEnabled = () => {
    const {bank, inputValue} = contentRef.current;
    if (bank && inputValue) {
      !isContinueEnabled && setContinueEnabled(true);
      return;
    }
    isContinueEnabled && setContinueEnabled(false);
  };

  const onContinue = async () => {
    const {bank, inputValue, transFormType, fee} = contentRef.current;
    //
    if (transFormType != TRANS_FORM_TYPE.CONNECTED_BANK) {
      alert('Chưa làm');
      return;
    }
    //
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
  const {transaction} = useWallet();
  const {phone} = useUser();

  const {
    transType,
    bank: {BankNumber: bankNumber, BankName: bankName},
    fee,
    amount,
  } = transaction;
  const transTypeText =
    transType === TRANS_TYPE.CashIn ? 'nạp tiền' : 'rút tiền'; // TODO: translate
  const feeValue = calculateFee({cash: amount, feeData: fee});
  const total = feeValue + amount;
  const data = [
    {
      name: 'Nguồn tiền',
      value: bankName,
    },
    {
      name: 'Số tiền',
      value: formatMoney(amount, true),
    },
    {
      name: 'Phí giao dịch',
      value: formatMoney(feeValue, true),
    },
    {
      name: 'Tổng số tiền',
      value: formatMoney(total, true),
      bold: true,
    },
  ];

  const onContinue = async () => {
    const result = await checkSmartOTP({phone});
    const isSmartOTPActived = _.get(result, 'SmartOtpInfo', false);
    if (isSmartOTPActived) {
      Navigator.push(SCREEN.SMART_OTP_PASSWORD, {type: 'transaction'});
    } else {
      alert('Vui lòng kích hoạt smart otp');
      // Navigator.push(SCREEN.OTP, {functionType: FUNCTION_TYPE.RECHARGE_BY_BANK});
    }
  };

  return {
    transTypeText,
    bankNumber,
    amount,
    fee: feeValue,
    total,
    data,
    onContinue,
  };
};

const useOTPBySmartOTP = () => {
  const {transaction, dispatch} = useWallet();
  const {phone} = useUser();
  const [code, setCode] = useState('');
  const {setError} = useError();
  const {setLoading} = useLoading();
  const {getSmartOTPSharedKey} = useAsyncStorage();

  const generateOTP = async () => {
    setLoading(true);
    const smartOtpSharedKey = await getSmartOTPSharedKey();
    const otp = generateTOTP({phone, smartOtpSharedKey});
    await genOtp({
      phone,
      functionType: transaction?.functionType,
    });
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
    const {transType, transFormType, amount, bank, fee} = transaction;
    let result = null;
    // TopUp

    console.log(
      transType == TRANS_TYPE.CashIn,
      transFormType,
      TRANS_FORM_TYPE.CONNECTED_BANK,
      parseInt(transFormType) === TRANS_FORM_TYPE.CONNECTED_BANK,
    );

    if (transType == TRANS_TYPE.CashIn) {
      switch (parseInt(transFormType)) {
        case TRANS_FORM_TYPE.CONNECTED_BANK:
          result = await payinConnectedBank({
            phone,
            amount: parseInt(amount),
            bankID: bank?.BankId,
            fixedFee: fee?.FixedFee,
            bankFee: fee?.BankFee,
          });
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

  return {code, onConfirm};
};

const useTransactionResult = () => {
  const {transaction} = useWallet();
  const {amount, fee, bank, result} = transaction;

  const loadData = () => {
    // TODO: translate
    return [
      {label: 'Mã giao dịch', value: 'Không có'},
      {label: 'Thời gian', value: result?.ResponseTime},
    ];
  };

  return {data: loadData(), message: result?.ErrorMessage};
};

export {
  useTopUpWithdraw,
  useConfirmation,
  useOTPBySmartOTP,
  useTransactionResult,
};
