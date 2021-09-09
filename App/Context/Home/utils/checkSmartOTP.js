import {useState, useEffect} from 'react';
import Navigator from 'navigations/Navigator';
import {SCREEN, SMART_OTP} from 'configs/Constants';
import {useCommon} from 'context/Common';
import {useAsyncStorage} from 'context/Common/utils';
import {getSettingsInfo} from 'services/user';

const useCheckSmartOTP = () => {
  const {dispatch} = useCommon();

  const {getPhone} = useAsyncStorage();
  const checkSmartOTP = async screen => {
    const phone = await getPhone();
    let result = await getSettingsInfo({phone});

    let hideModal = result?.SettingInfo?.ActivedSmartOTP == SMART_OTP.ACTIVED;

    if (hideModal) Navigator.navigate(screen);
    else dispatch({type: 'SHOW_MODAL', modal: {type: 'smartOTP', value: true}});
  };
  return {checkSmartOTP};
};

export default useCheckSmartOTP;
