import {useState, useEffect, useRef} from 'react';
import TouchID from 'react-native-touch-id';
import {checkPhone, getConfigInfo, login, register} from 'services/auth';
import {ERROR_CODE, FUNCTION_TYPE, SCREEN} from 'configs/Constants';
import _ from 'lodash';
import Navigator from 'navigations/Navigator';
import {sha256} from 'react-native-sha256';
import {Alert} from 'react-native';
import {useTranslation} from 'context/Language';
import {useLoading} from 'context/Common/utils';
import {useUser} from 'context/User';
import {genOtp, confirmOTP} from 'services/common';

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
        return genOTPRegister(phone);

      // login
      case ERROR_CODE.PHONE_IS_REGISTERED:
        return Navigator.push(SCREEN.LOGIN, {phone});
    }
  };

  const genOTPRegister = async phone => {
    setLoading(true);
    const result = await genOtp({
      phone,
      functionType: FUNCTION_TYPE.REGISTER_ACCOUNT,
    });
    setLoading(false);
    switch (_.get(result, 'ErrorCode', '')) {
      case ERROR_CODE.SUCCESS:
        Navigator.push(SCREEN.OTP, {
          phone,
          functionType: FUNCTION_TYPE.REGISTER_ACCOUNT,
        });
        break;
      case ERROR_CODE.SYSTEM_IS_UPGRADING:
        // this.refs.upgradeModal.show()
        break;
      case ERROR_CODE.FEATURE_RESEND_OTP_OVER_TIME:
      case ERROR_CODE.FEATURE_LOCK_BY_RESEND_OTP:
        // this.state.popupMessage = ret.ErrorMessage
        // this.setState(this.state)
        // this.refs.infoModal.show()
        break;
      default:
        // this.state.popupMessage = ret.ErrorMessage
        // this.setState(this.state)
        // this.refs.infoModal.show()
        break;
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

const useRegister = () => {
  let registerRef = useRef({
    otp: null,
    phone: null,
    newPassword: null,
    passwordConfirm: null,
  });
  const onChange = (key, val) => {
    registerRef.current[key] = val;
  };

  const {setLoading} = useLoading();

  const confrimOTPRegister = async ({phone}) => {
    setLoading(true);
    const result = await confirmOTP({
      phone,
      OtpCode: registerRef.current?.otp,
      functionType: FUNCTION_TYPE.REGISTER_ACCOUNT,
    });
    setLoading(false);

    switch (_.get(result, 'ErrorCode', '')) {
      case ERROR_CODE.SUCCESS:
        return Navigator.navigate(SCREEN.REGISTER_PASSWORD, {phone});
      case ERROR_CODE.OTP_IS_EXPIRED:
        // this.state.message = ret.ErrorMessage
        // this.setState(this.state);
        // setTimeout(() => this.refs.alertExpire.show(), 150)
        break;
      case ERROR_CODE.FEATURE_CONFIRM_OTP_WRONG_OVER_TIME:
        // this.state.message = ret.ErrorMessage
        // this.setState(this.state);
        // setTimeout(() => this.refs.alertExceedInputCode.show(), 150)
        break;
      case ERROR_CODE.OTP_IS_NOT_CORRECT:
        break;
      default:
        // this.state.message = ret.ErrorMessage
        // this.setState(this.state)
        // this.refs.infoModal.show()
        break;
    }
  };

  const createAccount = async ({phone}) => {
    setLoading(true);
    console.log(
      'registerRef.current?.newPassword :>> ',
      registerRef.current,
      phone,
    );
    let passwordEncrypted;
    try {
      passwordEncrypted = await sha256(registerRef.current?.newPassword);
    } catch (error) {
      console.log('error :>> ', error);
      setLoading(false);
    }
    const result = await register({
      phone,
      password: passwordEncrypted,
    });
    console.log('result :>> ', result);
    setLoading(false);
    switch (_.get(result, 'ErrorCode', '')) {
      case ERROR_CODE.SUCCESS:
        // this.setState({...this.state, isShowModal: true})
        // const userInfo = {phoneNumber: this.state.phoneNumber, isOTPActivated: 0, alreadyLoggedIn: false}
        // this.props.changeUserInfo(userInfo)
        return Navigator.push(SCREEN.LOGIN, {phone});
      case ERROR_CODE.SYSTEM_IS_UPGRADING:
        // this.refs.upgradeModal.show()
        return;
      case ERROR_CODE.PHONE_IS_REGISTERED:
        // this.refs.errorModal.show()
        return;
      default:
        return;
    }
  };

  return {onChange, confrimOTPRegister, createAccount};
};

export {useTouchID, useAuth, useRegister};
