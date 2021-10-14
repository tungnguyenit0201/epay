import {useState, useEffect, useRef} from 'react';
import TouchID from 'react-native-touch-id';
import useServiceAuth from 'services/auth';
import useServiceCommon from 'services/common';
import {ERROR_CODE, FUNCTION_TYPE, SCREEN, TERM_TYPE} from 'configs/Constants';
import _ from 'lodash';
import Navigator from 'navigations/Navigator';
import {sha256} from 'react-native-sha256';
import {Keyboard, Linking, Platform} from 'react-native';
import {useTranslation} from 'context/Language';
import {
  useLoading,
  useError,
  useAsyncStorage,
  useShowModal,
} from 'context/Common/utils';
import {useUser} from 'context/User';
import {useUserInfo} from 'context/User/utils';
import useServiceUser from 'services/user';
import {setDefaultHeaders} from 'utils/Axios';
import Keychain from 'react-native-keychain';
import {useBankInfo, useWalletInfo} from 'context/Wallet/utils';
import * as LocalAuthentication from 'expo-local-authentication';
import {getAll} from 'utils/Functions';

const useTouchID = ({onSuccess, autoShow = false}) => {
  const [biometryType, setBiometryType] = useState(null);
  const {getTouchIdEnabled, getPhone} = useAsyncStorage();
  const {setError} = useError();
  const isLocked = useRef(false);
  const textInputRef = useRef(null);

  const checkBiometry = async () => {
    try {
      const [type, isEnrolled, credentials, touchIdEnabled] = await getAll(
        LocalAuthentication.supportedAuthenticationTypesAsync,
        LocalAuthentication.isEnrolledAsync,
        Keychain.getGenericPassword,
        getTouchIdEnabled,
      );
      let passwordEncrypted =
        credentials?.username == (await getPhone())
          ? credentials?.password
          : null;
      if (!passwordEncrypted || !touchIdEnabled) {
        return;
      }
      const biometryType = _.isArray(type) ? type[0] : type;
      if (biometryType && !isEnrolled) {
        showNotEnrolledError();
      }
      setBiometryType(biometryType);
    } catch (error) {
      __DEV__ && console.log("Keychain couldn't be accessed!", error);
    }
  };

  const onTouchID = async ({passcode = false, forceShow = false} = {}) => {
    if (!biometryType) {
      return;
    }
    Keyboard.dismiss();

    const options = {
      promptMessage: passcode
        ? 'Vui lòng nhập mật khẩu thiết bị để kích hoạt'
        : `Đăng nhập bằng ${
            biometryType ===
            LocalAuthentication.AuthenticationType.FACIAL_RECOGNITION
              ? 'Face ID'
              : 'Touch ID'
          }`,
      cancelLabel: 'Hủy',
      fallbackLabel: '',
      disableDeviceFallback: !passcode,
    };
    const result = await LocalAuthentication.authenticateAsync(options);

    const {success, error} = result;
    if (success) {
      if (passcode) {
        isLocked.current = false;
        onTouchID({passcode: false, forceShow: true});
      } else {
        onSuccess && onSuccess();
      }
      return;
    }

    switch (error) {
      case 'system_cancel':
        forceShow && onTouchID();
        return;
      case 'authentication_failed':
        return setError({
          ErrorCode: -1,
          ErrorMessage: 'Dấu vân tay không hợp lệ. Vui lòng thử lại',
        }); // TODO: translate
      case 'lockout':
        if (Platform.OS === 'ios') {
          if (isLocked.current) {
            onTouchID({passcode: true});
          } else {
            isLocked.current = true;
            setError({
              ErrorCode: -1,
              ErrorMessage:
                'Dấu vân tay không hợp lệ. Vui lòng nhập mật khẩu thiết bị để kích hoạt',
            }); // TODO: translate
          }
        } else {
          setError({
            ErrorCode: -1,
            ErrorMessage: 'Dấu vân tay không hợp lệ. Vui lòng thử lại sau',
          }); // TODO: translate
        }
        return;
      case 'not_enrolled':
        showNotEnrolledError();
      default:
        return;
    }
  };

  const showNotEnrolledError = () => {
    setError({
      ErrorCode: -1,
      title: 'Cài đặt vân tay',
      ErrorMessage:
        'Quý khách chưa cài đặt vân tay trên thiết bị. Vui lòng cài đặt để sử dụng',
      action: [{label: 'Cài đặt', onPress: Linking.openSettings}],
    }); // TODO: translate
  };

  useEffect(() => {
    checkBiometry();
  }, []); // eslint-disable-line

  useEffect(() => {
    if (autoShow) {
      onTouchID();
    } else {
      textInputRef.current?.focus && textInputRef.current.focus();
    }
  }, [biometryType]); // eslint-disable-line

  return {biometryType, onTouchID, getTouchIdEnabled, textInputRef};
};

