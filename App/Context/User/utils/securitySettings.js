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
  const [settings, setSettings] = useState({
    touchIdEnabled: false,
    // data from getSettingsInfo()
  });

  useEffect(() => {
    const loadSettings = async () => {
      setLoading(true);
      const touchIdEnabled = await getTouchIdEnabled();
      const result = await getSettingsInfo({phone});
      setSettings({
        ..._.get(result, 'SettingInfo', {}),
        touchIdEnabled,
      });
      setLoading(false);
    };

    loadSettings();
  }, []); // eslint-disable-line

  const onTouchId = value => {
    setTouchIdEnabled(value);
    if (value) {
      onLogout();
    }
  };

  const onSmartOTP = async () => {
    // activated
    if (settings.ActivedSmartOTP) {
      Navigator.push(SCREEN.SMART_OTP);
      return;
    }
    // not activated
    Navigator.push(SCREEN.ACTIVE_SMART_OTP);
  };

  return {settings, onTouchId, onSmartOTP};
};

export default useSecuritySettings;
