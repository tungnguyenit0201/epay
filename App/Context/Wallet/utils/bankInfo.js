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
import {onGetB} from '';
import {
  useAsyncStorage,
  useError,
  useLoading,
  useShowModal,
} from 'context/Common/utils';
import {useUser} from 'context/User';
import {useWallet} from 'context/Wallet';
import _ from 'lodash';
import {sha256} from 'react-native-sha256';
import {cos} from 'react-native-reanimated';

const BankInfo = () => {
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
      _.get(listConnectBank.result, 'ErrorCode') == ERROR_CODE.SUCCESS
    ) {
      Navigator.navigate(SCREEN.BANK_LINKED);
    } else setError('Something went wrong');
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
      if (
        _.get(result, 'ErrorCode') == ERROR_CODE.SUCCESS ||
        _.get(result, 'ErrorCode') == ERROR_CODE.LOGIN_PASSWORD_INCORRECT
      ) {
        Navigator.navigate(SCREEN.CHANGE_PASSWORD, 'change_limit_response');
      } else {
        setError('result', result);
      }
    } catch (error) {
      setLoading(false);
    }
  };

  return {
    onGetDomesticBanks,
    onGetInternationalBanks,
    onGetAllBank,
    onGetConnectedBankDetail,
    onChangeLimit,
  };
};
export default BankInfo;
