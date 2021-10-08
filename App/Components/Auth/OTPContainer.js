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
  titleStyle,
}) => {
  const translation = useTranslation();
  return (
    // TODO: translate
    <>
      <Text
        bold
        fs="h3"
        style={[styles.textWhite, styles.mb1, titleStyle]}>{`Nhập OTP`}</Text>
      <Text fs="h6" style={[styles.textGray, styles.mb2]}>
        {label}
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
      {/* <OTP onChange={onChange} message={message} /> */}

      <View style={styles.flexRow_1}>
        <View style={styles.flexRow_1}>
          <Text style={styles.fontSize_1}>Gửi lại mã xác thực (OTP) </Text>

          <Pressable
            //style={{marginTop: -3}}
            disabled={countdown > 0}
            onPress={resentOTP}>
            <Text
              style={[
                styles.fontSize_1,
                {
                  color: Colors.cl1,
                },
              ]}>
              {countdown > 0
                ? ` 0:${countdown < 10 ? `0${countdown}` : countdown}`
                : ` Gửi lại`}
            </Text>
          </Pressable>
        </View>

        {onChangePhone && (
          <Pressable onPress={onChangePhone}>
            <Text style={styles.fontSize_1}>
              {translation.change_the_phone_number}
            </Text>
          </Pressable>
        )}
      </View>

      <Text style={styles.message}>{message}</Text>
    </>
  );
};

const styles = StyleSheet.create({
  mb1: {marginBottom: 12},
  mb2: {marginBottom: 26},
  //-----------------------
  textWhite: {color: Colors.white},
  textGray: {color: Colors.gray},
  //-----------------------
  // header: {
  //   fontSize: 20,
  //   fontWeight: 'bold',
  //   paddingBottom: 8,
  // },
  // textCenter: {textAlign: 'center'},
  // textDefault: {
  //   color: Colors.GRAY,
  //   paddingBottom: Spacing.PADDING - 4,
  //   fontSize: Fonts.FONT_MEDIUM_LARGE,
  // },
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
    height: scale(50),
  },
  message: {
    marginTop: 16,
    color: Colors.Highlight,
    textAlign: 'center',
  },
  fontSize_1: {fontSize: 14},
  flexRow_1: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
});
export default OTPContainer;
