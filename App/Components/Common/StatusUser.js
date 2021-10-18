import React from 'react';

import {Pressable, StyleSheet} from 'react-native';
import {Button, Text} from 'components';
import {PERSONAL_IC} from 'configs/Constants';

import {Colors} from 'themes';

import {useUserStatus, useUserInfo, useVerifyInfo} from 'context/User/utils';

const StatusUser = ({size = 'sm', radius = 30, style}) => {
  const {statusVerified, onVerify, getStatusVerifiedText} = useUserStatus();
  const setColors = {
    INACTIVE: '#D80000',
    EXPIRED: '#FFC908',
    ACTIVED: '#1EC84E',
    REJECTED: Colors.Highlight,
    RE_VERIFYING: '#D80000',
    VERIFYING: '#FFC908',
  };

  let setBg = setColors.INACTIVE;

  if (statusVerified == PERSONAL_IC.ACTIVED) {
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
  }

  return (
    <Pressable
      style={[
        styles.container,
        style,
        {borderRadius: radius, backgroundColor: setBg},
      ]}
      // radius={radius}
      // bgImg={0}
      // bg={setBg}
      // size={size}
      // fw={'500'}
      // color={Colors.bs4}
      // label={getStatusVerifiedText()}
      // style={[{minWidth: 93}, style]}
      onPress={() => {
        statusVerified == PERSONAL_IC.INACTIVE && onVerify();
      }}
    >
      <Text color={Colors.bs4} fs="sx" centered>
        {getStatusVerifiedText()}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    minWidth: 93,
    paddingVertical: 3,
    paddingHorizontal: 8,
  },
});
export default StatusUser;
