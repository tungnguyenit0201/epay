import React, {useState} from 'react';
import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {Button, Icon, Text} from 'components';
import {Colors, Fonts, Images, Spacing, base} from 'themes';
import Navigator from 'navigations/Navigator';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import TopMenu from 'components/Home/TopMenu';
import ListItem from 'components/Common/ListItem';

import {SCREEN} from 'configs/Constants';
import {scale} from 'utils/Functions';
import {useTranslation} from 'context/Language';

const Home = () => {
  const {top} = useSafeAreaInsets();
  const [isMoney, setIsMoney] = useState(false);
  const translation = useTranslation();
  const dataMenu = [
    {icon: Images.Homes.NapViTuDong, name: 'Nạp tiền', screen: SCREEN.TOP_UP},
    {icon: Images.QRCode, name: 'Rút tiền', screen: SCREEN.WITHDRAW},
    {icon: Images.QRCode, name: 'QR Pay', screen: SCREEN.QRPAY},
    {icon: Images.QRCode, name: 'Quét mã', screen: SCREEN.QRPAY},
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
            marginBottom: 20,
            backgroundColor: Colors.cl1,
          },
        ]}>
        <View style={{marginBottom: 20, position: 'relative'}}>
          <TouchableOpacity
            onPress={() => {
              Navigator.navigate(SCREEN.USER);
            }}>
            <Text color="#fff" size={Fonts.FONT_SMALL}>
              Hello
            </Text>
            <Text color="#fff">Nguyen Van A </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{marginBottom: 20, position: 'absolute', right: 0}}
            onPress={() => {
              Navigator.push(SCREEN.NOTIFICATION);
            }}>
            <Text>🔔</Text>
          </TouchableOpacity>
        </View>
        <View style={{marginBottom: 20, position: 'relative'}}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text color="#fff" size={Fonts.FONT_SMALL}>
              Ví của tôi
            </Text>
            <TouchableOpacity
              style={{marginLeft: 20}}
              onPress={() => setIsMoney(!isMoney)}>
              <Icon
                icon={isMoney ? Images.Eye : Images.EyeGray}
                tintColor={Colors.l4}
                size={15}
              />
            </TouchableOpacity>
          </View>
          {!isMoney ? (
            <Text color="#fff" size={20} style={{height: 20}}>
              ******{' '}
            </Text>
          ) : (
            <Text color="#fff" style={{height: 20}}>
              5555 đ{' '}
            </Text>
          )}

          <TouchableOpacity
            style={{marginBottom: 20, position: 'absolute', right: -5, top: 0}}
            onPress={() => {
              Navigator.push(SCREEN.MY_WALLET);
            }}>
            <Icon icon={Images.ArrowRight} tintColor={Colors.white} size={30} />
          </TouchableOpacity>
        </View>
        <TopMenu data={dataMenu} />
      </View>

      <View style={base.container}>
        <View style={{marginBottom: 20}}>
          <ListItem
            scroll
            space={1}
            col={4}
            data={dataMenu}
            styleText={[{fontSize: 16}]}
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
