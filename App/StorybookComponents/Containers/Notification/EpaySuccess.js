import React, {useRef, useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  Pressable,
  Image,
  FlatList,
} from 'react-native';
import {Colors, Fonts, Images, Spacing, base} from 'themes';
import {scale} from '../../Utils/Functions';

import Text from '../../Atoms/Text';
import Header from '../../Atoms/Header';
import Button from '../../Atoms/Button';
import Row from '../../Atoms/Row';
import Col from '../../Atoms/Col';
import HeaderBg from '../../Atoms/HeaderBg';
const CheckoutSuccess = () => {
  const translation = require('../../../Context/Language/vi.json');
  const data = [
    {
      name: 'Chuyển từ',
      val: 'Ví Epay',
    },
    {
      name: 'Chuyển đến',
      val: 'Bảo An Đỗ',
    },
    {
      name: 'Số điện thoại',
      val: '909000999',
    },
    {
      name: 'Số tiền',
      val: '100.000.000 vnđ',
    },
    {
      name: 'Lời nhắn',
      val: 'Nạp tiền điện thoại cho An...',
    },
    {
      name: 'Phí giao dịch',
      val: '0 vnđ',
    },
    {
      name: 'Tổng số tiền',
      val: '100.550.000 vnđ',
    },
  ];

  return (
    <>
      <HeaderBg>
        <Header
          title={translation.transaction_details}
          back
          style={{marginTop: 25, marginBottom: -15}}
        />
      </HeaderBg>
      <ScrollView style={base.wrap}>
        <View style={base.container}>
          <View style={styles.success}>
            <Image
              source={require('images/noti/Noti.png').default}
              style={styles.imgSuccess}
            />
            <Text bold fs="h5" mb={15}>
              {translation.epay_notification}
            </Text>
            <Text centered>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry.
            </Text>
          </View>
          <View style={styles.block}>
            <Text>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat aliqua.
            </Text>
          </View>
        </View>
      </ScrollView>
      <Image source={require('images/wave.png').default} style={styles.bgImg} />
    </>
  );
};
const styles = StyleSheet.create({
  bgImg: {
    width: scale(375),
    height: scale(375),
    position: 'absolute',
    bottom: 0,
    right: 0,
  },

  block: {
    marginBottom: 20,
    marginTop: 20,
    position: 'relative',
    minHeight: 128,
  },
  success: {
    alignItems: 'center',
    marginBottom: 20,
  },
  imgSuccess: {
    width: 80,
    height: 80,
    marginBottom: 10,
  },

  linkHome: {
    textDecorationLine: 'underline',
  },
});
export default CheckoutSuccess;
