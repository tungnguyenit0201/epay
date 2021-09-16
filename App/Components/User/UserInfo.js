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
      <TouchableOpacity style={styles.wicon}>
        <Image
          style={{width: 72, height: 72}}
          source={
            userInfo?.personalInfo?.Avatar
              ? {uri: userInfo.personalInfo.Avatar}
              : Images.User
          }
        />
      </TouchableOpacity>
      <View>
        <Text bold size={Fonts.H6} mb={5}>
          Xin chào {userInfo?.personalInfo?.FullName}
        </Text>

        <Text style={{marginBottom: 10}}>{hidePhone(phone)}</Text>

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
      <View style={{marginLeft: 'auto'}}>
        <TouchableOpacity
          onPress={() => {
            Navigator.navigate(SCREEN.USER_INFO);
          }}>
          <Icon icon={Images.ArrowRight} size={30} />
        </TouchableOpacity>
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
    height: 72,
    width: 72,
    borderRadius: 99,
    backgroundColor: Colors.black,
  },
});

export default User;
