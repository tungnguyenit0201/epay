import React, {useState} from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import {Text, Modal, Button, HeaderBg} from 'components';
import {Colors, Fonts, Images, Spacing, base} from 'themes';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import ListItem from 'components/Common/ListItem';
import Monney from 'components/Home/Monney';
import Notification from 'components/Home/Notification';
import User from 'components/Home/User';
import XacThuc from 'components/Home/XacThuc';

import {SCREEN} from 'configs/Constants';
import {scale} from 'utils/Functions';
import {useTranslation} from 'context/Language';
import {useHome, useModalSmartOTP} from 'context/Home/utils';
import {useUser} from 'context/User';
import {useRegister} from 'context/Auth/utils';

const Home = () => {
  const {top} = useSafeAreaInsets();
  const translation = useTranslation();
  const {goSecurity} = useHome();
  const {firstLogin} = useUser();
  const {setFirstLogin} = useRegister();
  const modalSmartOTP = useModalSmartOTP();

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
      screen: SCREEN.TRANSFER,
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
                source={Images.Homes.Banner}
                style={[{height: scale(128), width: scale(335)}]}
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
                  setFirstLogin(false);
                  goSecurity();
                }}
              />
              <TouchableOpacity onPress={() => setFirstLogin(false)}>
                <Text>Để sau</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      )}
      {modalSmartOTP.smartOTP && (
        <Modal
          visible={modalSmartOTP.smartOTP}
          onClose={() => setFirstLogin(false)}
          title="Nhanh và bảo mật hơn với smart OTP"
          content="Lorem Ipsum is simply dummy text of the printing and typesetting industry. "
          buttonGroup={() => (
            <View style={styles.buttonGroup}>
              <Button
                mb={10}
                label="Cài smart OTP ngay"
                onPress={modalSmartOTP.onGoSmartOTP}
              />
              <TouchableOpacity onPress={modalSmartOTP.onPressNever}>
                <Text style={styles.underline}>Không, cảm ơn</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={modalSmartOTP.onClose}>
                <Text style={styles.underline}>Nhắc tôi sau</Text>
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
  underline: {
    textDecorationLine: 'underline',
  },
});
export default Home;
