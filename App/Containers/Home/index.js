import React, {useState, useEffect, useCallback} from 'react';
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
import {useHandleBack} from 'context/Common/utils';

const Home = () => {
  // TODO : translation
  const {top} = useSafeAreaInsets();
  const translation = useTranslation();
  const {banner, goSecurity} = useHome();
  const {firstLogin} = useUser();
  const {setFirstLogin} = useRegister();
  const backHandler = useHandleBack(); // run useEffect

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
      name: translation.history,
      screen: SCREEN.HISTORY,
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
            styleText={[{fontSize: 14, color: Colors.bs4}]}
            styleWicon={[{backgroundColor: Colors.brd1}]}
            //styleIcon={[{tintColor: Colors.bs4}]}
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
          icon={Images.SignUp.TouchId}
          title={translation.log_in_touchid}
          content={
            translation.if_you_have_a_problem_and_need_help_please_call_us_for_advice_and_support
          }
          buttonGroup={() => (
            <View style={styles.buttonGroup}>
              <Button
                mb={10}
                label={translation.setting_touch_id}
                onPress={() => {
                  setFirstLogin(false);
                  goSecurity();
                }}
              />
              <TouchableOpacity onPress={() => setFirstLogin(false)}>
                <Text>{translation.remind_me_later}</Text>
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
    //alignItems: 'center',
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
