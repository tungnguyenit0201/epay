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

  const getSmartOTPSharedKey = async () => {
    return await AsyncStorage.getItem(
      ASYNC_STORAGE_KEY.COMMON.SMART_OTP_SHARED_KEY,
    );
  };

  const setSmartOTPSharedKey = async value => {
    await AsyncStorage.setItem(
      ASYNC_STORAGE_KEY.COMMON.SMART_OTP_SHARED_KEY,
      value,
    );
  };

  const getPushToken = async () => {
    return await AsyncStorage.getItem(ASYNC_STORAGE_KEY.USER.PUSH_TOKEN);
  };

  const setResend = async resend => {
    await AsyncStorage.setItem(resend?.phone, JSON.stringify(resend));
  };

  const getResend = async phone => {
    return await AsyncStorage.getItem(phone);
  };

  const addName = async ({name, phone}) => {
    const nameData = await getNameData();
    if (Object.keys(nameData).includes(phone)) {
      return;
    }
    nameData[phone] = name;
    await AsyncStorage.setItem(ASYNC_STORAGE_KEY.USER.NAME, nameData);
  };

  const getNameData = async () => {
    const value = await AsyncStorage.getItem(ASYNC_STORAGE_KEY.USER.NAME);
    return typeof value === 'object' ? JSON.parse(value) : {};
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
    getSmartOTPSharedKey,
    setSmartOTPSharedKey,
    getPushToken,
    setResend,
    getResend,
    addName,
    getNameData,
  };
};

export default useAsyncStorage;
