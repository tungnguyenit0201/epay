import {useState, useEffect, useRef} from 'react';
import _ from 'lodash';
import {Keyboard, Linking, Platform, AppState} from 'react-native';
import {useError, useAsyncStorage} from 'context/Common/utils';
import Keychain from 'react-native-keychain';
import {getAll} from 'utils/Functions';
import TouchID from 'react-native-touch-id';
import {useIsFocused} from '@react-navigation/native';

const useTouchID = ({onSuccess, isMount = true}) => {
  const [biometryType, setBiometryType] = useState(null);
  const {getTouchIdEnabled, getPhone, setTouchIdEnabled} = useAsyncStorage();
  const {setError} = useError();
  const textInputRef = useRef(null);
  const contentRef = useRef({
    isMount,
    currentAppState: null,
  });
  const isFocused = useIsFocused();

  const onCheckBiometry = async () => {
    try {
      const [biometryData, credentials, touchIdEnabled] = await getAll(
        checkBiometry,
        Keychain.getGenericPassword,
        getTouchIdEnabled,
      );
      const {biometricType, token, isEnrolled, error} = biometryData || {};
      let passwordEncrypted =
        credentials?.username == (await getPhone())
          ? credentials?.password
          : null;

      // if phone changed or touch id setting is disabled or device doesn't suppport biometry
      if (!passwordEncrypted || !touchIdEnabled || !biometricType) {
        setBiometryType(null);
        return;
      }

      // if device supports biometry but not activated or no fingerprint is set
      if (!isEnrolled) {
        showNotEnrolledError();
        setTouchIdEnabled(false);
        setBiometryType(null);
        return;
      }

      // if change biometry token
      const isChanged = token !== touchIdEnabled && error !== 'LOCKOUT';
      if (isChanged) {
        setTouchIdEnabled(token || '');
        showNotEnrolledError(true);
      }

      // happy case
      setBiometryType(biometricType);

      if (contentRef.current.isMount) {
        contentRef.current.isMount = false;
        !isChanged && onTouchID({passcode: false, forceShow: true});
      }
    } catch (error) {
      __DEV__ && console.log(error);
    }
  };

  const onTouchID = async ({passcode = false, forceShow = false} = {}) => {
    if (!biometryType && !forceShow) {
      return;
    }
    Keyboard.dismiss();

    const optionalConfigObject = {
      title: `Xác nhận ${getBiometryText()}`, // Android
      imageColor: '#00000000', // Android
      imageErrorColor: '#00000000', // Android
      sensorDescription: `Sử dụng ${getBiometryText()} của bạn để xác nhận đăng nhập`, // Android
      sensorErrorDescription:
        getBiometryText(true) + ' không hợp lệ. Vui lòng thử lại', // Android
      cancelText: 'Hủy bỏ', // Android
      fallbackLabel: '', // iOS (if empty, then label is hidden)
      unifiedErrors: true, // use unified error messages (default false)
      passcodeFallback: true, // iOS - allows the device to fall back to using the passcode, if faceid/touch is not available. this does not mean that if touchid/faceid fails the first few times it will revert to passcode, rather that if the former are not enrolled, then it will use the passcode.
    }; // TODO: translate

    TouchID.authenticate(
      Platform.OS === 'android'
        ? optionalConfigObject?.title
        : passcode
        ? 'Vui lòng nhập mật khẩu thiết bị để kích hoạt'
        : `Đăng nhập bằng ${getBiometryText()}`,
      optionalConfigObject,
    )
      .then(success => {
        if (passcode) {
          onTouchID({passcode: false, forceShow: true});
          return;
        }
        onSuccess?.(success);
      })
      .catch(error => {
        const errorCode = error?.code;
        //LOCKOUT
        switch (errorCode) {
          // case 'LAErrorSystemCancel':
          case 'SYSTEM_CANCELED':
            forceShow && onTouchID({passcode, forceShow});
            return;
          // case 'LAErrorTouchIDNotEnrolled':
          case 'NOT_ENROLLED':
            showNotEnrolledError();
            return;
          // case 'LAErrorTouchIDLockout':
          case 'LOCKOUT':
            onTouchID({passcode: true});
            return;
          default:
            break;
        }
      });
  };

  const showNotEnrolledError = (isChanged = false) => {
    setError({
      ErrorCode: -1,
      title: 'Cài đặt ' + getBiometryText(),
      ErrorMessage: isChanged
        ? `${getBiometryText(
            true,
          )} của quý khách đã được thay đổi trên thiết bị. Vui lòng cài đặt lại ${getBiometryText()}`
        : `Quý khách chưa cài đặt ${getBiometryText()} trên thiết bị. Vui lòng cài đặt để sử dụng`,
      action: [{label: 'Cài đặt', onPress: Linking.openSettings}],
    }); // TODO: translate
  };

  const checkBiometry = async () => {
    return await new Promise((resolve, reject) => {
      TouchID.isSupported({passcodeFallback: false, unifiedErrors: true})
        .then(data => {
          console.log('data', data);
          resolve({...data, isEnrolled: true, error: null});
          // resolve(Platform.OS === 'android' ? 'TouchID' : biometryType);
        })
        .catch(err => {
          console.log('errr', Object.keys(err));
          const error = err?.code;
          resolve({
            biometricType: 'unknown',
            error,
            isEnrolled: error !== 'NOT_ENROLLED',
          });
        });
    });
  };

  const getBiometryText = isStartCase => {
    // TODO: translate
    let biometryText = biometryType === 'FaceID' ? 'khuôn mặt' : 'vân tay';
    isStartCase &&
      (biometryText = biometryText[0].toUpperCase() + biometryText.substr(1));
    return biometryText;
  };

  useEffect(() => {
    const subscription = AppState.addEventListener(
      'change',
      async nextAppState => {
        try {
          if (
            nextAppState === 'active' &&
            contentRef.current.currentAppState === 'background'
          ) {
            onCheckBiometry();
          }
        } catch (error) {}
        contentRef.current.currentAppState = nextAppState;
      },
    );
    return () => {
      subscription?.remove?.();
    };
  }, []); // eslint-disable-line

  useEffect(() => {
    isFocused && onCheckBiometry();
  }, [isFocused]); // eslint-disable-line

  return {
    biometryType,
    onTouchID,
    getTouchIdEnabled,
    onCheckBiometry,
    textInputRef,
    checkBiometry,
  };
};

export default useTouchID;
