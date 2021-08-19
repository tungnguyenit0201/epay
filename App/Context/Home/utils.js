import {useState} from 'react';
import Navigator from 'navigations/Navigator';
import {SCREEN} from 'configs/Constants';
const useHome = () => {
  const goSecurity = () => {
    Navigator.navigate(SCREEN.SECURITY);
  };
  return {goSecurity};
};
export {useHome};
