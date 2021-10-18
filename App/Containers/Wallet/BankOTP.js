import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {HeaderBg, Header, Button, Text} from 'components';
import OTPBySmartOTPInput from 'components/User/SmartOTP/OTPBySmartOTPInput';
import {useTranslation} from 'context/Language';
import {Fonts, base, Colors} from 'themes';
import {scale} from 'utils/Functions';
import {useOTPByBankOTP} from 'context/Wallet/utils/topUpWithdraw';
import OTPInputView from '@twotalltotems/react-native-otp-input';

const BankOTP = props => {
  const {code, time, onCodeChanged, onCodeFilled} = useOTPByBankOTP();
  const translation = useTranslation();

  const renderOTP = useCallback(() => {
    return (
      <OTPInputView
        style={styles.inputContainer}
        pinCount={6}
        code={code} //You can supply this prop or not. The component will be used as a controlled / uncontrolled component respectively.
        onCodeChanged={onCodeChanged}
        autoFocusOnLoad
        codeInputFieldStyle={styles.inputTextField}
        onCodeFilled={onCodeFilled}
      />
    );
  }, [code]);

  const renderTime = useCallback(() => {
    return (
      <Text centered mv={10}>
        <Text size={scale(16)} centered fw={'400'}>
          {translation.otp.timeOTP}
        </Text>
        <Text centered bold>{`${time}s`}</Text>
      </Text>
    );
  }, [time]);

  const renderHeader = useMemo(
    () => () => {
      return (
        <>
          <Text mb={5} fs={'h3'} fw={'600'} color={Colors.tp2}>
            {translation.otp.enterOTP}
          </Text>
          <Text mt={10} mb={35} size={scale(16)} fw={'400'}>
            {translation.otp.bankOTP}{' '}
          </Text>
        </>
      );
    },
    [],
  );

  return (
    <View style={styles.container}>
      <HeaderBg>
        <Header title={translation.common.authen} back />
      </HeaderBg>
      <View style={styles.content}>
        {renderHeader()}
        {renderOTP()}

        {renderTime()}
      </View>
    </View>
  );
};

export default BankOTP;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.bs4,
  },
  content: {
    flex: 1,
    paddingHorizontal: scale(19),
    paddingTop: 28,
  },
  inputContainer: {
    height: scale(70),
    marginHorizontal: scale(16),
  },
  inputTextField: {
    width: scale(40),
    backgroundColor: Colors.bs4,
    borderBottomColor: Colors.bs1,
    borderWidth: 0,
    borderBottomWidth: 2,
    borderRadius: 2,
    color: Colors.tp2,
    fontSize: Fonts.H2,
  },
});
