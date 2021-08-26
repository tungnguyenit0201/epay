import {useState, useEffect, useRef} from 'react';
import TouchID from 'react-native-touch-id';
import {checkPhone, getConfigInfo, login, register} from 'services/auth';
import {ERROR_CODE, FUNCTION_TYPE, SCREEN} from 'configs/Constants';
import _ from 'lodash';
import Navigator from 'navigations/Navigator';
import {sha256} from 'react-native-sha256';
import {useTranslation} from 'context/Language';
import {
  useLoading,
  useError,
  useAsyncStorage,
  useShowModal,
} from 'context/Common/utils';
import {useUser} from 'context/User';
import {useUserInfo} from 'context/User/utils';
import {updatePassword} from 'services/user';
import {setDefaultHeaders} from 'utils/Axios';

const useTouchID = () => {
  const [biometryType, setBiometryType] = useState(null);
  const {getPasswordEncrypted, getTouchIdEnabled} = useAsyncStorage();

  const checkBiometry = async () => {
    const touchIdEnabled = await getTouchIdEnabled();
    const passwordEncrypted = await getPasswordEncrypted();
    if (!touchIdEnabled || !passwordEncrypted) {
      return;
    }
    TouchID.isSupported({})
      .then(biometryType => {
        setBiometryType(biometryType);
      })
      .catch(error => {
        __DEV__ && console.log('Touch ID is not supported.');
      });
  };

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

  useEffect(() => {
    checkBiometry();
  }, []); // eslint-disable-line

  return {biometryType, onTouchID};
};

const useAuth = () => {
  const {setLoading} = useLoading();
  const {dispatch} = useUser();
  const {setError} = useError();
  const {setPhone, setPasswordEncrypted, getPasswordEncrypted, setToken} =
    useAsyncStorage();
  const {onGetAllInfo} = useUserInfo();

  const onCheckPhoneExist = async ({phone}) => {
    setLoading(true);
    const result = await checkPhone(phone);
    setLoading(false);
    phone && setPhone(phone);

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
    Navigator.push(SCREEN.FORGET_PASSWORD);
  };

  const onLogin = async ({
    phone,
    password,
    encrypted = false,
    firstLogin = false,
  }) => {
    setLoading(true);
    const passwordEncrypted = encrypted ? password : await sha256(password);
    const result = await login(phone, passwordEncrypted);
    setLoading(false);

    switch (_.get(result, 'ErrorCode', '')) {
      case ERROR_CODE.LOGIN_PASSWORD_INCORRECT:
        return setError(result);

      case ERROR_CODE.NEW_DEVICE_CONFIRM_REQUIRED:
        return Navigator.push(SCREEN.OTP, {
          phone,
          functionType: FUNCTION_TYPE.CONFIRM_NEW_DEVICE,
          password,
        });

      case ERROR_CODE.SUCCESS:
        setPasswordEncrypted(passwordEncrypted);
        setDefaultHeaders({
          Authorization: `Bearer ${result?.Token}`,
        });
        await setToken(result?.Token);
        dispatch({type: 'UPDATE_TOKEN', data: result?.Token});
        Navigator.navigate(
          firstLogin ? SCREEN.REGISTER_NAME : SCREEN.TAB_NAVIGATION,
        );
        onGetAllInfo();
        return;
    }
  };

  const onLoginByTouchID = async ({phone}) => {
    const passwordEncrypted = await getPasswordEncrypted();
    if (!passwordEncrypted || !phone) {
      return;
    }
    onLogin({phone, password: passwordEncrypted, encrypted: true});
  };

  const onLogout = () => {
    dispatch({type: 'UPDATE_TOKEN', data: ''});
    setDefaultHeaders({
      Authorization: ``,
    });
    Navigator.popToTop();
  };

  return {
    onCheckPhoneExist,
    onChangePhone,
    onForgetPassword,
    onLogin,
    onLoginByTouchID,
    onLogout,
  };
};

const useRegister = () => {
  let registerRef = useRef({
    phone: null,
    newPassword: null,
    passwordConfirm: null,
  });

  const {setLoading} = useLoading();
  const {setError} = useError();
  const {onLogin} = useAuth();
  const {dispatch} = useUser();
  const {setPhone} = useAsyncStorage();
  const setFirstLogin = value => {
    dispatch({type: 'SET_FIRST_LOGIN', firstLogin: value});
  };

  const onChange = (key, val) => {
    registerRef.current[key] = val;
  };
  const onNavigate = screen => {
    !screen ? Navigator.navigate(screen) : Navigator.popToTop();
  };
  const createAccount = async ({phone, newPassword}) => {
    try {
      setLoading(true);

      await setPhone(phone);
      let passwordEncrypted;
      passwordEncrypted = await sha256(newPassword);
      const result = await register({
        phone,
        password: passwordEncrypted,
      });
      setLoading(false);
      let errorCode = _.get(result, 'ErrorCode', '');
      if (errorCode == ERROR_CODE.SUCCESS) {
        setFirstLogin(true);
        onLogin({phone, password: newPassword, firstLogin: true});
      } else setError(result);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  return {onChange, createAccount, setFirstLogin, onNavigate};
};

const usePhone = () => {
  const [phone, setPhone] = useState('');
  const {setPhone: setPhoneStorage, getPhone} = useAsyncStorage();

  const loadPhone = async () => {
    setPhone(await getPhone());
  };

  useEffect(() => {
    loadPhone();
    return () => {
      phone && setPhoneStorage(phone);
    };
  }, []); // eslint-disable-line

  return {phone};
};

const useForgetPassword = () => {
  const {setError} = useError();
  const {setLoading} = useLoading();

  const onSubmitPhone = async ({phone}) => {
    const result = await checkPhone(phone);
    const errorCode = _.get(result, 'ErrorCode', '');
    if (
      errorCode === ERROR_CODE.SUCCESS ||
      errorCode === ERROR_CODE.PHONE_IS_REGISTERED
    ) {
      Navigator.push(SCREEN.OTP, {
        phone,
        functionType: FUNCTION_TYPE.FORGOT_PASS,
      });
      return;
    }
    setError(result);
  };

  const onNewPassword = async ({newPassword, phone}) => {
    setLoading(true);
    const passwordEncrypted = await sha256(newPassword);
    const result = await updatePassword({password: passwordEncrypted, phone});
    setLoading(false);
    if (_.get(result, 'ErrorCode', '') !== ERROR_CODE.SUCCESS) {
      setError(result);
      return;
    }
    setError({ErrorCode: -1, ErrorMessage: 'Đổi Mật khẩu thành công.'}); //translate
    Navigator.popToTop();
  };

  return {onSubmitPhone, onNewPassword};
};

export {useTouchID, useAuth, useRegister, usePhone, useForgetPassword};
