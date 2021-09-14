import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Button, Text} from 'components';
import {useSmartOTP} from 'context/User/utils';

const SmartOTPResult = () => {
  const {onBackHome} = useSmartOTP();
  return (
    <View style={{flex: 1}}>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>Đặt mật khẩu Smart OTP thành công</Text>
      </View>
      <Button label="Trang chủ" onPress={onBackHome} />
    </View>
  );
};

export default SmartOTPResult;

const styles = StyleSheet.create({});
