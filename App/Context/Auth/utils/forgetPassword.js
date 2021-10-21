import {useState} from 'react';
import useServiceAuth from 'services/auth';
import {ERROR_CODE, FUNCTION_TYPE, SCREEN} from 'configs/Constants';
import _ from 'lodash';
import Navigator from 'navigations/Navigator';
import {sha256} from 'react-native-sha256';
import {useTranslation} from 'context/Language';
import {useLoading, useError} from 'context/Common/utils';
import useServiceUser from 'services/user';
import Keychain from 'react-native-keychain';

const useForgetPassword = () => {
  const translation = useTranslation();
  const {setError} = useError();
  const {setLoading} = useLoading();
  const [active, setActive] = useState(false);
  const {agree} = useTranslation();
  const {checkPhone} = useServiceAuth();
  const {updateForgotPassword} = useServiceUser();

  const onSubmitPhone = async ({phone}) => {
    const result = await checkPhone(phone);
    const errorCode = _.get(result, 'ErrorCode', '');
    if (
      errorCode === ERROR_CODE.SUCCESS ||
      errorCode === ERROR_CODE.PHONE_IS_REGISTERED
    ) {
      Navigator.push(SCREEN.OTP, {
        phone,
        functionType: FUNCTION_TYPE.FORGOT_PASS,
      });
      return;
    }
    setError({
      ...result,
      action: [
        {
          label: agree,
          onPress: () => {
            errorCode !==
              ERROR_CODE.ACCOUNT_IS_NOT_EXISTED_OR_INVALID_PASSWORD &&
              Navigator.navigate(SCREEN.LOGIN);
          },
        },
      ],
    });
  };

  const onNewPassword = async ({newPassword, phone}) => {
    setLoading(true);
    const passwordEncrypted = await sha256(newPassword);
    const result = await updateForgotPassword({
      password: passwordEncrypted,
      phone,
    });
    setLoading(false);
    if (_.get(result, 'ErrorCode', '') !== ERROR_CODE.SUCCESS) {
      return setError({
        ...result,
        action: [
          {label: agree, onPress: () => Navigator.navigate(SCREEN.LOGIN)},
        ],
      });
    }

    setError({
      ErrorCode: -1,
      ErrorMessage:
        translation.password_change + ' ' + translation.transaction.success,
    });
    Navigator.reset(SCREEN.AUTH);
    Keychain.setGenericPassword(phone, passwordEncrypted);
  };

  const onSetActive = () => {
    setActive(!active);
  };

  return {onSubmitPhone, onNewPassword, active, onSetActive};
};

export default useForgetPassword;
