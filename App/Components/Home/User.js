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
import _ from 'lodash';

const User = ({data, style}) => {
  const {personalInfo, phone, listNotify} = useUser();
  const {onGoNotify} = useNotify();

  const numNotify = _.isArray(listNotify)
    ? listNotify.filter(x => !x.IsRead).length
    : 0;

  return (
    <View style={[base.shadow, styles.item, style]}>
      <TouchableOpacity
        onPress={() => Navigator.navigate(SCREEN.USER)}
        style={[styles.user, styles.flex1]}>
        <Text
          bold
          size={Fonts.SM}
          right
          color={Colors.bs4}
          style={styles.lh1}
          mb={3}>
          {personalInfo?.FullName}
        </Text>
        <Text style={styles.text}>{phone ? hidePhone(phone) : ''}</Text>
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

        {!!numNotify && (
          <TouchableOpacity
            style={styles.noti}
            onPress={() => {
              Navigator.navigate(SCREEN.NOTIFICATION);
            }}>
            <Text style={styles.notiText}>{numNotify}</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  lh1: {lineHeight: 18},
  //-------------
  item: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  wicon: {
    overflow: 'hidden',
    height: 40,
    width: 40,
    borderRadius: 99,
    backgroundColor: Colors.tp2,
    borderWidth: 0,
    borderColor: Colors.bs4,
  },
  user: {
    marginRight: 10,
  },
  text: {
    textAlign: 'right',
    color: Colors.bs4,
  },
  noti: {
    width: 16,
    height: 16,
    backgroundColor: Colors.hl1,
    position: 'absolute',
    top: -5,
    right: -5,
    borderRadius: 99,
  },
  notiText: {
    lineHeight: 16,
    textAlign: 'center',
    color: Colors.bs4,
    fontSize: 10,
  },
  //----------------
  flex1: {flex: 1},
});

export default User;
