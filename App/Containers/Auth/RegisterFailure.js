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

const RegisterFailure = ({route}) => {
  const translation = useTranslation();
  const {openCallDialog} = useOTP(route?.params);
  const {onNavigate} = useRegister();

  const renderRightComponent = () => (
    <TouchableOpacity
      // onPress={() => setShowModal(true)}
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
    <BlueHeader heightBg="100%">
      <Header
        back
        // blackIcon
        // avoidStatusBar
        logo={Images.logoEpay}
        onPressBack={() => onNavigate(SCREEN.AUTH)}
        renderRightComponent={() => renderRightComponent()}
      />

      <Content
        title={'Đăng ký \nkhông thành công!'}
        text="Bạn đã nhập sai OTP quá 5 lần, 
          vui lòng quay lại sau ít phút."
        styleText={{color: Colors.white}}
        style={[styles.wrap, styles.flex1, styles.mt1]}
      />

      <FooterContainer>
        <Button
          label="Gọi 024 32252336"
          style={styles.btn}
          onPress={openCallDialog}
          mb={Spacing.PADDING - 10}
          bold
        />
        <Button
          label="Quay lại sau"
          style={styles.btn}
          bg={Colors.white}
          color={Colors.black}
          border={Colors.cl4}
          onPress={() => onNavigate(SCREEN.AUTH)}
          bold
        />
      </FooterContainer>
    </BlueHeader>
  );
};

const styles = StyleSheet.create({
  wrap: {paddingHorizontal: Spacing.PADDING},
  flex1: {flex: 1},
  //--------------------
  mt1: {marginTop: 56},
  //--------------------
  btn: {
    paddingTop: 15,
    paddingBottom: 15,
  },
  iconRight: {paddingRight: Spacing.PADDING},
});

export default RegisterFailure;
