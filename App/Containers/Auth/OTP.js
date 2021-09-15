import React, {useRef, useState} from 'react';
import {
  Image,
  StyleSheet,
  View,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import {Text, Header, Button, Icon} from 'components';
import {Colors, Fonts, Images, Spacing} from 'themes';
import _ from 'lodash';
import OTPContainer from 'components/Auth/OTPContainer';
import {useTranslation} from 'context/Language';
import {useAuth} from 'context/Auth/utils';
import {useOTP} from 'context/Common/utils';
import {HelpModal} from 'components/Auth';
import BlueHeader from 'components/Auth/BlueHeader';

const OTP = ({route}) => {
  const {onChangePhone} = useAuth();
  const {
    errorMessage,
    countdown,
    code,
    showModal,
    setShowModal,
    onChange,
    onConfirmOTP,
    resentOTP,
    openCallDialog,
    label,
  } = useOTP(route?.params);
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
      <BlueHeader>
        <Header
          back
          // blackIcon
          // avoidStatusBar
          renderRightComponent={() => renderRightComponent()}
          logo={Images.logoEpay}
        />

        <View style={[styles.wrap, {paddingTop: Spacing.PADDING}]}>
          <OTPContainer
            onChange={onChange}
            onCodeFilled={onConfirmOTP}
            message={errorMessage}
            code={code}
            countdown={countdown}
            resentOTP={resentOTP}
            onChangePhone={onChangePhone}
            label={label}
          />
        </View>
      </BlueHeader>

      <TouchableOpacity
        style={[
          styles.flexRow,
          styles.justifyCenter,
          styles.bgGray,
          {paddingVertical: Spacing.PADDING - 5},
        ]}
        onPress={() => setShowModal(true)}>
        <View
          style={[
            styles.lineSize,
            styles.absolute,
            styles.bgGray2,
            styles.top1,
            styles.left1,
          ]}></View>
        <View
          style={[
            styles.lineSize,
            styles.absolute,
            styles.bgGray2,
            styles.top1,
            styles.right1,
          ]}></View>
        <Image
          source={Images.Phone}
          style={{
            height: Spacing.PADDING,
            width: Spacing.PADDING,
            marginRight: 10,
            top: 1,
          }}
        />
        <Text bold>Gọi cho tôi</Text>
      </TouchableOpacity>

      <HelpModal
        showModal={showModal}
        setShowModal={setShowModal}
        onPress={openCallDialog}
      />
    </>
  );
};

const styles = StyleSheet.create({
  wrap: {paddingHorizontal: Spacing.PADDING},
  //-----------------------------
  absolute: {position: 'absolute'},
  top1: {top: 15},
  left1: {left: 30},
  right1: {right: 30},
  //-----------------------------
  flexRow: {flexDirection: 'row'},
  justifyCenter: {justifyContent: 'center'},
  //-----------------------------
  bgGray: {backgroundColor: Colors.OtpGray_1},
  bgGray2: {backgroundColor: Colors.OtpGray_2},
  //-----------------------------
  iconRight: {paddingRight: Spacing.PADDING},
  lineSize: {
    width: 1,
    height: 25,
  },
  iconSize: {
    width: 20,
    height: 20,
  },
});
export default OTP;
