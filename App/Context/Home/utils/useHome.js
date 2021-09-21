import {useState, useEffect} from 'react';
import Navigator from 'navigations/Navigator';
import {MENU, SCREEN} from 'configs/Constants';
import {useCommon} from 'context/Common';
import {useAsyncStorage, useShowModal} from 'context/Common/utils';
import {Images} from 'themes';

const useHome = () => {
  const goSecurity = () => {
    Navigator.navigate(SCREEN.SECURITY);
  };
  return {goSecurity};
};

const useModalSmartOTP = () => {
  const {
    showModal: {smartOTP},
  } = useCommon();
  const {showModalSmartOTP} = useShowModal();
  const {setModalSmartOTPDisabled} = useAsyncStorage();

  const onGoSmartOTP = () => {
    Navigator.push(SCREEN.ACTIVE_SMART_OTP);
  };

  const onPressNever = () => {
    setModalSmartOTPDisabled(true);
    onClose();
  };

  const onClose = () => {
    showModalSmartOTP(false);
  };

  return {smartOTP, onGoSmartOTP, onPressNever, onClose};
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
