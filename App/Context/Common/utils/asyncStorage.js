import {ASYNC_STORAGE_KEY} from 'configs/Constants';
import _ from 'lodash';
import AsyncStorage from '@react-native-async-storage/async-storage';

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

export default useAsyncStorage;
