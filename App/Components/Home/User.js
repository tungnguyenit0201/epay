import React, {useState} from 'react';
import {View, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {Text} from 'components';
import {Images, Colors, Fonts, base} from 'themes';
import Navigator from 'navigations/Navigator';
import {SCREEN} from 'configs/Constants';

const User = ({data, style}) => {
  return (
    <View style={[base.shadow, styles.item, style]}>
      <TouchableOpacity
        onPress={() => {
          Navigator.navigate(SCREEN.USER);
        }}
        style={styles.wicon}>
        <Image style={{width: 40, height: 40}} source={Images.Avatar} />
      </TouchableOpacity>
      <View>
        <Text bold size={Fonts.H6} color="#fff" mb={5}>
          Xin chào Vân
        </Text>

        <Text color="#fff">
          *********
          <Text color="#fff" style={styles.phone}>
            387
          </Text>
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  wicon: {
    overflow: 'hidden',
    marginRight: 15,
    height: 40,
    width: 40,
    borderRadius: 99,
    backgroundColor: Colors.black,
  },
  phone: {
    height: 20,
  },
});

export default User;
