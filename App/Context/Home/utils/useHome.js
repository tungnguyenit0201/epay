import {useState, useEffect} from 'react';
import Navigator from 'navigations/Navigator';
import {MENU, SCREEN} from 'configs/Constants';
import {useCommon} from 'context/Common';
import {getBanner} from 'services/common';
import {useAsyncStorage, useShowModal} from 'context/Common/utils';
import {Images} from 'themes';

const useHome = () => {
  let [banner, setBanner] = useState();
  const goSecurity = () => {
    Navigator.navigate(SCREEN.SECURITY);
  };
  const onGetBanner = async () => {
    let result = await getBanner();
    console.log('result :>> ', result);
    setBanner(result);
  };
  // useEffect(() => {
  //   onGetBanner();
  // }, []);

  return {goSecurity};
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
    VDMS: {
      icon: Images.Homes.BaoHiem,
      name: 'Vaccine',
      screen: SCREEN.TOP_UP,
    },
    C08: {
      icon: Images.Homes.GiaoThong,
      name: 'Vi phạm giao thông',
      screen: SCREEN.TOP_UP,
    },
    // {
    //   icon: Images.Homes.GiaoThong,
    //   name: 'Giao thông',
    //   screen: SCREEN.TOP_UP,
    // },
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
