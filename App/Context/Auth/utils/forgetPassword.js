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
    } else
      setError({
        ...result,
        action: [{label: agree}],
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
      if (result?.ErrorCode === ERROR_CODE.NEW_PASSWORD_SIMILAR_TO_LAST_ONE) {
        return setError({
          ...result,
          action: [{onPress: () => Navigator.navigate(SCREEN.AUTH)}],
        });
      }
      return setError(result);
    }

    setError({ErrorCode: -1, ErrorMessage: 'Đổi Mật khẩu thành công.'}); // TODO: translate
    Navigator.reset(SCREEN.AUTH);
    Keychain.setGenericPassword(phone, passwordEncrypted);
  };

  const onSetActive = () => {
    setActive(!active);
  };

  return {onSubmitPhone, onNewPassword, active, onSetActive};
};

export default useForgetPassword;
