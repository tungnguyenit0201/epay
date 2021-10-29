import {useEffect, useRef, useState} from 'react';
import Navigator from 'navigations/Navigator';
import {
  CONFIRM_METHODS,
  ERROR_CODE,
  FUNCTION_TYPE,
  SCREEN,
  TRANS_FORM_TYPE,
  TRANS_TYPE,
} from 'configs/Constants';
import {useWallet} from '..';
import useServiceWallet from 'services/wallet';
import {
  calculateFee,
  formatCurrency,
  fromCurrency,
  generateTOTP,
} from 'utils/Functions';
import useServiceCommon from 'services/common';
import {useUser} from 'context/User';
import {
  useAsyncStorage,
  useError,
  useLoading,
  useModalPassword,
  useShowModal,
} from 'context/Common/utils';
import {useTranslation} from 'context/Language';
import {useModalSmartOTP, useSmartOTP} from 'context/User/utils';
import TRANS_STATUS from 'configs/Enums/TransStatus';
import Keychain from 'react-native-keychain';
import TouchID from 'react-native-touch-id';
import BANK_LINKED_TYPE from 'configs/Enums/BankLinkedType';
import {sha256} from 'react-native-sha256';

const DEFAULT_TIMEOUT = 60;

const useTopUpWithdraw = ({transType}) => {
  const translation = useTranslation();
  const [isContinueEnabled, setContinueEnabled] = useState(false);
  const inputRef = useRef(null);
  const contentRef = useRef({
    bank: null,
    inputValue: '',
    transFormType: null,
    fee: null,
  });
  const {dispatch} = useWallet();
  const {onCheckLimitCashOut} = useCashOut();

  useEffect(() => {
    const errMsg =
      transType === TRANS_TYPE.CashOut
        ? translation.cashout.cashOutMinError
        : translation.topup.cashInMinError;

    inputRef?.current?.setError(errMsg.replace('%', formatCurrency(10000)));
    return () => {};
  }, []);

  const onSuggestMoney = value => {
    onChangeMoney(value);
    onCheckContinueEnabled();
  };

  const onChangeCash = value => {
    onChangeMoney(value);
    onCheckContinueEnabled();
  };

  const onChangeMoney = value => {
    if (value) {
      let originValue = fromCurrency(value);
      inputRef.current?.setValue &&
        inputRef.current.setValue(formatCurrency(originValue));
      contentRef.current.inputValue = originValue;
    } else {
      inputRef.current?.setValue && inputRef.current.setValue('');
      contentRef.current.inputValue = '';
    }
  };

  const onSetBank = props => {
    if (!props) {
      contentRef.current = {
        bank: null,
        inputValue: '',
        transFormType: null,
        fee: null,
      };
    } else {
      let {bank, transFormType, fee} = props;
      contentRef.current.bank = bank;
      contentRef.current.transFormType = transFormType;
      contentRef.current.fee = fee;
    }

    onCheckContinueEnabled();
  };

  const onCheckContinueEnabled = () => {
    const {bank, inputValue, fee} = contentRef.current || {};
    const {MinLimit, MaxLimit, DailyLimit} = fee || {};
    let validMoney = false;

    const minErr =
      transType === TRANS_TYPE.CashIn
        ? translation.topup.cashInMinError
        : translation.cashout.cashOutMinError;
    const maxErr =
      transType === TRANS_TYPE.CashIn
        ? translation.topup.cashInMaxError
        : translation.cashout.cashOutMaxError;

    if (+inputValue < MinLimit) {
      inputRef.current?.setError &&
        inputRef?.current?.setError(
          minErr?.replace?.('%', formatCurrency(MinLimit)),
        );
    } else if (+inputValue > MaxLimit - 10000) {
      inputRef.current?.setError &&
        inputRef?.current?.setError(
          maxErr?.replace?.('%', formatCurrency(MaxLimit)),
        );
    } else {
      inputRef.current?.setError && inputRef?.current?.setError('');
      validMoney = true;
    }

    if (bank && inputValue && validMoney) {
      !isContinueEnabled && setContinueEnabled(true);
      return;
    }
    isContinueEnabled && setContinueEnabled(false);
  };

  const onContinue = async () => {
    const {bank, inputValue, transFormType, fee} = contentRef.current;
    switch (transType) {
      case TRANS_TYPE.CashOut: {
        const canCashout = await onCheckLimitCashOut();
        if (!canCashout?.result) {
          setContinueEnabled(false);
        } else {
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
          Navigator.push(SCREEN.CONFIRMATION, {transType});
        }
        break;
      }
      default: {
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
        break;
      }
    }
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
  const {transaction} = useWallet();
  const {phone} = useUser();
  const {setError} = useError();

  const {transType, bank, fee, amount} = transaction;
  const transTypeText =
    transType === TRANS_TYPE.CashIn ? translation.top_up : translation.withdraw;
  const sourceTitle =
    transType === TRANS_TYPE.CashIn
      ? transaction.topup.moneySource
      : 'Ngân hàng nhận tiền'; //TODO: translate
  const enableSourcePicker = transType === TRANS_TYPE.CashIn;
  const feeValue = calculateFee({cash: amount, feeData: fee});
  const total = feeValue + amount;
  const feeDes =
    feeValue == 0
      ? translation.free
      : formatCurrency(feeValue, translation.topup.currency);
  const {onCashIn} = useCashIn();
  const {onCashOut} = useCashOut();

  const data = [
    {
      name: translation.amount,
      value: formatCurrency(amount, translation.topup.currency),
    },
    {
      name: transaction.fee,
      value: feeDes,
    },
    {
      name: transaction.total,
      value: formatCurrency(total, translation.topup.currency),
      bold: true,
    },
  ];

  const onContinue = async () => {
    switch (transType) {
      case TRANS_TYPE.CashIn:
        onCashIn();
        break;
      case TRANS_TYPE.CashOut:
        onCashOut();
        break;
      default:
        break;
    }
  };

  const continueButtonTitle = () => {
    switch (transType) {
      case TRANS_TYPE.CashIn:
        return translation.transaction.confirm;
      default:
        return translation.continue;
    }
  };

  return {
    sourceTitle,
    enableSourcePicker,
    transTypeText,
    bank,
    amount,
    fee: feeValue,
    total,
    data,
    onContinue,
    continueButtonTitle: continueButtonTitle(),
  };
};

const useOTPBySmartOTP = () => {
  const {transaction, dispatch} = useWallet();
  const {phone} = useUser();
  const [code, setCode] = useState('');
  const {setError} = useError();
  const {setLoading} = useLoading();
  const {getSmartOTPSharedKey} = useAsyncStorage();
  const [time, setTime] = useState(DEFAULT_TIMEOUT);
  const {transType} = transaction;
  const {onCashInOTP} = useCashIn();
  const {onCashOutConnectedBank} = useCashOut();
  const {onTransaction} = useTransaction();
  const {confirmOTP, genOtp} = useServiceCommon();
  console.log('transaction', transaction);
  useEffect(() => {
    let interval = null;
    if (code) {
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
    };
  }, [code, time]);

  const generateOTP = async () => {
    setLoading(true);
    const smartOtpSharedKey = await getSmartOTPSharedKey();
    const otp = generateTOTP({phone, smartOtpSharedKey});
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
      case TRANS_TYPE.CashOut:
        result = await onCashOutConnectedBank(code);
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
  };

  return {code, onConfirm, time};
};

const useOTPByBankOTP = () => {
  const {transaction} = useWallet();
  const [code, setCode] = useState('');
  const [time, setTime] = useState(DEFAULT_TIMEOUT);
  const {transType} = transaction;
  const {onCashInConfirmOTP, onRetrySendBankOTP} = useCashIn();

  useEffect(() => {
    let interval = null;
    interval = setInterval(() => {
      if (time != 0) {
        setTime(time - 1);
      } else {
        interval && clearInterval(interval);
        onRetry();
      }
    }, 1000);
    return () => {
      interval && clearInterval(interval);
    };
  }, [time]);

  const onCodeFilled = async code => {
    switch (transType) {
      case TRANS_TYPE.CashIn:
        onCashInConfirmOTP(code);
        break;
      default:
    }
  };

  const onRetry = async () => {
    await onRetrySendBankOTP();
    setTime(DEFAULT_TIMEOUT);
  };

  const onCodeChanged = async value => {
    setCode(value);
  };

  return {code, time, onCodeChanged, onCodeFilled};
};

const useTransaction = () => {
  const {transaction, dispatch} = useWallet();
  if (transaction.functionType === FUNCTION_TYPE.AUTO_RECHARGE) {
    Navigator.replaceLast(SCREEN.AUTO_WITHDRAW_RESULT, {type: 'success'});
  }
  const onTransaction = async result => {
    dispatch({
      type: 'UPDATE_TRANSACTION_INFO',
      data: {
        result,
      },
    });
    Navigator.replaceLast(SCREEN.TRANSACTION_RESULT);
  };

  return {onTransaction};
};

const useConfirmMethod = () => {
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
    return TouchID.isSupported({}).then(biometryType => {
      setBiometryType(biometryType);
      return Promise.resolve(true);
    });
  };

  const confirmUsingBioID = async () => {
    const bioType = biometryType === 'FaceID' ? 'Face ID' : 'Touch ID';
    const title = `${translation.topup.confirm} ${bioType}`;
    const options = {
      title: title, // Android
      imageColor: '#e00606', // Android
      imageErrorColor: '#ff0000', // Android
      sensorDescription: 'Touch sensor', // Android
      sensorErrorDescription: 'Failed', // Android
      cancelText: 'Cancel', // Android
      // fallbackLabel: 'Show Passcode', // iOS (if empty, then label is hidden)
      unifiedErrors: false, // use unified error messages (default false)
      passcodeFallback: false, // iOS - allows the device to fall back to using the passcode, if faceid/touch is not available. this does not mean that if touchid/faceid fails the first few times it will revert to passcode, rather that if the former are not enrolled, then it will use the passcode.
    };

    return TouchID.authenticate(title, options)
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
          return Promise.reject(error);
        }
        // supported touchID but not enabled by user
        if (error?.name === 'LAErrorTouchIDNotEnrolled') {
          setBiometryType(null);
          return Promise.reject(error);
        }
        // user press show passcode
        if (
          error?.name === 'LAErrorUserFallback' ||
          error?.name === 'RCTTouchIDUnknownError'
        ) {
          return Promise.reject(error);
        }
        // other errors
        setError({ErrorCode: -1, ErrorMessage: error});
        return Promise.reject(error);
      });
  };

  return {getTouchIdEnabled, checkBiometry, confirmUsingBioID};
};

