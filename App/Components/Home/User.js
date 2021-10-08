import React, {useState} from 'react';
import {View, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {Text} from 'components';
import {Images, Colors, Fonts, base} from 'themes';
import {SCREEN} from 'configs/Constants';
import {useAuth} from 'context/Auth/utils';
import {useNotify} from 'context/User/utils';
import Navigator from 'navigations/Navigator';
import {useUser} from 'context/User';
import {hidePhone} from 'utils/Functions';

const User = ({data, style}) => {
  const {personalInfo, phone} = useUser();

  const {onGoNotify} = useNotify();
  return (
    // TODO: translate
    <View style={[base.shadow, styles.item, style]}>
      <TouchableOpacity
        onPress={() => Navigator.navigate(SCREEN.USER)}
        style={[styles.user, styles.flex1]}>
        <Text bold style={[styles.text, styles.textSize1]}>
          {personalInfo?.FullName}
        </Text>
        <Text style={styles.text}>{hidePhone(phone)}</Text>
      </TouchableOpacity>
      <View>
        <TouchableOpacity onPress={onGoNotify} style={styles.wicon}>
          {personalInfo?.Avatar ? (
            <Image
              style={{width: 40, height: 40}}
              source={{uri: personalInfo?.Avatar}}
              resizeMode="cover"
            />
          ) : (
            <Image
              style={{width: 40, height: 40}}
              source={Images.User}
              resizeMode="cover"
            />
          )}
        </TouchableOpacity>
        {/* TODO: show notifications count */}
        {/* <TouchableOpacity
          style={styles.noti}
          onPress={() => {
            Navigator.navigate(SCREEN.NOTIFICATION);
          }}>
          <Text style={styles.notiText}>10</Text>
        </TouchableOpacity> */}
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
  //----------------
  flex1: {flex: 1},
  //----------------
  textSize1: {fontSize: Fonts.SM},
});

export default User;
