import React, {useCallback, useState} from 'react';
import {ScrollView, View, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {Header, HeaderBg, Text, Button, FooterContainer} from 'components';
import {useTranslation} from 'context/Language';
import {scale} from 'utils/Functions';
import {Images, Colors, Spacing, Fonts, base} from 'themes';
import { InfoLineBottom, ServiceTitle, BlockLogoBlue } from 'components/Service';

import {GENDER, SCREEN} from 'configs/Constants';
import Navigator from 'navigations/Navigator';

const CarDetail = () => {
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
    {
      name: 'Khối lượng kéo theo cho phép (kg)',
      data: '15.000',
    },
    {
      name: 'Địa chỉ chủ \n phương tiện',
      data: '12 CMT8, Phường 8, Quận 3, TP HCM',
    },
  ];
  return (
    //TODO: TRANGSLATE
    <>
      <HeaderBg bgColor={Colors.bs2}>
        <Header title="Thông tin xe" style={styles.pbZero} back/>
      </HeaderBg>
      
      <ScrollView contentContainerStyle={styles.pt1}>
        <View style={base.container}>
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
            </View>
          </View>

          <View style={[styles.boxTitle1,styles.mb2]}>
            <Text bold size={Fonts.H4} color={Colors.tp1} centered>
              51G-6789
            </Text>
            <Image
              source={Images.TransactionHistory.Success}
              style={[styles.iconSuccess,styles.ml1]}
              resizeMode={'contain'}
            />
          </View>

          <Text size={Fonts.H6} mb={16} color={Colors.tp3} centered>
            {'Hoạt động'}
            <Text size={Fonts.H6} color={Colors.tp3}>{'  |  '}</Text>
            {'Xe loại 1: Xe < 12 chỗ'}
          </Text>

          <Button mode="outline" label={'Xem lịch sử xe qua trạm'} 
            style={{backgroundColor:Colors.bs2}} mb={32}/>

          <ServiceTitle mb={16}>{'Phương thức thanh toán'}</ServiceTitle>
          <BlockLogoBlue title={'Ví EPAY 0909000999'} mb={24}/>
        </View>

        <View style={[base.bgWhite,base.container,styles.py1]}>
          <ServiceTitle mb={4}>{'Thông tin xe'}</ServiceTitle>
          
          {dataTest.map((e, index) => {
            if (index === dataTest.length - 1) {
              return <InfoLineBottom key={index} 
                name={e.name} data={e.data} noLine={true}/>;
            } else {
              return <InfoLineBottom key={index} name={e.name} data={e.data}/>;
            }
          })}
        </View>

        <Text style={styles.py1} size={Fonts.H6} centered>
          09/09/2021 {'  '} 09:09:09
        </Text>
      </ScrollView>

      <FooterContainer>
        <Button label={'Hủy đăng ký xe'} 
          onPress={() => Navigator.navigate(SCREEN.CAR_DETAIL)}/>
      </FooterContainer>
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
  w1: {width: 80},
  //---------------
  mb1: {marginBottom: 16},
  mb2: {marginBottom: 10},
  //---------------
  ml1: {marginLeft: 5},
  //---------------
  pbZero: {paddingBottom: 0},
  //---------------
  pxy1: {padding: 6},
  //---------------
  py1: {paddingVertical: 24},
  //---------------
  pt1: {paddingTop: 16},
  //---------------
  boxTitle1: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  //---------------
  iconBigCircle: {
    width: 80,
    height: 80,
  },
  iconBigCar: {
    width: 32,
    height: 32,
  },
  iconSuccess: {
    width: 20,
    height: 20,
  },
  //---------------
  boxBlueCircle1: {
    width: 69,
    height: 69,
    backgroundColor: Colors.bg1,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  boxShadowBlue: {
    backgroundColor: Colors.bg1,
    shadowOpacity: 0.2,
    shadowOffset: {width: 0, height: 0},
    elevation: 24,
    shadowRadius: 8,
    borderRadius: 8,
  },
});

export default CarDetail;
