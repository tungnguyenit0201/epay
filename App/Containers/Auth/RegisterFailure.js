import React, {useRef, useState, useEffect} from 'react';
import {
  ScrollView,
  StyleSheet,
  Image,
  View,
  TouchableOpacity,
} from 'react-native';
import {Text, Header, Button, FooterContainer, Icon} from 'components';
import {Colors, Fonts, Spacing, Images} from 'themes';
import {useTranslation} from 'context/Language';
import {scale} from 'utils/Functions';
import {useOTP} from 'context/Common/utils';
import {useRegister} from 'context/Auth/utils';
import {FUNCTION_TYPE, SCREEN} from 'configs/Constants';
import BlueHeader from 'components/Auth/BlueHeader';
import {Content} from 'components/Auth';
import {HelpModal} from 'components/Auth';
const RegisterFailure = ({route}) => {
  const translation = useTranslation();
  const {openCallDialog, showModal, setShowModal} = useOTP({
    ...route?.params,
    isMount: false,
  });
  const {onNavigate} = useRegister();

  const renderRightComponent = () => (
    <TouchableOpacity
      onPress={() => setShowModal(true)}
      style={styles.iconRight}
    >
      <Icon
        icon={Images.Register.Info}
        tintColor={Colors.bs4}
        style={styles.iconSize}
      />
    </TouchableOpacity>
  );

  return (
    // TODO: translate
    <>
      <BlueHeader heightBg="100%" style={styles.pt1}>
        <Header
          // blackIcon
          // avoidStatusBar
          logo={Images.logoEpay}
          onPressBack={() =>
            route?.params?.functionType === FUNCTION_TYPE.FORGOT_PASS
              ? onNavigate(SCREEN.LOGIN)
              : onNavigate(SCREEN.AUTH)
          }
          renderRightComponent={() => renderRightComponent()}
        />
        <View style={styles.wrap}>
          <Text color={Colors.bs4} bold fs={'h3'}>
            {(route?.params?.content?.title || translation.sign_up) +
              '\n' +
              translation.transaction.failure}
          </Text>
          {/* <Text color={Colors.bs4} mb={15} bold fs={'h3'}>
            {translation.transaction.failure}
          </Text> */}
          <Text color={Colors.bs4} fs={'md'} mt={15} style={styles.line}>
            {route?.params?.content?.text ||
              translation.you_have_entered_the_otp_incorrectly_three_times_please_wait_30_minutes_and_try_again}
          </Text>
        </View>
      </BlueHeader>
      <FooterContainer>
        {/* <Button
          label={`Gọi ${route?.params?.content?.hotline || '024 32252336'}`}
          style={styles.btn}
          onPress={openCallDialog}
          mb={Spacing.PADDING - 10}
        /> */}
        <Button
          label={`Gọi ${route?.params?.content?.hotline || '1900-000'}`}
          style={styles.btn}
          // bg={Colors.bs4}
          // color={Colors.tp2}
          border={Colors.bs1}
          onPress={() => setShowModal(true)}
        />
        <Button
          label={translation.come_back_later}
          style={styles.btn}
          // bg={Colors.bs4}
          // color={Colors.tp2}
          border={Colors.bs1}
          mode="outline"
          onPress={() =>
            route?.params?.functionType === FUNCTION_TYPE.FORGOT_PASS
              ? onNavigate(SCREEN.LOGIN)
              : onNavigate(SCREEN.AUTH)
          }
          bgImg={0}
        />
      </FooterContainer>
      <HelpModal
        showModal={showModal}
        setShowModal={setShowModal}
        onPress={openCallDialog}
      />
    </>
  );
};

const styles = StyleSheet.create({
  wrap: {paddingHorizontal: Spacing.PADDING, paddingTop: 40},
  flex1: {flex: 1},
  //--------------------
  mt1: {marginTop: 56},
  //--------------------
  pt1: {paddingTop: 40},
  //--------------------
  btn: {
    paddingTop: 4,
    paddingBottom: 8,
    marginBottom: 10,
  },
  iconRight: {paddingRight: Spacing.PADDING},
  line: {
    lineHeight: 23,
  },
});

export default RegisterFailure;
