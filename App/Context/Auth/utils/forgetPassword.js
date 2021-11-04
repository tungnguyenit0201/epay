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
import useRegister from './register';
import {Keyboard} from 'react-native';
import {stripTags} from 'utils/Functions';

const useForgetPassword = () => {
  const translation = useTranslation();
  const {setError} = useError();
  const {setLoading} = useLoading();
  const [active, setActive] = useState(false);
  const {agree} = useTranslation();
  const {checkPhone, checkICInfo} = useServiceAuth();
  const {updateForgotPassword} = useServiceUser();
  const [message, setMessage] = useState('');
  const {openCallDialog} = useRegister();
  let [showModal, setShowModal] = useState(false);
  const onSubmitPhone = async ({phone}) => {
    const result = await checkPhone(phone);
    const errorCode = _.get(result, 'ErrorCode', '');
    if (
      errorCode === ERROR_CODE.SUCCESS ||
      errorCode === ERROR_CODE.PHONE_IS_REGISTERED
    ) {
      const isNeedCheckIC = result?.NeedCheckIC;
      const isNeedCheckBankAccount = result?.NeedCheckBankAccount;

      if (isNeedCheckIC || isNeedCheckBankAccount) {
        Navigator.push(SCREEN.FORGET_PASSWORD_KYC, {
          phone,
          isNeedCheckIC,
          isNeedCheckBankAccount,
        });
      } else {
        Navigator.push(SCREEN.OTP, {
          phone,
          functionType: FUNCTION_TYPE.FORGOT_PASS,
        });
      }
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
      errorAction: () => Navigator.navigate(SCREEN.LOGIN),
    });
    setLoading(false);
    const errorCode = _.get(result, 'ErrorCode', '');
    if (errorCode !== ERROR_CODE.SUCCESS) {
      return setError({
        ...result,
        action: [
          {
            label: agree,
            onPress: () => {
              errorCode !== ERROR_CODE.NEW_PASSWORD_SIMILAR_TO_LAST_ONE &&
                Navigator.navigate(SCREEN.LOGIN);
            },
          },
        ],
      });
    }

    setError({
      ErrorCode: -1,
      ErrorMessage:
        translation.password_change + ' ' + translation.transaction.success,
      action: [
        {
          label: translation.agree,
          onPress: () => {
            Navigator.reset(SCREEN.AUTH);
            Keychain.setGenericPassword(phone, passwordEncrypted);
          },
        },
      ],
    });
  };

  const onSetActive = () => {
    setActive(!active);
  };

  const onSubmitKYC = async ({phone, icNumber, validDate, lastBankNumber}) => {
    setMessage('');
    setLoading(true);
    const result = await checkICInfo({
      phone,
      IcNumber: icNumber,
      IcDate: validDate,
      BankNumber: lastBankNumber,
      errorAction: () => Navigator.navigate(SCREEN.LOGIN),
    });
    setLoading(false);
    Keyboard.dismiss();
    if (result?.ErrorCode === ERROR_CODE.SUCCESS) {
      Navigator.navigate(SCREEN.OTP, {
        phone,
        functionType: FUNCTION_TYPE.FORGOT_PASS,
        isMount: false,
      });
      return;
    }
    if (result?.ErrorCode === ERROR_CODE.USER_INFO_NOT_MATCH)
      return setMessage(stripTags?.(result?.ErrorMessage));
    setError({...result, onClose: () => Navigator.navigate(SCREEN.LOGIN)});
  };

  const onCustomerSupport = ({phone}) => {
    openCallDialog();
    Navigator.navigate(SCREEN.OTP, {
      functionType: FUNCTION_TYPE.FORGOT_PASS,
      phone,
      isMount: false,
    });
  };

  const onClearMessage = () => {
    setMessage('');
  };

  return {
    onSubmitPhone,
    onNewPassword,
    showModal,
    setShowModal,
    openCallDialog,
    active,
    onSetActive,
    onSubmitKYC,
    message,
    onCustomerSupport,
    onClearMessage,
  };
};

export default useForgetPassword;
