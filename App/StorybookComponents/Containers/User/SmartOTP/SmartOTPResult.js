import React from 'react';
import {StyleSheet, View} from 'react-native';
import Text from '../../../Atoms/Text';
import Button from '../../../Atoms/Button';

const SmartOTPResult = () => {
  return (
    <View style={{flex: 1}}>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>Đặt mật khẩu Smart OTP thành công</Text>
      </View>
      <Button label="Trang chủ" onPress={() => console.log('hello')} />
    </View>
  );
};

export default SmartOTPResult;

const styles = StyleSheet.create({});
