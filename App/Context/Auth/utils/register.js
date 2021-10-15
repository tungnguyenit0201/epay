import {useState, useRef} from 'react';
import useServiceAuth from 'services/auth';
import useServiceCommon from 'services/common';
import {ERROR_CODE, TERM_TYPE} from 'configs/Constants';
import _ from 'lodash';
import Navigator from 'navigations/Navigator';
import {sha256} from 'react-native-sha256';
import {Linking} from 'react-native';
import {useLoading, useError, useAsyncStorage} from 'context/Common/utils';
import {useUser} from 'context/User';
import useAuth from './auth';

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

export default useRegister;
