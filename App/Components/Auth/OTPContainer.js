import React, {useRef, useState} from 'react';
import {StyleSheet, View, Pressable, TouchableOpacity} from 'react-native';
import {Text, OTP} from 'components';
import {Colors, Fonts, Spacing} from 'themes';
import {useTranslation} from 'context/Language';
import _ from 'lodash';
import {scale} from 'utils/Functions';
import OTPInputView from '@twotalltotems/react-native-otp-input';

const OTPContainer = ({code, onChange, onCodeFilled, message}) => {
  const translation = useTranslation();
  return (
    <>
      <Text style={[styles.header,styles.textCenter]}>{`Nhập OTP`}</Text>
      <Text style={[styles.textDefault,styles.textCenter]}>
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
        clearInputs={message}
        code={code}
      />
      {/* <Text style={styles.message}>{message}</Text> */}
      {/* <OTP onChange={onChange} message={message} /> */}

      {/* show message when app send otp code again */}
      <View style={styles.flexRow_1}>
        <Text style={styles.fontSize_1}>
          Gửi lại mã xác thực (OTP) sau:
          <Pressable style={{marginTop: -3}}>
            <Text style={[styles.fontSize_1,{
              color: '#437ec0'
            }]}> 00:51</Text>
          </Pressable>
        </Text>

        <Pressable>
          <Text style={styles.fontSize_1}>{translation.change_the_phone_number}</Text>
        </Pressable>
      </View>

      <Text style={styles.message}>{translation.incorrect_verification_code}</Text>
    </>
  );
};

const styles = StyleSheet.create({
  // wrap: {
  //   paddingHorizontal: Spacing.PADDING,
  //   paddingTop: Spacing.PADDING * 3,
  // },
  header: {
    fontSize: 20,
    // lineHeight: 28,
    fontWeight: 'bold',
    paddingBottom: 8,
  },
  loading: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  confirmation: {
    marginTop: Spacing.PADDING * 2,
  },
  textCenter: {textAlign: 'center'},
  textDefault: {
    color: Colors.GRAY,
    paddingBottom: Spacing.PADDING-4,
    fontSize: Fonts.FONT_MEDIUM_LARGE,
  },
  wrapOtp: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'center',
    marginBottom: 16,
    width: '90%',
  },
  otp: {
    width: scale(40),
    backgroundColor: 'transparent',
    fontSize: Fonts.FONT_LARGE,
    color: Colors.BLACKTEXT,
    textAlign: 'center',
    borderColor: Colors.cl4,
    borderWidth: 1,
    borderRadius: 2,
  },
  message: {
    marginTop: 16,
    color: Colors.Highlight,
    textAlign: 'center',
    // marginBottom: Spacing.PADDING,
  },
  fontSize_1: {fontSize: 14},
  flexRow_1: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
});
export default OTPContainer;
