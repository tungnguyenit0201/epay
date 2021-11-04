import {useState, useEffect, useRef} from 'react';
import Navigator from 'navigations/Navigator';
import {
  ERROR_CODE,
  SCREEN,
  FUNCTION_TYPE,
  TRANS_TYPE,
  TRANS_FORM_TYPE,
} from 'configs/Constants';
import _ from 'lodash';
import {useWallet} from '..';
import {useTopUpWithdraw} from './topUpWithdraw';
import useServiceWallet from 'services/wallet';
import {useUser} from 'context/User';

const useTopUp = () => {
  const {
    inputRef,
    isContinueEnabled,
    onChangeCash,
    onContinue,
    onSetBank,
    onSuggestMoney,
  } = useTopUpWithdraw({transType: TRANS_TYPE.CashIn});
  const {phone} = useUser();
  const {getBankFee, getSourceMoney} = useServiceWallet();
  const { sourceMoneyCashIn, dispatch} =
    useWallet();

  useEffect(() => {
    onGetSourceMoney();
    
  }, []);

  const onGetSourceMoney = async () => {
    let result = await getSourceMoney({
      phone,
      TransType: TRANS_TYPE.CashIn,
    });
    if (result?.ErrorCode == ERROR_CODE.SUCCESS) {
      dispatch({type: 'SET_MONEY_SOURCE_CASH_IN', data: result?.MoneySources});
    } else setError(result);
  };

  const onSelectBank = data => {
    if (!data) {
      onSetBank(null);
      return;
    }
    const {index, type} = data || {};
    let bank = sourceMoneyCashIn?.[index];
    if (!!bank) {
      onSetBank({
        bank
      });
    }
  };

  return {
    inputRef,
    isContinueEnabled,
    bankData: sourceMoneyCashIn,
    onChangeCash,
    onSuggestMoney,
    onSelectBank,
    onContinue,
  };
};

export default useTopUp;
