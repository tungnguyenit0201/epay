import {useState, useEffect, useRef} from 'react';
import _ from 'lodash';
import {Keyboard, Linking, Platform, AppState} from 'react-native';
import {useError, useAsyncStorage} from 'context/Common/utils';
import Keychain from 'react-native-keychain';
import * as LocalAuthentication from 'expo-local-authentication';
import {getAll} from 'utils/Functions';
import TouchID from 'rn-touch-id';
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

  const checkBiometry = async () => {
    try {
      const [biometryType, credentials, touchIdEnabled, isAvailable] =
        await getAll(
          checkBiometryType,
          Keychain.getGenericPassword,
          getTouchIdEnabled,
          checkIsEnrolled,
        );
      let passwordEncrypted =
        credentials?.username == (await getPhone())
          ? credentials?.password
          : null;

      // if phone changed or touch id setting is disabled or device doesn't suppport biometry
      if (!passwordEncrypted || !touchIdEnabled || !biometryType) {
        setBiometryType(null);
        return;
      }

      const {isEnrolled, token} = (await TouchID.isEnrolledAsync()) || {};

      // if device supports biometry but not activated
      if (!isAvailable) {
        showNotEnrolledError();
        setTouchIdEnabled(false);
        setBiometryType(null);
        return;
      }

      // if change biometry token
      if (isEnrolled && token !== touchIdEnabled) {
        setTouchIdEnabled(token);
        showNotEnrolledError(true);
      }

      // happy case
      setBiometryType(biometryType);

      if (contentRef.current.isMount) {
        contentRef.current.isMount = false;
        onTouchID({passcode: !isEnrolled, forceShow: true});
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
      unifiedErrors: false, // use unified error messages (default false)
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
        const errorCode = Platform.OS === 'ios' ? error?.name : error?.code;
        switch (errorCode) {
          case 'LAErrorSystemCancel':
            forceShow && onTouchID({passcode, forceShow});
            return;
          case 'LAErrorTouchIDNotEnrolled':
            showNotEnrolledError();
            return;
          case 'LAErrorTouchIDLockout':
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

  const checkBiometryType = async () => {
    return await new Promise((resolve, reject) => {
      TouchID.isSupported()
        .then(biometryType => {
          resolve(Platform.OS === 'android' ? 'TouchID' : biometryType);
        })
        .catch(error => {
          resolve(null);
        });
    });
  };

  const checkIsEnrolled = async () => {
    return await new Promise((resolve, reject) => {
      TouchID.isSupported({passcodeFallback: true})
        .then(biometryType => {
          resolve(true);
        })
        .catch(error => {
          resolve(false);
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
            checkBiometry();
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
    isFocused && checkBiometry();
  }, [isFocused]); // eslint-disable-line

  return {
    biometryType,
    onTouchID,
    getTouchIdEnabled,
    checkBiometryType,
    textInputRef,
  };
};

export default useTouchID;
