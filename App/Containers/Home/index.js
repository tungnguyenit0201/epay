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

// import ListItem from 'components/Common/ListItem';
import ListItemSimple from 'components/Common/ListItemSimple';
import MonneySimple from 'components/Home/MonneySimple';
import Banner from 'components/Home/Banner';
import User from 'components/Home/User';
import DinhDanh from 'components/Home/DinhDanh';
import IconList from 'components/Home/IconList';
import {SCREEN} from 'configs/Constants';
import {scale} from 'utils/Functions';
import {useTranslation} from 'context/Language';
import {useHome} from 'context/Home/utils';
import {useUser} from 'context/User';
import {useRegister} from 'context/Auth/utils';

const Home = () => {
  // TODO : translation
  const {top} = useSafeAreaInsets();
  const translation = useTranslation();
  const {banner, goSecurity} = useHome();
  const {firstLogin} = useUser();
  const {setFirstLogin} = useRegister();

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
  ];
  const dataBanner = [
    {
      ImageUrl: require('images/home/banner-1.jpg'),
    },
    {
      ImageUrl: require('images/home/banner-2.jpg'),
    },
  ];

  return (
    <>
      <HeaderBg>
        <View style={[styles.rowHeader]}>
          <Image source={Images.Logo} style={[{width: 88, height: 32}]} />
          <User style={styles.flex1} />
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
      <View style={[base.wrap, styles.flex1]}>
        <Image source={require('images/wave.png')} style={styles.bgImg} />
        <ScrollView>
          <View style={base.container}>
            <DinhDanh />
            <Banner data={banner} />
          </View>
          <View style={base.container}>
            <IconList />
          </View>
          <View style={styles.bottom} />
        </ScrollView>
      </View>

      {firstLogin && (
        <Modal
          visible={firstLogin}
          onClose={() => setFirstLogin(false)}
          icon={require('images/icons/touch-id.png')}
          title="Đăng nhập vân tay"
          content="Nếu bạn gặp vấn đề cần giúp đỡ, vui lòng gọi về cho chúng tôi để được  tư vấn hỗ trợ." // TODO: translate
          buttonGroup={() => (
            <View style={styles.buttonGroup}>
              <Button
                mb={10}
                bold
                label="Cài đặt vân tay"
                onPress={() => {
                  setFirstLogin(false);
                  goSecurity();
                }}
              />
              <TouchableOpacity onPress={() => setFirstLogin(false)}>
                <Text>Nhắc tôi sau</Text>
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
    // flexWrap: 'wrap', hide to not break line
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 25,
  },

  buttonGroup: {
    alignItems: 'center',
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
  //------------
  flex1: {flex: 1},
});
export default Home;
