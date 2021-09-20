import {useState, useEffect, useRef} from 'react';
import Navigator from 'navigations/Navigator';
import {ERROR_CODE, FUNCTION_TYPE, SCREEN} from 'configs/Constants';
import {verifyEmail, updateEmail} from 'services/user';
import {useAsyncStorage, useError, useLoading} from 'context/Common/utils';
import _ from 'lodash';
import {useUser} from '..';

const useEmail = ({functionType}) => {
  const {setLoading} = useLoading();
  const {phone} = useUser();
  const {setError} = useError();

  const onEmailAuth = async ({email}) => {
    setLoading(true);
    const emailFunction =
      functionType === FUNCTION_TYPE.CHANGE_EMAIL_BY_EMAIL
        ? updateEmail
        : verifyEmail;
    const result = await emailFunction({phone, email});
    setLoading(false);
    if (result?.ErrorCode !== ERROR_CODE.SUCCESS) {
      setError(result);
      return;
    }
    Navigator.push(SCREEN.OTP, {
      phone,
      email,
      functionType,
    });
  };

  const onAction = success => {
    if (success) {
      Navigator.navigate(SCREEN.TAB_NAVIGATION);
      Navigator.navigate(SCREEN.HOME);
    } else {
      Navigator.navigate(SCREEN.USER_INFO);
    }
  };

  return {onEmailAuth, onAction};
};

export default useEmail;
