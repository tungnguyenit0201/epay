import React from 'react';
import {Colors} from 'themes';

import Button from '../Atoms/Button';
const StatusUser = ({size = 'sm', radius = 30, style}) => {
  /* const {statusVerified, onVerify, getStatusVerifiedText} = useUserStatus(); */
  /*   if (statusVerified == PERSONAL_IC.ACTIVED) {
    setBg = setColors.ACTIVED;
  } else if (statusVerified == PERSONAL_IC.EXPIRED) {
    setBg = setColors.EXPIRED;
  } else if (statusVerified == PERSONAL_IC.INACTIVE) {
    setBg = setColors.INACTIVE;
  } else if (statusVerified == PERSONAL_IC.REJECTED) {
    setBg = setColors.REJECTED;
  } else if (statusVerified == PERSONAL_IC.RE_VERIFYING) {
    setBg = setColors.RE_VERIFYING;
  } else if (statusVerified == PERSONAL_IC.VERIFYING) {
    setBg = setColors.VERIFYING;
  } */

  return (
    <>
      <Button
        radius={radius}
        bg="#1EC84E"
        size={size}
        color={Colors.white}
        label={'Đã xác thực tài khoản'}
        style={[{minWidth: 120}, style]}
      />
    </>
  );
};

export default StatusUser;
