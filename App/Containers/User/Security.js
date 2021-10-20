import React, {useState, useContext} from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
} from 'react-native';
import {Text, Button, Icon, Header, Switch, HeaderBg} from 'components';
import {SCREEN, TEXT} from 'configs/Constants';
import Navigator from 'navigations/Navigator';
import {Colors, Fonts, Images, Spacing, base} from 'themes';
import {useTranslation} from 'context/Language';
import {useSecuritySettings} from 'context/User/utils';
import {scale} from 'utils/Functions';

const PaymentSettings = () => {
  const translation = useTranslation();
  const {settings, onTouchId, onSmartOTP} = useSecuritySettings();
  const {touchIdEnabled} = settings;

  return (
    <>
      <HeaderBg>
        <Header back title={translation.password_and_security} />
      </HeaderBg>
      <View style={[base.bgWhite, styles.flex1]}>
        <Image source={require('images/wave.png')} style={styles.bgImg} />
        <ScrollView contentContainerStyle={[base.container, styles.pt1]}>
          <View style={styles.boxShadowGray}>
            <TouchableOpacity
              style={styles.item}
              onPress={() => {
                Navigator.push(SCREEN.CHANGE_PASSWORD, {
                  type: 'confirm_password_response',
                  headerLabel: 'Đổi mật khẩu',
                });
              }}
            >
              <Image
                source={Images.Profile.Lock}
                resizeMode="contain"
                style={[styles.icon1, styles.mr1]}
              />
              <Text style={styles.text}>Đổi mật khẩu</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.item} onPress={onSmartOTP}>
              {/* <Icon
              mr={8}
              icon={Images.Profile.MaThanhToan}
              size={24}
              tintColor={Colors.brd1}
            /> */}
              <Image
                source={Images.Profile.Call}
                resizeMode="contain"
                style={[styles.icon1, styles.mr1]}
              />
              <Text style={styles.text}>Smart OTP</Text>
              {/* <Icon
              style={[base.leftAuto]}
              icon={Images.ArrowRight}
              size={24}
              tintColor="#000"
            /> */}
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.item}
              onPress={() => Navigator.navigate(SCREEN.WALLET_ACCESS_HISTORY)}
            >
              <Image
                source={Images.Profile.Clock}
                resizeMode="contain"
                style={[styles.icon1, styles.mr1]}
              />
              <Text style={styles.text}>Lịch sử truy cập ví</Text>
            </TouchableOpacity>

            <View style={styles.item}>
              {/* <Icon
              mr={8}
              icon={Images.Profile.MaThanhToan}
              size={24}
              tintColor={Colors.brd1}
            /> */}
              <Image
                source={Images.Profile.Login}
                resizeMode="contain"
                style={[styles.icon1, styles.mr1]}
              />
              <Text style={[styles.text, styles.maxWidth1]}>
                Cài đặt Face ID cho đăng nhập
              </Text>
              <Switch
                key={touchIdEnabled}
                initialValue={touchIdEnabled}
                onChange={onTouchId}
                onColor={Colors.brd1}
              />
            </View>
            <View style={styles.item}>
              {/* <Icon
              mr={8}
              icon={Images.Profile.MaThanhToan}
              size={24}
              tintColor={Colors.brd1}
            /> */}
              <Image
                source={Images.Profile.DollarCircle}
                resizeMode="contain"
                style={[styles.icon1, styles.mr1]}
              />
              <View style={styles.flex1}>
                <Text style={[styles.text, styles.maxWidth1]}>
                  Cài đặt Face ID cho thanh toán
                </Text>
                <Text fs="md" color={Colors.g4}>
                  Thanh toán cho giao dịch dưới 5 triệu.
                </Text>
              </View>
              <Switch onColor={Colors.brd2} />
            </View>

            <TouchableOpacity style={styles.item}>
              {/* <Icon
              mr={8}
              icon={Images.Profile.MaThanhToan}
              size={24}
              tintColor={Colors.brd1}
            /> */}
              <Image
                source={Images.Profile.Key}
                resizeMode="contain"
                style={[styles.icon1, styles.mr1]}
              />
              <View style={styles.flex1}>
                <Text mr={10} size={Fonts.H6} style={styles.flex1}>
                  Tự động khóa ứng dụng
                </Text>
              </View>
              <View style={styles.boxTime1}>
                <Text size={Fonts.MD} color={Colors.tp3} mr={3}>
                  5 phút
                </Text>
                <Icon
                  // style={[base.leftAuto]}
                  icon={Images.Down}
                  size={30}
                  tintColor="#000"
                />
              </View>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </>
  );
};
const styles = StyleSheet.create({
  // flexRow: {flexDirection: 'row'},
  //----------------
  flex1: {flex: 1},
  //----------------
  // alignCenter: {alignItems: 'center',},
  //----------------
  maxWidth1: {maxWidth: 200},
  //----------------
  mr1: {marginRight: 12},
  //----------------
  pt1: {paddingTop: 24},
  //----------------
  item: {
    // backgroundColor: Colors.bs4,
    borderBottomColor: Colors.bs2,
    borderBottomWidth: 1,
    flexDirection: 'row',
    paddingVertical: 18,
    paddingHorizontal: Spacing.PADDING,
    // alignItems: 'center',
  },
  text: {
    marginRight: 80,
    fontSize: Fonts.H6,
  },
  //----------------
  icon1: {
    width: scale(24),
    height: scale(24),
  },
  //----------------
  boxTime1: {
    flexDirection: 'row',
    alignItems: 'center',
    top: -3,
  },
  //---------------
  bgImg: {
    width: scale(375),
    height: scale(375),
    position: 'absolute',
    bottom: 0,
    right: 0,
  },
  //---------------
  boxShadowGray: {
    backgroundColor: Colors.bs4,
    shadowColor: 'rgba(0, 0, 0, 1)',
    shadowOpacity: 0.2,
    shadowOffset: {width: 0, height: 0},
    elevation: 24,
    shadowRadius: 8,
    borderRadius: 10,
  },
});
export default PaymentSettings;
