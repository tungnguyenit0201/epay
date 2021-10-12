import {useState, useEffect} from 'react';
import _ from 'lodash';
import Navigator from 'navigations/Navigator';
import {PERSONAL_IC, SCREEN, SMART_OTP, USER_STATUS} from 'configs/Constants';
import {useCommon} from 'context/Common';
import {useAsyncStorage, useError, useLoading} from 'context/Common/utils';
import {getSettingsInfo} from 'services/user';
import {checkSmartOTP} from 'services/common';
import {useUser} from 'context/User';
import {useUserStatus} from 'context/User/utils';
import {useTranslation} from 'context/Language';
import {Images} from 'themes';
import {useModalSmartOTP} from 'context/User/utils';
import {useRegister} from 'context/Auth/utils';

const useCheckInfo = () => {
  // TODO: translate
  const {dispatch, showModal} = useCommon();
  const {getModalSmartOTPDisabled} = useAsyncStorage();
  const translation = useTranslation();
  const {token, phone} = useUser();
  const {status, getStatus} = useUserStatus();
  const {setError} = useError();
  const modalSmartOTP = useModalSmartOTP();
  const {setFirstLogin} = useRegister();

  const onCheckSmartOTP = async screen => {
    const result = await checkSmartOTP({phone});
    const isSmartOTPActived = _.get(result, 'State', 0);
    if (isSmartOTPActived) {
      screen && Navigator.navigate(screen);
      return true;
    }
    // dispatch({
    //   type: 'SHOW_MODAL',
    //   modal: {type: 'smartOTPSuggestion', value: true},
    // });
    setError({
      title: 'Nhanh và bảo mật hơn với smart OTP',
      ErrorCode: -1,
      ErrorMessage:
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry. ',
      onClose: () => setFirstLogin(false),
      action: [
        {
          label: 'Cài smart OTP ngay',
          onPress: modalSmartOTP?.onGoSmartOTP,
        },
      ],
      icon: Images.Modal.Lock,
    });
  };

  const showConnectBank = () => {
    setError({
      // title: translation.notification,
      ErrorCode: -1,
      ErrorMessage: 'Liên kết ngân hàng để thực hiện giao dịch.',
      onClose: () => checkInfo({value: false}),
      action: [
        {
          label: translation.connect_now,
          onPress: () => onNavigate(SCREEN.MAP_BANK_FLOW),
        },
        {
          label: 'Nhắc tôi sau',
          onPress: () => checkInfo({value: false}),
        },
      ],
    });
  };

  const showKYC = () => {
    setError({
      icon: Images.Modal.UserTick,
      // title: translation.notification,
      ErrorCode: -1,
      ErrorMessage:
        'Cập nhật định danh để tăng cường bảo mật cho tài khoản của bạn.',
      onClose: () => checkInfo({value: false}),
      action: [
        {
          label: 'Định danh',
          onPress: () => onNavigate(SCREEN.CHOOSE_IDENTITY_CARD),
        },
      ],
    });
  };

  const checkInfo = ({screen, value = true}) => {
    // console.log('status :>> ', status, getStatus(), value);
    if (status != USER_STATUS.DONE) {
      (status == USER_STATUS.VERIFYING_KYC ||
        status == PERSONAL_IC.RE_VERIFYING) &&
        setError({
          ErrorCode: -1,
          ErrorMessage: 'Đang xác thực',
          title: translation.notification,
        });
      status == USER_STATUS.INACTIVE_KYC && showKYC();
      status == USER_STATUS.ACTIVED_KYC_NO_CONNECTED_BANK && showConnectBank();
      return false;
    }
    return onCheckSmartOTP(screen);
  };

  const onNavigate = screen => {
    status == USER_STATUS.INACTIVE_KYC && showKYC();
    status == USER_STATUS.ACTIVED_KYC_NO_CONNECTED_BANK && showConnectBank();
    Navigator.navigate(screen);
  };
  return {
    KYC: showModal.KYC,
    connectBank: showModal.connectBank,
    checkSmartOTP,
    checkInfo,
    onNavigate,
  };
};

export default useCheckInfo;
