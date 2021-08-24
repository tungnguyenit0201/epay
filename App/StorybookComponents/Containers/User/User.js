import React, { useEffect, useState } from 'react';
import Text from '../../Atoms/Text';
import Icon from '../../Atoms/Icon';
import Header from '../../Atoms/Header';
import {
  ScrollView,
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { Colors, Fonts, Images, Spacing, base } from 'themes';
import { scale, formatMoney } from 'utils/Functions';

import HeaderBg from '../../Atoms/HeaderBg';
import UserInfo from '../../Groups/UserInfo';

const User = ({}) => {
  const translation = require('../../../Context/Language/vi.json');

  return (
    <ScrollView style={base.wrap}>
      <HeaderBg>
        <Header back title={translation.bank_account} />
      </HeaderBg>

      <View style={[base.container]}>
        <UserInfo />
      </View>
      <View style={styles.block}>
        <View style={styles.item}>
          <Icon
            style={[styles.icon]}
            icon={Images.Profile.MaThanhToan}
            size={24}
            tintColor={Colors.cl1}
          />
          <Text size={Fonts.H6}>{translation.my_wallet}</Text>
          <Text size={Fonts.H6} style={{ marginLeft: 'auto' }} bold>
            {formatMoney(100000)}
          </Text>
        </View>

        <TouchableOpacity
          style={styles.item}
          onPress={() => {
            console.log('hello')
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
            console.log('gggg')
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
          console.log('hhhhh')
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
