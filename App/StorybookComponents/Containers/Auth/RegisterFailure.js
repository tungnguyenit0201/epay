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

const RegisterFailure = ({route}) => {

  return (
    // TODO: translate
    <>
      <View>
        <Header
          back
          blackIcon
          style={{
            paddingTop: 10,
            paddingBottom: 10,
            backgroundColor: Colors.white,
            color: Colors.BLACK,
          }}
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
          <Image style={{ width: 120, height: 72 }} source={Images.logoEpay.default} resizeMode="contain" />
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
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.BACKGROUNDCOLOR,
  },
  wrap: {
    paddingHorizontal: Spacing.PADDING * 2,
    // paddingTop: Spacing.PADDING * 3,
  },
  wrap_1: {
    paddingHorizontal: Spacing.PADDING,
  },
  bg_white: {
    backgroundColor: Colors.BACKGROUNDCOLOR,
  },
  text_center: {textAlign: 'center'},
  text_error: {
    fontSize: 14,
    color: Colors.Highlight,
  },
  btn: {
    paddingTop: 15,
    paddingBottom: 15,
  },
});

export default RegisterFailure;
