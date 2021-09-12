import React from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import Text from '../../../Atoms/Text';
import Header from '../../../Atoms/Header';
import HeaderBg from '../../../Atoms/HeaderBg';
import {Colors} from 'themes';
import SmartOTPInput from '../../../Groups/SmartOTPInput';

const SmartOTPPassword = ({route}) => {

  return (
    <View style={styles.container}>
      <HeaderBg>
        <Header back style={{marginBottom: 25}} />
      </HeaderBg>
      <Text>{'Đặt mật khẩu smart OTP'}</Text>
      <SmartOTPInput message={'Hãy nhập mã Otp'} />
      {/* {['changePassword', 'sync'].includes(type) && ( */}
        <TouchableOpacity>
          <Text>Quên mật khẩu</Text>
        </TouchableOpacity>
      {/* )} */}
    </View>
  );
};

export default SmartOTPPassword;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
});
