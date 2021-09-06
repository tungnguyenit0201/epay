import React from 'react';
import {StyleSheet, View} from 'react-native';
import {HeaderBg, Header, Text, Button} from 'components';
import {useOTPBySmartOTP} from 'context/Wallet/utils';
import OTPBySmartOTPInput from 'components/User/SmartOTP/OTPBySmartOTPInput';

const OTPBySmartOTP = () => {
  const {code, onConfirm} = useOTPBySmartOTP();

  return (
    <View style={styles.container}>
      <HeaderBg>
        <Header title={'Xác nhận giao dịch'} back style={{marginBottom: 20}} />
      </HeaderBg>
      <View style={styles.container}>
        <Text>
          Nhấn Xác nhận, mã OTP sẽ được điền tự động để xác thực giao dịch
        </Text>

        <OTPBySmartOTPInput code={code} />
      </View>

      <Button label="Xác nhận" onPress={onConfirm} />
    </View>
  );
};

export default OTPBySmartOTP;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