const useCashIn = () => {
  const {phone} = useUser();
  const {onShowModal} = useModalSmartOTP();
  const {onTransaction: gotoSmartOTPConfirm} = useSmartOTP();
  const {transaction, dispatch} = useWallet();
  const {setError} = useError();
  const {setLoading} = useLoading();
  const translation = useTranslation();
  const {onTransaction} = useTransaction();
  const {confirmUsingBioID, checkBiometry} = useConfirmMethod();
  const {onShowModal: onShowModalPassword} = useModalPassword();
  const {cashIn, cashInConfirm, cashInNapas} = useServiceWallet();
  const {bank, amount, transType, ConfirmType, TransCode} = transaction;
  const {BankConnectId, BankId, CardNumber, CardHolder, CardIssueDate} =
    bank || {};
  const cashInRef = useRef({
    ConfirmType,
    TransCode,
  });

  const onCashIn = async () => {
    const ConnectionType = transaction?.bank?.ConnectionType;

    switch (ConnectionType) {
      case BANK_LINKED_TYPE.CONNECTED:
        onCashInConnectedBank();
        break;
      case BANK_LINKED_TYPE.DOMESTIC:
        onCashInDomesticBank();
        break;
    }
  };

  const onCashInDomesticBank = async () => {
    setLoading(true);
    let result = await cashInNapas({
      phone,
      Amount: amount,
      BankId,
      CardNumber,
      CardHolder,
      CardIssueDate,
      CardConnectId: BankConnectId,
      IsSaveCard: 0,
      IsPayment: 0,
      PaymentPartnerCode: '',
      BusinessType: '',
    });
    setLoading(false);

    if (result?.ErrorCode !== ERROR_CODE.SUCCESS) {
      setError(result);
      return;
    }
  };

  const onCashInConnectedBank = async () => {
    let result = await onCashInToGetConfirmMethod();
    if (
      (result.ErrorCode === ERROR_CODE.CASHIN_REQUIRED_AUTHENTICATION ||
        result.ErrorCode == ERROR_CODE.SUCCESS) &&
      result.Data
    ) {
      const {ListConfirmMethod = [], TransCode} = JSON.parse(result.Data) || {};
      if (ListConfirmMethod) {
        onConfirmCashInWithMethod(
          ListConfirmMethod.sort((lhs, rhs) => {
            return lhs?.Priority > rhs?.Priority;
          }),
          TransCode,
        );
      } else {
        setError({
          ErrorCode: -1,
          ErrorMessage: translation.validate.confirmMethodInvalid,
        }); // TODO: translate
      }

      return;
    }

    if (result?.ErrorCode !== ERROR_CODE.SUCCESS) {
      setError(result);
      return;
    }
  };

  //Separate logic for future flow
  const onCashInToGetConfirmMethod = async () => {
    setLoading(true);
    let result = await cashIn({
      phone,
      BankConnectId,
      BankId,
      amount,
    });
    setLoading(false);
    return result;
  };

  const onConfirmCashInWithMethod = async (ListConfirmMethod, TransCode) => {
    console.log('CONFIRM METHOD:' + JSON.stringify(ListConfirmMethod));
    if (ListConfirmMethod) {
      let {ConfirmType} = ListConfirmMethod?.shift();

      //For Testing
      // ConfirmType = 4

      cashInRef.current = {
        TransCode,
        ConfirmType,
      };

      dispatch({
        type: 'UPDATE_TRANSACTION_INFO',
        data: {
          ConfirmType: ConfirmType,
          TransCode: TransCode,
          functionType: FUNCTION_TYPE.RECHARGE_BY_BANK,
        },
      });

      // Bank OTP là gửi lên luôn ở màn Bank SMS
      // Smart OTP đi theo design ở bước cuối gửi số ở màn hình gen OTP
      // BIO, password là gửi lên luôn theo flow ở màn confirm
      switch (ConfirmType) {
        case CONFIRM_METHODS.BIO_ID:
          const isTouchIDEnable = await checkBiometry();

          if (isTouchIDEnable) {
            try {
              let bioResult = await confirmUsingBioID();
              if (bioResult) {
                const credentials = await Keychain.getGenericPassword();
                const password = credentials?.password;
                onCashInConfirmOTP(password);
              }
            } catch (error) {
              console.log('Bio SDK Failed try another');
              onConfirmCashInWithMethod(ListConfirmMethod, TransCode);
            }
          } else {
            console.log('Bio SDK Failed try another');
            onConfirmCashInWithMethod(ListConfirmMethod, TransCode);
          }
          return;
        case CONFIRM_METHODS.PASSWORD:
          onShowModalPassword(async password =>
            onCashInConfirmOTP(await sha256(password)),
          );
          return;
        case CONFIRM_METHODS.BANK_OTP:
          Navigator.navigate(SCREEN.BANK_OTP);
          return;
        case CONFIRM_METHODS.SMART_OTP:
          onShowModal(password => gotoSmartOTPConfirm({password}));
          return;
      }
    } else {
      //Default for error case --> Smart OTP
      onShowModal(password => gotoSmartOTPConfirm({password}));
    }
  };

  let onCashInConfirmOTP = async password => {
    let result = null;
    setLoading(true);
    switch (transType) {
      case TRANS_TYPE.CashIn:
        result = await onCashInOTP(password);
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

  let onCashInOTP = async password => {
    let {TransCode, ConfirmType} = cashInRef.current || {};
    return cashInConfirm({
      phone,
      BankConnectId: BankConnectId,
      BankId: BankId,
      ConfirmValue: password,
      ConfirmMethod: ConfirmType,
      TransCode: TransCode,
    });
  };

  //Currently only for cash in connected bank
  const onRetrySendBankOTP = async () => {
    let result = await onCashInToGetConfirmMethod();
    if (result?.ErrorCode !== ERROR_CODE.SUCCESS) {
      setError(result);
      return;
    }
    return true;
  };

  return {
    onCashIn,
    onCashInOTP,
    onRetrySendBankOTP,
    onCashInConfirmOTP,
  };
};

const useCashOut = () => {
  const {phone} = useUser();
  const {onShowModal} = useModalSmartOTP();
  const {transaction, dispatch} = useWallet();
  const {setError} = useError();
  const {setLoading} = useLoading();
  const {onTransaction} = useTransaction();
  const {bank, amount, transType, ConfirmType, TransCode} = transaction;
  const transFormType = TRANS_FORM_TYPE.CONNECTED_BANK;
  const {BankConnectId, BankId} = bank || {};
  const {onTransaction: gotoSmartOTPConfirm} = useSmartOTP();
  const {onShowModal: onShowModalPassword} = useModalPassword();
  const {cashOut, cashOutConfirm, checkAmountLimit} = useServiceWallet();
  const cashOutRef = useRef({
    ConfirmType,
    TransCode,
  });

  const onCheckLimitCashOut = async () => {
    const result = await onCheckAmountLimit({
      phone,
      amount,
      transType,
      transFormType,
    });
    return result;
  };

  const onCashOut = async () => {
    const ConnectionType = transaction?.bank?.ConnectionType;
    if (ConnectionType !== BANK_LINKED_TYPE.CONNECTED) {
      Navigator.showAlert({
        title: 'Ngân hàng không hỗ trợ rút tiền',
      });
    }
    onShowModal(password => gotoSmartOTPConfirm({password}));
  };

  const onCheckAmountLimit = async () => {
    setLoading(true);
    let result = await checkAmountLimit({
      phone,
      amount,
      transType,
      transFormType: TRANS_FORM_TYPE.CONNECTED_BANK,
    });
    setLoading(false);
    if (result.ErrorCode === ERROR_CODE.SUCCESS && result.Data) {
      return {result: true};
    } else {
      Navigator.showAlert({
        message: result.ErrorMessage,
      });
      setError(result.ErrorMessage);
      return {result: false};
    }
  };

  const onCashOutConnectedBank = async () => {
    setLoading(true);
    let result = await cashOut({
      phone,
      BankConnectId,
      BankId,
      amount,
    });
    setLoading(false);
    if (
      (result?.ErrorCode === ERROR_CODE.CASHIN_REQUIRED_AUTHENTICATION ||
        result.ErrorCode == ERROR_CODE.SUCCESS) &&
      result.Data
    ) {
      cashOutRef.current = {
        TransCode: result.Data.TransCode,
        // ConfirmType,
      };

      dispatch({
        type: 'UPDATE_TRANSACTION_INFO',
        data: {
          ConfirmType: ConfirmType,
          TransCode: TransCode,
          functionType: FUNCTION_TYPE.WITHDRAW_BY_BANK,
        },
      });
      return result;
    }

    if (result?.ErrorCode !== ERROR_CODE.SUCCESS) {
      setError(result);
      return;
    }
  };

  let onCashOutOTP = async password => {
    let {TransCode, ConfirmType} = cashOutRef.current || {};
    return cashOutConfirm({
      phone,
      BankConnectId: BankConnectId,
      BankId: BankId,
      ConfirmValue: password,
      ConfirmMethod: ConfirmType,
      TransCode: TransCode,
    });
  };

  return {
    onCashOut,
    onCashOutOTP,
    onCheckLimitCashOut,
    onCashOutConnectedBank,
  };
};

const useAutoWithdraw = () => {
  const {transaction} = useWallet();
  const {bank, amount, minBalance} = transaction;
  const {phone} = useUser();
  const {registerAutoPay} = useServiceWallet();

  let onRegisterAutoWithdraw = async () => {
    return registerAutoPay({
      phone,
      Amount: amount,
      MinBalance: minBalance,
      BankConnectId: bank.BankConnectId,
    });
  };

  return {onRegisterAutoWithdraw};
};

const useTransactionResult = () => {
  const {transaction} = useWallet();
  const {showModalSmartOTPSuggestion} = useShowModal();
  const {amount, bank, result, transType, TransCode} = transaction || {};
  const {TransState} = result || {};
  const {BankName, BankNumber} = bank || {};
  const translation = useTranslation();

  const loadData = () => {
    // TODO: translate
    return [
      {label: translation.transaction.transactionId, value: TransCode},
      {label: translation.transaction.time, value: result?.ResponseTime},
    ];
  };

  const getTransactionStatusTitle = () => {
    let statusTitle = '';
    switch (transType) {
      case TRANS_TYPE.CashIn:
        statusTitle = translation.top_up;
        break;
      case TRANS_TYPE.CashOut:
        statusTitle = transaction.withdraw;
        break;
      case TRANS_TYPE.ActiveCustomer:
        statusTitle = transaction.connect_bank;
        break;
    }

    return (statusTitle += ' ' + transactionStatusDescription());
  };

  const formatAmount = () => {
    return formatCurrency(amount, translation.common.currencySign);
  };

  const transactionStatusDescription = () => {
    switch (TransState) {
      case TRANS_STATUS.SUCCESS:
        return translation.transaction.success;
      case TRANS_STATUS.FAILURE:
        return translation.transaction.failure;
    }
  };

  const transactionSuccess = () => {
    return TransState == TRANS_STATUS.SUCCESS;
  };

  const getDescription = () => {
    let description = '';
    switch (transType) {
      case TRANS_TYPE.CashIn:
        description = translation.transaction.cashInDescription;
        break;
      case TRANS_TYPE.ActiveCustomer:
        description = 'Ngân hàng {bankName}\n' + 'số tài khoản {accNumber}';
    }

    return `${description} \n ${BankName} ${'*'.repeat(BankNumber?.length)}`;
  };

  const onRetry = () => {
    let screen = null;
    switch (transType) {
      case TRANS_TYPE.CashIn:
        screen = SCREEN.TOP_UP;
        break;
      case TRANS_TYPE.CashOut:
        screen = SCREEN.WITHDRAW;
        break;
      case TRANS_TYPE.ActiveCustomer:
        screen = SCREEN.BANK_LINKED;
        break;
      default:
        screen = SCREEN.BANK_LINKED; //todo: remove
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
    transactionSuccess,
  };
};

export {
  useTopUpWithdraw,
  useConfirmation,
  useOTPBySmartOTP,
  useOTPByBankOTP,
  useTransactionResult,
};
