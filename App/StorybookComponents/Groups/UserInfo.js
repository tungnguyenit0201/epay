import React, {useState, useEffect} from 'react';
import {View, StyleSheet, TouchableOpacity, Image} from 'react-native';
// import { Text, Button, Icon } from 'components';
import Text from '../Atoms/Text';
import Button from '../Atoms/Button';
import Icon from '../Atoms/Icon';
import {Images, Colors, Fonts, base} from 'themes';
import StatusUser from '../Groups/StatusUser';
const User = ({style}) => {
  const phone = '0903112334';
  return (
    <View style={[styles.item, style]}>
      <TouchableOpacity style={[styles.wicon]}>
        <Image style={{width: 56, height: 56}} source={Images.User.default} />
      </TouchableOpacity>
      <View>
        <Text bold size={Fonts.H6} mb={5} style={{textTransform: 'uppercase'}}>
          Phước Lộc
        </Text>
        <Text>099****258</Text>
      </View>
      <View style={{marginLeft: 'auto'}}>
        <StatusUser size="xs" />
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
