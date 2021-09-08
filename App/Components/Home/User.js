import React, {useState} from 'react';
import {View, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {Text} from 'components';
import {Images, Colors, Fonts, base} from 'themes';
import {SCREEN} from 'configs/Constants';
import {useAuth} from 'context/Auth/utils';
import Navigator from 'navigations/Navigator';

const User = ({data, style}) => {
  const {onLogout} = useAuth();
  return (
    <View style={[base.shadow, styles.item, style]}>
      <TouchableOpacity
        onPress={() => Navigator.navigate(SCREEN.USER)}
        style={styles.user}>
        <Text bold fs="h6" style={styles.text}>
          Xin chào Vân
        </Text>
        <Text style={styles.text}>
          *********
          <Text color={Colors.white} style={styles.phone}>
            387
          </Text>
        </Text>
      </TouchableOpacity>
      <View>
        <TouchableOpacity
          onPress={() => Navigator.navigate(SCREEN.NOTIFICATION)}
          style={styles.wicon}>
          <Image style={{width: 40, height: 40}} source={Images.Avatar} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.noti}
          onPress={() => {
            Navigator.push(SCREEN.NOTIFICATION);
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
  phone: {
    height: 20,
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
