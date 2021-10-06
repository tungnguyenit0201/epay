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
      label={label}
      titleStyle={isLoggedIn ? {color: Colors.BLACKTEXT} : {}}
    />
  );

  return (
    // TODO: translate
    <>
      {isLoggedIn ? (
        <>
          <HeaderBg>
            <Header back title="Xác thực" />
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
          />

          <View style={[styles.wrap, {paddingTop: Spacing.PADDING}]}>
            {renderOTPContainer()}
          </View>
        </BlueHeader>
      )}

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

      {/* <HelpModal
        showModal={showModal}
        setShowModal={setShowModal}
        onPress={openCallDialog}
      /> */}
      <Modal
        visible={showModal}
        onClose={() => setShowModal(false)}
        title="Gọi tổng đài"
        content="Nếu bạn đang gặp vấn đề cần được giúp đỡ, 
          vui lòng gọi về cho chúng tôi để được tư vấn hỗ trợ"
        buttonGroup={() => (
          <>
            <Button mb={15} label="Gọi 1900-0000" bold onPress={() => {}} />
            <TouchableOpacity onPress={() => setShowModal(false)}>
              <Text style={styles.textCenter}>Không, cảm ơn</Text>
            </TouchableOpacity>
          </>
        )}
        icon={Images.SignUp.TouchId}
        // icon={Images.SignUp.BigPhone}
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
  bgGray: {backgroundColor: Colors.OtpGray_1},
  bgGray1: {backgroundColor: Colors.OtpGray_2},
  //-----------------------------
  iconRight: {paddingRight: Spacing.PADDING},
  iconPhone: {
    height: Spacing.PADDING,
    width: Spacing.PADDING,
    marginRight: 10,
    top: 1,
  },
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
