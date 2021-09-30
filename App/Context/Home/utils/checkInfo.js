import {useState, useEffect} from 'react';
import Navigator from 'navigations/Navigator';
import {PERSONAL_IC, SCREEN, SMART_OTP, USER_STATUS} from 'configs/Constants';
import {useCommon} from 'context/Common';
import {useAsyncStorage, useError} from 'context/Common/utils';
import {getSettingsInfo} from 'services/user';
import {checkSmartOTP} from 'services/common';
import {useUser} from 'context/User';
import {useUserStatus} from 'context/User/utils';
import {useTranslation} from 'context/Language';
import _ from 'lodash';
const useCheckInfo = () => {
  // TODO: translate
  const {dispatch, showModal} = useCommon();
  const {getModalSmartOTPDisabled} = useAsyncStorage();
  const translation = useTranslation();
  const {token, phone} = useUser();
  const {status, getStatus} = useUserStatus();
  const {setError} = useError();

  const onCheckSmartOTP = async screen => {
    const result = await checkSmartOTP({phone});
    const isSmartOTPActived = _.get(result, 'State', 0);
    if (isSmartOTPActived) {
      screen && Navigator.navigate(screen);
      return true;
    }
    dispatch({type: 'SHOW_MODAL', modal: {type: 'smartOTP', value: true}});
  };

  const checkInfo = ({screen, value = true}) => {
    console.log('status :>> ', status, getStatus(), value);
    if (status != USER_STATUS.DONE) {
      (status == USER_STATUS.VERIFYING_KYC ||
        status == PERSONAL_IC.RE_VERIFYING) &&
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
      return false;
    }
    return onCheckSmartOTP(screen);
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
