import {useEffect, useState} from 'react';
import {ERROR_CODE, FUNCTION_TYPE, SCREEN} from 'configs/Constants';
import {Linking} from 'react-native';
import {confirmOTP, genOtp} from 'services/common';
import OTP_TYPE from 'configs/Enums/OTPType';
import _ from 'lodash';
import {useAuth} from 'context/Auth/utils';
import Navigator from 'navigations/Navigator';
import useLoading from './loading';
import useError from './error';
import {useUserInfo} from 'context/User/utils';

const useOTP = ({functionType, phone, password, encrypted}) => {
  const [errorMessage, setErrorMessage] = useState(null);
  const [countdown, setCountdown] = useState(60);
  const [code, setCode] = useState('');
  const [showModal, setShowModal] = useState(false);

  const {setLoading} = useLoading();
  const {setError} = useError();
  const {onLogin} = useAuth();
  const {onGetPersonalInfo} = useUserInfo();

  const onChange = value => {
    setCode(value);
    errorMessage && setErrorMessage(null);
  };

  const onConfirmOTP = async otp => {
    setLoading(true);
    const result = await confirmOTP({
      phone,
      functionType,
      OtpCode: otp,
      OtpType: OTP_TYPE.EPAY,
    });
    setCode('');
    setLoading(false);

    // fail
    if (_.get(result, 'ErrorCode', '') === ERROR_CODE.OTP_IS_NOT_CORRECT) {
      setErrorMessage(_.get(result, 'ErrorMessage', null));
      return;
    }
    if (
      _.get(result, 'ErrorCode', '') ===
      ERROR_CODE.FEATURE_CONFIRM_OTP_WRONG_OVER_TIME
    ) {
      switch (functionType) {
        case FUNCTION_TYPE.REGISTER_ACCOUNT:
          return Navigator.reset(SCREEN.REGISTER_FAILURE, {
            phone,
            functionType,
          });
        case FUNCTION_TYPE.AUTH_EMAIL:
          return Navigator.navigate(SCREEN.VERIFY_EMAIL_RESULT, {
            type: 'failure',
            message: _.get(result, 'ErrorMessage', ''),
          });
      }
    }
    // success
    switch (functionType) {
      case FUNCTION_TYPE.CONFIRM_NEW_DEVICE:
        return onLogin({phone, password, encrypted});
      case FUNCTION_TYPE.REGISTER_ACCOUNT:
        return Navigator.navigate(SCREEN.REGISTER_PASSWORD, {phone});
      case FUNCTION_TYPE.FORGOT_PASS:
        return Navigator.navigate(SCREEN.FORGET_NEW_PASSWORD, {phone});
      case FUNCTION_TYPE.REGISTER_SMART_OTP:
        return Navigator.push(SCREEN.SMART_OTP_PASSWORD, {type: 'password'});
      case FUNCTION_TYPE.AUTH_EMAIL:
        onGetPersonalInfo();
        Navigator.push(SCREEN.VERIFY_EMAIL_RESULT, {type: 'success'});
        return;
    }
  };

  const resentOTP = () => {
    try {
      setLoading(true);
      let result = genOtp({
        phone,
        functionType,
      });
      let errorCode = _.get(result, 'ErrorCode', '');
      if (errorCode == ERROR_CODE.SUCCESS) setCountdown(60);
      else setError(result);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };
  const openCallDialog = () => {
    try {
      Linking.openURL('tel:02432252336');
    } catch {}
  };

  const getLabel = () => {
    switch (functionType) {
      case FUNCTION_TYPE.REGISTER_ACCOUNT:
        return `Bạn chỉ cần nhập mã OTP đã gửi tới số điện thoại đã đăng ký`;
      default:
        return `Nhập mã OTP xác thực`;
    }
  };

  useEffect(() => {
    genOtp({
      phone,
      functionType,
    });
  }, [phone, functionType]);

  useEffect(() => {
    let timer = setInterval(() => setCountdown(countdown - 1), 1000);
    if (countdown == 0) clearInterval(timer);

    return () => clearInterval(timer);
  }, [countdown]);

  return {
    errorMessage,
    countdown,
    code,
    showModal,
    setShowModal,
    onChange,
    onConfirmOTP,
    resentOTP,
    openCallDialog,
    label: getLabel(),
  };
};

export default useOTP;
