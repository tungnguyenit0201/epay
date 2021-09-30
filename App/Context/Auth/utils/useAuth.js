import {useState, useEffect, useRef} from 'react';
import TouchID from 'react-native-touch-id';
import {checkPhone, login, register} from 'services/auth';
import {getTerm} from 'services/common';
import {ERROR_CODE, FUNCTION_TYPE, SCREEN, TERM_TYPE} from 'configs/Constants';
import _ from 'lodash';
import Navigator from 'navigations/Navigator';
import {sha256} from 'react-native-sha256';
import {Linking, Platform} from 'react-native';
import {useTranslation} from 'context/Language';
import {
  useLoading,
  useError,
  useAsyncStorage,
  useShowModal,
} from 'context/Common/utils';
import {useUser} from 'context/User';
import {useUserInfo} from 'context/User/utils';
import {updateForgotPassword} from 'services/user';
import {setDefaultHeaders} from 'utils/Axios';
import Keychain from 'react-native-keychain';
import {useBankInfo, useWalletInfo} from 'context/Wallet/utils';

const useTouchID = ({onSuccess}) => {
  const [biometryType, setBiometryType] = useState(null);
  const {getTouchIdEnabled, getPhone} = useAsyncStorage();
  const {setError} = useError();

  const checkBiometry = async () => {
    const touchIdEnabled = await getTouchIdEnabled();
    let passwordEncrypted = null;
    try {
      const credentials = await Keychain.getGenericPassword();
      passwordEncrypted =
        credentials?.username == (await getPhone())
          ? credentials?.password
          : null;
    } catch (error) {
      __DEV__ && console.log("Keychain couldn't be accessed!", error);
    }

    if (!touchIdEnabled || !passwordEncrypted) {
      return;
    }
    TouchID.isSupported({})
      .then(biometryType => {
        setBiometryType(biometryType);
        onTouchID(biometryType);
      })
      .catch(error => {
        __DEV__ && console.log('Touch ID is not supported.');
      });
  };

  const onTouchID = async (_biometryType, passcode = false) => {
    if (!_biometryType && !biometryType) {
      return;
    }

    // TODO: translate
    const options = {
      title: 'Đăng nhập bằng Touch ID', // Android
      imageColor: '#e00606', // Android
      imageErrorColor: '#ff0000', // Android
      sensorDescription: 'Touch sensor', // Android
      sensorErrorDescription: 'Failed', // Android
      cancelText: 'Cancel', // Android
      // fallbackLabel: 'Show Passcode', // iOS (if empty, then label is hidden)
      unifiedErrors: false, // use unified error messages (default false)
      passcodeFallback: passcode, // iOS - allows the device to fall back to using the passcode, if faceid/touch is not available. this does not mean that if touchid/faceid fails the first few times it will revert to passcode, rather that if the former are not enrolled, then it will use the passcode.
    };

    TouchID.authenticate(
      passcode
        ? `Vui lòng nhập mật khẩu thiết bị để kích hoạt`
        : `Đăng nhập bằng ${
            biometryType === 'FaceID' ? 'Face ID' : 'Touch ID'
          }`,
      options,
    )
      .then(success => {
        !passcode && onSuccess && onSuccess(success);
      })
      .catch(error => {
        // user cancel
        if (
          error?.name === 'LAErrorUserCancel' ||
          error?.name === 'LAErrorSystemCancel' ||
          error?.name === 'LAErrorAuthenticationFailed'
        ) {
          return;
        }
        // supported touchID but not enabled by user
        if (error?.name === 'LAErrorTouchIDNotEnrolled') {
          setBiometryType(null);
          return;
        }
        // user press show passcode
        if (
          error?.name === 'LAErrorUserFallback' ||
          error?.name === 'RCTTouchIDUnknownError'
        ) {
          onTouchID(_biometryType, true);
          return;
        }
        // other errors
        setError({ErrorCode: -1, ErrorMessage: error});
      });
  };

  useEffect(() => {
    checkBiometry();
  }, []); // eslint-disable-line

  return {biometryType, onTouchID};
};

