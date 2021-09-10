import {useState, useEffect, useRef} from 'react';
import Navigator from 'navigations/Navigator';
import {ERROR_CODE, FUNCTION_TYPE, SCREEN} from 'configs/Constants';
import {verifyEmail} from 'services/user';
import {useAsyncStorage, useError, useLoading} from 'context/Common/utils';
import _ from 'lodash';
import {useUser} from '..';

const useEmail = () => {
  const {setLoading} = useLoading();
  const {phone} = useUser();
  const {setError} = useError();

  const onEmailAuth = async ({email}) => {
    setLoading(true);
    const result = await verifyEmail({phone, email});
    setLoading(false);
    if (result?.ErrorCode !== ERROR_CODE.SUCCESS) {
      setError(result);
      return;
    }
    Navigator.push(SCREEN.OTP, {
      phone,
      email,
      functionType: FUNCTION_TYPE.AUTH_EMAIL,
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
