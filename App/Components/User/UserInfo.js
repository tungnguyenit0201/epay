import React, {useState, useEffect} from 'react';
import {View, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {Text, Button, Icon} from 'components';
import {Images, Colors, Fonts, base} from 'themes';
import Navigator from 'navigations/Navigator';
import {SCREEN, PERSONAL_IC} from 'configs/Constants';

import {useUser} from 'context/User';
import {usePhone} from 'context/Auth/utils';
import {useTranslation} from 'context/Language';
import {useUserStatus} from 'context/User/utils';
import {hidePhone} from 'utils/Functions';

import StatusUser from 'components/Common/StatusUser';

const User = ({style}) => {
  const {onVerify, statusVerified, getStatusVerifiedText} = useUserStatus();
  const {userInfo} = useUser();
  const {phone} = usePhone();
  const translation = useTranslation();

  return (
    <View style={[styles.item, style]}>
      <TouchableOpacity
        style={styles.wicon}
        onPress={() => {
          Navigator.navigate(SCREEN.USER_INFO);
        }}
      >
        <Image
          style={styles.userPortrait}
          source={
            userInfo?.personalInfo?.Avatar
              ? {uri: userInfo.personalInfo.Avatar}
              : Images.User
          }
        />
      </TouchableOpacity>

      <View style={styles.flex1}>
        <Text bold size={Fonts.MD} mb={2} style={styles.lh1}>
          {userInfo?.personalInfo?.FullName}
        </Text>
        <View style={[styles.flexRow, styles.alignCenter]}>
          <Text style={styles.flex1}>{hidePhone(userInfo.phone)}</Text>
          <StatusUser size="xxs" />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  flex1: {flex: 1},
  //-------------
  flexRow: {flexDirection: 'row'},
  alignCenter: {alignItems: 'center'},
  //-------------
  lh1: {lineHeight: 24},
  //-------------
  item: {
    flexDirection: 'row',
    marginBottom: 10,
    alignItems: 'center',
  },
  wicon: {
    overflow: 'hidden',
    marginRight: 15,
    height: 56,
    width: 56,
    borderRadius: 99,
    backgroundColor: Colors.tp2,
  },
  //-------------
  userPortrait: {width: 56, height: 56},
});

export default User;
