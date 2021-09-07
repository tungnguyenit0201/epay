import {useState, useEffect, useRef} from 'react';
import Navigator from 'navigations/Navigator';
import {ERROR_CODE, SCREEN, FUNCTION_TYPE} from 'configs/Constants';
import {
  updatePersonalInfo,
  getPersonalInfo,
  getAllInfo,
  updateUserAddress,
  getConnectedBank,
  confirmPassword,
  getLimit,
  getQRCode,
  verifyEmail,
  changeEmail,
} from 'services/user';
import {
  useAsyncStorage,
  useError,
  useLoading,
  useShowModal,
} from 'context/Common/utils';
import {useBankInfo} from 'context/Wallet/utils';
import {useUser} from 'context/User';
import _ from 'lodash';
import {sha256} from 'react-native-sha256';

import {useWallet} from 'context/Wallet';
const useUserInfo = type => {
  let personalInfo = useRef({
    FullName: '',
    DateOfBirth: '',
    SexType: 0,
    Avatar: '',
    Email: '',
  });

  const {getPhone} = useAsyncStorage();
  const {setLoading} = useLoading();
  const {setError} = useError();
  const {dispatch, userInfo} = useUser();
  const {showModalSmartOTP} = useShowModal();
  const {onChangeLimit} = useBankInfo();
  const {walletInfo} = useWallet();
  const setPersonalInfo = (key, value) => {
    personalInfo.current[key] = value;
  };

  const onGetPersonalInfo = async () => {
    try {
      setLoading(true);
      let phone = await getPhone();
      setLoading(false);
      let result = await getPersonalInfo({phone});
      if (_.get(result, 'ErrorCode') == ERROR_CODE.SUCCESS) {
        dispatch({
          type: 'SET_PERSONAL_INFO',
          personalInfo: result?.PersonalInfo,
        });
        dispatch({type: 'SET_PHONE', phone});
      } else setError(result);
    } catch (error) {
      setLoading(false);
    }
  };

  const onUpdatePersonalInfo = async () => {
    try {
      setLoading(true);
      let phone = await getPhone();
      let result = await updatePersonalInfo({
        phone,
        personalInfo: personalInfo.current,
      });
      setLoading(false);
      if (_.get(result, 'ErrorCode') == ERROR_CODE.SUCCESS) {
        showModalSmartOTP(true);
        Navigator.navigate(SCREEN.TAB_NAVIGATION);
      } else setError(result);
    } catch (error) {
      setLoading(false);
    }
  };

  const onGetAllInfo = async () => {
    setLoading(true);
    let phone = await getPhone();
    const result = await getAllInfo({phone});
    setLoading(false);
    switch (_.get(result, 'ErrorCode', '')) {
      case ERROR_CODE.LOGIN_PASSWORD_INCORRECT:
        return setError(result);
      case ERROR_CODE.SUCCESS:
        dispatch({
          type: 'UPDATE_WALLET',
          data: result?.WalletInfo?.AvailableBlance,
        });
        dispatch({type: 'SET_PHONE', phone});
        dispatch({type: 'SET_PERSONAL_ADDRESS', data: result?.AddressInfo});
        dispatch({type: 'SET_PERSONAL_IC', data: result?.ICInfor});
        dispatch({
          type: 'SET_PERSONAL_INFO',
          personalInfo: result?.PersonalInfo,
        });
        dispatch({type: 'SET_PHONE', phone});
    }
  };

  const onUpdateUserAddress = async ({Address, Ward, County, Provincial}) => {
    try {
      setLoading(true);
      let phone = await getPhone();
      let result = await updateUserAddress({
        phone,
        Address,
        Ward,
        County,
        Provincial,
      });
      setLoading(false);
      if (_.get(result, 'ErrorCode') == ERROR_CODE.SUCCESS) {
        dispatch({
          type: 'SET_PERSONAL_ADDRESS',
          data: {Address, Ward, County, Provincial},
        });
        Navigator.navigate(SCREEN.USER_INFO);
      } else setError(result);
    } catch (error) {
      setLoading(false);
    }
  };

  const onGetConnectedBank = async () => {
    setLoading(true);
    let phone = await getPhone();
    const result = await getConnectedBank({phone});
    setLoading(false);
    if (_.get(result, 'ErrorCode') == ERROR_CODE.SUCCESS) {
      return Navigator.navigate(SCREEN.MY_WALLET, result);
    } else setError(result);
  };

  const onConfirmPassword = async ({password}) => {
    const limitMoney = walletInfo?.limit;
    const passwordEncrypted = await sha256(password);
    try {
      setLoading(true);
      let phone = await getPhone();
      let result = await confirmPassword({
        phone,
        password: passwordEncrypted,
      });
      setLoading(false);
      if (_.get(result, 'ErrorCode') == ERROR_CODE.SUCCESS) {
        switch (type) {
          case 'change_limit_response':
            onChangeLimit({limit: limitMoney});
            Navigator.navigate(SCREEN.TAB_NAVIGATION);
            break;
          case 'confirm_password_response':
            Navigator.push(SCREEN.OTP, {
              phone,
              functionType: FUNCTION_TYPE.FORGOT_PASS,
            });
          case 'change_email_response':
            Navigator.push(SCREEN.VERIFY_EMAIL);
            break;
          default:
            Navigator.push(SCREEN.OTP, {
              phone,
              functionType: FUNCTION_TYPE.FORGOT_PASS,
            });
            break;
        }
      } else setError(result);
    } catch (error) {
      setLoading(false);
    }
  };

  const onGetLimit = async () => {
    try {
      setLoading(true);
      let phone = await getPhone();
      let result = await getLimit({phone});
      setLoading(false);
      if (_.get(result, 'ErrorCode') == ERROR_CODE.SUCCESS)
        Navigator.navigate(SCREEN.LIMIT_SETTING, result);
      else setError(result);
    } catch (error) {
      setLoading(false);
    }
  };
  const onGetQRCode = async () => {
    try {
      setLoading(true);
      let phone = await getPhone();
      let result = await getQRCode({phone});
      console.log('result', result);
      setLoading(false);
      if (_.get(result, 'ErrorCode') == ERROR_CODE.SUCCESS) {
        dispatch({type: 'SET_QRCODE', data: result?.QRCodeInfo});
        Navigator.navigate(SCREEN.QRPAY);
      } else setError(result);
    } catch (error) {
      setLoading(false);
    }
  };

  const onChangeEmail = async ({oldEmail, newEmail}) => {
    try {
      setLoading(true);
      let phone = await getPhone();
      let result = await changeEmail({phone, oldEmail, newEmail});
      setLoading(false);
      switch (_.get(result, 'ErrorCode')) {
        case ERROR_CODE.SUCCESS:
          Navigator.push(SCREEN.TAB_NAVIGATION);
          break;
        case ERROR_CODE.OTP_IS_NOT_CORRECT:
          Navigator.push(SCREEN.OTP, {
            phone,
            functionType: FUNCTION_TYPE.AUTH_EMAIL,
          });
          break;
        default:
          setError(result);
          break;
      }
    } catch (error) {
      setLoading(false);
    }
  };

  const onVerifyEmail = async ({email}) => {
    try {
      setLoading(true);
      let phone = await getPhone();
      let result = await verifyEmail({phone, email});
      setLoading(false);
      switch (_.get(result, 'ErrorCode')) {
        case ERROR_CODE.SUCCESS:
          Navigator.push(SCREEN.OTP, {
            phone,
            functionType: FUNCTION_TYPE.AUTH_EMAIL,
          });
          break;
        case ERROR_CODE.EMAIL_IS_AUTHENTICATED:
          const oldEmail = userInfo?.personalInfo?.Email;
          onChangeEmail({oldEmail, newEmail: email});
          break;
        default:
          setError(result);
          break;
      }
    } catch (error) {
      setLoading(false);
    }
  };

  return {
    personalInfo: personalInfo.current,
    onUpdatePersonalInfo,
    setPersonalInfo,
    onGetPersonalInfo,
    onGetAllInfo,
    onUpdateUserAddress,
    onGetConnectedBank,
    onConfirmPassword,
    onGetLimit,
    onGetQRCode,
    onVerifyEmail,
    onChangeEmail,
  };
};
export default useUserInfo;
