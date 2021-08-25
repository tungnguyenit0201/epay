import {useState, useEffect, useRef} from 'react';
import Navigator from 'navigations/Navigator';
import {ERROR_CODE, SCREEN} from 'configs/Constants';
import {
  updatePersonalInfo,
  getPersonalInfo,
  getAllInfo,
  updateUserAddress,
  getConnectedBank,
} from 'services/user';
import {
  useAsyncStorage,
  useError,
  useLoading,
  useShowModal,
} from 'context/Common/utils';
import {useUser} from 'context/User';
import _ from 'lodash';

const useUserInfo = () => {
  let personalInfo = useRef({
    FullName: '',
    DateOfBirth: '',
    SexType: 0,
    Avatar: '',
    Email: '',
  });

  const {getPhone} = useAsyncStorage();
  const {setLoading} = useLoading();
  const {setError} = useError();
  const {dispatch} = useUser();
  const {showModalSmartOTP} = useShowModal();

  const setPersonalInfo = (key, value) => {
    personalInfo.current[key] = value;
  };

  const onGetPersonalInfo = async () => {
    try {
      setLoading(true);
      let phone = await getPhone();
      setLoading(false);
      let result = await getPersonalInfo({phone});
      if (_.get(result, 'ErrorCode') == ERROR_CODE.SUCCESS) {
        dispatch({
          type: 'SET_PERSONAL_INFO',
          personalInfo: result?.PersonalInfo,
        });
        dispatch({type: 'SET_PHONE', phone});
      } else setError(result);
    } catch (error) {
      setLoading(false);
    }
  };

  const onUpdatePersonalInfo = async () => {
    try {
      setLoading(true);
      let phone = await getPhone();
      let result = await updatePersonalInfo({
        phone,
        personalInfo: personalInfo.current,
      });
      setLoading(false);
      if (_.get(result, 'ErrorCode') == ERROR_CODE.SUCCESS) {
        showModalSmartOTP(true);
        Navigator.navigate(SCREEN.TAB_NAVIGATION);
      } else setError(result);
    } catch (error) {
      setLoading(false);
    }
  };

  const onGetAllInfo = async () => {
    setLoading(true);
    let phone = await getPhone();
    const result = await getAllInfo({phone});
    setLoading(false);
    switch (_.get(result, 'ErrorCode', '')) {
      case ERROR_CODE.LOGIN_PASSWORD_INCORRECT:
        return setError(result);
      case ERROR_CODE.SUCCESS:
        dispatch({
          type: 'UPDATE_WALLET',
          data: result?.WalletInfo?.AvailableBlance,
        });
        dispatch({type: 'SET_PERSONAL_ADDRESS', data: result?.AddressInfo});
        dispatch({type: 'SET_PERSONAL_IC', data: result?.ICInfor});
        dispatch({type: 'SET_PERSONAL_INFO', data: result?.PersonalInfo});
    }
  };

  const onUpdateUserAddress = async ({Address, Ward, County, Provincial}) => {
    try {
      setLoading(true);
      let phone = await getPhone();
      let result = await updateUserAddress({
        phone,
        Address,
        Ward,
        County,
        Provincial,
      });
      setLoading(false);
      if (_.get(result, 'ErrorCode') == ERROR_CODE.SUCCESS) {
        dispatch({
          type: 'SET_PERSONAL_ADDRESS',
          data: {Address, Ward, County, Provincial},
        });
        Navigator.navigate(SCREEN.USER_INFO);
      } else setError(result);
    } catch (error) {
      setLoading(false);
    }
  };

  const onGetConnectedBank = async () => {
    setLoading(true);
    let phone = await getPhone();
    const result = await getConnectedBank({phone});
    setLoading(false);
    switch (_.get(result, 'ErrorCode', '')) {
      case ERROR_CODE.LOGIN_PASSWORD_INCORRECT:
        return setError(result);
      case ERROR_CODE.SUCCESS:
        Navigator.navigate(SCREEN.MY_WALLET, result);
    }
  };

  return {
    personalInfo: personalInfo.current,
    onUpdatePersonalInfo,
    setPersonalInfo,
    onGetPersonalInfo,
    onGetAllInfo,
    onUpdateUserAddress,
    onGetConnectedBank,
  };
};
export default useUserInfo;
