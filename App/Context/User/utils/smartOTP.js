import {useRef, useState, useEffect, useCallback} from 'react';
import {useUser} from 'context/User';
import Navigator from 'navigations/Navigator';
import _ from 'lodash';
import {
  COMMON_ENUM,
  ERROR_CODE,
  FUNCTION_TYPE,
  SCREEN,
} from 'configs/Constants';
import {sha256} from 'react-native-sha256';
import {
  activateSmartOTP,
  changeSmartOTPPassword,
  checkSmartOTP,
  checkSmartOTPKey,
  genOtp,
  getSmartOTPInfo,
  syncSmartOTP,
} from 'services/common';
import {
  useAsyncStorage,
  useError,
  useLoading,
  useShowModal,
} from 'context/Common/utils';
import {useWallet} from 'context/Wallet';
import {useCommon} from 'context/Common';

const useSmartOTP = params => {
  const {phone} = useUser();
  const [isAccepted, setAccepted] = useState(false);
  const [message, setMessage] = useState('');
  const {setError} = useError();
  const {setLoading} = useLoading();
  const {dispatch: dispatchWallet} = useWallet();
  const {setSmartOTPSharedKey} = useAsyncStorage();

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
      case 'sync':
        return onCheckPasswordSync({password: value});
      case 'transaction':
        return onTransaction({password: value});
    }
  };

  const onConfirmPassword = async ({password, confirmPassword}) => {
    if (password !== confirmPassword) {
      setMessage('Mật khẩu không trung khớp'); // TODO: translate
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
    result?.SharedKey && setSmartOTPSharedKey(result.SharedKey);
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
      setMessage('Mật khẩu không trung khớp'); // TODO: translate
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
      case 'sync':
        return 'Nhập mật khẩu smart OTP hiện tại';
      case 'transaction':
        return 'Nhập mật khẩu smart OTP';
    }
    // TODO: translate
  };

  const onBackHome = () => {
    Navigator.navigate(SCREEN.TAB_NAVIGATION);
    Navigator.navigate(SCREEN.HOME);
  };

  const onBack = () => {
    Navigator.goBack();
  };

  const onGoPasswordSync = () => {
    Navigator.push(SCREEN.SMART_OTP_PASSWORD, {
      type: 'sync',
    });
  };

  const onCheckPasswordSync = async ({password}) => {
    const passwordEncrypted = await sha256(password);
    const result = await checkSmartOTPKey({phone, password: passwordEncrypted});
    switch (_.get(result, 'ErrorCode')) {
      case ERROR_CODE.SUCCESS:
        Navigator.goBack();
        Navigator.replaceLast(SCREEN.SYNC_SMART_OTP, {
          type: 'sync',
          passwordEncrypted,
        });
        return;
      case ERROR_CODE.FEATURE_SMART_OTP_PIN_WRONG_OVER_TIME:
        setError(result);
        Navigator.goBack();
        return;
      default:
        return setMessage(result?.ErrorMessage);
    }
  };

  const onTransaction = async ({password}) => {
    const passwordEncrypted = await sha256(password);
    const result = await checkSmartOTPKey({phone, password: passwordEncrypted});
    switch (_.get(result, 'ErrorCode')) {
      case ERROR_CODE.SUCCESS:
        dispatchWallet({
          type: 'UPDATE_TRANSACTION_INFO',
          data: {
            functionType: FUNCTION_TYPE.RECHARGE_BY_BANK,
          },
        });
        Navigator.replaceLast(SCREEN.OTP_BY_SMART_OTP);
        return;
      case ERROR_CODE.FEATURE_SMART_OTP_PIN_WRONG_OVER_TIME:
        setError(result);
        Navigator.goBack();
        return;
      default:
        return setMessage(result?.ErrorMessage);
    }
  };

  const onGoSmartOTP = async () => {
    setLoading(true);
    const result = await checkSmartOTP({phone});
    setLoading(false);
    // activated
    if (_.get(result, 'State', 0)) {
      Navigator.push(SCREEN.SMART_OTP);
      return;
    }
    // not activated
    Navigator.push(SCREEN.ACTIVE_SMART_OTP);
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
    onGoPasswordSync,
    onGoSmartOTP,
  };
};

