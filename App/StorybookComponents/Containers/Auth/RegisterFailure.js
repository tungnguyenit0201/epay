import React, {useRef, useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  Image,
  View,
  TouchableOpacity,
} from 'react-native';
import Text from '../../Atoms/Text';
import Header from '../../Atoms/Header';
import Button from '../../Atoms/Button';
import Icon from '../../Atoms/Icon';
import {Colors, Fonts, Spacing, Images} from 'themes';
import {scale} from 'utils/Functions';

import BlueHeader from '../../Atoms/BlueHeader';
import Content from '../../Atoms/Content';
import FooterContainer from '../../Atoms/FooterContainer';
const RegisterFailure = ({route}) => {
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
        logo={Images.logoEpay.default}
        onPressBack={() => onNavigate(SCREEN.AUTH)}
        renderRightComponent={() => renderRightComponent()}
      />
      <Content
        title={'Đăng ký \nkhông thành công!'}
        text="Bạn đã nhập sai OTP quá 3 lần, vui lòng 
        quay lại sau 30 phút"
        styleText={{color: Colors.white}}
        style={[styles.wrap, styles.flex1, styles.mt1]}
      />
      <FooterContainer style={{marginTop: 100}}>
        <Button
          label="Gọi 024 32252336"
          style={styles.btn}
          mb={Spacing.PADDING - 10}
          bold
        />
        <Button
          label="Quay lại sau"
          style={styles.btn}
          bg={Colors.white}
          color={Colors.black}
          border={Colors.cl4}
          bold
        />
      </FooterContainer>
      {/* <View>
        <Header
          back
          // blackIcon
          // avoidStatusBar
          logo={Images.logoEpay}
          onPressBack={() => onNavigate(SCREEN.AUTH)}
          renderRightComponent={() => renderRightComponent()}
        />
        <TouchableOpacity
          style={{
            position: 'absolute',
            bottom: scale(10),
            right: 20,
          }}>
          <Icon
            icon={Images.Register.Info}
            style={{
              width: scale(24),
              height: scale(24),
            }}
            tintColor={Colors.BLACK}
          />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.container}>
        <View
          style={{
            marginBottom: Spacing.PADDING + 30,
            alignItems: 'center',
          }}>
          <Image
            style={{width: 120, height: 72}}
            source={Images.logoEpay.default}
            resizeMode="contain"
          />
        </View>

        <View style={styles.wrap}>
          <Text style={[styles.text_center]} mb={20} fs="h5" bold>
            Đăng ký không thành công!
          </Text>
          <Text style={[styles.text_center, styles.text_error]} mb={10}>
            Bạn đã nhập sai OTP quá 5 lần, vui lòng quay lại sau ít phút.
          </Text>
        </View>
      </ScrollView>

      <View
        style={[
          styles.wrap_1,
          styles.bg_white,
          {
            paddingBottom: 40,
          },
        ]}>
        <Button
          label="Gọi 024 32252336"
          style={styles.btn}
          onPress={() => console.log('press')}
          mb={Spacing.PADDING - 10}
          bold
        />
        <Button
          label="Quay lại sau"
          style={styles.btn}
          bg={Colors.white}
          color={Colors.black}
          border={Colors.cl4}
          onPress={() => console.log('press')}
          bold
        />
      </View> */}
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
