import {useState, useEffect, useCallback} from 'react';
import Navigator from 'navigations/Navigator';
import {ERROR_CODE, MENU, SCREEN} from 'configs/Constants';
import {useCommon} from 'context/Common';
import useServiceCommon from 'services/common';
import {useAsyncStorage, useError, useShowModal} from 'context/Common/utils';
import {Images} from 'themes';
import {useTranslation} from 'context/Language';
import * as LocalAuthentication from 'expo-local-authentication';
import {Linking} from 'react-native';
import {getAll} from 'utils/Functions';
import {useUser} from 'context/User';
import {useRegister} from 'context/Auth/utils';

const useHome = () => {
  const {getPhone, getToken} = useAsyncStorage();
  let [banner, setBanner] = useState();
  const {getBanner} = useServiceCommon();
  const {setError} = useError();
  const {firstLogin} = useUser();
  const {setFirstLogin} = useRegister();
  const translation = useTranslation();

  const goSecurity = async () => {
    const isTouchIdEnrolled = await LocalAuthentication.isEnrolledAsync();
    if (isTouchIdEnrolled) {
      Navigator.navigate(SCREEN.SECURITY);
    } else {
      Linking.openSettings();
    }
  };

  const onGetBanner = async () => {
    let phone = await getPhone();
    let token = await getToken();
    let result = await getBanner({phone});
    if (result?.ErrorCode == ERROR_CODE.SUCCESS) setBanner(result?.Banners);
    else setError(result);
  };

  const onShowTouchIdSuggestion = async () => {
    const [biometryType, isTouchIdEnrolled] = await getAll(
      LocalAuthentication.supportedAuthenticationTypesAsync,
      LocalAuthentication.isEnrolledAsync,
    );
    if (!firstLogin || !isTouchIdEnrolled) {
      return;
    }
    const isFaceId =
      biometryType?.[0] ===
      LocalAuthentication.AuthenticationType.FACIAL_RECOGNITION;
    // TODO: translate
    setError({
      icon: isFaceId ? Images.SignUp.FaceId : Images.SignUp.TouchId,
      title: isFaceId ? 'Đăng nhập khuôn mặt' : translation.log_in_touchid,
      ErrorCode: -1,
      ErrorMessage:
        translation.if_you_have_a_problem_and_need_help_please_call_us_for_advice_and_support,
      action: [
        {
          label: isFaceId ? 'Cài đặt khuôn mặt' : translation.setting_touch_id,
          onPress: () => {
            setFirstLogin(false);
            goSecurity();
          },
        },
        {
          label: translation.remind_me_later,
          onPress: () => setFirstLogin(false),
        },
      ],
    });
  };

  useEffect(() => {
    onGetBanner();
  }, []);

  useEffect(() => {
    onShowTouchIdSuggestion();
  }, [firstLogin]);

  return {banner, goSecurity};
};

const useModalSmartOTP = () => {
  const {
    showModal: {smartOTPSuggestion},
  } = useCommon();
  const {showModalSmartOTPSuggestion} = useShowModal();
  const {setModalSmartOTPDisabled} = useAsyncStorage();

  const onGoSmartOTP = () => {
    onClose();
    Navigator.push(SCREEN.ACTIVE_SMART_OTP);
  };

  const onPressNever = () => {
    setModalSmartOTPDisabled(true);
    onClose();
  };

  const onClose = () => {
    showModalSmartOTPSuggestion(false);
  };

  return {smartOTPSuggestion, onGoSmartOTP, onPressNever, onClose};
};

const useIconConfig = () => {
  const translation = useTranslation();
  let iconList = {
    C08: {
      icon: Images.Homes.NopPhat,
      name: translation.pay_fines,
      screen: SCREEN.TOP_UP,
    },
    VDMS: {
      icon: Images.Homes.YTe,
      name: translation.medical,
      screen: SCREEN.TOP_UP,
    },

    TRAFFIC: {
      icon: Images.Homes.GiaoThong,
      name: translation.traffic,
      screen: SCREEN.TOP_UP,
    },
    MEDICAN: {
      icon: Images.Homes.BaoHiem,
      name: 'Bảo hiểm',
      screen: SCREEN.TOP_UP,
    },
    // {
    //   icon: Images.Homes.YTe,
    //   name: 'Y tế',
    //   screen: SCREEN.TOP_UP,
    // },
    // {
    //   icon: Images.Homes.SanBay,
    //   name: 'Sân bay ',
    //   screen: SCREEN.TOP_UP,
    // },
  };
  const {config} = useCommon();
  let iconHome = [];
  // Thêm 1 icon bảo hiểm để ở trang chủ có 4 icon cho đẹp, bug 2643
  config?.EnabledMenu?.concat(', MEDICAN')
    .split(', ')
    ?.map(item => {
      if (!!iconList[item]) iconHome.push(iconList[item]);
    });

  return {iconHome};
};

export {useHome, useModalSmartOTP, useIconConfig};
