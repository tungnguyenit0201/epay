import React, {useState} from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import {Text, Modal, Button} from 'components';
import {Colors, Fonts, Images, Spacing, base} from 'themes';

import ListItem from '../../Groups/ListItem';
import Monney from '../../Groups/Money';
import Notification from '../../Groups/Notification';
import User from '../../Groups/User';
import XacThuc from '../../Groups/XacThuc';
import HeaderBg from '../../Atoms/HeaderBg';

// import {SCREEN} from 'App/configs/Constants';
import {scale} from 'utils/Functions';

const Home = () => {
  const translation = require('../../../Context/Language/vi.json');
  const [firstLogin, setFirstLogin]  = useState(false);
  const dataMenu = [
    {
      icon: Images.Homes.NapTien,
      name: translation.top_up,
      screen: 'TopUp',
    },
    {
      icon: Images.Homes.RutTien,
      name: translation.withdraw,
      screen: 'Withdraw',
    },
    {icon: Images.Homes.QAPAY, name: translation.pay_qr, screen: 'Withdraw'},
    {
      icon: Images.Homes.ChuyenTien,
      name: translation.transfer,
      screen: 'Transfer',
    },
  ];
  const dataEpay = [
    {
      icon: Images.Homes.NapViTuDong,
      name: translation.vehicle_list,
      screen: 'Transfer',
    },
    {
      icon: Images.Homes.ThanhToanGt,
      name: translation.pay_traffic_fines,
      screen: 'Withdraw',
    },
    {
      icon: Images.Homes.DichVuGt,
      name: translation.traffic_fee_service,
      screen: 'QRPay',
    },
  ];
  const dataGT = [
    {
      icon: Images.Homes.DanhSachXe,
      name: translation.vehicle_list,
      screen: 'Transfer',
    },
    {
      icon: Images.Homes.MuaVe,
      name: translation.traffic_fee_service,
      screen: 'Withdraw',
    },
    {
      icon: Images.Homes.LichSuXe,
      name: translation.history_of_passed_stations,
      screen: 'Withdraw',
    },
    {
      icon: Images.Homes.TramDichvVu,
      name: translation.stationservice,
      screen: 'Withdraw',
    },
  ];
  return (
    <>
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
                source={Images.Homes.Banner.default}
                style={[{height: scale(128) ,borderRadius: '12px'}]}
              />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      {firstLogin && (
        <Modal
          visible={firstLogin}
          onClose={() => setFirstLogin(false)}
          title="Đăng nhập vân tay"
          content="Nếu bạn gặp vấn đề cần giúp đỡ, vui lòng gọi về cho chúng tôi để được  tư vấn hỗ trợ."
          buttonGroup={() => (
            <View style={styles.buttonGroup}>
              <Button
                mb={10}
                label="Cài đặt vân tay"
                onPress={() => {
                  console.log('press')
                }}
              />
              <TouchableOpacity onPress={() => setFirstLogin(false)}>
                <Text>Để sau</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      )}
    </>
  );
};
const styles = StyleSheet.create({
  buttonGroup: {
    alignItems: 'center',
  },
});
export default Home;
