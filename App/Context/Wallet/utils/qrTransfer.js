import {useAsyncStorage, useError, useLoading} from 'context/Common/utils';
import {useEffect, useRef, useState} from 'react';
import useServiceWallet from 'services/wallet';
import Navigator from 'navigations/Navigator';
import {
  SCREEN,
  TRANS_FORM_TYPE,
  TRANS_TYPE,
  ERROR_CODE,
  CONFIRM_METHODS,
} from 'configs/Constants';
import _ from 'lodash';
import {useCommon} from 'context/Common';
import {useUser} from 'context/User';
import {useWallet} from 'context/Wallet';
import {hidePhone} from 'utils/Functions';
import {sha256} from 'react-native-sha256';
import Keychain from 'react-native-keychain';
import {useTouchID} from 'context/Auth/utils';
import {useModalSmartOTP} from 'context/User/utils';
import {generateTOTP} from 'utils/Functions';
export const useQRTransfer = (isMount = true) => {
  const {setError} = useError();
  const {setLoading} = useLoading();
  const {phone} = useUser();
  const {qrTransaction, sourceMoney, dispatch} = useWallet();
  const {
    getTransferUser,
    moneyTransfer,
    payment,
    getSourceMoney,
    paymentComfrim,
  } = useServiceWallet();
  const {onShowModal} = useModalSmartOTP();
  const {getSmartOTPSharedKey} = useAsyncStorage();

  const {biometryType, onTouchID} = useTouchID({
    isMount: false,
    onSuccess: () => paymentWithPassword(),
  });
  const transfer = useRef({
    Price: null,
    payoneer: 0,
    Content: '',
    sourceMoney: _.get(qrTransaction, 'sourceMoney', {}),
    ConfirmValue: '',
  });
  let [suggestion, setSuggestion] = useState([]);
  let [check, setCheck] = useState(false);

  const onChange = (key, value) => {
    console.log('key, value :>> ', key, value);
    transfer.current[key] = value;
    if (key == 'Price') {
      if (value > 100000) return setSuggestion([value, value * 2, value * 3]);
      if (value) setSuggestion([value * 1000, value * 10000, value * 100000]);
    }
    console.log('object :>> ', transfer?.current?.Price?.toString());
  };

  const onCheckAmountLimit = async () => {
    setSuggestion([]);
    setCheck(true);
  };
  const onMoneyTransfer = async () => {
    setLoading(true);

    let result = await moneyTransfer({
      phone,
      Amount: transfer.current?.amount,
      DesAccountId: qrTransaction?.AccountId,
      Payoneer: transfer.current?.payoneer,
      Content: transfer.current?.content,
      TransFormType: TRANS_FORM_TYPE.WALLET,
    });

    if (result?.ErrorCode == ERROR_CODE.SUCCESS) {
      dispatch({type: 'SET_QR_TRANSACTION', qrTransaction: transfer.current});
      Navigator.navigate(SCREEN.TRANSFER_RESULTS);
      setLoading(false);
    } else setError({...result, onClose: () => setLoading(false)});
    console.log('transfer :>> ', result);
  };

  const onPayment = async () => {
    setLoading(true);

    let result = await payment({
      phone,
      OrderId: qrTransaction?.OrderID,
      MerchantCode: qrTransaction?.MerchantCode,
      TransFormType: qrTransaction?.sourceMoney?.SourceType,
      Amount: qrTransaction?.Price,
      BankId: qrTransaction?.sourceMoney?.BankId,
      BankConnectId: qrTransaction?.sourceMoney?.SourceId,
      CardNumber: '9704000000000018',
      CardHolder: 'NGUYEN VAN A',
      CardIssueDate: '0307',
    });
    setLoading(false);

    if (result?.ErrorCode == ERROR_CODE.SUCCESS) {
      return;
    } else {
      if (result?.ErrorCode == ERROR_CODE.PAYMENT_REQUIRED_AUTHENTICATION) {
        transfer.current = {...transfer.current, ...result};
        if (result?.ListConfirmMethod?.length > 0) {
          let ListConfirmMethod = result?.ListConfirmMethod?.sort?.(
            (lhs, rhs) => {
              return lhs?.Priority > rhs?.Priority;
            },
          );
          for (let i = 0; i < ListConfirmMethod?.length; i++) {
            let confirmType = ListConfirmMethod?.[i]?.ConfirmType || -1;

            if (confirmType == CONFIRM_METHODS.BIO_ID && biometryType) {
              let done = await onTouchID();
              if (done) return;
            }

            if (confirmType == CONFIRM_METHODS.SMART_OTP) {
              onShowModal(async () => await paymentWithSmartOTP());
              return;
            }
            if (confirmType == CONFIRM_METHODS.BANK_OTP) {
              return onContinue(SCREEN.QR_BANK_OTP);
            }
          }
        }
      } else setError(result);
    }
  };

  const paymentWithSmartOTP = async () => {
    const smartOtpSharedKey = await getSmartOTPSharedKey();
    let otp = generateTOTP({phone, smartOtpSharedKey});
    await onPaymentConfrim({
      ConfirmValue: otp,
      ConfirmMethod: CONFIRM_METHODS.SMART_OTP,
    });
  };

  const paymentWithPassword = async (
    ConfirmMethod = CONFIRM_METHODS.BIO_ID,
  ) => {
    try {
      setLoading(true);
      const credentials = await Keychain.getGenericPassword();
      const passwordEncrypted = credentials?.password;
      if (passwordEncrypted) {
        onPaymentConfrim({ConfirmValue: passwordEncrypted, ConfirmMethod});
      }
      setLoading(false);
      return passwordEncrypted;
    } catch (error) {
      __DEV__ && console.log("Keychain couldn't be accessed!", error);
    }
  };

  const onPaymentConfrim = async ({ConfirmValue, ConfirmMethod}) => {
    setLoading(true);
    console.log('qrTransaction :>> ', qrTransaction);
    let result = await paymentComfrim({
      phone,
      TransCode: transfer.current?.TransCode || qrTransaction?.TransCode,
      ConfirmMethod,
      ConfirmValue,
      BankId: qrTransaction?.sourceMoney?.BankId,
    });
    setLoading(false);

    if (result?.ErrorCode == ERROR_CODE.SUCCESS) {
      onContinue(SCREEN.TRANSFER_RESULTS);
    } else setError(result);
  };

  const onContinue = screen => {
    dispatch({
      type: 'SET_QR_TRANSACTION',
      qrTransaction: {...qrTransaction, ...transfer.current},
    });
    Navigator.navigate(screen);
  };

  useEffect(() => {
    isMount &&
      onChange('sourceMoney', sourceMoney?.length > 0 ? sourceMoney[0] : {});
  }, []);
  return {
    transfer: transfer.current,
    suggestion,
    check,
    setSuggestion,
    onContinue,
    onChange,
    onCheckAmountLimit,
    onPayment,
    onPaymentConfrim,
  };
};
