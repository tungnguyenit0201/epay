import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Image } from 'react-native';
// import { Text, Button, Icon } from 'components';
import Text from '../Atoms/Text';
import Button from '../Atoms/Button';
import Icon from '../Atoms/Icon';
import { Images, Colors, Fonts, base } from 'themes';

const User = ({ style }) => {
  const phone = '0903112334';
  return (
    <View style={[ styles.item, style]}>
      <TouchableOpacity
        onPress={() => {
          console.log('hello')
        }}
        style={styles.wicon}>
        <Image style={{ width: 72, height: 72 }} source={Images.Avatar.default} />
      </TouchableOpacity>
      <View>
        <Text bold size={Fonts.H6} mb={5}>
          Xin chào Vân
        </Text>

        <Text style={{ marginBottom: 10 }}>
          {phone.slice(-3).padStart(phone.length, "*")}
        </Text>

        <Button
          size="xs"
          bg={Colors.Highlight}
          radius={30}
          color="#fff"
          label={'Chưa xác thực'}
          onPress={() => console.log('press')}
        />
      </View>
      <View style={{ marginLeft: 'auto' }}>
        <TouchableOpacity
          onPress={() => console.log('press')}>
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
