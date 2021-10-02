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
import { cashIn,cashInConfirm } from 'services/wallet';
import { calculateFee, formatCurrency, fromCurrency, generateTOTP } from 'utils/Functions';
import { checkSmartOTP, confirmOTP, genOtp } from 'services/common';
import { useUser } from 'context/User';
import {
  useAsyncStorage,
  useError,
  useLoading,
  useShowModal,
} from 'context/Common/utils';
import { useTranslation } from 'context/Language';
import { useModalSmartOTP, useSmartOTP } from 'context/User/utils';
import TRANS_STATUS from 'configs/Enums/TransStatus';
import Keychain from 'react-native-keychain';
import TouchID from 'react-native-touch-id';
import BANK_LINKED_TYPE from 'configs/Enums/BankLinkedType';
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

  const onSetBank = (props) => {
    if(!props) {
      contentRef.current = {
        bank: null,
        inputValue: '',
        transFormType: null,
        fee: null,
      }
    } else {
      let { bank, transFormType, fee } = props;
      contentRef.current.bank = bank;
      contentRef.current.transFormType = transFormType;
      contentRef.current.fee = fee;
    }
    
    onCheckContinueEnabled();
  };

  const onCheckContinueEnabled = () => {
    const { bank, inputValue, fee } = contentRef.current || {};
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
  const transTypeText =
    transType === TRANS_TYPE.CashIn ? 'nạp tiền' : 'rút tiền'; // TODO: translate
  const feeValue = calculateFee({ cash: amount, feeData: fee });
  const total = feeValue + amount;
  const feeDes = feeValue == 0 ? translation.free : formatCurrency(feeValue, translation.topup.currency)
  const { onCashIn } = useCashIn();

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
      switch (transType) {
        case TRANS_TYPE.CashIn:
          onCashIn();
          break;
        default:
          break;
      }
    } else {
      setError({ ErrorCode: -1, ErrorMessage: 'Vui lòng kích hoạt smart otp.' }); // TODO: transalate
      // Navigator.push(SCREEN.OTP, {functionType: FUNCTION_TYPE.RECHARGE_BY_BANK});
    }

  };

  const continueButtonTitle = () => {
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
    continueButtonTitle: continueButtonTitle()
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
  const { transType } = transaction;
  const { onCashInOTP } = useCashIn();
  const { onTransaction } = useSmartOTP();
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
    let result = null;
    switch (transType) {
      case TRANS_TYPE.CashIn:
        result = await onCashInOTP(code);
        break;
      default:
        result = await onConfirmOTP();
    }


    if (result?.ErrorCode !== ERROR_CODE.SUCCESS) {
      setError(result);
      return;
    }
    onTransaction(result);
  };

  const onConfirmOTP = async () => {
    return confirmOTP({
      phone,
      OtpCode: code,
      functionType: transaction?.functionType,
    });

  }

  return { code, onConfirm, time };
};

const useTransaction = () => {
  const { dispatch } = useWallet();
  const onTransaction = async (result) => {
    dispatch({
      type: 'UPDATE_TRANSACTION_INFO',
      data: {
        result
      },
    });
    Navigator.replaceLast(
      SCREEN.TRANSACTION_RESULT
    );
  };

  return { onTransaction }
}

const useConfirmMethod = ()=> {
  const {getTouchIdEnabled, getPhone} = useAsyncStorage();
  const [biometryType, setBiometryType] = useState(null);
  const {setError} = useError();
  const translation = useTranslation();
  const checkBiometry = async () => {
    const touchIdEnabled = await getTouchIdEnabled();
    let passwordEncrypted = null;
    try {
      const credentials = await Keychain.getGenericPassword();
      passwordEncrypted =
        credentials?.username == (await getPhone())
          ? credentials?.password
          : null;
    } catch (error) {
      __DEV__ && console.log("Keychain couldn't be accessed!", error);
    }

    if (!touchIdEnabled || !passwordEncrypted) {
      return;
    }
    return TouchID.isSupported({})
      .then(biometryType => {
        setBiometryType(biometryType);
        return Promise.resolve(true);
      })
  };

  const confirmUsingBioID = async ()=> {

    const bioType = biometryType === 'FaceID' ? 'Face ID' : 'Touch ID';
    const title = `${translation.topup.confirm} ${bioType}`;
    const options = {
    title:  title, // Android
    imageColor: '#e00606', // Android
    imageErrorColor: '#ff0000', // Android
    sensorDescription: 'Touch sensor', // Android
    sensorErrorDescription: 'Failed', // Android
    cancelText: 'Cancel', // Android
    // fallbackLabel: 'Show Passcode', // iOS (if empty, then label is hidden)
    unifiedErrors: false, // use unified error messages (default false)
    passcodeFallback: false, // iOS - allows the device to fall back to using the passcode, if faceid/touch is not available. this does not mean that if touchid/faceid fails the first few times it will revert to passcode, rather that if the former are not enrolled, then it will use the passcode.
  };

    return TouchID.authenticate(title,
      options,
    )
      .then(success => {
        return Promise.resolve(success);
      })
      .catch(error => {
        // user cancel
        if (
          error?.name === 'LAErrorUserCancel' ||
          error?.name === 'LAErrorSystemCancel' ||
          error?.name === 'LAErrorAuthenticationFailed'
        ) {
          return;
        }
        // supported touchID but not enabled by user
        if (error?.name === 'LAErrorTouchIDNotEnrolled') {
          setBiometryType(null);
          return;
        }
        // user press show passcode
        if (
          error?.name === 'LAErrorUserFallback' ||
          error?.name === 'RCTTouchIDUnknownError'
        ) {
          return;
        }
        // other errors
        setError({ErrorCode: -1, ErrorMessage: error});
      });
  }

  return { getTouchIdEnabled,  checkBiometry, confirmUsingBioID}
}

