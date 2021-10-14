import React, {useRef, useState} from 'react';
import {Image, StyleSheet, View, TouchableOpacity} from 'react-native';
import {Text, Header, Button, Icon, Modal, HeaderBg} from 'components';
import {base, Colors, Fonts, Images, Spacing} from 'themes';
import _ from 'lodash';
import OTPContainer from 'components/Auth/OTPContainer';
import {useTranslation} from 'context/Language';
import {useAuth} from 'context/Auth/utils';
import {useOTP} from 'context/Common/utils';
import {HelpModal} from 'components/Auth';
import BlueHeader from 'components/Auth/BlueHeader';
import {useUser} from 'context/User';
import {scale} from 'utils/Functions';
import {FUNCTION_TYPE} from 'configs/Constants';
const OTP = ({route}) => {
  const {onChangePhone} = useAuth();
  const {token: isLoggedIn} = useUser();

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
    functionType,
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

  const renderOTPContainer = () => (
    <OTPContainer
      onChange={onChange}
      onCodeFilled={onConfirmOTP}
      message={errorMessage}
      code={code}
      countdown={countdown}
      resentOTP={resentOTP}
      onChangePhone={isLoggedIn ? null : onChangePhone}
      // TODO: translate
      label={
        route?.params?.email
          ? `Mã xác thực gửi về mail ${route?.params?.email}. Vui lòng kiểm tra email & nhập thông tin bên dưới`
          : label
      }
      titleStyle={isLoggedIn ? {color: Colors.BLACKTEXT} : {}}
    />
  );

  return (
    <>
      {isLoggedIn ? (
        <>
          <HeaderBg>
            <Header back title={translation.common.authen} />
          </HeaderBg>
          <View
            style={[
              styles.wrap,
              base.bgWhite,
              {paddingTop: scale(28), flex: 1},
            ]}>
            {renderOTPContainer()}
          </View>
        </>
      ) : (
        <BlueHeader>
          <Header
            back
            // blackIcon
            // avoidStatusBar
            renderRightComponent={() => renderRightComponent()}
            logo={Images.logoEpay}
            style={styles.mt}
          />

          <View style={[styles.wrap, {paddingTop: Spacing.PADDING}]}>
            {renderOTPContainer()}
          </View>
        </BlueHeader>
      )}
      <View style={styles.wrapCalMe}>
        <TouchableOpacity
          style={styles.callMe}
          onPress={() => setShowModal(true)}>
          <Image source={Images.Phone} style={styles.iconPhone} />
          <Text mb={-3} centered fw="700">
            {translation.call_epay}
          </Text>
        </TouchableOpacity>
      </View>

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
  textCenter: {textAlign: 'center'},
  //-----------------------------
  bgGray: {backgroundColor: Colors.g3},
  bgGray1: {backgroundColor: Colors.g4},
  //-----------------------------
  iconRight: {paddingRight: Spacing.PADDING},
  iconPhone: {
    height: Spacing.PADDING,
    width: Spacing.PADDING,
    marginRight: 10,
  },
  lineSize: {
    width: 1,
    height: 25,
  },
  iconSize: {
    width: 20,
    height: 20,
  },
  mt: {
    marginTop: -10,
  },
  wrapCalMe: {
    paddingVertical: scale(10),
    backgroundColor: Colors.g3,
  },
  callMe: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRightWidth: 1,
    borderLeftWidth: 1,
    borderColor: Colors.g4,
    marginHorizontal: scale(30),
    height: 25,
  },
});
export default OTP;
