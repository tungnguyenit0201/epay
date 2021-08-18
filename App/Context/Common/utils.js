import {useReducer, useEffect, useRef, useState} from 'react';
import commonReducer from './reducer';
import {useCommon} from 'context/Common';
import {ERROR_CODE, FUNCTION_TYPE, SCREEN} from 'configs/Constants';
import {confirmOTP, genOtp} from 'services/common';
import OTP_TYPE from 'configs/Enums/OTPType';
import _ from 'lodash';
import {useAuth} from 'context/Auth/utils';
import Navigator from 'navigations/Navigator';

const useLoading = () => {
  const {dispatch} = useCommon();
  const setLoading = loading => {
    dispatch({type: 'SET_LOADING', loading});
  };
  return {setLoading};
};

const useOTP = ({functionType, phone, password}) => {
  const {onLogin} = useAuth();
  const [errorMessage, setErrorMessage] = useState(null);
  const otpRef = useRef('');

  useEffect(() => {
    genOtp({
      phone,
      functionType,
    });
  }, [phone, functionType]);

  const onChange = value => {
    errorMessage && setErrorMessage(null);
    otpRef.current = value;
  };

  const onConfirmOTP = async () => {
    const result = await confirmOTP({
      phone,
      functionType,
      OtpCode: otpRef.current,
      OtpType: OTP_TYPE.EPAY,
    });

    // fail
    if (_.get(result, 'ErrorCode', '') === ERROR_CODE.OTP_IS_NOT_CORRECT) {
      setErrorMessage(_.get(result, 'ErrorMessage', null));
      return;
    }
    // success
    switch (functionType) {
      case FUNCTION_TYPE.CONFIRM_NEW_DEVICE:
        return onLogin({phone, password});
      case FUNCTION_TYPE.REGISTER_ACCOUNT:
        return Navigator.navigate(SCREEN.REGISTER_PASSWORD, {phone});
    }
  };

  return {errorMessage, onChange, onConfirmOTP};
};

export {useLoading, useOTP};
