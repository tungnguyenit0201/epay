import {useState, useEffect, useCallback} from 'react';
import Navigator from 'navigations/Navigator';
import {ERROR_CODE, MENU, SCREEN} from 'configs/Constants';
import {useCommon} from 'context/Common';
import {getBanner} from 'services/common';
import {useAsyncStorage, useShowModal} from 'context/Common/utils';
import {Images} from 'themes';

const useHome = () => {
  const {getPhone} = useAsyncStorage();
  let [banner, setBanner] = useState();
  const goSecurity = () => {
    Navigator.navigate(SCREEN.SECURITY);
  };
  const onGetBanner = async () => {
    let phone = await getPhone();
    let result = await getBanner({phone});
    if (result?.ErrorCode == ERROR_CODE.SUCCESS) setBanner(result?.Banners);
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
  let iconList = {
    C08: {
      icon: Images.Homes.NopPhat,
      name: 'Nộp phạt',
      screen: SCREEN.TOP_UP,
    },
    VDMS: {
      icon: Images.Homes.YTe,
      name: 'Y tế', // TODO: translate
      screen: SCREEN.TOP_UP,
    },

    TRAFFIC: {
      icon: Images.Homes.GiaoThong,
      name: 'Giao thông',
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
