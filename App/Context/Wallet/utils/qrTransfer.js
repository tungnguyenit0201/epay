import {useAsyncStorage, useError, useLoading} from 'context/Common/utils';
import {useEffect, useState} from 'react';
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

const useQRTransfer = () => {
  const {error} = useCommon();
  const {getPhone} = useAsyncStorage();
  const {setError} = useError();
  const {setLoading} = useLoading();
  const {phone} = useUser();
  const {listConnectBank} = useWallet();

  const onGetTransferUser = async () => {
    setLoading(true);
    // await onGetBankFee();
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
    // console.log('fee :>> ', fee, listConnectBank);
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
  useEffect(() => {
    // onGetTransferUser();
    // onGetBankFee({bankID: 0, transFormType: ''});
    // onCheckAmountLimit({amount: 10000000, transFormType: 3});
    // onMoneyTransfer({amount: 100000});
    // onApplyPromo();
    // onPayment();
  }, []); // eslint-disable-line
  // return {
  //   loading,
  // };
};
export default useQRTransfer;
