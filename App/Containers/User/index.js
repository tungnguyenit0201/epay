import React, {useEffect, useState} from 'react';
import {Text, HeaderBg, Icon, Header, Row, Col} from 'components';
import {
  ScrollView,
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {SCREEN} from 'configs/Constants';
import Navigator from 'navigations/Navigator';
import {Colors, Fonts, Images, Spacing, base} from 'themes';
import {scale, formatMoney} from 'utils/Functions';
import {useTranslation} from 'context/Language';

import UserInfo from 'components/User/UserInfo';
import Account from 'components/User/Account';
import DinhDanh from 'components/User/DinhDanh';

import {useUserInfo} from 'context/User/utils';
import {useBankInfo} from 'context/Wallet/utils';
import {useUser} from 'context/User';
import {useAuth} from 'context/Auth/utils';
import {useWallet} from 'context/Wallet';
import {getVersion} from 'react-native-device-info';

const User = () => {
  const translation = useTranslation();
  const {userInfo} = useUser();
  const {onGetConnectedBank} = useUserInfo();
  const {onGetAllBank} = useBankInfo();
  const {onLogout} = useAuth();
  const {listConnectBank} = useWallet();

  // TODO: translate
  return (
    <View style={styles.container}>
      <HeaderBg>
        <Header back title={translation.bank_account} />
      </HeaderBg>
      <ScrollView style={base.wrap}>
        <View style={[base.container]}>
          <UserInfo />
        </View>

        <View style={[base.container]}>
          <DinhDanh />
          <Account />

          <Row space={10}>
            <Col space={10}>
              <TouchableOpacity
                style={styles.item}
                onPress={() => Navigator.navigate(SCREEN.QRPAY)}>
                <Image
                  style={[styles.icon]}
                  source={Images.Profile.MaThanhToan}
                />
                <Text semibold>Mã thanh toán</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.item}
                onPress={() => {
                  Navigator.push(SCREEN.PAYMENT_SETTINGS);
                }}>
                <Image
                  style={[styles.icon]}
                  source={Images.Profile.ThanhToan}
                />
                <Text semibold>Cài đặt hạn mức thanh toán</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.item}
                onPress={() => {
                  Navigator.push(SCREEN.SECURITY);
                }}>
                <Image style={[styles.icon]} source={Images.Profile.BaoMat} />
                <Text semibold>{translation.password_and_security} </Text>
              </TouchableOpacity>
            </Col>
            <Col space={10}>
              <TouchableOpacity
                style={styles.item}
                onPress={() => {
                  Navigator.push(SCREEN.LANGUAGE_SETTING);
                }}>
                <Image
                  style={[styles.icon]}
                  source={require('images/profile/NapVI.png')}
                />
                <Text semibold>Nạp ví tự động</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.item}
                onPress={() => {
                  Navigator.push(SCREEN.LANGUAGE_SETTING);
                }}>
                <Image
                  style={[styles.icon]}
                  source={require('images/profile/OTP.png')}
                />
                <Text semibold>Cài đặt Smart OTP </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.item}
                onPress={() => {
                  Navigator.push(SCREEN.LANGUAGE_SETTING);
                }}>
                <Image
                  style={[styles.icon]}
                  source={Images.Profile.Translate}
                />
                <Text semibold>{translation.language_setting} </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.item}
                onPress={() => {
                  Navigator.push(SCREEN.NOTIFICATION);
                }}>
                <Image
                  style={[styles.icon]}
                  source={require('images/profile/Noti.png')}
                />
                <Text semibold>Cài đặt thông báo</Text>
              </TouchableOpacity>

              {/* <TouchableOpacity
                style={styles.item}
                onPress={() => {
                  Navigator.push(SCREEN.LANGUAGE_SETTING);
                }}>
                <Icon
                  style={[styles.icon]}
                  icon={Images.Profile.Location}
                  size={24}
                  tintColor={Colors.cl1}
                />
                <Text semibold>{translation.location_setting} </Text>
              </TouchableOpacity> */}
            </Col>
          </Row>
        </View>

        <View style={styles.block}>
          <View style={styles.item}>
            <Icon
              style={[styles.icon]}
              icon={null} // TODO: add icon
              size={24}
              tintColor={Colors.cl1}
            />
            <Text size={Fonts.H6}>{'Thông tin ứng dụng'}</Text>
            <Text size={Fonts.H6} style={{marginLeft: 'auto'}}>
              {getVersion()}
            </Text>
          </View>

          <TouchableOpacity
            style={styles.item}
            onPress={() => {
              Navigator.push(SCREEN.NOTIFICATION);
            }}>
            <Icon
              style={[styles.icon]}
              icon={Images.Profile.Help}
              size={24}
              tintColor={Colors.cl1}
            />
            <Text fs="h6">Trung tâm trợ giúp</Text>
          </TouchableOpacity>
        </View>

        <View style={base.bottom}>
          <TouchableOpacity style={styles.item} onPress={onLogout}>
            <Text size={Fonts.H6}>{translation.log_out} </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <View style={base.footer}></View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    flex: 1,
  },

  item: {
    padding: 10,
    backgroundColor: Colors.white,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: Colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  icon: {
    marginBottom: 5,
    width: 32,
    height: 32,
  },
});
export default User;
