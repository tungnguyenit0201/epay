import React, {useCallback, useState} from 'react';
import {ScrollView, View, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {Header, HeaderBg, Text, Button, FooterContainer} from 'components';
import {useTranslation} from 'context/Language';
import {scale} from 'utils/Functions';
import {Images, Colors, Spacing, Fonts, base} from 'themes';
// import { InfoLineBottom, ServiceTitle, BlockLogoBlue } from 'components/Service';

import {GENDER, SCREEN} from 'configs/Constants';
import Navigator from 'navigations/Navigator';

const TicketResult = () => {
  const translation = useTranslation();
  return (
    //TODO: TRANGSLATE
    <>
      <HeaderBg>
        <Header back title="Dịch vụ giao thông" style={styles.pbZero} />
      </HeaderBg>

      <View flex={1} style={base.bgWhite}>
        <Image
          source={Images.TrafficFee.Wave}
          style={styles.bgImg}
          resizeMode="stretch"
        />

        <ScrollView contentContainerStyle={[base.container,styles.pt1]}>
          <Text bold fs="h4" mb={24}>
            Bạn chưa mua vé xe
          </Text>
          <Text fs='md'>
            Đăng ký xe ngay để sử dụng dịch vụ thu phí giao thông và tham gia
            vào nhiều tiện ích khác từ ví.
          </Text>

          <View alignItems='center' style={[styles.mt1, styles.mb1]}>
            <Image
              style={[styles.ExpiredTicket]}
              source={Images.TrafficFee.ExpiredTicket}
              resizeMode="contain"
            />
            <Text centered mt={15} fs="h6" color={Colors.tp3}>
              Chưa có giao dịch để hiển thị
            </Text>
          </View>
        </ScrollView>

        <FooterContainer>
          <Button label={'Mua vé xe'} 
            onPress={() => Navigator.navigate(SCREEN.CHOOSE_VEHICLE)}/>
        </FooterContainer>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  mt1: {marginTop: 84},
  //------------------
  mb1: {marginBottom: 40},
  //---------------
  pbZero: {paddingBottom: 0},
  //---------------
  pt1: {paddingTop: 55},
  //---------------
  bgImg: {
    width: '100%',
    height: scale(375),
    position: 'absolute',
    bottom: 0,
    right: 0,
  },
  //---------------
  ExpiredTicket: {
    width: 88,
    height: 88,
    // aspectRatio: 1,
  },
});

export default TicketResult;
