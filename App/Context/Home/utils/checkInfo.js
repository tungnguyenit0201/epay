import {useState, useEffect} from 'react';
import Navigator from 'navigations/Navigator';
import {SCREEN, SMART_OTP, USER_STATUS} from 'configs/Constants';
import {useCommon} from 'context/Common';
import {useAsyncStorage, useError} from 'context/Common/utils';
import {getSettingsInfo} from 'services/user';
import {useUser} from 'context/User';
import {useUserStatus} from 'context/User/utils';
import {useTranslation} from 'context/Language';

const useCheckInfo = () => {
  // TODO: translate
  const {dispatch, showModal} = useCommon();
  const {getModalSmartOTPDisabled} = useAsyncStorage();
  const translation = useTranslation();
  const {token, phone} = useUser();
  // const {status} = useUserStatus();
  const status = 3;
  const {setError} = useError();
  const checkSmartOTP = async screen => {
    let isDisabled = await getModalSmartOTPDisabled();
    if (token && !isDisabled) {
      const result = await getSettingsInfo({phone});
      isDisabled = !!result?.SettingInfo?.ActivedSmartOTP;
    }
    if (isDisabled) {
      return Navigator.navigate(screen);
    }
    dispatch({type: 'SHOW_MODAL', modal: {type: 'smartOTP', value: true}});
  };

  const checkInfo = ({screen, value = true}) => {
    if (status != USER_STATUS.DONE) {
      status == USER_STATUS.VERIFYING_KYC &&
        setError({
          ErrorCode: -1,
          ErrorMessage: 'Đang xác thực',
          title: translation.notification,
        });
      status == USER_STATUS.INACTIVE_KYC &&
        dispatch({type: 'SHOW_MODAL', modal: {type: 'KYC', value}});
      status == USER_STATUS.ACTIVED_KYC_NO_CONNECTED_BANK &&
        dispatch({
          type: 'SHOW_MODAL',
          modal: {type: 'connectBank', value},
        });
      return;
    }
    checkSmartOTP(screen);
  };
  const onNavigate = screen => {
    status == USER_STATUS.INACTIVE_KYC &&
      dispatch({type: 'SHOW_MODAL', modal: {type: 'KYC', value: false}});
    status == USER_STATUS.ACTIVED_KYC_NO_CONNECTED_BANK &&
      dispatch({
        type: 'SHOW_MODAL',
        modal: {type: 'connectBank', value: false},
      });
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
