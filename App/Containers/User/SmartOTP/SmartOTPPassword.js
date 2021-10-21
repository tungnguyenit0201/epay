import React from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {Header, HeaderBg, Text} from 'components';
import {Colors} from 'themes';
import {useSmartOTP} from 'context/User/utils';
import SmartOTPInput from 'components/User/SmartOTP/SmartOTPInput';

const SmartOTPPassword = ({route}) => {
  const {message, parseTitle, type, onPassword} = useSmartOTP(route?.params);

  return (
    <View style={styles.container}>
      <HeaderBg>
        <Header back style={{marginBottom: 25}} />
      </HeaderBg>
      <Text>{parseTitle()}</Text>
      <SmartOTPInput onFilled={onPassword} message={message} />
      {['changePassword', 'sync'].includes(type) && (
        <TouchableOpacity>
          <Text>Quên mật khẩu</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default SmartOTPPassword;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.bs4,
  },
});
