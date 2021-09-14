import React from 'react';
import {StyleSheet, View} from 'react-native';
import Text from '../../Atoms/Text';
import Icon from '../../Atoms/Icon';
import HeaderBg from '../../Atoms/HeaderBg';
import Header from '../../Atoms/Header';
import Button from '../../Atoms/Button';

import OTPBySmartOTPInput from '../../Groups/OTPBySmartOTPInput';

const OTPBySmartOTP = () => {

  return (
    <View style={styles.container}>
      <HeaderBg>
        <Header title={'Xác nhận giao dịch'} back style={{marginBottom: 20}} />
      </HeaderBg>
      <View style={styles.container}>
        <Text>
          Nhấn Xác nhận, mã OTP sẽ được điền tự động để xác thực giao dịch
        </Text>

        <OTPBySmartOTPInput code={'123456'} />
      </View>

      <Button label="Xác nhận" onPress={console.log('hello')} style={{marginTop: 20}} />
    </View>
  );
};

export default OTPBySmartOTP;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
