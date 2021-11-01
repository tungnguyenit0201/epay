import {useEffect, useState} from 'react';
import {ERROR_CODE, FUNCTION_TYPE, SCREEN} from 'configs/Constants';
import {Linking} from 'react-native';
import useServiceCommon from 'services/common';
import OTP_TYPE from 'configs/Enums/OTPType';
import _ from 'lodash';
import {useAuth} from 'context/Auth/utils';
import Navigator from 'navigations/Navigator';
import useLoading from './loading';
import useError from './error';
import {useUserInfo} from 'context/User/utils';
import {useAsyncStorage} from 'context/Common/utils';
import {useCommon} from 'context/Common';
import {useTranslation} from 'context/Language';
import {stripTags} from 'utils/Functions';

const useOTP = ({functionType, phone, password, encrypted, isMount = true}) => {
  const {config} = useCommon();
  const [errorMessage, setErrorMessage] = useState(null);
  const [countdown, setCountdown] = useState(config?.ResendOtpTime || 60);
  const [code, setCode] = useState('');
  const [showModal, setShowModal] = useState(false);

  const {setLoading} = useLoading();
  const {setError} = useError();
  const {onLogin} = useAuth();
  const {onGetAllInfo} = useUserInfo();
  const {setResend, getResend} = useAsyncStorage();
  const {confirmOTP, genOtp} = useServiceCommon();
  const translation = useTranslation();
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
            content: {
              text: stripTags(result?.ErrorMessage),
            },
          });
        case FUNCTION_TYPE.AUTH_EMAIL:
        case FUNCTION_TYPE.CHANGE_EMAIL_BY_EMAIL:
          return Navigator.navigate(SCREEN.VERIFY_EMAIL_RESULT, {
            type: 'failure',
            message: _.get(result, 'ErrorMessage', ''),
          });
        case FUNCTION_TYPE.FORGOT_PASS:
          return Navigator.reset(SCREEN.REGISTER_FAILURE, {
            phone,
            functionType,
            content: {
              title: translation.password_change,
              text: translation.the_information_entered_is_incorrect_please_call_the_operator_if_you_need_assistance,
              hotline: '1900-0000',
            },
          });
        default:
          setError(result);
          Navigator.goBack();
          return;
      }
    }
    if (_.get(result, 'ErrorCode', '') !== ERROR_CODE.SUCCESS) {
      return setError({
        ...result,
        onClose: () =>
          _.get(result, 'ErrorCode', '') === ERROR_CODE.PHONE_IS_REGISTERED
            ? Navigator.navigate(SCREEN.AUTH)
            : true,
      });
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
        onGetAllInfo();
        Navigator.push(SCREEN.VERIFY_EMAIL_RESULT, {type: 'success'});
        return;
    }
  };
  const checkResend = async () => {
    let resend = await getResend(phone);
    let resendObj = JSON.parse(resend);

    if (Date.now() >= resendObj?.time + 60000 * 30) {
      setCountdown(config?.ResendOtpTime || 60);
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
        onClose: Navigator.goBack,
      }); // TODO: translate
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
      if (canSend !== false) {
        let result = await genOtp({
          phone,
          functionType,
        });
        let errorCode = _.get(result, 'ErrorCode', '');
        if (errorCode == ERROR_CODE.SUCCESS) {
          setCountdown(config?.ResendOtpTime || 60);
        } else
          setError({
            ...result,
            onClose: () => Navigator.goBack?.(),
          });
      }

      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };
  const openCallDialog = () => {
    try {
      Linking.openURL('tel:19000000');
    } catch {}
  };

  const getLabel = () => {
    switch (functionType) {
      /* case FUNCTION_TYPE.REGISTER_ACCOUNT:
        return `Bạn chỉ cần nhập mã OTP đã gửi tới số điện thoại đã đăng ký`; */
      default:
        return translation.enter_otp_verification_code;
    }
  };

  const onGenOtp = async () => {
    await resentOTP();
  };

  useEffect(() => {
    ![FUNCTION_TYPE.CHANGE_EMAIL_BY_EMAIL, FUNCTION_TYPE.AUTH_EMAIL].includes(
      functionType,
    ) &&
      isMount &&
      onGenOtp();
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