const useAuth = () => {
  const {setLoading} = useLoading();
  const {dispatch, route} = useUser();
  const {setError} = useError();
  const {setPhone, setToken, getPushToken} = useAsyncStorage();
  const {onGetAllInfo} = useUserInfo();
  const {onGetConnectedBank} = useBankInfo();
  const {onGetWalletInfo} = useWalletInfo();
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
    const pushToken = await getPushToken();
    const result = await login(phone, passwordEncrypted, pushToken);
    setLoading(false);

    switch (_.get(result, 'ErrorCode', '')) {
      case ERROR_CODE.LOGIN_PASSWORD_INCORRECT:
      case ERROR_CODE.FEATURE_LOCK_BY_PASSWORD_WRONG:
        return setError(result);

      case ERROR_CODE.FEATURE_PASSWORD_WRONG_OVER_TIME:
        setError(result);
        Navigator.goBack();
        return;

      case ERROR_CODE.NEW_DEVICE_CONFIRM_REQUIRED:
        return Navigator.push(SCREEN.OTP, {
          phone,
          functionType: FUNCTION_TYPE.CONFIRM_NEW_DEVICE,
          password,
          encrypted,
        });

      case ERROR_CODE.SUCCESS:
        Keychain.setGenericPassword(phone, passwordEncrypted);
        setDefaultHeaders({
          Authorization: `Bearer ${result?.Token}`,
        });
        await setToken(result?.Token);
        dispatch({type: 'UPDATE_TOKEN', data: result?.Token});

        Navigator.navigate(
          firstLogin ? SCREEN.REGISTER_NAME : SCREEN.TAB_NAVIGATION,
        );
        if (!!route) {
          Navigator.navigate(route?.screen, route?.params);
          return dispatch({type: 'SET_ROUTE', route: null});
        }
        onGetAllInfo();
        onGetWalletInfo();
        onGetConnectedBank();
        Navigator.reset(SCREEN.TAB_NAVIGATION);
        return;
    }
  };

  const onLoginByTouchID = async ({phone}) => {
    try {
      setLoading(true);
      const credentials = await Keychain.getGenericPassword();
      const passwordEncrypted = credentials?.password;
      if (!passwordEncrypted || !phone) {
        setLoading(false);
        return;
      }
      onLogin({phone, password: passwordEncrypted, encrypted: true});
      setLoading(false);
    } catch (error) {
      __DEV__ && console.log("Keychain couldn't be accessed!", error);
    }
  };

  const onLogout = async () => {
    dispatch({type: 'UPDATE_TOKEN', data: ''});
    setDefaultHeaders({
      Authorization: ``,
    });
    await setToken('');
    // Navigator.popToTop();
    Navigator.navigate(SCREEN.AUTH);
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
  const {setPhone, getPhone} = useAsyncStorage();

  let [active, setActive] = useState(false);
  let [showModal, setShowModal] = useState(false);

  const setFirstLogin = value => {
    dispatch({type: 'SET_FIRST_LOGIN', firstLogin: value});
  };

  const onChange = (key, val) => {
    registerRef.current[key] = val;
  };

  const onNavigate = (screen, params) => {
    !!screen ? Navigator.navigate(screen, params) : Navigator.popToTop();
  };

  const openCallDialog = () => {
    try {
      Linking.openURL('tel:02432252336');
    } catch {}
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

  const onGoTerm = async screen => {
    try {
      setLoading(true);

      const phone = await getPhone();

      const result = await getTerm({
        phone,
        type: TERM_TYPE.REGISTER_ACCOUNT,
      });

      setLoading(false);
      let errorCode = _.get(result, 'ErrorCode', '');
      if (errorCode == ERROR_CODE.SUCCESS) {
        onNavigate(screen, result);
        return result;
      } else setError(result);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  return {
    active,
    setActive,
    showModal,
    setShowModal,
    openCallDialog,
    onChange,
    createAccount,
    setFirstLogin,
    onNavigate,
    onGoTerm,
  };
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
  const [active, setActive] = useState(false);

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
    const result = await updateForgotPassword({
      password: passwordEncrypted,
      phone,
    });
    setLoading(false);
    if (_.get(result, 'ErrorCode', '') !== ERROR_CODE.SUCCESS) {
      setError(result);
      return;
    }
    setError({ErrorCode: -1, ErrorMessage: 'Đổi Mật khẩu thành công.'}); // TODO: translate
    Navigator.popToTop();
  };

  const onSetActive = () => {
    setActive(!active);
  };

  return {onSubmitPhone, onNewPassword, active, onSetActive};
};

export {useTouchID, useAuth, useRegister, usePhone, useForgetPassword};
