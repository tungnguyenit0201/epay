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
import Modal from 'react-native-modal';
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
        isVisible={showModal}
        transparent={true}
        onBackdropPress={() => setShowModal(false)}
        style={styles.alignCenter}>
        <View
          style={[
            styles.bgWhite,
            styles.maxWidth1,
            styles.w1,
            styles.borderRadius1,
            styles.pb1,
          ]}>
          <ImageBackground
            source={Images.SignUp.BlueWave}
            style={[
              styles.fullWidth,
              styles.alignCenter,
              styles.justifyCenter,
              styles.h1,
            ]}
            resizeMode="contain">
            {/* icon big phone 
              <Image source={Images.SignUp.BigPhone} 
                style={[styles.iconBigPhone,styles.topMinus1]} 
                resizeMode='contain'/> */}

            <Image
              source={Images.SignUp.TouchId}
              style={[styles.iconBigPhone, styles.topMinus1]}
              resizeMode="contain"
            />
          </ImageBackground>

          <Text bold fs="h6" centered mb={8}>
            Gọi tổng đài
          </Text>
          {/* <Pressable style={styles.btn_1} onPress={() => setShowModal(false)}>
            <Image source={Images.WidthDraw.Plus} style={styles.img} />
          </Pressable> */}

          <View style={[styles.px1]}>
            <Text centered fs="md" mb={42}>
              Nếu bạn đang gặp vấn đề cần được giúp đỡ, vui lòng gọi về cho
              chúng tôi để được tư vấn hỗ trợ
            </Text>
            <Button mb={15} label="Gọi 1900-0000" bold onPress={() => {}} />
            <TouchableOpacity onPress={() => setShowModal(false)}>
              <Text style={styles.textCenter}>Không, cảm ơn</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  wrap: {paddingHorizontal: Spacing.PADDING},
  //-----------------------------
  absolute: {position: 'absolute'},
  top1: {top: 15},
  topMinus1: {top: -22},
  left1: {left: 30},
  right1: {right: 30},
  //-----------------------------
  flexRow: {flexDirection: 'row'},
  alignCenter: {alignItems: 'center'},
  justifyCenter: {justifyContent: 'center'},
  //-----------------------------
  fullWidth: {width: '100%'},
  w1: {width: '90%'},
  maxWidth1: {maxWidth: 311},
  //-----------------------------
  h1: {height: 195},
  //-----------------------------
  px1: {paddingHorizontal: 32},
  pb1: {paddingBottom: 15},
  //-----------------------------
  textCenter: {textAlign: 'center'},
  //-----------------------------
  bgGray: {backgroundColor: Colors.OtpGray_1},
  bgGray1: {backgroundColor: Colors.OtpGray_2},
  bgWhite: {backgroundColor: Colors.BACKGROUNDCOLOR},
  //-----------------------------
  borderRadius1: {borderRadius: Spacing.PADDING},
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
  iconBigPhone: {
    width: 64,
    height: 64,
  },
});
export default OTP;
