import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Text} from 'components';
import {Colors, Spacing} from 'themes';
import OTPInputView from '@twotalltotems/react-native-otp-input';

const SmartOTPInput = ({onFilled, message}) => {
  return (
    <View>
      <OTPInputView // xài đỡ, sau này sửa lại cái khác
        pinCount={6}
        autoFocusOnLoad
        codeInputFieldStyle={{color: Colors.black}}
        onCodeFilled={onFilled}
        style={{
          flexDirection: 'row',
        }}
      />
      <Text style={styles.message}>{message}</Text>
    </View>
  );
};

export default SmartOTPInput;

const styles = StyleSheet.create({
  message: {
    color: Colors.Highlight,
  },
});
