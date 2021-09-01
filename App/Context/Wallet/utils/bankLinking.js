import {useEffect} from 'react';
import _ from 'lodash';
import {useBankInfo} from 'context/Wallet/utils';
import {useWallet} from 'context/Wallet';
import {BANK_TYPE, ERROR_CODE} from 'configs/Constants';
import {linkDomesticBank, linkInternationalBank} from 'services/wallet';
import {useAsyncStorage, useError, useLoading} from 'context/Common/utils';

const useBankList = () => {
  const {onGetAllBank} = useBankInfo();
  const {listDomesticBank, listInternationalBank} = useWallet();

  useEffect(() => {
    onGetAllBank();
  }, []); // eslint-disable-line

  return {
    bankList: [
      ...listDomesticBank?.map(item => ({...item, type: BANK_TYPE.DOMESTIC})),
      ...listInternationalBank?.map(item => ({
        ...item,
        type: BANK_TYPE.INTERNATIONAL,
      })),
    ],
  };
};

const useBankLinking = ({bank}) => {
  const {getPhone} = useAsyncStorage();
  const {setLoading} = useLoading();
  const {setError} = useError();
  const {dispatch} = useWallet();

  const onLinkDomesticBank = async ({BankId}) => {
    setLoading(true);
    const phone = await getPhone();
    const result = await linkDomesticBank({phone, BankId});
    setLoading(false);
    if (_.get(result, 'ErrorCode') == ERROR_CODE.SUCCESS) {
      console.log('result :>> ', result);
    } else setError(result);
  };
  useEffect(() => {
    onLinkDomesticBank(bank);
  }, []); // eslint-disable-line

  return {onLinkDomesticBank};
};

export {useBankList, useBankLinking};
