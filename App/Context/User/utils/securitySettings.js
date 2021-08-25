import {useEffect, useRef, useState} from 'react';
import Navigator from 'navigations/Navigator';
import {SCREEN} from 'configs/Constants';
import {useAsyncStorage, useLoading} from 'context/Common/utils';
import {useUser} from 'context/User';
import _ from 'lodash';
import {useAuth} from 'context/Auth/utils';
import {activateSmartOTP, checkSmartOTP} from 'services/common';

const useSecuritySettings = () => {
  const {setTouchIdEnabled, getTouchIdEnabled} = useAsyncStorage();
  const {onLogout} = useAuth();
  const {phone, userInfo} = useUser();
  const {setLoading} = useLoading();
  const contentRef = useRef({
    touchIdEnabled: false,
  });

  const loadSettings = async () => {
    setLoading(true);
    const touchIdEnabled = await getTouchIdEnabled();
    contentRef.current = {touchIdEnabled};
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
    setLoading(true);
    const result = await checkSmartOTP({phone});
    setLoading(false);
    // activated
    if (_.get(result, 'SmartOtpInfo')) {
      // activateSmartOTP({
      //   phone,
      //   active: false,
      //   password: ' ',
      // });
      return;
    }
    // not activated
    Navigator.push(SCREEN.ACTIVE_OTP);
  };

  return {settings: contentRef.current, onTouchId, onSmartOTP};
};

export default useSecuritySettings;