const useCashIn = () => {
  const { phone } = useUser();
  const {onShowModal} = useModalSmartOTP();
  const { transaction, dispatch } = useWallet();
  const { setError } = useError();
  const { setLoading } = useLoading();
  const { onTransaction } = useTransaction();
  const { confirmUsingBioID, checkBiometry } = useConfirmMethod({});
  

  
  const onCashIn = async () => {
    const ConnectionType = transaction?.bank?.ConnectionType;

    switch(ConnectionType) {
      case BANK_LINKED_TYPE.NORMAL:
        onCashInNormalBank()
      case BANK_LINKED_TYPE.DOMESTIC:
    }
  }

  const onCashInDomesticBank = async () => {
    
  }

  const onCashInNormalBank = async ()=> {
    const { transType, amount, bank } = transaction;
    const { BankConnectId, BankId } = bank || {};

    setLoading(true);
    let result = await cashIn({
      phone,
      BankConnectId,
      BankId,
      amount
    });
    setLoading(false);
    if ((result.ErrorCode === ERROR_CODE.CASHIN_REQUIRED_AUTHENTICATION || result.ErrorCode == ERROR_CODE.SUCCESS) && result.Data) {
      console.log("CONFIRM METHOD:"+result.Data);
      const { ListConfirmMethod = [], TransCode } = JSON.parse(result.Data) || {};
      const { ConfirmType } = ListConfirmMethod.sort((lhs, rhs) => {
        return lhs?.Priority > rhs?.Priority
      })?.[0];

      
      dispatch({
        type: 'UPDATE_TRANSACTION_INFO',
        data: {
          ConfirmType: ConfirmType,
          TransCode: TransCode,
          functionType: FUNCTION_TYPE.RECHARGE_BY_BANK,
        },
      });

      switch (ConfirmType) {
        case CONFIRM_METHODS.BIO_ID:
          const isTouchIDEnable = await checkBiometry();

          if(isTouchIDEnable) {
            let result = await confirmUsingBioID();
            if(result){
              const credentials = await Keychain.getGenericPassword();
              const password = credentials?.password;
              onConfirmSuccess({ password,TransCode, ConfirmType })
            }
          } else {
            onShowModal(password => onConfirmSuccess({ password, TransCode, ConfirmType}));
          }
        case CONFIRM_METHODS.PASSWORD:
          break;
        case CONFIRM_METHODS.SMART_OTP:
          onShowModal(password => onConfirmSuccess({ password, TransCode, ConfirmType}));
          break;
        case CONFIRM_METHODS.BANK_OTP:
          Navigator.navigate(SCREEN.BANK_OTP);
          return;
      }
      return;
    }

    if (result?.ErrorCode !== ERROR_CODE.SUCCESS) {
      setError(result);
      return;
    }
  }

  let onConfirmSuccess = async ({ password, TransCode, ConfirmType}) => {
    const { transType } = transaction;
    let result = null;
    setLoading(true);
    switch (transType) {
      case TRANS_TYPE.CashIn:
        result = await onCashInOTP({password,TransCode, ConfirmType});
        break;
      default:
    }

    setLoading(false);
    if (result?.ErrorCode !== ERROR_CODE.SUCCESS) {
      setError(result);
      return;
    }
    onTransaction(result);
  };


  let onCashInOTP = async ({password, TransCode, ConfirmType}) => {
    const { bank } = transaction;
    const { BankConnectId, BankId } = bank || {};
    return cashInConfirm({
      phone,
      BankConnectId: BankConnectId,
      BankId: BankId,
      ConfirmValue: password,
      ConfirmMethod: ConfirmType,
      TransCode: TransCode
    });
  }

  return  {
    onCashIn,
    onCashInOTP
  }
}

const useTransactionResult = () => {
  const { transaction } = useWallet();
  const { showModalSmartOTPSuggestion } = useShowModal();
  const { amount, fee, bank, result, transType, TransCode} = transaction || {};
  const { TransState } = result || {};
  const { BankName, BankNumber } = bank;
  const { showModalSmartOTP } = useShowModal();
  const translation = useTranslation();

  const loadData = () => {
    // TODO: translate

    return [
      { label: translation.transaction.transactionId, value: TransCode },
      { label: translation.transaction.time, value: result?.ResponseTime },
    ];
  };

  const getTransactionStatusTitle = () => {
    let statusTitle = "";
    switch (transType) {
      case TRANS_TYPE.CashIn:
        statusTitle = translation.top_up;
    }

    return statusTitle += " " + transactionStatusDescription();

  }

  const formatAmount = () => {
    return formatCurrency(amount, translation.common.currencySign)
  }

  const transactionStatusDescription = () => {
    switch (TransState) {
      case TRANS_STATUS.SUCCESS:
        return translation.transaction.success;
      case TRANS_STATUS.FAILURE:
        return translation.transaction.failure;
    }
  }

  const transactionSuccess = () => {
      return TransState == TRANS_STATUS.SUCCESS;
  }

  const getDescription = () => {
    let description = "";
    switch (transType) {
      case TRANS_TYPE.CashIn:
        description = translation.transaction.cashInDescription;
    }

    return `${description} \n ${BankName} ${"*".repeat(BankNumber?.length)}`
  }

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

  return {
    data: loadData(),
    formatAmount: formatAmount(),
    description: getDescription(),
    statusTitle: getTransactionStatusTitle(),
    message: result?.ErrorMessage,
    onRetry,
    TransState,
    onBackHome,
    transactionSuccess
  };
};


export {
  useTopUpWithdraw,
  useConfirmation,
  useOTPBySmartOTP,
  useTransactionResult,
};
