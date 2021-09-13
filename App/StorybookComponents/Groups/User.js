import React, {useState} from 'react';
import {View, StyleSheet, TouchableOpacity, Image} from 'react-native';
import Text from '../Atoms/Text';
import {Images, Colors, Fonts, base} from 'themes';
import {useUser} from 'context/User';
import {hidePhone} from 'utils/Functions';

const User = ({data, style}) => {
  const phone = '0903123456';

  return (
    // TODO: translate
    <View style={[base.shadow, styles.item, style]}>
      <TouchableOpacity
        onPress={() => console.log('hello')}
        style={styles.user}>
        <Text bold fs="h6" style={styles.text}>
          Xin chào
        </Text>
        <Text style={styles.text}>{hidePhone(phone)}</Text>
      </TouchableOpacity>
      <View>
        <TouchableOpacity onPress={() => console.log('hello')} style={styles.wicon}>
          <Image
            style={{width: 40, height: 40}}
            source={Images.User.default}
            resizeMode="cover"
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.noti}
          onPress={() => {
            console.log('hello')
          }}>
          <Text style={styles.notiText}>10</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
  },
  wicon: {
    overflow: 'hidden',
    height: 40,
    width: 40,
    borderRadius: 99,
    backgroundColor: Colors.black,
    borderWidth: 1,
    borderColor: Colors.white,
  },
  user: {
    marginRight: 10,
  },
  text: {
    textAlign: 'right',
    color: Colors.white,
  },

  noti: {
    width: 16,
    height: 16,
    backgroundColor: Colors.Highlight,
    position: 'absolute',
    top: -5,
    right: -5,
    borderRadius: 99,
  },
  notiText: {
    lineHeight: 16,
    textAlign: 'center',
    color: Colors.white,
    fontSize: 10,
  },
});

export default User;
