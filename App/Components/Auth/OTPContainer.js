import React, {useRef, useState} from 'react';
import {StyleSheet} from 'react-native';
import {Text, OTP} from 'components';
import {Colors, Fonts, Spacing} from 'themes';
import _ from 'lodash';
import {scale} from 'utils/Functions';
import OTPInputView from '@twotalltotems/react-native-otp-input';

const OTPContainer = ({onChange, onCodeFilled, message}) => {
  return (
    <>
      <Text style={styles.header}>{`Nhập OTP`}</Text>
      <Text style={styles.textDefault}>
        {`Bạn chỉ cần nhập mã OTP đã gửi tới số điện thoại đã đăng ký`}
      </Text>
      <OTPInputView
        style={styles.wrapOtp}
        pinCount={6}
        onCodeChanged={onChange}
        autoFocusOnLoad
        codeInputFieldStyle={styles.otp}
        codeInputHighlightStyle={{}}
        onCodeFilled={onCodeFilled}
      />
      <Text style={styles.message}>{message}</Text>
      {/* <OTP onChange={onChange} message={message} /> */}
    </>
  );
};

const styles = StyleSheet.create({
  wrap: {
    paddingHorizontal: Spacing.PADDING,
    paddingTop: Spacing.PADDING * 3,
  },
  header: {
    fontSize: Fonts.FONT_LARGE,
    fontWeight: 'bold',
    paddingBottom: Spacing.PADDING,
  },
  loading: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  confirmation: {
    marginTop: Spacing.PADDING * 2,
  },
  textDefault: {
    color: Colors.GRAY,
    paddingBottom: Spacing.PADDING,
    fontSize: Fonts.FONT_MEDIUM_LARGE,
  },
  wrapOtp: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'center',
    marginBottom: Spacing.PADDING * 2,
    width: '90%',
  },
  otp: {
    width: scale(40),
    backgroundColor: 'transparent',
    fontSize: Fonts.FONT_LARGE,
    color: Colors.BLACKTEXT,
    textAlign: 'center',
    borderColor: Colors.BLACKTEXT,
    borderWidth: 1,
    borderRadius: 0,
  },
  message: {
    color: Colors.Highlight,
    marginBottom: Spacing.PADDING,
  },
});
export default OTPContainer;
