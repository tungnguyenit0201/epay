import React, {useCallback, useState} from 'react';
import {ScrollView, View, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {Header, HeaderBg, Text, Button, FooterContainer} from 'components';
import {useTranslation} from 'context/Language';
import {scale} from 'utils/Functions';
import {Images, Colors, Spacing, Fonts, base} from 'themes';
// import { InfoLineBottom, ServiceTitle, BlockLogoBlue } from 'components/Service';

import {GENDER, SCREEN} from 'configs/Constants';
import Navigator from 'navigations/Navigator';

const RegisterResult = () => {
  const translation = useTranslation();

  const dataTest = [
    {
      name: 'Chủ phương tiện',
      data: 'NGUYEN VAN B ',
    },
    {
      name: 'Biển số xe',
      data: '51G-7890',
    },
    {
      name: 'Loại dịch vụ',
      data: 'Vé lượt',
    },
    {
      name: 'Số thẻ RFID',
      data: '1234567900987654321',
    },
    {
      name: 'Loại biển',
      data: 'Biển trắng',
    },
    {
      name: 'Phương thức thanh toán',
      data: 'Ví EPAY',
    },
  ];
  return (
    //TODO: TRANGSLATE
    <>
      <HeaderBg>
        <Header title="Dịch vụ giao thông" style={styles.pbZero} />
      </HeaderBg>

      <View flex={1} style={base.bgWhite}>
        <Image
          source={Images.TrafficFee.Wave}
          style={styles.bgImg}
          resizeMode="stretch"
        />

        <ScrollView contentContainerStyle={[base.container,styles.pt1]}>
          <View style={[styles.alignCenter, styles.mb1]}>
            <View style={[styles.w1, styles.pxy1]}>
              <View style={styles.boxBlueCircle1}>
                <Image
                  source={Images.TrafficFee.BigCar}
                  style={styles.iconBigCar}
                  resizeMode="contain"
                />
              </View>
              <Image
                source={Images.Kyc.BigCircle}
                style={[
                  styles.absolute,
                  styles.topZero,
                  styles.leftZero,
                  styles.iconBigCircle,
                ]}
              />
              <Image
                source={Images.Kyc.SpecialArrow}
                style={[
                  styles.absolute,
                  styles.bot1,
                  styles.right1,
                  styles.iconArrow,
                ]}
              />
            </View>
          </View>

          <View style={styles.alignCenter}>
            <View style={styles.maxWidth1}>
              <Text bold fs="h5" mb={16} centered>
                Thông tin của bạn đã được gửi đi và đang chờ duyệt
              </Text>
              <Text centered fs="md" color={Colors.tp3}>
                Đăng ký xe ngay để sử dụng dịch vụ thu phí giao thông và tham
                gia vào nhiều tiện ích khác từ ví.
              </Text>
            </View>
          </View>
        </ScrollView>

        <FooterContainer>
          <Button label={translation.homePage} 
            onPress={() => Navigator.navigate(SCREEN.HOME)}/>
        </FooterContainer>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  alignCenter: {alignItems: 'center'},
  //---------------
  absolute: {position: 'absolute'},
  topZero: {top: 0},
  leftZero: {left: 0},
  //---------------
  bot1: {bottom: 8},
  //---------------
  right1: {right: 6},
  //---------------
  w1: {width: 130},
  //---------------
  maxWidth1: {maxWidth: 300},
  //---------------
  mb1: {marginBottom: 32},
  //---------------
  pxy1: {padding: 10},
  //---------------
  pbZero: {paddingBottom: 0},
  //---------------
  pt1: {paddingTop: 72},
  //---------------
  bgWhite: {backgroundColor: Colors.bs4},
  //---------------
  iconBigCar: {
    width: 64,
    height: 53,
  },
  iconBigCircle: {
    width: 130,
    height: 130,
  },
  iconArrow: {
    width: 25,
    height: 30,
  },
  //------------
  bgImg: {
    width: '100%',
    height: scale(375),
    position: 'absolute',
    bottom: 0,
    right: 0,
  },
  //------------
  boxBlueCircle1: {
    width: 110,
    height: 110,
    backgroundColor: Colors.bg1,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default RegisterResult;
