import {useState, useEffect} from 'react';
import Navigator from 'navigations/Navigator';
import {SCREEN} from 'configs/Constants';
import {useCommon} from 'context/Common';
import {useAsyncStorage, useShowModal} from 'context/Common/utils';

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

export {useHome, useModalSmartOTP};
