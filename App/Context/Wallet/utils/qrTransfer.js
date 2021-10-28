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

export const useQRTransfer = () => {
  const {setError} = useError();
  const {setLoading} = useLoading();
  const {phone} = useUser();
  const {qrTransaction, dispatch} = useWallet();
  const {
    getTransferUser,
    moneyTransfer,
    payment,
    getSourceMoney,
    paymentComfrim,
  } = useServiceWallet();
  const {onShowModal} = useModalSmartOTP();

  const {biometryType, onTouchID} = useTouchID({
    isMount: false,
    onSuccess: () => paymentWithTouchId(),
  });
  const transfer = useRef({
    amount: null,
    payoneer: 0,
    content: '',
  });
  let [suggestion, setSuggestion] = useState([]);
  let [check, setCheck] = useState(false);
  let [showModal, setShowModal] = useState(false);

  const onChange = (key, value) => {
    console.log('key, value :>> ', key, value);
    transfer.current[key] = value;
    if (key == 'amount') {
      if (value > 100000) return setSuggestion([value, value * 2, value * 3]);
      if (value) setSuggestion([value * 1000, value * 10000, value * 100000]);
    }
  };

  const paymentWithTouchId = async () => {
    console.log('paymentWithTouchId');
    try {
      setLoading(true);
      const credentials = await Keychain.getGenericPassword();
      const passwordEncrypted = credentials?.password;
      if (passwordEncrypted) {
        onPaymentConfrim({ConfirmValue: passwordEncrypted});
      }
      setLoading(false);
      return passwordEncrypted;
    } catch (error) {
      __DEV__ && console.log("Keychain couldn't be accessed!", error);
    }
  };

  const onCheckAmountLimit = async () => {
    setSuggestion([]);

    setCheck(true);

    // setCheck(false);
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
      TransFormType: TRANS_FORM_TYPE.WALLET,
      Amount: qrTransaction?.Price,
    });
    setLoading(false);

    if (result?.ErrorCode == ERROR_CODE.SUCCESS) {
      return;
    } else {
      if (result?.ErrorCode == ERROR_CODE.PAYMENT_REQUIRED_AUTHENTICATION) {
        dispatch({
          type: 'SET_QR_TRANSACTION',
          qrTransaction: {...qrTransaction, ...result},
        });
        for (let i = 0; i < result?.ListConfirmMethod?.length; i++) {
          let confirmType = _.get(
            result,
            `ListConfirmMethod[${i}].ConfirmType`,
            -1,
          );
          // if (confirmType == CONFIRM_METHODS.BIO_ID && biometryType) {
          //   let done = await onTouchID();
          //   if (done) return;
          // }
          if (confirmType == CONFIRM_METHODS.SMART_OTP) {
            console.log('method :>> ', confirmType);
            onShowModal();
          }
        }
        result?.ListConfirmMethod?.map?.(async method => {});
      } else setError(result);
    }
  };

  const onPaymentConfrim = async ({ConfirmValue}) => {
    setLoading(true);
    console.log('qrTransaction :>> ', qrTransaction);
    let result = await paymentComfrim({
      phone,
      TransCode: qrTransaction?.TransCode,
      ConfirmMethod: qrTransaction?.ListConfirmMethod[0].ConfirmType,
      ConfirmValue,
    });
    setLoading(false);

    if (result?.ErrorCode == ERROR_CODE.SUCCESS) {
      Navigator.navigate(SCREEN.TRANSFER_RESULTS);
    } else setError(result);
  };

  const onGetSourceMoney = async () => {
    let result = await getSourceMoney({
      phone,
      TransType: TRANS_TYPE.CashTransfer,
    });
    console.log('result :>> ', result);
    if (result?.ErrorCode == ERROR_CODE.SUCCESS) {
      dispatch({type: 'SET_SOURCE_MONEY', sourceMoney: result?.MoneySources});
    } else setError(result);
  };

  const onMount = async () => {
    setLoading(true);

    await Promise.all([onGetSourceMoney()]);
    setLoading(false);
  };

  // useEffect(() => {
  //   mount && onMount();
  //   // onCheckAmountLimit({amount: 10000000, transFormType: 3});
  //   // onMoneyTransfer({amount: 100000});
  //   // onApplyPromo();
  //   // onPayment();
  // }, []); // eslint-disable-line
  return {
    transfer: transfer.current,
    suggestion,
    check,
    setSuggestion,
    onChange,
    onCheckAmountLimit,
    onPayment,
    onPaymentConfrim,
  };
};
