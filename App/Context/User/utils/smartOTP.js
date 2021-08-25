import {useRef, useState} from 'react';
import {useUser} from 'context/User';
import Navigator from 'navigations/Navigator';
import _ from 'lodash';
import {FUNCTION_TYPE, SCREEN} from 'configs/Constants';
import {sha256} from 'react-native-sha256';
import {activateSmartOTP} from 'services/common';
import {useError} from 'context/Common/utils';

const useSmartOTP = params => {
  const {phone} = useUser();
  const [isAccepted, setAccepted] = useState(false);
  const [message, setMessage] = useState('');
  const {setError} = useError();

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
    const {password, type} = params;
    if (type === 'confirmPassword') {
      onConfirmPassword({password, confirmPassword: value});
      return;
    }
    Navigator.push(SCREEN.SMART_OTP_PASSWORD, {
      type: 'confirmPassword',
      password: value,
    });
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

  const onBackHome = () => {
    Navigator.navigate(SCREEN.HOME);
  };

  return {
    phone,
    isAccepted,
    message,
    onAcceptTermConditions,
    onGoOTP,
    onPassword,
    onBackHome,
  };
};

export default useSmartOTP;
