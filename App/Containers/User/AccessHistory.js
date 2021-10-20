import React, {useEffect, useState} from 'react';
import {
  Text,
  HeaderBg,
  Icon,
  Header,
  Row,
  Col,
  Button,
  Modal,
} from 'components';
import {
  ScrollView,
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {PERSONAL_IC, SCREEN} from 'configs/Constants';
import Navigator from 'navigations/Navigator';
import {Colors, Fonts, Images, Spacing, base} from 'themes';
import {scale, formatMoney} from 'utils/Functions';
import {useTranslation} from 'context/Language';

import UserInfo from 'components/User/UserInfo';
import Account from 'components/User/Account';
import DinhDanh from 'components/User/DinhDanh';

import {useSmartOTP} from 'context/User/utils';
import {useUser} from 'context/User';
import {useAuth} from 'context/Auth/utils';
import {useError} from 'context/Common/utils';
const AccessHistory = () => {
  const translation = useTranslation();
  const {userInfo} = useUser();
  return (
    //TODO: TRANSLATE
    <>
      <HeaderBg mb={0}>
        <Header back title={'Lịch sử truy cập ví '} />
      </HeaderBg>
      <View style={[base.bgWhite, styles.flex1]}>
        <Image
          source={require('images/wave.png')}
          style={styles.bgImg}
          resizeMode="stretch"
        />
        <ScrollView contentContainerStyle={[base.container, styles.ptb1]}>
          <TouchableOpacity
            style={[styles.item, styles.boxShadowGray]}
            onPress={() => {
              Navigator.push(SCREEN.CHANGE_PASSWORD, {
                type: 'confirm_password_response',
                headerLabel: 'Đổi mật khẩu',
              });
            }}
          >
            <Image
              source={Images.Profile.BlueMobile}
              resizeMode="contain"
              style={[styles.icon1, styles.mr1]}
            />
            <View style={styles.flex1}>
              <Text fs="h6" bold mb={5}>
                Iphone 12
              </Text>
              <View style={styles.flexRow}>
                <Text fs="sm" color={Colors.tp3} style={styles.flex1} mr={10}>
                  Viet Nam . 23/06/2021 20:18
                </Text>
              </View>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.item, styles.boxShadowGray]}
            onPress={() => {
              Navigator.push(SCREEN.CHANGE_PASSWORD, {
                type: 'confirm_password_response',
                headerLabel: 'Đổi mật khẩu',
              });
            }}
          >
            <Image
              source={Images.Profile.BlueMobile}
              resizeMode="contain"
              style={[styles.icon1, styles.mr1]}
            />
            <View style={styles.flex1}>
              <Text fs="h6" bold mb={5}>
                Iphone X
              </Text>
              <View style={styles.flexRow}>
                <Text fs="sm" color={Colors.tp3} style={styles.flex1} mr={10}>
                  Viet Nam . 23/06/2021 20:18
                </Text>
                <Text fs="sm" color={Colors.tp1}>
                  Đã đăng xuất
                </Text>
              </View>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.item, styles.boxShadowGray]}
            onPress={() => {
              Navigator.push(SCREEN.CHANGE_PASSWORD, {
                type: 'confirm_password_response',
                headerLabel: 'Đổi mật khẩu',
              });
            }}
          >
            <Image
              source={Images.Profile.BlueMobile}
              resizeMode="contain"
              style={[styles.icon1, styles.mr1]}
            />
            <View style={styles.flex1}>
              <Text fs="h6" bold mb={5}>
                Iphone XX
              </Text>
              <View style={styles.flexRow}>
                <Text fs="sm" color={Colors.tp3} style={styles.flex1} mr={10}>
                  Viet Nam . 23/06/2021 20:18
                </Text>
                <Text fs="sm" color={Colors.tp1}>
                  Đã đăng xuất
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  flexRow: {flexDirection: 'row'},
  //----------------
  flex1: {flex: 1},
  // alignCenter: {alignItems: 'center',},
  mr1: {marginRight: 8},
  //----------------
  ptb1: {paddingVertical: 24},
  //----------------
  item: {
    flexDirection: 'row',
    marginBottom: 16,
    paddingVertical: 15,
    paddingHorizontal: Spacing.PADDING - 2,
  },
  //----------------
  icon1: {
    width: scale(28),
    height: scale(28),
  },
  boxTime1: {
    flexDirection: 'row',
    alignItems: 'center',
    top: -3,
  },
  bgImg: {
    width: scale(375),
    height: scale(375),
    position: 'absolute',
    bottom: 0,
    right: 0,
  },
  //---------------
  boxShadowGray: {
    backgroundColor: Colors.bs4,
    shadowColor: 'rgba(0, 0, 0, 1)',
    shadowOpacity: 0.2,
    shadowOffset: {width: 0, height: 0},
    elevation: 24,
    shadowRadius: 8,
    borderRadius: 10,
  },
});

export default AccessHistory;
