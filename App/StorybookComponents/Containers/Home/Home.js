import React, {useState} from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import Text from '../../Atoms/Text';
import Modal from '../../Groups/Modal';
import Button from '../../Atoms/Button';
import HeaderBg from '../../Atoms/HeaderBg';
import {Colors, Fonts, Images, Spacing, base} from 'themes';

import ListItemSimple from '../../Groups/ListItemSimple';
import MonneySimple from '../../Groups/MonneySimple';
import Banner from '../../Groups/Banner';
import User from '../../Groups/User';
import DinhDanh from '../../Groups/DinhDanh';
import SlideIcon from '../../Groups/SlideIcon';
import {scale} from 'utils/Functions';

const Home = () => {
  // TODO : translation
  const translation = require('../../../Context/Language/vi.json');
  // const {setFirstLogin} = useRegister();
  // const modalSmartOTP = useModalSmartOTP();

  const dataMenu = [
    {
      icon: Images.Homes.NapTien,
      name: translation.top_up,
      screen: 'hello',
      checkSmartOTP: true,
    },
    {
      icon: Images.Homes.RutTien,
      name: translation.withdraw,
      screen: 'hello',
      checkSmartOTP: true,
    },

    {
      icon: Images.Homes.ChuyenTien,
      name: translation.transfer,
      screen: 'hello',
      checkSmartOTP: true,
    },
    {
      icon: Images.Homes.LichSuGd,
      name: 'Lịch sử',
      screen: 'hello',
    }
  ];
  const dataBanner = [
    {
      img: require('images/home/banner-1.jpg'),
      screen: 'hello',
    },
    {
      img: require('images/home/banner-2.jpg'),
      screen: 'hello',
    },
  ];
  const dataHome = [
    {
      icon: Images.Homes.GiaoThong,
      name: 'Giao thông',
      screen: 'hello',
    },
    {
      icon: Images.Homes.BaoHiem,
      name: 'Vaccine',
      screen: 'hello',
    },
    {
      icon: Images.Homes.GiaoThong,
      name: 'Giao thông',
      screen: 'hello',
    },
    {
      icon: Images.Homes.BaoHiem,
      name: 'Bảo hiểm',
      screen: 'hello',
    },
    {
      icon: Images.Homes.YTe,
      name: 'Y tế',
      screen: 'hello',
    },
    {
      icon: Images.Homes.SanBay,
      name: 'Sân bay ',
      screen: 'hello',
    },
  ];
  return (
    <>
      <ScrollView style={base.wrap}>
        <HeaderBg>
          <View style={styles.rowHeader}>
            <Image
              source={Images.Logo.default}
              style={[{width: 88, height: 32}]}
            />
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
          <Image style={styles.bgHome} source={Images.Homes.Wave} />
          {/* <ListItemSimple space={10} col={2} data={dataHome} sizeIcon={80} /> */}
          <SlideIcon data={dataHome} />
        </View>
        <View style={styles.bottom}></View>
      </ScrollView>
      {/* {modalSmartOTP.smartOTP && (
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
      )} */}
      {/* {KYC && (
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
                onPress={() => console.log('hello')}
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
                onPress={() => console.log('hello')}
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
      )} */}
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
  bgHome: {
    width: scale(375),
    height: scale(375),
    position: 'absolute',
    top: 0,
    left: 0,
  },
  bottom: {
    height: scale(80),
  },
});
export default Home;
