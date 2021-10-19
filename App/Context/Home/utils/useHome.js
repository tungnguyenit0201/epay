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

const useHome = () => {
  const {getPhone, getToken} = useAsyncStorage();
  let [banner, setBanner] = useState();
  const {getBanner} = useServiceCommon();
  const {setError} = useError();

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
  useEffect(() => {
    onGetBanner();
  }, []);

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
    // {
    //   icon: Images.Homes.BaoHiem,
    //   name: 'Bảo hiểm',
    //   screen: SCREEN.TOP_UP,
    // },
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
  config?.EnabledMenu?.split(', ')?.map(item => {
    if (!!iconList[item]) iconHome.push(iconList[item]);
  });

  return {iconHome};
};
export {useHome, useModalSmartOTP, useIconConfig};
