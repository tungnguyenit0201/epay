import {useState, useEffect, useRef} from 'react';
import _ from 'lodash';
import {Keyboard, Linking, Platform} from 'react-native';
import {useError, useAsyncStorage} from 'context/Common/utils';
import Keychain from 'react-native-keychain';
import * as LocalAuthentication from 'expo-local-authentication';
import {getAll} from 'utils/Functions';
import {useIsFocused} from '@react-navigation/native';
import BiometricModule from 'utils/BiometricModule';

const useTouchID = ({onSuccess, autoShow = false, isMount = true}) => {
  const [biometryType, setBiometryType] = useState(null);
  const {getTouchIdEnabled, getPhone, setTouchIdEnabled} = useAsyncStorage();
  const {setError} = useError();
  const textInputRef = useRef(null);
  const isFocused = useIsFocused();

  const checkBiometry = async () => {
    try {
      const [type, isEnrolledResult, credentials, touchIdEnabled] =
        await getAll(
          LocalAuthentication.supportedAuthenticationTypesAsync,
          BiometricModule.isEnrolledAsync,
          Keychain.getGenericPassword,
          getTouchIdEnabled,
        );
      const {isEnrolled, token} = isEnrolledResult || {};
      let passwordEncrypted =
        credentials?.username == (await getPhone())
          ? credentials?.password
          : null;

      if (!passwordEncrypted || !touchIdEnabled) {
        setBiometryType(null);
        return;
      }
      const biometryType = _.isArray(type) ? type[0] : type;
      if (biometryType && !isEnrolled) {
        showNotEnrolledError();
      }
      if (biometryType && touchIdEnabled && token !== touchIdEnabled) {
        setTouchIdEnabled(token);
        showNotEnrolledError(true);
      }
      setBiometryType(biometryType);
    } catch (error) {
      __DEV__ && console.log("Keychain couldn't be accessed!", error);
    }
  };

  const onTouchID = async ({passcode = false, forceShow = false} = {}) => {
    if (!biometryType) {
      return;
    }
    Keyboard.dismiss();

    const biometryText =
      biometryType === LocalAuthentication.AuthenticationType.FACIAL_RECOGNITION
        ? 'Khuôn mặt'
        : 'Vân tay';
    const options = {
      promptMessage: passcode
        ? 'Vui lòng nhập mật khẩu thiết bị để kích hoạt'
        : `Đăng nhập bằng ${biometryText}`,
      cancelLabel: 'Hủy',
      fallbackLabel: '',
      disableDeviceFallback: !passcode,
    };
    const result = await LocalAuthentication.authenticateAsync(options);

    const {success, error} = result;
    if (success) {
      if (passcode) {
        onTouchID({passcode: false, forceShow: true});
      } else {
        onSuccess && onSuccess();
      }
      return true;
    }

    switch (error) {
      case 'system_cancel':
        forceShow && onTouchID();
        return;
      case 'authentication_failed':
        return setError({
          ErrorCode: -1,
          ErrorMessage: biometryText + ' không hợp lệ. Vui lòng thử lại',
        }); // TODO: translate
      case 'lockout':
        if (Platform.OS === 'ios') {
          // isLocked.current = true;
          // setError({
          //   ErrorCode: -1,
          //   ErrorMessage:
          //     'Dấu vân tay không hợp lệ. Vui lòng nhập mật khẩu thiết bị để kích hoạt',
          // }); // TODO: translate
          onTouchID({passcode: true});
        } else {
          setError({
            ErrorCode: -1,
            ErrorMessage: biometryText + ' không hợp lệ. Vui lòng thử lại sau',
          }); // TODO: translate
        }
        return;
      case 'not_enrolled':
        showNotEnrolledError();
      default:
        return;
    }
  };

  const showNotEnrolledError = (isChanged = false) => {
    const biometryText =
      biometryType === LocalAuthentication.AuthenticationType.FACIAL_RECOGNITION
        ? 'khuôn mặt'
        : 'vân tay';
    setError({
      ErrorCode: -1,
      title: 'Cài đặt ' + biometryText,
      ErrorMessage: isChanged
        ? `${
            biometryText.charAt(0).toUpperCase() + biometryText.substr(1)
          } của quý khách đã được thay đổi trên thiết bị. Vui lòng cài đặt lại ${biometryText}`
        : `Quý khách chưa cài đặt ${biometryText} trên thiết bị. Vui lòng cài đặt để sử dụng`,
      action: [{label: 'Cài đặt', onPress: Linking.openSettings}],
    }); // TODO: translate
  };

  useEffect(() => {
    checkBiometry();
  }, [isFocused]); // eslint-disable-line

  useEffect(() => {
    if (isMount) {
      if (autoShow) {
        onTouchID();
      } else {
        textInputRef.current?.focus && textInputRef.current.focus();
      }
    }
  }, [biometryType]); // eslint-disable-line

  return {biometryType, onTouchID, getTouchIdEnabled, textInputRef};
};

export default useTouchID;
