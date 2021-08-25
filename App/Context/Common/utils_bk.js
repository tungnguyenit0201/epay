import {useReducer, useEffect, useRef, useState} from 'react';
import commonReducer from './reducer';
import {useCommon} from 'context/Common';
import {
  ASYNC_STORAGE_KEY,
  ERROR_CODE,
  FUNCTION_TYPE,
  SCREEN,
} from 'configs/Constants';
import {Linking} from 'react-native';
import {checkSmartOTP, confirmOTP, genOtp} from 'services/common';
import OTP_TYPE from 'configs/Enums/OTPType';
import _ from 'lodash';
import {useAuth} from 'context/Auth/utils';
import Navigator from 'navigations/Navigator';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useUser} from 'context/User';
import {useTranslation} from 'context/Language';

const useLoading = () => {
  const {dispatch} = useCommon();
  const setLoading = loading => {
    dispatch({type: 'SET_LOADING', loading});
  };
  return {setLoading};
};

const useError = () => {
  const {dispatch} = useCommon();
  const translation = useTranslation();
  const setError = error => {
    dispatch({
      type: 'SET_ERROR',
      error: {
        errorCode: error?.ErrorCode,
        errorMessage: error?.ErrorMessage, //todo: get translate error mesage text
        title: error?.title || translation.notification,
      },
    });
  };
  return {setError};
};

const useOTP = ({functionType, phone, password}) => {
  const [errorMessage, setErrorMessage] = useState(null);
  const [countdown, setCountdown] = useState(60);
  const [showCall, setshowCall] = useState(false);
  const [code, setCode] = useState('');

  const {setLoading} = useLoading();
  const {setError} = useError();
  const {onLogin} = useAuth();

  const onChange = value => {
    setCode(value);
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
    setCode('');
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
        return Navigator.navigate(SCREEN.REGISTER_PASSWORD, {
          phone,
          functionType: FUNCTION_TYPE.REGISTER_ACCOUNT,
        });
      case FUNCTION_TYPE.FORGOT_PASS:
        return Navigator.navigate(SCREEN.REGISTER_PASSWORD, {
          phone,
          functionType: FUNCTION_TYPE.FORGOT_PASS,
        });
    }
  };

  const resenOTP = () => {
    try {
      setLoading(true);
      let result = genOtp({
        phone,
        functionType,
      });
      let errorCode = _.get(result, 'ErrorCode', '');
      if (errorCode == ERROR_CODE.SUCCESS) setCountdown(60);
      else setError(result);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };
  const openCallDialog = () => {
    try {
      Linking.openURL('tel:02432252336');
    } catch {}
  };

  useEffect(() => {
    genOtp({
      phone,
      functionType,
    });
  }, [phone, functionType]);

  useEffect(() => {
    let timer = setInterval(() => setCountdown(countdown - 1), 1000);
    if (countdown == 0) clearInterval(timer);

    return () => clearInterval(timer);
  }, [countdown]);

  return {
    errorMessage,
    countdown,
    showCall,
    code,
    onChange,
    onConfirmOTP,
    resenOTP,
    setshowCall,
    openCallDialog,
  };
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
    await AsyncStorage.setItem(
      ASYNC_STORAGE_KEY.USER.PASSWORD_ENCRYPTED,
      value,
    );
  };

  const getTouchIdEnabled = async () => {
    const value = await AsyncStorage.getItem(
      ASYNC_STORAGE_KEY.USER.TOUCHID_ENABLED,
    );
    return JSON.parse(value);
  };

  const setTouchIdEnabled = async value => {
    await AsyncStorage.setItem(
      ASYNC_STORAGE_KEY.USER.TOUCHID_ENABLED,
      JSON.stringify(value),
    );
  };

  const getToken = async () => {
    return await AsyncStorage.getItem(ASYNC_STORAGE_KEY.USER.TOKEN);
  };

  const setToken = async value => {
    await AsyncStorage.setItem(ASYNC_STORAGE_KEY.USER.TOKEN, value);
  };

  const getModalSmartOTPDisabled = async () => {
    const value = await AsyncStorage.getItem(
      ASYNC_STORAGE_KEY.COMMON.SMART_OTP_DISABLED,
    );
    return JSON.parse(value);
  };

  const setModalSmartOTPDisabled = async value => {
    await AsyncStorage.setItem(
      ASYNC_STORAGE_KEY.COMMON.SMART_OTP_DISABLED,
      JSON.stringify(value),
    );
  };

  return {
    ...AsyncStorage,
    getPhone,
    setPhone,
    getPasswordEncrypted,
    setPasswordEncrypted,
    getTouchIdEnabled,
    setTouchIdEnabled,
    getToken,
    setToken,
    getModalSmartOTPDisabled,
    setModalSmartOTPDisabled,
  };
};

const useShowModal = () => {
  const {token, phone} = useUser();
  const {getModalSmartOTPDisabled} = useAsyncStorage();
  const {dispatch} = useCommon();

  const showModalSmartOTP = async (value = true) => {
    let isDisabled = await getModalSmartOTPDisabled();
    if (token && !isDisabled) {
      const result = await checkSmartOTP({phone});
      isDisabled = !!result?.SmartOtpInfo;
    }
    if (value && isDisabled) {
      return;
    }
    dispatch({type: 'SHOW_MODAL', modal: {type: 'smartOTP', value}});
  };

  return {showModalSmartOTP};
};

export {useLoading, useOTP, useError, useAsyncStorage, useShowModal};
