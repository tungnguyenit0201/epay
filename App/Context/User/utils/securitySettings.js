import {useEffect, useRef, useState} from 'react';
import Navigator from 'navigations/Navigator';
import {SCREEN} from 'configs/Constants';
import {useAsyncStorage, useError, useLoading} from 'context/Common/utils';
import {useUser} from 'context/User';
import _ from 'lodash';
import {useAuth} from 'context/Auth/utils';
import useServiceUser from 'services/user';
// import * as LocalAuthentication from 'expo-local-authentication';
import {Linking} from 'react-native';
import BiometricModule from 'utils/BiometricModule';

const useSecuritySettings = () => {
  const {setTouchIdEnabled, getTouchIdEnabled} = useAsyncStorage();
  const {onLogout} = useAuth();
  const {phone} = useUser();
  const {setLoading} = useLoading();
  const {setError} = useError();
  const {getSettingsInfo} = useServiceUser();
  const [settings, setSettings] = useState({
    touchIdEnabled: false,
    // data from getSettingsInfo()
  });

  useEffect(() => {
    const loadSettings = async () => {
      setLoading(true);
      const touchIdEnabled = !!(await getTouchIdEnabled());
      const result = await getSettingsInfo({phone});
      setSettings({
        ..._.get(result, 'SettingInfo', {}),
        touchIdEnabled,
      });
      setLoading(false);
    };

    loadSettings();
  }, []); // eslint-disable-line

  const onTouchId = async value => {
    const {isEnrolled, token} = await BiometricModule.isEnrolledAsync();
    if (value && !isEnrolled) {
      setError({
        ErrorCode: -1,
        title: 'Cài đặt vân tay',
        ErrorMessage:
          'Quý khách chưa cài đặt vân tay trên thiết bị. Vui lòng cài đặt để sử dụng',
        action: [{label: 'Cài đặt', onPress: Linking.openSettings}],
      }); // TODO: translate
      return false;
    }
    if (value) {
      setTouchIdEnabled(token || true);
      onLogout();
    } else {
      setTouchIdEnabled(false);
    }
    return true;
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
