import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Button, Header, InputBlock, Text} from 'components';
import {SCREEN, TEXT} from 'configs/Constants';
import Navigator from 'navigations/Navigator';

const PaymentSettings = () => {
  return (
    <View>
      <Header title={'Cài đặt thanh toán'} back />
      <Text>Cài đặt hạn mức: 50000000đ</Text>
    </View>
  );
};

export default PaymentSettings;

const styles = StyleSheet.create({});
