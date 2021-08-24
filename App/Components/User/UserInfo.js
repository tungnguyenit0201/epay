import React, {useState, useEffect} from 'react';
import {View, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {Text, Button, Icon} from 'components';
import {Images, Colors, Fonts, base} from 'themes';
import Navigator from 'navigations/Navigator';
import {SCREEN} from 'configs/Constants';

import {useUser} from 'context/User';
import {usePhone} from 'context/Auth/utils';
const User = ({style}) => {
  const {userInfo} = useUser();
  const {phone} = usePhone();
  return (
    <View style={[base.shadow, styles.item, style]}>
      <TouchableOpacity
        onPress={() => {
          Navigator.navigate(SCREEN.USER);
        }}
        style={styles.wicon}>
        <Image style={{width: 72, height: 72}} source={Images.Avatar} />
      </TouchableOpacity>
      <View>
        <Text bold size={Fonts.H6} mb={5}>
          Xin chào {userInfo?.personalInfo?.FullName}
        </Text>

        <Text style={{marginBottom: 10}}>
          {phone.slice(-3).padStart(phone.length, '*')}
        </Text>

        <Button
          size="xs"
          bg={Colors.Highlight}
          radius={30}
          color="#fff"
          label={
            userInfo.personalIC?.Active == 1 ? 'Đã xác thực' : 'Chưa xác thực'
          }
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
  phone: {
    height: 20,
  },
});

export default User;
