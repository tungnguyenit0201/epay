import {useState} from 'react';
import useServiceAuth from 'services/auth';
import {ERROR_CODE, FUNCTION_TYPE, SCREEN} from 'configs/Constants';
import _ from 'lodash';
import Navigator from 'navigations/Navigator';
import {sha256} from 'react-native-sha256';
import {useTranslation} from 'context/Language';
import {useLoading, useError, useAsyncStorage} from 'context/Common/utils';
import {useUser} from 'context/User';
import {useUserInfo} from 'context/User/utils';
import {setDefaultHeaders} from 'utils/Axios';
import Keychain from 'react-native-keychain';
import {useBankInfo, useWalletInfo} from 'context/Wallet/utils';
import useLoginName from './loginName';

const useAuth = () => {
  const [message, setMessage] = useState('');
  const {setLoading} = useLoading();
  const translation = useTranslation();
  const {dispatch, route} = useUser();
  const {setError} = useError();
  const {setPhone, setToken, getPushToken} = useAsyncStorage();
  const {onGetAllInfo} = useUserInfo();
  const {onGetConnectedBank} = useBankInfo();
  const {onGetWalletInfo} = useWalletInfo();
  const {checkPhone, login} = useServiceAuth();
  const {navigateLoginByName, resetLoginByName} = useLoginName();

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
        return navigateLoginByName(phone);
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
            title: translation.sign_in,
            text: translation.you_have_entered_the_wrong_password_more_than_3_times_please_come_back_in_15_minutes,
            hotline: '1900-0000',
          },
        });
      case ERROR_CODE.NEW_DEVICE_CONFIRM_REQUIRED:
        Navigator.push(SCREEN.OTP, {
          phone,
          functionType: FUNCTION_TYPE.CONFIRM_NEW_DEVICE,
          password,
          encrypted,
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
    await resetLoginByName();
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

export default useAuth;
