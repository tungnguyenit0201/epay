import {useState, useEffect, useRef} from 'react';
import Navigator from 'navigations/Navigator';
import {ERROR_CODE, SCREEN, FUNCTION_TYPE} from 'configs/Constants';
import _ from 'lodash';
import useBankInfo from './bankInfo';
import {useWallet} from '..';

const useTopUp = () => {
  const inputRef = useRef(null);
  const {onGetConnectedBank, onGetDomesticBanks, onGetInternationalBanks} =
    useBankInfo();
  const {listConnectBank, listDomesticBank, listInternationalBank} =
    useWallet();
  const bankData = {
    connectedBank: listConnectBank,
    domesticBank: listDomesticBank,
    internationalBank: listInternationalBank,
  };

  useEffect(() => {
    onGetConnectedBank();
    onGetDomesticBanks();
    onGetInternationalBanks();
  }, []); // eslint-disable-line

  const onSuggestMoney = value => {
    inputRef.current?.setValue && inputRef.current.setValue(`${value}`);
  };

  const onSelectBank = data => {
    const {index, type} = data;
    const bank = bankData[type][index];
  };

  const onProcessTopUp = () => {
    Navigator.navigate(SCREEN.CONFIRMATION);
  };

  return {
    inputRef,
    bankData,
    onSuggestMoney,
    onProcessTopUp,
    onSelectBank,
  };
};

export default useTopUp;
