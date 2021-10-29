import React, {useRef, useEffect} from 'react';
import {StyleSheet, View, Pressable, TouchableOpacity} from 'react-native';
import {Text, OTP} from 'components';
import {Colors, Fonts, Spacing} from 'themes';
import {useTranslation} from 'context/Language';
import _ from 'lodash';
import {scale} from 'utils/Functions';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import WebView from 'components/WebView/Partial';

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
  const otpRef = useRef(null);

  useEffect(() => {
    if (code || !message) {
      return;
    }
    setTimeout(() => {
      otpRef.current?.focusField(0);
    }, 500);
  }, [code, message]);

  return (
    <>
      <Text bold fs="h3" style={[styles.textWhite, styles.mb1, titleStyle]}>
        {translation.enter_otp}
      </Text>
      <Text fs="h6" style={[styles.textGray, styles.mb2]}>
        {label}
      </Text>
      <OTPInputView
        ref={otpRef}
        style={styles.wrapOtp}
        pinCount={6}
        onCodeChanged={onChange}
        autoFocusOnLoad
        codeInputFieldStyle={styles.otp}
        codeInputHighlightStyle={{}}
        selectionColor={Colors.brd2}
        onCodeFilled={onCodeFilled}
        clearInputs={message}
        code={code}
      />
      {/* <OTP onChange={onChange} message={message} /> */}

      <View style={styles.flexRow_1}>
        <View style={styles.flexRow_1}>
          <Text style={styles.fontSize_1}>
            {translation.resend_the_verification_code_otp}{' '}
          </Text>

          <Pressable
            //style={{marginTop: -3}}
            disabled={countdown > 0}
            onPress={resentOTP}
          >
            <Text
              style={[
                styles.fontSize_1,
                {
                  color: Colors.brd1,
                },
              ]}
            >
              {countdown > 0
                ? ` 0:${countdown < 10 ? `0${countdown}` : countdown}`
                : translation.otp.resend}
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

      {!!message && (
        <WebView
          style={styles.message}
          source={{html: `<p class="markRed">${message}</p>`}}
        />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  mb1: {marginBottom: 12},
  mb2: {marginBottom: 26},
  //-----------------------
  textWhite: {color: Colors.bs4},
  textGray: {color: Colors.tp3},
  //-----------------------
  // header: {
  //   fontSize: 20,
  //   fontWeight: 'bold',
  //   paddingBottom: 8,
  // },
  // textCenter: {textAlign: 'center'},
  // textDefault: {
  //   color: Colors.tp3,
  //   paddingBottom: Spacing.PADDING - 4,
  //   fontSize: Fonts.MD_LARGE,
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
    /* backgroundColor: 'transparent', */
    fontWeight: '700',
    fontSize: Fonts.H4,
    color: Colors.tp2,
    textAlign: 'center',
    borderBottomColor: Colors.g2,
    borderWidth: 0,
    borderBottomWidth: 3,
    borderRadius: 2,
    height: scale(50),
  },
  message: {
    marginTop: Spacing.PADDING,
    // color: Colors.Highlight,
    // textAlign: 'center',
    minHeight: scale(70),
  },
  fontSize_1: {fontSize: 14},
  flexRow_1: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
});
export default OTPContainer;
