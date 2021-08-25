import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Header, HeaderBg} from 'components';
import {Colors} from 'themes';
import {useSmartOTP} from 'context/User/utils';
import SmartOTPInput from 'components/User/SmartOTP/SmartOTPInput';

const SmartOTPPassword = ({route}) => {
  const {type} = route?.params;
  const {message, onPassword} = useSmartOTP(route?.params);

  return (
    <View style={styles.container}>
      <HeaderBg>
        <Header back style={{marginBottom: 25}} />
      </HeaderBg>
      <Text>
        {type === 'password'
          ? 'Đặt mật khẩu smart OTP'
          : 'Xác nhận mật khẩu smart OTP'}
      </Text>
      <SmartOTPInput onFilled={onPassword} message={message} />
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
