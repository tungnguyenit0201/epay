import React, {useState} from 'react';
import {View, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {Text} from 'components';
import Navigator from 'navigations/Navigator';
import {SCREEN} from 'configs/Constants';
import {scale} from 'utils/Functions';

const avatar = require('images/home/avatar.png');
const arrow = require('images/home/CircleRight.png');

const User = ({data, style}) => {
  return (
    <TouchableOpacity
      onPress={() => {
        Navigator.navigate(SCREEN.CHOOSE_IDENTITY_CARD);
      }}
      style={[styles.item, style]}>
      <Image style={styles.img} source={avatar} />
      <Text style={styles.text}>
        Cập nhật định danh để tăng cường bảo mật cho tài khoản của bạn.
      </Text>
      <Image style={styles.arrow} source={arrow} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  item: {
    marginBottom: 20,
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
    //justifyContent: 'space-between',
    //flexWrap: 'wrap',
  },
  text: {
    paddingHorizontal: scale(40),
  },
  img: {
    width: scale(40),
    height: scale(40),
    marginRight: 'auto',
  },
  arrow: {
    width: scale(24),
    height: scale(24),
    marginLeft: 'auto',
  },
});

export default User;
