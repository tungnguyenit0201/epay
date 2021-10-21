import {useAsyncStorage, useError, useLoading} from 'context/Common/utils';
import {useEffect, useRef, useState} from 'react';
import useServiceWallet from 'services/wallet';
import Navigator from 'navigations/Navigator';
import {SCREEN, TRANS_FORM_TYPE, TRANS_TYPE} from 'configs/Constants';
import _ from 'lodash';
import {ERROR_CODE} from 'configs/Constants';
import {useCommon} from 'context/Common';
import {useUser} from 'context/User';
import {useWallet} from 'context/Wallet';
import {hidePhone} from 'utils/Functions';
import Images from 'themes/Images';

export const useQRTransfer = (mount = true) => {
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
    // return Navigator.navigate(SCREEN.TRANSFER_RESULTS);

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
      Amount: 100000,
    });
    if (result?.ErrorCode == ERROR_CODE.SUCCESS) {
    } else setError(result);
    setLoading(false);
  };

  // const onPaymentConfrim = async () => {
  //   let result = await paymentComfrim({
  //     phone,
  //     OrderId: qrTransaction?.OrderID,
  //     MerchantCode: qrTransaction?.MerchantCode,
  //     TransFormType: TRANS_FORM_TYPE.WALLET,
  //   });
  // };

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

  const onContinue = async () => {
    // await onMoneyTransfer();
    await onPayment();
  };

  const onMount = async () => {
    setLoading(true);

    await Promise.all([onGetSourceMoney()]);
    setLoading(false);
  };

  useEffect(() => {
    mount && onMount();
    // onCheckAmountLimit({amount: 10000000, transFormType: 3});
    // onMoneyTransfer({amount: 100000});
    // onApplyPromo();
    // onPayment();
  }, []); // eslint-disable-line
  return {
    transfer: transfer.current,
    suggestion,
    check,
    setSuggestion,
    onChange,
    onCheckAmountLimit,
    onContinue,
  };
};
