import React, {useCallback, useState} from 'react';
import {ScrollView, View, StyleSheet, Image} from 'react-native';
import {Header, HeaderBg, Text, Button, FooterContainer} from 'components';
import {useTranslation} from 'context/Language';
import {scale} from 'utils/Functions';
import {Images, Colors, Spacing, Fonts, base} from 'themes';
import {SCREEN} from 'configs/Constants';
import Navigator from 'navigations/Navigator';

const RegisterFee = () => {
  const translation = useTranslation();
  return (
    <>
      <HeaderBg>
        <Header back title="Dịch vụ giao thông" style={styles.pbZero} />
      </HeaderBg>

      <View style={[base.bgWhite, styles.flex1, styles.pt1]}>
        <Image
          source={require('images/wave.png')}
          style={styles.bgImg}
          resizeMode="stretch"
        />
        <ScrollView style={base.container}>
          <Text bold fs="h4" mb={24}>
            Bạn chưa đăng ký xe cho dịch vụ giao thông
          </Text>
          <Text>
            Đăng ký xe ngay để sử dụng dịch vụ thu phí giao thông và tham gia
            vào nhiều tiện ích khác từ ví.
          </Text>

          <View style={[styles.alignCenter, styles.mt1, styles.mb1]}>
            <Image
              style={[styles.iconBigCar]}
              source={Images.TrafficFee.BigCar}
              resizeMode="contain"
            />
            <Text centered mt={20} fs="h6" color={Colors.tp3}>
              Chưa có giao dịch để hiển thị
            </Text>
          </View>
        </ScrollView>

        <FooterContainer>
          <Button
            label={`Thêm đăng ký xe`}
            onPress={() => Navigator.navigate(SCREEN.TRAFFIC_REGISTER_FORM)}
          />
        </FooterContainer>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  flex1: {flex: 1},
  flexRow: {flexDirection: 'row'},
  //------------------
  alignCenter: {alignItems: 'center'},
  //------------------
  pbZero: {paddingBottom: 0},
  //------------------
  mt1: {marginTop: 84},
  //------------------
  mb1: {marginBottom: 40},
  //------------------
  pt1: {paddingTop: 55},
  //------------------
  bgImg: {
    width: '100%',
    height: scale(375),
    position: 'absolute',
    bottom: 0,
    right: 0,
  },
  iconBigCar: {
    width: 80,
    height: 66,
  },
});
export default RegisterFee;
