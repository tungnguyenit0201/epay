import {useAsyncStorage, useError, useLoading} from 'context/Common/utils';
import {useEffect, useRef, useState} from 'react';
import {
  getTransferUser,
  getBankFee,
  checkAmountLimit,
  moneyTransfer,
  applyPromo,
  payment,
  getSourceMoney,
} from 'services/wallet';
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
  const bankFee = useRef({});
  const transfer = useRef({
    amount: null,
    payoneer: 0,
    content: '',
  });
  let [suggestion, setSuggestion] = useState([]);
  let [check, setCheck] = useState(false);
  let [showModal, setShowModal] = useState(false);

  const onChange = (key, value) => {
    transfer.current[key] = value;
    if (key == 'amount') {
      if (value) setSuggestion([value * 1000, value * 10000, value * 100000]);
    }
  };

  const onGetBankFee = async ({bankID, transFormType}) => {
    const fee = await getBankFee({
      phone,
      bankID: bankID || 0,
      transType: TRANS_TYPE.CashTransfer,
      transFormType: transFormType || TRANS_FORM_TYPE.WALLET,
    });
    bankFee.current = {...bankFee.current, [bankID]: fee?.FeeInfo};
    // console.log('fee :>> ', fee);
  };

  const onCheckAmountLimit = async () => {
    setSuggestion([]);
    let result = await checkAmountLimit({
      phone,
      amount: transfer.current?.amount,
      transType: TRANS_TYPE.CashTransfer,
      transFormType: transfer.current?.transFormType || TRANS_FORM_TYPE.WALLET,
    });
    if (result?.ErrorCode == ERROR_CODE.SUCCESS) {
      setCheck(true);
    } else {
      setError({
        ...result,
        title: 'Số tiền vượt hạn mức',
        icon: Images.Modal.MoneySend,
      });
      setCheck(false);
    }
  };
  const onMoneyTransfer = async () => {
    console.log('transfer :>> ', transfer, qrTransaction);
    let result = await moneyTransfer({
      Amount: transfer.current?.amount,
      DesAccountId: qrTransaction?.AccountId,
      Payoneer: transfer.current?.payoneer,
      Content: transfer.current?.content,
    });
    console.log('transfer :>> ', result);
  };
  const onApplyPromo = async () => {
    let result = await applyPromo({
      phone,
      MerchantCode: 'MBG',
      AgencyCode: '',
      PromoCode: 'FREE',
    });
    console.log('onApplyPromo :>> ', result);
  };
  const onPayment = async () => {
    let result = await payment({
      phone,
      OrderId: '08065013',
      MerchantCode: 'MBG',
    });
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

  const onContinue = async () => {
    console.log('onContinue');
    await onMoneyTransfer();
    dispatch({type: 'SET_QR_TRANSACTION', qrTransaction: transfer.current});
    Navigator.navigate(SCREEN.TRANSFER_RESULTS);
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
    bankFee: bankFee.current,
    transfer: transfer.current,
    suggestion,
    check,
    setSuggestion,
    onChange,
    onCheckAmountLimit,
    onContinue,
  };
};
