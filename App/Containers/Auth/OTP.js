import React, {useRef, useState} from 'react';
import {Image, StyleSheet, View, TouchableOpacity} from 'react-native';
import {Text, Header, Button, Icon} from 'components';
import {Colors, Fonts, Images, Spacing} from 'themes';
import _ from 'lodash';
import OTPContainer from 'components/Auth/OTPContainer';
import {useTranslation} from 'context/Language';
import {useAuth} from 'context/Auth/utils';
import {useOTP} from 'context/Common/utils';
import {HelpModal} from 'components/Auth';

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
  } = useOTP(route?.params);
  const translation = useTranslation();

  const renderRightComponent = () => (
    <TouchableOpacity
      onPress={() => setShowModal(true)}
      style={styles.iconRight}>
      <Icon icon={Images.Register.Info} tintColor={Colors.BLACK} />
    </TouchableOpacity>
  );

  return (
    // TODO: translate
    <>
      <View>
        <Header
          back
          blackIcon
          style={styles.header}
          renderRightComponent={() => renderRightComponent()}
        />
      </View>

      <View style={styles.container}>
        <View style={[styles.wrap, {paddingTop: Spacing.PADDING}]}>
          <View style={styles.logo}>
            <Image source={Images.logoEpay} resizeMode="contain" />
          </View>
          <OTPContainer
            onChange={onChange}
            onCodeFilled={onConfirmOTP}
            message={errorMessage}
            code={code}
            countdown={countdown}
            resentOTP={resentOTP}
            onChangePhone={onChangePhone}
          />
        </View>
      </View>
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          paddingVertical: Spacing.PADDING - 5,
          backgroundColor: Colors.OtpGray_1,
        }}
        onPress={() => setShowModal(true)}>
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
  container: {
    flex: 1,
    backgroundColor: Colors.BACKGROUNDCOLOR,
  },
  header: {
    paddingTop: 10,
    backgroundColor: Colors.white,
    color: Colors.BLACK,
  },
  logo: {
    marginBottom: Spacing.PADDING + 40,
    alignItems: 'center',
  },
  wrap: {
    paddingHorizontal: Spacing.PADDING,
  },
  iconRight: {
    paddingRight: Spacing.PADDING,
  },
});
export default OTP;
