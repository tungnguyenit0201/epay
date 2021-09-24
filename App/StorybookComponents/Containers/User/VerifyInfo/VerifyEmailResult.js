import React, {useRef, useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  Pressable,
  Image,
  FlatList,
  useWindowDimensions,
} from 'react-native';
import Text from '../../../Atoms/Text';
import Header from '../../../Atoms/Header';
import HeaderBg from '../../../Atoms/HeaderBg';
import Button from '../../../Atoms/Button';
import {Colors, Fonts, Images, Spacing, base} from 'themes';
import {scale} from 'utils/Functions';

const VerifyEmailResult = ({route, success}) => {
  const translation = require('../../../../Context/Language/vi.json');
  const {width} = useWindowDimensions();
  return (
    <>
      <ScrollView style={base.wrap}>
        <HeaderBg style={{marginBottom: 50}}>
          <Header title={'Xác thực email'} back />
        </HeaderBg>
        <View style={base.container}>
          <View style={[styles.success]}>
            <Image
              source={
                success
                  ? require('images/noti/Success.png').default
                  : require('images/noti/Error.png').default
              }
              style={success ? styles.imgSuccess : styles.imgError}
            />
            <Text bold fs="h5" mb={15}>
              {success
                ? 'Xác thực Email thành công'
                : 'Xác thực email không thành công'}
            </Text>
            <Text
              centered
              style={success || {color: 'red', fontWeight: 'bold'}}>
              {success
                ? 'Lorem Ipsum is simply dummy text of the printing and typesetting industry'
                : 'Bạn đã nhập sai OTP quá 3 lần, vui lòng quay lại sau x phút'}
            </Text>
          </View>
        </View>
      </ScrollView>
      <View style={base.bottom}>
        <Image
          source={Images.Gradient.B_Home.default}
          style={{height: 48, borderRadius: 8, cursor: 'pointer'}}
        />
      </View>
      <Image
        source={Images.Kyc.Wave.default}
        resizeMode="stretch"
        style={[
          styles.absolute,
          styles.botZero,
          styles.rightZero,
          {
            width: width,
            height: 400,
          },
        ]}
      />
    </>
  );
};
const styles = StyleSheet.create({
  block: {
    marginBottom: 20,
    position: 'relative',
    minHeight: 128,
  },
  bgImg: {
    width: 128,
    height: 128,
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{translateX: scale(-64)}, {translateY: scale(-64)}],
  },
  success: {
    alignItems: 'center',
    marginBottom: 20,
  },
  imgSuccess: {
    width: 80,
    height: 80,
    marginBottom: 10,
  },
  imgError: {
    width: 80,
    height: 60,
    marginBottom: 10,
  },
  absolute: {position: 'absolute'},
  topZero: {top: 0},
  leftZero: {left: 0},
  rightZero: {right: 0},
  botZero: {bottom: 0},
});

export default VerifyEmailResult;
