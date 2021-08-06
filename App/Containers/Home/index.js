import React, {useState} from 'react';
import {View, Image, TouchableOpacity, ScrollView} from 'react-native';
import {Text} from 'components';
import {Colors, Fonts, Images, Spacing, base} from 'themes';
import Navigator from 'navigations/Navigator';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import ListItem from 'components/Common/ListItem';
import Monney from 'components/Home/Monney';
import Notification from 'components/Home/Notification';
import User from 'components/Home/User';
import XacThuc from 'components/Home/XacThuc';
import HeaderBg from 'components/Common/HeaderBg';

import {SCREEN} from 'configs/Constants';
import {scale} from 'utils/Functions';
import {useTranslation} from 'context/Language';

const Home = () => {
  const {top} = useSafeAreaInsets();
  const translation = useTranslation();
  const dataMenu = [
    {
      icon: Images.Homes.NapTien,
      name: translation.top_up,
      screen: SCREEN.TOP_UP,
    },
    {
      icon: Images.Homes.RutTien,
      name: translation.withdraw,
      screen: SCREEN.WITHDRAW,
    },
    {icon: Images.Homes.QAPAY, name: translation.pay_qr, screen: SCREEN.QRPAY},
    {
      icon: Images.Homes.ChuyenTien,
      name: translation.transfer,
      screen: SCREEN.QRPAY,
    },
  ];
  const dataEpay = [
    {
      icon: Images.Homes.NapViTuDong,
      name: translation.vehicle_list,
      screen: SCREEN.TRANSFER,
    },
    {
      icon: Images.Homes.ThanhToanGt,
      name: translation.pay_traffic_fines,
      screen: SCREEN.WITHDRAW,
    },
    {
      icon: Images.Homes.DichVuGt,
      name: translation.traffic_fee_service,
      screen: SCREEN.QRPAY,
    },
  ];
  const dataGT = [
    {
      icon: Images.Homes.DanhSachXe,
      name: translation.vehicle_list,
      screen: SCREEN.TRANSFER,
    },
    {
      icon: Images.Homes.MuaVe,
      name: translation.traffic_fee_service,
      screen: SCREEN.WITHDRAW,
    },
    {
      icon: Images.Homes.LichSuXe,
      name: translation.history_of_passed_stations,
      screen: SCREEN.QRPAY,
    },
    {
      icon: Images.Homes.TramDichvVu,
      name: translation.stationservice,
      screen: SCREEN.QRPAY,
    },
  ];
  return (
    <ScrollView style={base.wrap}>
      <HeaderBg style={{marginBottom: 50}}>
        <View
          style={[
            {
              flexWrap: 'wrap',
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: 15,
            },
          ]}>
          <Image source={Images.Logo} style={[{width: 80, height: 29.63}]} />
          <Notification data={5} />
        </View>
        <User style={{marginBottom: 20}} />
        <Monney
          style={[
            {
              position: 'absolute',
              bottom: -20,
              left: Spacing.PADDING,
              right: Spacing.PADDING,
            },
          ]}
        />
      </HeaderBg>

      <View style={base.container}>
        <View style={{marginBottom: 20}}>
          <ListItem
            scroll
            space={1}
            col={4}
            data={dataMenu}
            styleText={[{fontSize: 14}]}
            styleWicon={[{backgroundColor: '#437EC0'}]}
            styleIcon={[{tintColor: '#fff'}]}
          />
        </View>
        <XacThuc />

        <View style={{marginBottom: 20}}>
          <Text bold color={Colors.cl1} size={Fonts.H5} mb={15}>
            {translation.epay_services}
          </Text>
          <ListItem scroll space={1} col={4} data={dataEpay} />
        </View>
        <View style={{marginBottom: 20}}>
          <Text bold color={Colors.cl1} size={Fonts.H5} mb={15}>
            {translation.traffic_payment_services}
          </Text>
          <ListItem space={20} col={4} data={dataGT} />
        </View>
        <View style={{marginBottom: 20}}>
          <Text bold color={Colors.cl1} size={Fonts.H5} mb={15}>
            {translation.how_to_use_epay}
          </Text>
          <TouchableOpacity onPress={() => {}}>
            <Image
              source={Images.Homes.Banner}
              style={[{height: scale(128), width: scale(335)}]}
            />
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default Home;
