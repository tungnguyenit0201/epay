import React, {useEffect, useState} from 'react';
import Login from 'components/User/Login';
import {Text, Button, Icon, Header} from 'components';
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
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {scale} from 'utils/Functions';
import {useTranslation} from 'context/Language';

import HeaderBg from 'components/Common/HeaderBg';
import UserInfo from 'components/User/UserInfo';

const User = () => {
  const {top} = useSafeAreaInsets();
  const translation = useTranslation();

  return (
    <ScrollView style={base.wrap}>
      <HeaderBg>
        <Header back title={translation.bank_account} />
      </HeaderBg>

      <View style={[base.container]}>
        <UserInfo />
      </View>
      <View style={styles.block}>
        <TouchableOpacity
          style={styles.item}
          onPress={() => {
            Navigator.push(SCREEN.NOTIFICATION);
          }}>
          <Icon
            style={[styles.icon]}
            icon={Images.Profile.MaThanhToan}
            size={24}
            tintColor={Colors.cl1}
          />
          <Text size={Fonts.H6}>{translation.my_wallet}</Text>
          <Text size={Fonts.H6} style={{marginLeft: 'auto'}} bold>
            12.000.000 vnd
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.item}
          onPress={() => {
            Navigator.push(SCREEN.BANK_LIST);
          }}>
          <Icon
            style={[styles.icon]}
            icon={Images.Profile.Bank}
            size={24}
            tintColor={Colors.cl1}
          />
          <Text size={Fonts.H6}>
            {translation.bank_linking}
            <Text> (2)</Text>
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.item}
          onPress={() => {
            Navigator.push(SCREEN.NOTIFICATION);
          }}>
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
          <Text size={Fonts.H6}>{translation.feedback} </Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={styles.item}
        onPress={() => {
          Navigator.push(SCREEN.NOTIFICATION);
        }}>
        <Icon
          style={[styles.icon]}
          icon={Images.Profile.Logout}
          size={24}
          tintColor={Colors.cl1}
        />
        <Text size={Fonts.H6}>{translation.log_out} </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  heading: {
    marginTop: 20,
    borderBottomColor: Colors.l4,
    borderBottomWidth: 1,
  },
  title: {
    textTransform: 'uppercase',
  },
  link: {
    textDecorationLine: 'underline',
  },
  block: {
    borderBottomColor: '#EEEEEE',
    borderBottomWidth: 8,
  },
  item: {
    backgroundColor: '#fff',
    borderBottomColor: '#EEEEEE',
    borderBottomWidth: 1,
    flexDirection: 'row',
    paddingVertical: 12,
    paddingHorizontal: Spacing.PADDING,
    alignItems: 'center',
  },
  icon: {
    marginRight: 10,
  },

  itemRight: {
    marginLeft: 'auto',
  },
});
export default User;
