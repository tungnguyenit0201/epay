import React, {useState} from 'react';
import {View, StyleSheet, TouchableOpacity, Image} from 'react-native';
import Text from '../Atoms/Text';
import {scale} from 'utils/Functions';
import {Images} from 'themes';

const User = () => {
  return (
    <TouchableOpacity
      onPress={() => {
        console.log('hello');
      }}
      style={[styles.item]}>
      <Image style={styles.img} source={Images.Homes.Avatar.default} />
      <Text style={[styles.text]}>
        Cập nhật định danh để tăng cường bảo mật cho tài khoản của bạn.
      </Text>
      <Image style={styles.arrow} source={Images.Homes.Arrow.default} />
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
    paddingLeft: scale(15),
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
