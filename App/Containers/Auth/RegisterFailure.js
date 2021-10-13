import React, {useRef, useState, useEffect} from 'react';
import {
  ScrollView,
  StyleSheet,
  Image,
  View,
  TouchableOpacity,
} from 'react-native';
import {Text, Header, Button, HeaderBg, Icon} from 'components';
import {Colors, Fonts, Spacing, Images} from 'themes';
import {useTranslation} from 'context/Language';
import {scale} from 'utils/Functions';
import {useOTP} from 'context/Common/utils';
import {useRegister} from 'context/Auth/utils';
import {SCREEN} from 'configs/Constants';
import BlueHeader from 'components/Auth/BlueHeader';
import {Content} from 'components/Auth';
import FooterContainer from 'components/Auth/FooterContainer';
import {HelpModal} from 'components/Auth';
const RegisterFailure = ({route}) => {
  const translation = useTranslation();
  const {openCallDialog, showModal, setShowModal} = useOTP(route?.params);
  const {onNavigate} = useRegister();

  const renderRightComponent = () => (
    <TouchableOpacity
      onPress={() => setShowModal(true)}
      style={styles.iconRight}
    >
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
      <BlueHeader heightBg="100%" style={styles.pt1}>
        <Header
          back
          // blackIcon
          // avoidStatusBar
          logo={Images.logoEpay}
          onPressBack={() => onNavigate(SCREEN.AUTH)}
          renderRightComponent={() => renderRightComponent()}
        />
        <View style={styles.wrap}>
          <Text color={Colors.white} bold fs={'h3'}>
            {translation.sign_up}
          </Text>
          <Text color={Colors.white} mb={15} bold fs={'h3'}>
            {translation.transaction.failure}
          </Text>
          <Text color={Colors.white} fs={'h7'}>
            {
              translation.you_have_entered_the_otp_incorrectly_three_times_please_wait_30_minutes_and_try_again
            }
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
          label={translation.continue}
          style={styles.btn}
          // bg={Colors.white}
          // color={Colors.black}
          border={Colors.cl4}
          onPress={() => onNavigate(SCREEN.AUTH)}
        />
        <Button
          label={translation.come_back_later}
          style={styles.btn}
          // bg={Colors.white}
          // color={Colors.black}
          border={Colors.cl4}
          mode="outline"
          onPress={() => onNavigate(SCREEN.AUTH)}
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
});

export default RegisterFailure;
