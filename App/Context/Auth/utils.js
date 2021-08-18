import {useState, useEffect, useRef} from 'react';
import TouchID from 'react-native-touch-id';
import {checkPhone, getConfigInfo, login} from 'services/auth';
import {ERROR_CODE, FUNCTION_TYPE, SCREEN} from 'configs/Constants';
import _ from 'lodash';
import Navigator from 'navigations/Navigator';
import {sha256} from 'react-native-sha256';
import {Alert} from 'react-native';
import {useTranslation} from 'context/Language';
import {useLoading} from 'context/Common/utils';
import {useCommon} from 'context/Common';
import {useUser} from 'context/User';

const useTouchID = () => {
  const [biometryType, setBiometryType] = useState(null);

  useEffect(() => {
    TouchID.isSupported({})
      .then(biometryType => {
        setBiometryType(biometryType);
      })
      .catch(error => {
        __DEV__ && console.log('Touch ID is not supported.');
      });
  }, []);

  const onTouchID = async () => {
    if (!biometryType) {
      return;
    }

    const options = {
      title: 'Authentication Required', // Android
      imageColor: '#e00606', // Android
      imageErrorColor: '#ff0000', // Android
      sensorDescription: 'Touch sensor', // Android
      sensorErrorDescription: 'Failed', // Android
      cancelText: 'Cancel', // Android
      fallbackLabel: 'Show Passcode', // iOS (if empty, then label is hidden)
      unifiedErrors: false, // use unified error messages (default false)
      passcodeFallback: false, // iOS - allows the device to fall back to using the passcode, if faceid/touch is not available. this does not mean that if touchid/faceid fails the first few times it will revert to passcode, rather that if the former are not enrolled, then it will use the passcode.
    };

    return await new Promise((resolve, reject) => {
      TouchID.authenticate('Đăng nhập bằng Touch ID', options)
        .then(success => {
          resolve(success);
        })
        .catch(error => {
          reject(error);
        });
    });
  };

  return {biometryType, onTouchID};
};

const useAuth = () => {
  const {incorrect_password} = useTranslation();
  const {setLoading} = useLoading();
  const {dispatch} = useUser();

  const onCheckPhoneExist = async ({phone}) => {
    setLoading(true);
    const result = await checkPhone(phone);
    setLoading(false);

    switch (_.get(result, 'ErrorCode', '')) {
      // register
      case ERROR_CODE.ACCOUNT_IS_NOT_EXISTED_OR_INVALID_PASSWORD:
        return Navigator.push(SCREEN.OTP, {
          phone,
          functionType: FUNCTION_TYPE.REGISTER_ACCOUNT,
        });

      // login
      case ERROR_CODE.PHONE_IS_REGISTERED:
        return Navigator.push(SCREEN.LOGIN, {phone});
    }
  };

  const onChangePhone = () => {
    Navigator.goBack();
  };

  const onForgetPassword = () => {
    Navigator.replaceLast(SCREEN.FORGET_PASSWORD);
  };

  const onLogin = async ({phone, password}) => {
    const passwordEncrypted = await sha256(password);
    const result = await login(phone, passwordEncrypted);

    switch (_.get(result, 'ErrorCode', '')) {
      case ERROR_CODE.LOGIN_PASSWORD_INCORRECT:
        return Alert.alert(incorrect_password);

      case ERROR_CODE.NEW_DEVICE_CONFIRM_REQUIRED:
        return Navigator.push(SCREEN.OTP, {
          phone,
          functionType: FUNCTION_TYPE.CONFIRM_NEW_DEVICE,
          password,
        });

      case ERROR_CODE.SUCCESS:
        dispatch({type: 'UPDATE_TOKEN', data: result?.Token});
        Navigator.navigate(SCREEN.TAB_NAVIGATION);
        return;
    }
  };

  return {onCheckPhoneExist, onChangePhone, onForgetPassword, onLogin};
};

export {useTouchID, useAuth};
