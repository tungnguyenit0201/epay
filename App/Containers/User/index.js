import React, {useEffect, useState} from 'react';
import {
  Text,
  HeaderBg,
  Icon,
  Header,
  Row,
  Col,
  Button,
  Modal,
} from 'components';
import {
  ScrollView,
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {PERSONAL_IC, SCREEN} from 'configs/Constants';
import Navigator from 'navigations/Navigator';
import {Colors, Fonts, Images, Spacing, base} from 'themes';
import {scale, formatMoney} from 'utils/Functions';
import {useTranslation} from 'context/Language';

import UserInfo from 'components/User/UserInfo';
import Account from 'components/User/Account';
import DinhDanh from 'components/User/DinhDanh';

import {useSmartOTP} from 'context/User/utils';
import {useUser} from 'context/User';
import {useAuth} from 'context/Auth/utils';
import {useError} from 'context/Common/utils';
import {FLEX_KEY_PATTERN} from 'react-native-ui-lib/generatedTypes/src/commons/modifiers';
const User = () => {
  const translation = useTranslation();
  const {userInfo} = useUser();
  const {onLogout} = useAuth();
  const [open, setOpen] = useState(false);
  const {onGoSmartOTP} = useSmartOTP();

  return (
    <View>
      <HeaderBg mb={0}>
        <Header back title={translation.bank_account} />
      </HeaderBg>
      <ScrollView style={[base.wrap, {backgroundColor: Colors.white}]}>
        <View style={[base.container]}>
          <UserInfo style={styles.mb2} />
          {userInfo?.personalIC?.Verified == PERSONAL_IC.INACTIVE && (
            <DinhDanh />
          )}
          <View style={styles.mb1}>
            <Account />
          </View>

          <Row space={15} style={styles.mb4}>
            <Col space={15}>
              <TouchableOpacity
                style={styles.item}
                onPress={() => Navigator.navigate(SCREEN.MY_QR)}>
                <Image
                  style={[styles.icon, styles.mb3]}
                  source={Images.Profile.NotifyStatus}
                />

                <View style={styles.flexRow}>
                  <View style={styles.flex1}>
                    <Text semibold>{translation.my_order}</Text>
                  </View>
                  {/*
                  show notify status when user buy product
                  <View style={[styles.topMinus1,styles.notify1]}>
                    <Text color={Colors.white} centered size={Fonts.SM}>3</Text>
                  </View> */}
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.item}
                onPress={() => Navigator.navigate(SCREEN.MY_QR)}>
                <Image
                  style={[styles.icon, styles.mb3]}
                  source={Images.Profile.MaThanhToan}
                />
                <Text semibold>{translation.payment_qr}</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.item}
                onPress={() => {
                  Navigator.navigate(SCREEN.PAYMENT_SETTINGS);
                }}>
                <Image
                  style={[styles.icon, styles.mb3]}
                  source={Images.Profile.ThanhToan}
                />
                <Text semibold>{translation.maximum_transaction_value}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.item}
                onPress={() => {
                  Navigator.navigate(SCREEN.SECURITY);
                }}>
                <Image
                  style={[styles.icon, styles.mb3]}
                  source={Images.Profile.BaoMat}
                />
                <Text semibold>{translation.password_and_security} </Text>
              </TouchableOpacity>
            </Col>
            <Col space={15}>
              <TouchableOpacity
                style={styles.item}
                onPress={() => {
                  // Navigator.navigate(SCREEN.LANGUAGE_SETTING);
                  setOpen(true);
                }}>
                <Image
                  style={[styles.icon, styles.mb3]}
                  source={require('images/profile/NapVI.png')}
                />
                <Text semibold>{translation.automatically_top_up}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.item} onPress={onGoSmartOTP}>
                <Image
                  style={[styles.icon, styles.mb3]}
                  source={require('images/profile/OTP.png')}
                />
                <Text semibold>{translation.setting_smart_otp}</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.item}
                onPress={() => {
                  Navigator.navigate(SCREEN.LANGUAGE);
                }}>
                <Image
                  style={[styles.icon, styles.mb3]}
                  source={Images.Profile.Translate}
                />
                <Text semibold>{translation.language_setting}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.item}
                onPress={() => {
                  // Navigator.navigate(SCREEN.NOTIFICATION);
                  setOpen(true);
                }}>
                <Image
                  style={[styles.icon, styles.mb3]}
                  source={require('images/profile/Noti.png')}
                />
                <Text semibold>{translation.setting_notification}</Text>
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
              // Navigator.navigate(SCREEN.NOTIFICATION);
              setOpen(true);
            }}>
            <Image
              style={[styles.iconMenu]}
              source={require('images/profile/Support.png')}
            />
            <Text fs="h6" semibold ml={10}>
              {translation.help_center}
            </Text>

            <Icon
              style={[base.leftAuto]}
              size={24}
              icon={Images.ArrowRight}
              tintColor={Colors.g5}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={[base.row, styles.itemMenu]}
            onPress={() => {
              // Navigator.navigate(SCREEN.NOTIFICATION);
              setOpen(true);
            }}>
            <Image
              style={[styles.iconMenu]}
              source={require('images/profile/Info.png')}
            />
            <Text fs="h6" semibold ml={10}>
              {translation.application_information}
            </Text>

            <Icon
              style={[base.leftAuto]}
              size={24}
              icon={Images.ArrowRight}
              tintColor={Colors.g5}
            />
          </TouchableOpacity>
        </View>

        <View style={[base.shadow, styles.boxLogout]}>
          <Button
            size="lg"
            onPress={onLogout}
            label={translation.log_out}
            // style={base.bgWhite}
            // bgImg={0}
            color={Colors.black}
            mode="outline"
            style={{borderWidth: 0, elevation: 4}}
          />
        </View>
      </ScrollView>
      <Modal
        visible={open}
        onClose={() => setOpen(false)}
        content="Coming soon"
        buttonGroup={() => (
          <View>
            <Text></Text>
          </View>
        )}
        icon={Images.Homes.Setting}
        // icon={Images.SignUp.BigPhone}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  flex1: {flex: 1},
  //------------
  flexRow: {flexDirection: 'row'},
  //------------
  topMinus1: {top: -2},
  //------------
  mb1: {marginBottom: 24},
  mb2: {marginBottom: 20},
  mb3: {marginBottom: 10},
  mb4: {marginBottom: 15},
  //------------
  item: {
    padding: 10,
    backgroundColor: Colors.white,
    borderRadius: 10,
    marginBottom: 15,
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
    paddingVertical: 15,
  },
  iconMenu: {
    width: 32,
    height: 32,
  },

  boxLogout: {
    //marginTop: 30,
    paddingTop: scale(20),
    paddingHorizontal: scale(20),
    paddingBottom: scale(250),
  },
  //-----------
  notify1: {
    width: 18,
    height: 18,
    paddingTop: 3,
    borderRadius: 100,
    backgroundColor: Colors.Highlight,
  },
});
export default User;
