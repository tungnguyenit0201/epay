import React, {useRef, useState} from 'react';
import {StyleSheet, View, Pressable, Image} from 'react-native';
import {Text, Row, Col} from 'components';
import {Colors, Fonts, base, Images} from 'themes';
import Navigator from 'navigations/Navigator';

import {SCREEN} from 'configs/Constants';
import {scale} from 'utils/Functions';

import {useTranslation} from 'context/Language';
const Notification = () => {
  const translation = useTranslation();

  const dataMenu = [
    {
      icon: require('images/favicon.png'),
      name: 'EPay',
      screen: SCREEN.HOME,
    },
    {
      icon: require('images/History.png'),
      name: 'Lịch sử GD',
      screen: SCREEN.HOME,
    },
    {
      icon: require('images/Profile.png'),
      name: 'Tài khoản',
      screen: SCREEN.HOME,
    },
    {
      icon: require('images/Help.png'),
      name: 'Hỗ trợ',
      screen: SCREEN.HOME,
    },
  ];

  return (
    <View style={[base.bottom, base.shadow, styles.block]}>
      <Row space="2">
        {dataMenu.map((item, index) => {
          return (
            <Col space="2" width="25%" key={index}>
              <Pressable onPress={() => Navigator.navigate(item.screen)}>
                <View style={styles.wicon}>
                  <Image source={item.icon} style={styles.icon} />
                </View>
                <Text style={styles.title}>{item.name}</Text>
              </Pressable>
            </Col>
          );
        })}
      </Row>
    </View>
  );
};
const styles = StyleSheet.create({
  block: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  wicon: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  icon: {
    width: 20,
    height: 20,
  },
  title: {fontWeight: '500', textAlign: 'center'},
});
export default Notification;
