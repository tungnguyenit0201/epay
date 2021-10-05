import {useAsyncStorage, useError, useLoading} from 'context/Common/utils';
import {useEffect, useRef, useState} from 'react';
import {
  getTransferUser,
  getBankFee,
  checkAmountLimit,
  moneyTransfer,
  applyPromo,
  payment,
} from 'services/wallet';
import Navigator from 'navigations/Navigator';
import {SCREEN, TRANS_FORM_TYPE, TRANS_TYPE} from 'configs/Constants';
import _ from 'lodash';
import {ERROR_CODE} from 'configs/Constants';
import {useCommon} from 'context/Common';
import {useUser} from 'context/User';
import {useWallet} from 'context/Wallet';
import {hidePhone} from 'utils/Functions';

export const useQRTransfer = () => {
  const {error} = useCommon();
  const {getPhone} = useAsyncStorage();

  const {setError} = useError();
  const {setLoading} = useLoading();
  const {phone} = useUser();
  const {listConnectBank} = useWallet();
  const bankFee = useRef({});
  const transfer = useRef({});
  const sourceMoney = [
    {BankId: 0, BankName: 'Ví của tôi', CardNumber: hidePhone(phone)},
    ...listConnectBank,
  ]; // TODO: translate
  console.log('listConnectBank :>> ', listConnectBank);

  const onChange = (key, value) => {
    console.log('key, value :>> ', key, value);
    transfer.current[key] = value;
  };
  const onGetTransferUser = async () => {
    setLoading(true);
    let result = await getTransferUser({
      phone,
      SearchPhoneNumber: '0347019930',
    });
    console.log('result :>> ', result);

    if (_.get(result, 'ErrorCode') == ERROR_CODE.SUCCESS) {
      setLoading(false);

      return {result};
    } else setError(result);
    setLoading(false);
  };
  const onGetBankFee = async ({bankID, transFormType}) => {
    const fee = await getBankFee({
      phone,
      bankID: bankID || 0,
      transType: TRANS_TYPE.CashTransfer,
      transFormType: transFormType || TRANS_FORM_TYPE.WALLET,
    });
    bankFee.current = {...bankFee.current, [bankID]: fee?.FeeInfo};
    console.log('fee :>> ', fee);
  };

  const onCheckAmountLimit = async ({amount, transFormType}) => {
    let result = await checkAmountLimit({
      phone,
      amount,
      transType: TRANS_TYPE.CashTransfer,
      transFormType: transFormType || TRANS_FORM_TYPE.WALLET,
    });
    // console.log('result :>> ', result);
  };
  const onMoneyTransfer = async ({amount}) => {
    let result = await moneyTransfer({
      Amount: amount,
      DesAccountId: 'EA8000000927',
      Payoneer: 0,
      Content: 'hi',
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
  const onMount = async () => {
    setLoading(true);

    await Promise.all(onGetBankFee({bankID: 0, transFormType: ''}));
    setLoading(false);
  };
  useEffect(() => {
    onMount();
    // onGetTransferUser();
    // onCheckAmountLimit({amount: 10000000, transFormType: 3});
    // onMoneyTransfer({amount: 100000});
    // onApplyPromo();
    // onPayment();
  }, []); // eslint-disable-line
  return {
    bankFee: bankFee.current,
    sourceMoney,
    transfer: transfer.current,
    onChange,
  };
};
