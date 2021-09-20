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
import ListItemSimple from 'components/Common/ListItemSimple';
import MonneySimple from 'components/Home/MonneySimple';
import Banner from 'components/Home/Banner';
import User from 'components/Home/User';
import DinhDanh from 'components/Home/DinhDanh';
import IconList from 'components/Home/IconList';
import {SCREEN} from 'configs/Constants';
import {scale} from 'utils/Functions';
import {useTranslation} from 'context/Language';
import {useCheckInfo, useHome, useModalSmartOTP} from 'context/Home/utils';
import {useUser} from 'context/User';
import {useRegister} from 'context/Auth/utils';

const Home = () => {
  // TODO : translation
  const {top} = useSafeAreaInsets();
  const translation = useTranslation();
  const {goSecurity} = useHome();
  const {firstLogin} = useUser();
  const {setFirstLogin} = useRegister();
  const modalSmartOTP = useModalSmartOTP();
  const {KYC, connectBank, checkInfo, onNavigate} = useCheckInfo();

  const dataMenu = [
    {
      icon: Images.Homes.NapTien,
      name: translation.top_up,
      screen: SCREEN.TOP_UP,
      checkSmartOTP: true,
    },
    {
      icon: Images.Homes.RutTien,
      name: translation.withdraw,
      screen: SCREEN.WITHDRAW,
      checkSmartOTP: true,
    },

    {
      icon: Images.Homes.ChuyenTien,
      name: translation.transfer,
      screen: SCREEN.TRANSFER,
      checkSmartOTP: true,
    },
    {
      icon: Images.Homes.LichSuGd,
      name: 'Lịch sử',
      screen: SCREEN.HISTORY,
    },
    {
      icon: Images.Homes.LichSuGd,
      name: 'My QR',
      screen: SCREEN.MY_QR,
    },
  ];
  const dataBanner = [
    {
      img: require('images/home/banner-1.jpg'),
      screen: SCREEN.TOP_UP,
    },
    {
      img: require('images/home/banner-2.jpg'),
      screen: SCREEN.TOP_UP,
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
      screen: SCREEN.MY_QR,
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
      screen: SCREEN.MY_QR,
    },
  ];
  return (
    <>
      <HeaderBg>
        <View style={styles.rowHeader}>
          <Image source={Images.Logo} style={[{width: 88, height: 32}]} />
          <User style={{marginBottom: 20}} />
        </View>
        <MonneySimple />
        <View style={{marginBottom: 20}}>
          <ListItemSimple
            scroll
            space={1}
            col={4}
            data={dataMenu}
            styleText={[{fontSize: 14, color: Colors.white}]}
            styleWicon={[{backgroundColor: Colors.cl1}]}
            //styleIcon={[{tintColor: Colors.white}]}
          />
        </View>
      </HeaderBg>
      <ScrollView style={base.wrap}>
        <View style={base.container}>
          <DinhDanh />

          <Banner data={dataBanner} />

          {/* <View style={{marginBottom: 20}}>
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
          </View> */}
        </View>
        <View style={base.container}>
          {/* <ListItemSimple space={10} col={2} data={dataHome} sizeIcon={80} /> */}
          <IconList />
        </View>

        <View style={styles.bottom}></View>
      </ScrollView>
      <Image source={require('images/wave.png')} style={styles.bgImg} />
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
      {KYC && (
        <Modal
          visible={KYC}
          onClose={() => checkInfo({value: false})}
          title={translation.notification}
          content="Cập nhật định danh để tăng cường bảo mật cho tài khoản của bạn."
          buttonGroup={() => (
            <View style={styles.buttonGroup}>
              <Button
                mb={10}
                label="Định danh"
                onPress={() => onNavigate(SCREEN.CHOOSE_IDENTITY_CARD)}
              />
              <TouchableOpacity onPress={() => checkInfo({value: false})}>
                <Text style={styles.underline}>Nhắc tôi sau</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      )}
      {connectBank && (
        <Modal
          visible={connectBank}
          onClose={() => checkInfo({value: false})}
          title={translation.notification}
          content="Liên kết ngân hàng để thực hiện giao dịch."
          buttonGroup={() => (
            <View style={styles.buttonGroup}>
              <Button
                mb={10}
                label={translation.connect_now}
                onPress={() => onNavigate(SCREEN.BANK_LINKED)}
              />
              <TouchableOpacity onPress={() => checkInfo({value: false})}>
                <Text style={styles.underline}>Nhắc tôi sau</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      )}
      {firstLogin && (
        <Modal
          visible={firstLogin}
          onClose={() => setFirstLogin(false)}
          title="Đăng nhập vân tay"
          content="Nếu bạn gặp vấn đề cần giúp đỡ, vui lòng gọi về cho chúng tôi để được  tư vấn hỗ trợ." // TODO: translate
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
    </>
  );
};
const styles = StyleSheet.create({
  rowHeader: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },

  buttonGroup: {
    alignItems: 'center',
  },
  underline: {
    textDecorationLine: 'underline',
  },
  bgImg: {
    width: scale(375),
    height: scale(375),
    position: 'absolute',
    bottom: 0,
    right: 0,
  },

  bottom: {
    height: scale(80),
  },
});
export default Home;
