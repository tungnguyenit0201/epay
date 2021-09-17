import React, {useEffect, useState} from 'react';
import {Text, HeaderBg, Icon, Header, Row, Col, Button} from 'components';
import {
  ScrollView,
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {PERSONAL_IC, SCREEN} from 'configs/Constants';
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
    <View>
      <HeaderBg mb={0}>
        <Header back title={translation.bank_account} />
      </HeaderBg>
      <ScrollView style={{paddingTop: 20}}>
        <View style={[base.container]}>
          <UserInfo style={[{marginBottom: 20}]} />
          {userInfo?.personalIC?.Verified == PERSONAL_IC.INACTIVE && (
            <DinhDanh />
          )}
          <Account />
          <Row space={10} style={[{marginBottom: 30}]}>
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
                  Navigator.navigate(SCREEN.PAYMENT_SETTINGS);
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
                  Navigator.navigate(SCREEN.SECURITY);
                }}>
                <Image style={[styles.icon]} source={Images.Profile.BaoMat} />
                <Text semibold>{translation.password_and_security} </Text>
              </TouchableOpacity>
            </Col>
            <Col space={10}>
              <TouchableOpacity
                style={styles.item}
                onPress={() => {
                  Navigator.navigate(SCREEN.LANGUAGE_SETTING);
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
                  Navigator.navigate(SCREEN.LANGUAGE_SETTING);
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
                  Navigator.navigate(SCREEN.LANGUAGE_SETTING);
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
                  Navigator.navigate(SCREEN.NOTIFICATION);
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
                  Navigator.navigate(SCREEN.LANGUAGE_SETTING);
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

          <TouchableOpacity
            style={[base.row, styles.itemMenu]}
            onPress={() => {
              Navigator.navigate(SCREEN.NOTIFICATION);
            }}>
            <Image
              style={[styles.iconMenu]}
              source={require('images/profile/Info.png')}
            />
            <Text fs="h6" semibold ml={10}>
              {'Thông tin ứng dụng'}
            </Text>

            <Icon
              style={[base.leftAuto]}
              size={24}
              icon={Images.ArrowRight}
              tintColor={Colors.g3}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={[base.row, styles.itemMenu]}
            onPress={() => {
              Navigator.navigate(SCREEN.NOTIFICATION);
            }}>
            <Image
              style={[styles.iconMenu]}
              source={require('images/profile/Support.png')}
            />
            <Text fs="h6" semibold ml={10}>
              Trung tâm trợ giúp
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.boxLogout}>
          <Button
            onPress={onLogout}
            type={1}
            label={translation.log_out}
            bold
          />
        </View>
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
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

  itemMenu: {
    borderTopColor: Colors.g2,
    borderTopWidth: 1,
    paddingVertical: 10,
  },
  iconMenu: {
    width: 32,
    height: 32,
  },

  boxLogout: {
    marginTop: 30,
    paddingTop: scale(20),
    paddingHorizontal: scale(20),
    paddingBottom: scale(260),
    backgroundColor: Colors.white,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    shadowColor: Colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
export default User;