const useSmartOTPInfo = () => {
  const {onGoOTP} = useSmartOTP();
  const {phone} = useUser();
  const {setLoading} = useLoading();
  const [smartOTPInfo, setSmartOTPInfo] = useState({});
  const {onShowModal} = useModalSmartOTP();

  useEffect(() => {
    const getOTPInfo = async () => {
      setLoading(true);
      const result = await getSmartOTPInfo({phone});
      setLoading(false);
      setSmartOTPInfo(result?.SmartOtpInfo);
    };
    getOTPInfo();
  }, [phone, setLoading]);

  const onChangePassword = () => {
    onShowModal(value =>
      Navigator.push(SCREEN.SMART_OTP_PASSWORD, {
        type: 'newPassword',
        oldPassword: value,
      }),
    );
  };

  const onForgetPassword = () => {
    onGoOTP();
  };

  const onSyncSmartOTP = () => {
    Navigator.push(SCREEN.SYNC_SMART_OTP);
  };

  const onDeactivateSmartOTP = async () => {
    // const result = await activateSmartOTP({phone, password: '', active: false});
  };

  return {
    smartOTPInfo,
    onChangePassword,
    onForgetPassword,
    onSyncSmartOTP,
    onDeactivateSmartOTP,
  };
};

const useSyncSmartOTP = params => {
  const {phone} = useUser();
  const [status, setStatus] = useState(params?.type);
  const {setSmartOTPSharedKey} = useAsyncStorage();

  const onSync = useCallback(async () => {
    const result = await syncSmartOTP({
      phone,
      password: params?.passwordEncrypted,
    });
    setStatus(result?.ErrorCode === ERROR_CODE.SUCCESS ? 'success' : 'failure');
    result?.SharedKey && setSmartOTPSharedKey(result.SharedKey);
  }, [phone, params?.passwordEncrypted, setSmartOTPSharedKey]);

  useEffect(() => {
    params?.type === 'sync' && onSync();
  }, [params?.type, onSync]);

  return {status, onSync};
};

const useModalSmartOTP = () => {
  const {phone} = useUser();
  const {
    showModal: {smartOTPPassword, goBack},
  } = useCommon();
  const {showModalSmartOTPPassword} = useShowModal();
  const {onGoOTP} = useSmartOTP();
  const {setError} = useError();

  const onShowModal = callback => {
    showModalSmartOTPPassword({show: true, goBack: callback});
  };

  const onHideModal = () => {
    showModalSmartOTPPassword({show: false});
  };

  const onCodeFilled = async value => {
    const passwordEncrypted = await sha256(value);
    const result = await checkSmartOTPKey({phone, password: passwordEncrypted});
    switch (_.get(result, 'ErrorCode')) {
      case ERROR_CODE.SUCCESS:
        goBack && goBack(value);
        showModalSmartOTPPassword({show: false});
        return;
      case ERROR_CODE.FEATURE_SMART_OTP_PIN_WRONG_OVER_TIME:
        setError(result);
        onHideModal();
        return;
      default:
        return showModalSmartOTPPassword({
          message: _.get(result, 'ErrorMessage', ''),
          code: '',
          goBack,
        });
    }
  };

  const onForgetSmartOTPPassword = () => {
    onHideModal();
    onGoOTP();
  };

  return {
    smartOTPPassword,
    onShowModal,
    onHideModal,
    onCodeFilled,
    onForgetSmartOTPPassword,
  };
};

export {useSmartOTP, useSmartOTPInfo, useSyncSmartOTP, useModalSmartOTP};
