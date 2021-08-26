import {useEffect, useRef, useState} from 'react';
import Navigator from 'navigations/Navigator';
import {SCREEN} from 'configs/Constants';
import {useAsyncStorage, useLoading} from 'context/Common/utils';
import {useUser} from 'context/User';
import _ from 'lodash';
import {useAuth} from 'context/Auth/utils';
import {getSettingsInfo} from 'services/user';

const useSecuritySettings = () => {
  const {setTouchIdEnabled, getTouchIdEnabled} = useAsyncStorage();
  const {onLogout} = useAuth();
  const {phone} = useUser();
  const {setLoading} = useLoading();
  const contentRef = useRef({
    touchIdEnabled: false,
    // data from getSettingsInfo()
  });

  const loadSettings = async () => {
    setLoading(true);
    const touchIdEnabled = await getTouchIdEnabled();
    const result = await getSettingsInfo({phone});
    contentRef.current = {
      ..._.get(result, 'SettingInfo', {}),
      touchIdEnabled,
    };
    setLoading(false);
  };

  useEffect(() => {
    loadSettings();
  }, []);

  const onTouchId = value => {
    setTouchIdEnabled(value);
    if (value) {
      onLogout();
    }
  };

  const onSmartOTP = async () => {
    // activated
    if (contentRef.current.ActivedSmartOTP) {
      Navigator.push(SCREEN.SMART_OTP);
      return;
    }
    // not activated
    Navigator.push(SCREEN.ACTIVE_SMART_OTP);
  };

  return {settings: contentRef.current, onTouchId, onSmartOTP};
};

export default useSecuritySettings;