const useAuth = () => {
  const [message, setMessage] = useState('');
  const {setLoading} = useLoading();
  const {dispatch, route} = useUser();
  const {setError} = useError();
  const {getPhone, setPhone, setToken, getPushToken, getName} =
    useAsyncStorage();
  const {onGetAllInfo} = useUserInfo();
  const {onGetConnectedBank} = useBankInfo();
  const {onGetWalletInfo} = useWalletInfo();
  const {checkPhone, login} = useServiceAuth();
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
    Navigator.navigate(SCREEN.AUTH);
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
        return setMessage(result?.ErrorMessage);

      case ERROR_CODE.FEATURE_PASSWORD_WRONG_OVER_TIME:
        /* setError(result);
        Navigator.goBack();
        return; */
        return Navigator.reset(SCREEN.REGISTER_FAILURE, {
          phone,
          functionType: FUNCTION_TYPE.FORGOT_PASS,
          content: {
            title: 'Đăng nhập \nkhông thành công',
            text: 'Bạn đã nhập sai mật khẩu quá 3 lần, vui lòng quay lai sau 15 phút',
            hotline: '1900-0000',
          },
        });
      case ERROR_CODE.NEW_DEVICE_CONFIRM_REQUIRED:
        console.log('object :>> ');
        setError({
          ...result,
          onClose: () =>
            Navigator.push(SCREEN.OTP, {
              phone,
              functionType: FUNCTION_TYPE.CONFIRM_NEW_DEVICE,
              password,
              encrypted,
            }),
        });
        return;

      case ERROR_CODE.SUCCESS:
        Keychain.setGenericPassword(phone, passwordEncrypted);
        setDefaultHeaders({
          Authorization: `Bearer ${result?.Token}`,
        });
        await setToken(result?.Token);
        dispatch({type: 'UPDATE_TOKEN', data: result?.Token});

        onGetAllInfo();
        onGetWalletInfo();
        onGetConnectedBank();
        if (!!route) {
          Navigator.navigate(route?.screen, route?.params);
          return dispatch({type: 'SET_ROUTE', route: null});
        } else {
          firstLogin
            ? Navigator.navigate(SCREEN.REGISTER_NAME)
            : Navigator.reset(SCREEN.TAB_NAVIGATION);
        }
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
    const [phone, name] = await getAll(getPhone, getName);
    Navigator.reset(SCREEN.LOGIN, {phone, name});
  };

  return {
    onCheckPhoneExist,
    onChangePhone,
    onForgetPassword,
    onLogin,
    onLoginByTouchID,
    onLogout,
    message,
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
  const {register} = useServiceAuth();
  const {getTerm} = useServiceCommon();

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
  const {agree} = useTranslation();
  const {checkPhone} = useServiceAuth();
  const {updateForgotPassword} = useServiceUser();

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
    } else
      setError({
        ...result,
        action: [{label: agree}],
      });
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
      if (result?.ErrorCode === ERROR_CODE.NEW_PASSWORD_SIMILAR_TO_LAST_ONE) {
        return setError({
          ...result,
          action: [{onPress: () => Navigator.navigate(SCREEN.AUTH)}],
        });
      }
      return setError(result);
    }

    setError({ErrorCode: -1, ErrorMessage: 'Đổi Mật khẩu thành công.'}); // TODO: translate
    Navigator.reset(SCREEN.AUTH);
    Keychain.setGenericPassword(phone, passwordEncrypted);
  };

  const onSetActive = () => {
    setActive(!active);
  };

  return {onSubmitPhone, onNewPassword, active, onSetActive};
};

export {useTouchID, useAuth, useRegister, usePhone, useForgetPassword};
