import React, {useState} from 'react';
import {View, Image, TouchableOpacity, ScrollView} from 'react-native';
import {Button, Icon, Text} from 'components';
import {Colors, Fonts, Images, Spacing, base, Row, Col} from 'themes';
import Navigator from 'navigations/Navigator';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import ListItem from 'components/Common/ListItem';
import Monney from 'components/Home/Monney';

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
      <View
        style={[
          base.container,
          {
            paddingTop: top + 10,
            paddingBottom: 10,
            marginBottom: 50,
            backgroundColor: Colors.cl1,
          },
        ]}>
        <View style={{marginBottom: 20, position: 'relative'}}>
          <View
            style={[
              {
                flexWrap: 'wrap',
                flexDirection: 'row',
                alignItems: 'center',
                marginBottom: 20,
              },
            ]}>
            <Image source={Images.Logo} style={[{width: 80, height: 29.63}]} />
            <TouchableOpacity
              style={[{marginLeft: 'auto', position: 'relative'}]}
              onPress={() => {
                Navigator.push(SCREEN.NOTIFICATION);
              }}>
              <Text
                size={10}
                color="#fff"
                style={[
                  {
                    backgroundColor: '#D70000',
                    position: 'absolute',
                    borderRadius: 99,
                    with: 56,
                    height: 16,
                  },
                ]}>
                10
              </Text>
              <Icon icon={Images.Noti} tintColor="#fff" />
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            onPress={() => {
              Navigator.navigate(SCREEN.USER);
            }}>
            <Text color="#fff" size={Fonts.FONT_SMALL}>
              Hello
            </Text>
            <Text color="#fff">Nguyen Van A </Text>
          </TouchableOpacity>
        </View>

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
      </View>

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
