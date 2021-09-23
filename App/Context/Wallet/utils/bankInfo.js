import {useState, useEffect, useRef} from 'react';
import Navigator from 'navigations/Navigator';
import {ERROR_CODE, SCREEN, FUNCTION_TYPE} from 'configs/Constants';
import {
  getDomesticBank,
  getInternationalBank,
  getConnectedBank,
  getConnectedBankDetail,
  changeLimit,
} from 'services/wallet';
import {
  useAsyncStorage,
  useError,
  useLoading,
  useShowModal,
} from 'context/Common/utils';
import {useWallet} from 'context/Wallet';
import _ from 'lodash';

const bankTest = {
  // TODO: remove test data
  BankCode: 'VCB',
  BankName: 'Ngân hàng test',
  ConnectTime: '08-09-2021 22:41:32',
  BankLogoUrl:
    'https://t3.ftcdn.net/jpg/00/62/78/62/360_F_62786254_cxVz7e28OMBn63qGzDFEBqHv7e1o2HgU.jpg',
  BankId: 1,
  BankConnectId: 1594,
  BankLimit: 2000000,
  BankNumber: '123456789',
  CardHolder: 'DAT',
  CardNumber: '',
  ConnectionType: 0,
  IsDefault: false,
  CardTypeId: 0,
  IsAvailable: false,
};

const useBankInfo = () => {
  const {getPhone} = useAsyncStorage();
  const {setLoading} = useLoading();
  const {setError} = useError();
  const {dispatch} = useWallet();

  const onGetConnectedBank = async () => {
    setLoading(true);
    let phone = await getPhone();
    const result = await getConnectedBank({phone});
    setLoading(false);
    if (_.get(result, 'ErrorCode') == ERROR_CODE.SUCCESS) {
      dispatch({
        type: 'LIST_CONNECT_BANK',
        data: result?.ListBankConnect,
        // data: [__DEV__ ? bankTest : {}, ...result?.ListBankConnect], // TODO: remove bankTest
      });
      return {result};
    } else setError(result);
  };

  const onGetDomesticBanks = async () => {
    setLoading(true);
    let phone = await getPhone();
    const result = await getDomesticBank({phone});
    setLoading(false);
    if (_.get(result, 'ErrorCode') == ERROR_CODE.SUCCESS) {
      dispatch({type: 'LIST_DOMESTIC_BANK', data: result?.DomesticBank});
      return {result};
    } else setError(result);
  };

  const onGetInternationalBanks = async () => {
    setLoading(true);
    let phone = await getPhone();
    const result = await getInternationalBank({phone});
    setLoading(false);
    if (_.get(result, 'ErrorCode') == ERROR_CODE.SUCCESS) {
      dispatch({
        type: 'LIST_INTERNATIONAL_BANK',
        data: result?.InternationalBank,
      });
      return {result};
    } else setError(result);
  };

  const onGetAllBank = async () => {
    const listConnectBank = await onGetConnectedBank();
    const listDomesticBanks = await onGetDomesticBanks();
    const listInternationalBanks = await onGetInternationalBanks();
    if (
      _.get(listConnectBank.result, 'ErrorCode') == ERROR_CODE.SUCCESS &&
      _.get(listInternationalBanks.result, 'ErrorCode') == ERROR_CODE.SUCCESS &&
      _.get(listDomesticBanks.result, 'ErrorCode') == ERROR_CODE.SUCCESS
    ) {
      Navigator.navigate(SCREEN.BANK_LINKED);
    } else setError({ErrorCode: -1, ErrorMessage: 'Something went wrong'});
  };

  const onGetConnectedBankDetail = async ({bankID}) => {
    setLoading(true);
    let phone = await getPhone();
    const result = await getConnectedBankDetail({bankID});
    setLoading(false);
    if (_.get(result, 'ErrorCode') == ERROR_CODE.SUCCESS) {
      return {result};
    } else setError(result);
  };

  const onChangeLimit = async ({limit}) => {
    try {
      dispatch({type: 'SET_LIMIT', data: limit});
      setLoading(true);
      let phone = await getPhone();
      let result = await changeLimit({phone, amountLimit: limit});
      setLoading(false);
      if (_.get(result, 'ErrorCode') == ERROR_CODE.LOGIN_PASSWORD_INCORRECT) {
        Navigator.navigate(SCREEN.CHANGE_PASSWORD, {
          type: 'change_limit_response',
        });
      } else {
        setError('result', result);
      }
    } catch (error) {
      setLoading(false);
    }
  };

  return {
    onGetConnectedBank,
    onGetDomesticBanks,
    onGetInternationalBanks,
    onGetAllBank,
    onGetConnectedBankDetail,
    onChangeLimit,
  };
};
export default useBankInfo;
