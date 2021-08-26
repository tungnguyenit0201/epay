import {useRef, useState, useEffect} from 'react';
import {useUser} from 'context/User';
import Navigator from 'navigations/Navigator';
import _ from 'lodash';
import {ERROR_CODE, FUNCTION_TYPE, SCREEN} from 'configs/Constants';
import {sha256} from 'react-native-sha256';
import {
  activateSmartOTP,
  changeSmartOTPPassword,
  checkSmartOTP,
  checkSmartOTPKey,
} from 'services/common';
import {useError, useLoading} from 'context/Common/utils';

const useSmartOTP = params => {
  const {phone} = useUser();
  const [isAccepted, setAccepted] = useState(false);
  const [message, setMessage] = useState('');
  const {setError} = useError();
  const {setLoading} = useLoading();

  const onAcceptTermConditions = (value = true) => {
    setAccepted(value);
  };

  const onGoOTP = () => {
    Navigator.push(SCREEN.OTP, {
      phone,
      functionType: FUNCTION_TYPE.REGISTER_SMART_OTP,
    });
  };

  const onPassword = async value => {
    const {type, password, oldPassword, newPassword} = params;
    switch (type) {
      case 'password':
        return Navigator.push(SCREEN.SMART_OTP_PASSWORD, {
          type: 'confirmPassword',
          password: value,
        });
      case 'confirmPassword':
        return onConfirmPassword({password, confirmPassword: value});
      case 'changePassword':
        return onChangePassword({password: value});
      case 'newPassword':
        return Navigator.push(SCREEN.SMART_OTP_PASSWORD, {
          type: 'confirmNewPassword',
          newPassword: value,
          oldPassword,
        });
      case 'confirmNewPassword':
        return onConfirmNewPassword({
          oldPassword,
          newPassword,
          confirmPassword: value,
        });
    }
  };

  const onConfirmPassword = async ({password, confirmPassword}) => {
    if (password !== confirmPassword) {
      setMessage('Mật khẩu không trung khớp'); // translate
      return;
    }
    const passwordEncrypted = await sha256(password);
    const result = await activateSmartOTP({
      phone,
      password: passwordEncrypted,
      active: true,
    });
    // fail
    if (_.get(result, 'ErrorCode', true)) {
      setError(result);
      return;
    }
    // success
    Navigator.navigate(SCREEN.SMART_OTP_RESULT);
  };

  const onChangePassword = async ({password}) => {
    const passwordEncrypted = await sha256(password);
    const result = await checkSmartOTPKey({phone, password: passwordEncrypted});
    switch (_.get(result, 'ErrorCode')) {
      case ERROR_CODE.SUCCESS:
        return Navigator.push(SCREEN.SMART_OTP_PASSWORD, {
          type: 'newPassword',
          oldPassword: password,
        });

      case ERROR_CODE.FEATURE_SMART_OTP_PIN_WRONG_OVER_TIME:
        return Navigator.replaceLast(SCREEN.SMART_OTP_FAILURE, {
          message: result?.ErrorMessage,
        });
      default:
        return setMessage(result?.ErrorMessage);
    }
  };

  const onConfirmNewPassword = async ({
    oldPassword,
    newPassword,
    confirmPassword,
  }) => {
    if (newPassword !== confirmPassword) {
      setMessage('Mật khẩu không trung khớp'); // translate
      return;
    }
    setLoading(true);
    const oldPasswordEncrypted = await sha256(oldPassword);
    const newPasswordEncrypted = await sha256(newPassword);
    const result = await changeSmartOTPPassword({
      phone,
      oldPassword: oldPasswordEncrypted,
      newPassword: newPasswordEncrypted,
    });
    setLoading(false);
    // fail
    if (_.get(result, 'ErrorCode', true)) {
      setError(result);
      return;
    }
    // success
    Navigator.navigate(SCREEN.SMART_OTP_RESULT);
  };

  const parseTitle = () => {
    switch (params.type) {
      case 'password':
      case 'newPassword':
        return 'Đặt mật khẩu smart OTP';
      case 'confirmPassword':
      case 'confirmNewPassword':
        return 'Xác nhận mật khẩu smart OTP';
      case 'changePassword':
        return 'Nhập mật khẩu smart OTP hiện tại';
    }
    // translate
  };

  const onBackHome = () => {
    Navigator.navigate(SCREEN.TAB_NAVIGATION);
    Navigator.navigate(SCREEN.HOME);
  };

  const onBack = () => {
    Navigator.goBack();
  };

  const onSyncSmartOTP = async () => {
    setMessage('Đang đồng bộ smart otp ......'); // translate
    // await
    setMessage('');
  };

  return {
    phone,
    isAccepted,
    message,
    onAcceptTermConditions,
    onGoOTP,
    onPassword,
    onBackHome,
    parseTitle,
    type: params?.type,
    onBack,
    onSyncSmartOTP,
  };
};

const useSmartOTPInfo = () => {
  const {onGoOTP} = useSmartOTP();
  const {phone} = useUser();
  const {setLoading} = useLoading();
  const infoRef = useRef({});

  useEffect(() => {
    const getOTPInfo = async () => {
      setLoading(true);
      const result = await checkSmartOTP({phone});
      infoRef.current = result?.SmartOtpInfo;
      setLoading(false);
    };
    getOTPInfo();
  }, []);

  const onChangePassword = () => {
    Navigator.push(SCREEN.SMART_OTP_PASSWORD, {type: 'changePassword'});
  };

  const onForgetPassword = () => {
    onGoOTP();
  };

  const onSyncSmartOTP = () => {
    alert('đang làm'); //
    // Navigator.push(SCREEN.SYNC_SMART_OTP);
  };

  return {
    smartOTPInfo: infoRef.current,
    onChangePassword,
    onForgetPassword,
    onSyncSmartOTP,
  };
};

export {useSmartOTP, useSmartOTPInfo};
