import React, { useRef, useState } from 'react';
import { Image, StyleSheet, View, TouchableOpacity } from 'react-native';
import { Text, Header, Button, Icon, Modal, HeaderBg } from 'components';
import { Colors, Fonts, Images, Spacing } from 'themes';
import _ from 'lodash';
import OTPContainer from 'components/Auth/OTPContainer';
import { useTranslation } from 'context/Language';
import { useAuth } from 'context/Auth/utils';
import BlueHeader from 'components/Auth/BlueHeader';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import { scale } from 'utils/Functions';

const BankOTP = ({ route }) => {
  const { onChangePhone } = useAuth();
  const translation = useTranslation();

  const renderRightComponent = () => (
    <TouchableOpacity
      onPress={() => setShowModal(true)}
      style={styles.iconRight}>
      <Icon
        icon={Images.Register.Info}
        tintColor={Colors.white}
        style={styles.iconSize}
      />
    </TouchableOpacity>
  );

  return (
    // TODO: translate
    <>
      <HeaderBg>
        <Header title={translation.common.authen} back />
      </HeaderBg>

      <View style={[styles.wrap, { paddingTop: Spacing.PADDING }]}>

        <Text
          bold
          fs="h3">{translation.otp.enterOTP}</Text>
        <Text style={{
          fontSize: scale(16),
          color: Colors.l8
        }}>
          {"Lorem ipsum dolor sit amet, consectetur adipiscing elit."}
        </Text>
        <OTPInputView
          style={styles.wrapOtp}
          pinCount={6}
          onCodeChanged={()=>{

          }}
          autoFocusOnLoad
          codeInputFieldStyle={styles.otp}
          codeInputHighlightStyle={{}}
          onCodeFilled={()=>{

          }}
          clearInputs={"message"}
          code={"code"}
        />

      </View>

      <TouchableOpacity
        style={[
          styles.flexRow,
          styles.justifyCenter,
          styles.bgGray,
          { paddingVertical: Spacing.PADDING - 5 },
        ]}
        onPress={() => setShowModal(true)}>
        <View
          style={[
            styles.lineSize,
            styles.absolute,
            styles.bgGray1,
            styles.top1,
            styles.left1,
          ]}></View>
        <View
          style={[
            styles.lineSize,
            styles.absolute,
            styles.bgGray1,
            styles.top1,
            styles.right1,
          ]}></View>
        <Image source={Images.Phone} style={styles.iconPhone} />
        <Text bold>Gọi cho tôi</Text>
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  wrap: {
    paddingHorizontal: Spacing.PADDING,
    backgroundColor: Colors.BACKGROUNDCOLOR
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
  }
});
export default BankOTP;
