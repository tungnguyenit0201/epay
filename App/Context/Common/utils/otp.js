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
import {useAsyncStorage} from 'context/Common/utils';
import {useCommon} from 'context/Common';

const useOTP = ({functionType, phone, password, encrypted}) => {
  const {config} = useCommon();
  const [errorMessage, setErrorMessage] = useState(null);
  const [countdown, setCountdown] = useState(config?.ResendOtpTime || 60);
  const [code, setCode] = useState('');
  const [showModal, setShowModal] = useState(false);

  const {setLoading} = useLoading();
  const {setError} = useError();
  const {onLogin} = useAuth();
  const {onGetPersonalInfo} = useUserInfo();
  const {setResend, getResend} = useAsyncStorage();

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
        case FUNCTION_TYPE.FORGOT_PASS:
          setError(result);
          Navigator.popToTop();
          return;
        default:
          setError(result);
          Navigator.goBack();
          return;
      }
    }
    // success
    switch (functionType) {
      case FUNCTION_TYPE.CONFIRM_NEW_DEVICE:
        return onLogin({phone, password, encrypted});
      case FUNCTION_TYPE.REGISTER_ACCOUNT:
        _.get(result, 'ErrorCode', '') === ERROR_CODE.SUCCESS &&
          Navigator.navigate(SCREEN.REGISTER_PASSWORD, {phone});
        return;
      case FUNCTION_TYPE.FORGOT_PASS:
        return Navigator.navigate(SCREEN.FORGET_NEW_PASSWORD, {phone});
      case FUNCTION_TYPE.REGISTER_SMART_OTP:
        return Navigator.push(SCREEN.SMART_OTP_PASSWORD, {type: 'password'});
      case FUNCTION_TYPE.AUTH_EMAIL:
      case FUNCTION_TYPE.CHANGE_EMAIL_BY_EMAIL:
        onGetPersonalInfo();
        Navigator.push(SCREEN.VERIFY_EMAIL_RESULT, {type: 'success'});
        return;
    }
  };
  const checkResend = async () => {
    let resend = await getResend(phone);
    let resendObj = JSON.parse(resend);

    if (Date.now() >= resendObj?.time + 60000 * 30) {
      return await setResend({
        phone,
        time: Date.now(),
        times: 1,
      });
    }

    if (
      resendObj?.time <=
        resendObj?.time + config?.LockWhenResendTooManyTime * 1000 &&
      resendObj?.times >= config?.ResendOtpNo
    ) {
      let remain =
        Math.round((60000 * 30 - (Date.now() - resendObj?.time)) / 60000) || 30;
      setError({
        ErrorCode: -1,
        ErrorMessage: `Số lần gửi OTP quá ${config?.ResendOtpNo} lần/${config?.LockWhenResendTooManyTime} giây vui lòng quay lại sau ${remain} phút`,
      }); // TODO: translate
      Navigator.goBack();
      return false;
    }

    return await setResend({
      phone,
      time: resendObj?.time ? resendObj?.time : Date.now(),
      times: resendObj?.times + 1 || 1,
    });
  };

  const resentOTP = async () => {
    try {
      setLoading(true);
      let canSend = await checkResend();
      if (canSend) {
        let result = genOtp({
          phone,
          functionType,
        });
        let errorCode = _.get(result, 'ErrorCode', '');
        if (errorCode == ERROR_CODE.SUCCESS) {
          setCountdown(config?.ResendOtpTime || 60);
        } else setError(result);
      }

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

  const onGenOtp = async () => {
    let canSend = await checkResend();
    canSend &&
      (await genOtp({
        phone,
        functionType,
      }));
  };

  useEffect(() => {
    functionType !== FUNCTION_TYPE.CHANGE_EMAIL_BY_EMAIL && onGenOtp();
  }, [phone, functionType]); // eslint-disable-line

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
