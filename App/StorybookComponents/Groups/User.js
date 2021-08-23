import React, {useState} from 'react';
import {View, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {Text} from 'components';
import {Images, Colors, Fonts, base} from 'themes';
const User = ({data, style}) => {
  return (
    <View style={[styles.item, style]}>
      <TouchableOpacity
        onPress={() => console.log('press')}
        style={styles.wicon}>
        <Image style={{width: 40, height: 40}} source={Images.Avatar.default} />
      </TouchableOpacity>
      <View style={styles.user}>
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
        <Text color={Colors.white} onPress={() => console.log('log out')}>
          Thoát
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
  user: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1,
  },
});

export default User;
