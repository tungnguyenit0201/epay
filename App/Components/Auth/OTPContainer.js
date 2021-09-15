import React, {useRef, useState} from 'react';
import {StyleSheet, View, Pressable, TouchableOpacity} from 'react-native';
import {Text, OTP} from 'components';
import {Colors, Fonts, Spacing} from 'themes';
import {useTranslation} from 'context/Language';
import _ from 'lodash';
import {scale} from 'utils/Functions';
import OTPInputView from '@twotalltotems/react-native-otp-input';

const OTPContainer = ({
  code,
  onChange,
  onCodeFilled,
  message,
  countdown,
  resentOTP,
  onChangePhone,
  label,
}) => {
  const translation = useTranslation();
  return (
    // TODO: translate
    <>
      <Text style={[styles.header, styles.textCenter]}>{`Nhập OTP`}</Text>
      <Text style={[styles.textDefault, styles.textCenter]}>{label}</Text>
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
      {/* <OTP onChange={onChange} message={message} /> */}

      <View style={styles.flexRow_1}>
        <Text style={styles.fontSize_1}>
          Gửi lại mã xác thực (OTP) sau:
          <Pressable
            style={{marginTop: -3}}
            disabled={countdown > 0}
            onPress={resentOTP}>
            <Text
              style={[
                styles.fontSize_1,
                {
                  color: Colors.cl1,
                },
              ]}>
              {countdown > 0 ? ` 00:${countdown}` : ` Gửi lại`}
            </Text>
          </Pressable>
        </Text>

        <Pressable onPress={onChangePhone}>
          <Text style={styles.fontSize_1}>
            {translation.change_the_phone_number}
          </Text>
        </Pressable>
      </View>

      <Text style={styles.message}>{message}</Text>
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

  textCenter: {textAlign: 'center'},
  textDefault: {
    color: Colors.GRAY,
    paddingBottom: Spacing.PADDING - 4,
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
    backgroundColor: Colors.white,
    fontSize: Fonts.H4,
    color: Colors.BLACKTEXT,
    textAlign: 'center',
    borderBottomColor: Colors.cl4,
    borderWidth: 0,
    borderBottomWidth: 1,
    borderRadius: 2,
    height: scale(28),
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
