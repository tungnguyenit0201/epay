import React, {useState} from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  useWindowDimensions,
} from 'react-native';
import {Colors, Fonts, Images, Spacing, base} from 'themes';

/* import ListItem from 'components/Common/ListItem';
import ListItemSimple from 'components/Common/ListItemSimple';
import MonneySimple from 'components/Home/MonneySimple'; */
/* import Banner from 'components/Home/Banner'; */
/* import User from 'components/Home/User'; */
/* import DinhDanh from 'components/Home/DinhDanh';
import IconList from 'components/Home/IconList'; */
import {SCREEN} from 'configs/Constants';
import {scale} from 'utils/Functions';

import Text from '../../Atoms/Text';
import Button from '../../Atoms/Button';
import HeaderBg from '../../Atoms/HeaderBg';
import User from '../../Groups/User';
import MonneySimple from '../../Groups/MonneySimple';
import ListItemSimple from '../../Groups/ListItemSimple';
import DinhDanh from '../../Groups/DinhDanh';
import Banner from '../../Groups/Banner';
import SlideIcon from '../../Groups/SlideIcon';
import FooterNavigation from '../../Groups/FooterNavigation';
const Home = () => {
  // TODO : translation
  const translation = require('../../../Context/Language/vi.json');
  const {width, height} = useWindowDimensions();
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
      name: 'QRPAY',
      screen: SCREEN.QRPAY,
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

  const dataHome = [
    {
      icon: require('images/storybook/airport.png'),
      name: 'Sân bay',
      screen: 'hello',
    },
    {
      icon: require('images/storybook/fines.png'),
      name: 'Nộp phạt',
      screen: 'hello',
    },
    {
      icon: require('images/storybook/customs.png'),
      name: 'Hải quan',
      screen: 'hello',
    },
    {
      icon: require('images/storybook/vacxin.png'),
      name: 'Y tế',
      screen: 'hello',
    },
  ];

  return (
    <>
      <View style={[base.wrap, {overflow: 'hidden'}]}>
        <HeaderBg>
          <View style={styles.rowHeader}>
            <Image
              source={Images.Logo.default}
              style={[{width: 88, height: 32}]}
            />
            <User style={{marginTop: 20}} />
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
            />
          </View>
        </HeaderBg>
        <View style={base.container}>
          <Image style={styles.bgHome} source={Images.Homes.Wave.default} />
          <DinhDanh />
          <Banner data={dataBanner} />
        </View>
        <SlideIcon data={dataHome} />
        <View style={{marginTop: scale(50)}}>
          <FooterNavigation />
        </View>
        {/* <View style={base.container}>
          <Image
            style={{
              width: width - 32,
              height: 'auto',
              position: 'absolute',
              top: 0,
              left: 0,
            }}
            source={Images.Homes.Wave.default}
          />
          <DinhDanh />
          <Banner data={dataBanner} />
          <SlideIcon data={dataHome} />
        </View> */}
        {/* <View style={base.container}>
          <Image style={styles.bgHome} source={Images.Homes.Wave.default} />
        </View> */}
      </View>
      {/* <FooterNavigation /> */}
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
    height: scale(580),
    position: 'absolute',
    top: 0,
    left: 0,
  },
  bottom: {
    height: scale(80),
  },
});
export default Home;
