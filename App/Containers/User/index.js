import React, {useEffect, useState} from 'react';
import {Text, HeaderBg, Icon, Header} from 'components';
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
        <View style={styles.block}>
          <TouchableOpacity onPress={onGetConnectedBank} style={styles.item}>
            <Icon
              style={[styles.icon]}
              icon={Images.Profile.SoDu}
              size={24}
              tintColor={Colors.cl1}
            />
            <Text size={Fonts.H6}>Số dư</Text>
            <Text size={Fonts.H6} style={{marginLeft: 'auto'}} bold>
              {formatMoney(userInfo?.myWallet, true)}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.item} onPress={onGetAllBank}>
            <Icon
              style={[styles.icon]}
              icon={Images.Profile.Bank}
              size={24}
              tintColor={Colors.cl1}
            />
            <Text size={Fonts.H6}>
              {translation.bank_linking}
              <Text>({listConnectBank?.length})</Text>
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.item}
            onPress={() => Navigator.navigate(SCREEN.QRPAY)}>
            <Icon
              style={[styles.icon]}
              icon={Images.Profile.MaThanhToan}
              size={24}
              tintColor={Colors.cl1}
            />
            <Text size={Fonts.H6}>{translation.payment_code} </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.block}>
          <TouchableOpacity
            style={styles.item}
            onPress={() => {
              Navigator.push(SCREEN.PAYMENT_SETTINGS);
            }}>
            <Icon
              style={[styles.icon]}
              icon={Images.Profile.ThanhToan}
              size={24}
              tintColor={Colors.cl1}
            />
            <Text size={Fonts.H6}>{translation.payment_setting} </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.item}
            onPress={() => {
              Navigator.push(SCREEN.SECURITY);
            }}>
            <Icon
              style={[styles.icon]}
              icon={Images.Profile.BaoMat}
              size={24}
              tintColor={Colors.cl1}
            />
            <Text size={Fonts.H6}>{translation.password_and_security} </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.item}
            onPress={() => {
              Navigator.push(SCREEN.LANGUAGE_SETTING);
            }}>
            <Icon
              style={[styles.icon]}
              icon={Images.Profile.Translate}
              size={24}
              tintColor={Colors.cl1}
            />
            <Text size={Fonts.H6}>{translation.language_setting} </Text>
          </TouchableOpacity>
          <TouchableOpacity
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
            <Text size={Fonts.H6}>{translation.location_setting} </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.block}>
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
            <Text size={Fonts.H6}>Trung tâm trợ giúp</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.item}
            onPress={() => {
              Navigator.push(SCREEN.NOTIFICATION);
            }}>
            <Icon
              style={[styles.icon]}
              icon={Images.Profile.Edit}
              size={24}
              tintColor={Colors.cl1}
            />
            <Text size={Fonts.H6}>{translation.feedback}</Text>
          </TouchableOpacity>
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
        </View>
        <TouchableOpacity style={styles.item} onPress={onLogout}>
          <Icon
            style={[styles.icon]}
            icon={Images.Profile.Logout}
            size={24}
            tintColor={Colors.cl1}
          />
          <Text size={Fonts.H6}>{translation.log_out} </Text>
        </TouchableOpacity>
        <View style={styles.bottom}></View>
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  // heading: {
  //   marginTop: 20,
  //   borderBottomColor: Colors.l4,
  //   borderBottomWidth: 1,
  // },
  // title: {
  //   textTransform: 'uppercase',
  // },
  // link: {
  //   textDecorationLine: 'underline',
  // },
  container: {
    backgroundColor: Colors.white,
    flex: 1,
  },
  block: {
    borderBottomColor: Colors.l2,
    borderBottomWidth: 8,
  },
  item: {
    backgroundColor: Colors.white,
    borderBottomColor: Colors.l2,
    borderBottomWidth: 1,
    flexDirection: 'row',
    paddingVertical: 12,
    paddingHorizontal: Spacing.PADDING,
    alignItems: 'center',
  },
  icon: {
    marginRight: 10,
  },
  bottom: {
    height: scale(80),
  },
  // itemRight: {
  //   marginLeft: 'auto',
  // },
});
export default User;
