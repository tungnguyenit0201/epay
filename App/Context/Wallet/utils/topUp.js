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
import useBankInfo from './bankInfo';
import {useWallet} from '..';
import {useTopUpWithdraw} from './topUpWithdraw';
import {getBankFee} from 'services/wallet';
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
  const {onGetConnectedBank, onGetDomesticBanks, onGetInternationalBanks} =
    useBankInfo();
  const {listConnectBank, listDomesticBank, listInternationalBank} =
    useWallet();
  const [bankFeeData, setBankFeeData] = useState({
    [TRANS_FORM_TYPE.CONNECTED_BANK]: null,
    [TRANS_FORM_TYPE.NAPAS_CARD]: null,
    [TRANS_FORM_TYPE.INTERNATIONAL_CARD]: null,
  });
  const bankData = {
    [TRANS_FORM_TYPE.CONNECTED_BANK]: listConnectBank,
    [TRANS_FORM_TYPE.NAPAS_CARD]: listDomesticBank,
    [TRANS_FORM_TYPE.INTERNATIONAL_CARD]: listInternationalBank,
  };

  useEffect(() => {
    onGetConnectedBank();
    onGetDomesticBanks();
    onGetInternationalBanks();
  }, []); // eslint-disable-line

  useEffect(() => {
    _.forEach(bankData, (banks, transFormType) => {
      if (bankFeeData[transFormType]) {
        return;
      }
      banks.forEach(async (bank, index) => {
        const result = await getBankFee({
          phone,
          bankID: bank.BankId,
          transType: TRANS_TYPE.CashIn,
          transFormType,
        });
        setBankFeeData(bankFeeData => {
          if (!bankFeeData[transFormType]) {
            bankFeeData[transFormType] = [];
          }
          bankFeeData[transFormType][index] = _.get(result, 'FeeInfo', null);
          return bankFeeData;
        });
      });
    });
  }, [bankData]); // eslint-disable-line

  const onSelectBank = data => {
    const {index, type} = data;
    onSetBank({
      bank: bankData[type][index],
      transFormType: type,
      fee: bankFeeData[type][index],
    });
  };

  return {
    inputRef,
    isContinueEnabled,
    bankData,
    bankFeeData,
    onChangeCash,
    onSuggestMoney,
    onSelectBank,
    onContinue,
  };
};

export default useTopUp;
