import {useReducer, useEffect, useRef, useState} from 'react';
import commonReducer from './reducer';
import {useCommon} from 'context/Common';
import {
  ASYNC_STORAGE_KEY,
  ERROR_CODE,
  FUNCTION_TYPE,
  SCREEN,
} from 'configs/Constants';
import {confirmOTP, genOtp} from 'services/common';
import OTP_TYPE from 'configs/Enums/OTPType';
import _ from 'lodash';
import {useAuth} from 'context/Auth/utils';
import Navigator from 'navigations/Navigator';
import AsyncStorage from '@react-native-async-storage/async-storage';

const useLoading = () => {
  const {dispatch} = useCommon();
  const setLoading = loading => {
    dispatch({type: 'SET_LOADING', loading});
  };
  return {setLoading};
};

const useError = () => {
  const {dispatch} = useCommon();
  const setError = error => {
    dispatch({type: 'SET_ERROR', error});
  };
  return {setError};
};

const useOTP = ({functionType, phone, password}) => {
  const {onLogin} = useAuth();
  const [errorMessage, setErrorMessage] = useState(null);
  const {setLoading} = useLoading();

  useEffect(() => {
    genOtp({
      phone,
      functionType,
    });
  }, [phone, functionType]);

  const onChange = value => {
    errorMessage && setErrorMessage(null);
  };

  const onConfirmOTP = async otp => {
    setLoading(true);
    const result = await confirmOTP({
      phone,
      functionType,
      OtpCode: otp,
      OtpType: OTP_TYPE.EPAY,
    });
    setLoading(false);

    // fail
    if (_.get(result, 'ErrorCode', '') === ERROR_CODE.OTP_IS_NOT_CORRECT) {
      setErrorMessage(_.get(result, 'ErrorMessage', null));
      return;
    }
    // success
    switch (functionType) {
      case FUNCTION_TYPE.CONFIRM_NEW_DEVICE:
        return onLogin({phone, password});
      case FUNCTION_TYPE.REGISTER_ACCOUNT:
        return Navigator.navigate(SCREEN.REGISTER_PASSWORD, {phone});
    }
  };

  return {errorMessage, onChange, onConfirmOTP};
};

const useAsyncStorage = () => {
  const getPhone = async () => {
    return await AsyncStorage.getItem(ASYNC_STORAGE_KEY.USER.PHONE);
  };

  const setPhone = async value => {
    await AsyncStorage.setItem(ASYNC_STORAGE_KEY.USER.PHONE, value);
  };

  const getPasswordEncrypted = async () => {
    return await AsyncStorage.getItem(
      ASYNC_STORAGE_KEY.USER.PASSWORD_ENCRYPTED,
    );
  };

  const setPasswordEncrypted = async value => {
    await AsyncStorage.setItem(ASYNC_STORAGE_KEY.USER.PHONE, value);
  };

  const getTouchIdEnabled = async () => {
    return await AsyncStorage.getItem(ASYNC_STORAGE_KEY.USER.TOUCHID_ENABLED);
  };

  const setTouchIdEnabled = async value => {
    await AsyncStorage.setItem(ASYNC_STORAGE_KEY.USER.TOUCHID_ENABLED, value);
  };

  return {
    ...AsyncStorage,
    getPhone,
    setPhone,
    getPasswordEncrypted,
    setPasswordEncrypted,
    getTouchIdEnabled,
    setTouchIdEnabled,
  };
};

export {useLoading, useOTP, useError, useAsyncStorage};
