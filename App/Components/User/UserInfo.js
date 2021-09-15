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

const User = ({style}) => {
  const {onVerify, statusVerified, getStatusVerifiedText} = useUserStatus();
  const {userInfo} = useUser();
  const {phone} = usePhone();
  const translation = useTranslation();

  return (
    <View style={[base.shadow, styles.item, style]}>
      <TouchableOpacity
        style={styles.wicon}
        onPress={() => {
          Navigator.navigate(SCREEN.USER_INFO);
        }}>
        <Image
          style={{width: 56, height: 56}}
          source={
            userInfo?.personalInfo?.Avatar
              ? {uri: userInfo.personalInfo.Avatar}
              : Images.User
          }
        />
      </TouchableOpacity>
      <View>
        <Text bold size={Fonts.H6} mb={5}>
          {userInfo?.personalInfo?.FullName}
        </Text>
        <Text>{hidePhone(phone)}</Text>
      </View>
      <View style={{marginLeft: 'auto'}}>
        <Button
          size="xxs"
          disabled={statusVerified != PERSONAL_IC.INACTIVE}
          bg={Colors.Highlight}
          radius={30}
          color={Colors.white}
          label={getStatusVerifiedText()}
          onPress={() => Navigator.push(SCREEN.CHOOSE_IDENTITY_CARD)}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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
    backgroundColor: Colors.black,
  },
});

export default User;
