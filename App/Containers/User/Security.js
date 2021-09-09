import React, {useState, useContext} from 'react';
import {ScrollView, StyleSheet, View, TouchableOpacity} from 'react-native';

import {Text, Button, Icon, Header, Switch, HeaderBg} from 'components';
import {SCREEN, TEXT} from 'configs/Constants';
import Navigator from 'navigations/Navigator';
import {Colors, Fonts, Images, Spacing, base} from 'themes';
import {useTranslation} from 'context/Language';
import {useSecuritySettings} from 'context/User/utils';

const PaymentSettings = () => {
  const translation = useTranslation();
  const {settings, onTouchId, onSmartOTP} = useSecuritySettings();
  const {touchIdEnabled} = settings;

  return (
    <ScrollView style={base.wrap}>
      <HeaderBg>
        <Header back title={translation.password_and_security} back />
      </HeaderBg>

      <TouchableOpacity
        style={styles.item}
        onPress={() => {
          Navigator.push(SCREEN.CHANGE_PASSWORD, 'confirm_password_response');
        }}>
        <Icon
          mr={8}
          icon={Images.Profile.MaThanhToan}
          size={24}
          tintColor={Colors.cl1}
        />
        <Text style={styles.text}>Đổi mật khẩu</Text>
        <Icon
          style={[base.leftAuto]}
          icon={Images.ArrowRight}
          size={24}
          tintColor="#000"
        />
      </TouchableOpacity>
      <TouchableOpacity style={styles.item} onPress={onSmartOTP}>
        <Icon
          mr={8}
          icon={Images.Profile.MaThanhToan}
          size={24}
          tintColor={Colors.cl1}
        />
        <Text style={styles.text}> Smart OTP</Text>
        <Icon
          style={[base.leftAuto]}
          icon={Images.ArrowRight}
          size={24}
          tintColor="#000"
        />
      </TouchableOpacity>
      <View style={styles.item}>
        <Icon
          mr={8}
          icon={Images.Profile.MaThanhToan}
          size={24}
          tintColor={Colors.cl1}
        />
        <Text style={styles.text}> Cài đặt Touch id / Face id</Text>
        <Switch
          key={touchIdEnabled}
          initialValue={touchIdEnabled}
          onChange={onTouchId}
        />
      </View>
      <View style={styles.item}>
        <Icon
          mr={8}
          icon={Images.Profile.MaThanhToan}
          size={24}
          tintColor={Colors.cl1}
        />
        <Text style={styles.text}>Cảnh báo đăng nhập trên thiết bị khác</Text>
        <Switch />
      </View>

      <View style={styles.item}>
        <Icon
          mr={8}
          icon={Images.Profile.MaThanhToan}
          size={24}
          tintColor={Colors.cl1}
        />
        <Text style={styles.text}> Lưu phiên đăng nhập</Text>
        <Switch />
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  item: {
    backgroundColor: '#fff',
    borderBottomColor: '#EEEEEE',
    borderBottomWidth: 1,
    flexDirection: 'row',
    paddingVertical: 12,
    paddingHorizontal: Spacing.PADDING,
    alignItems: 'center',
  },
  text: {
    marginRight: 80,
    fontSize: Fonts.H6,
  },
});
export default PaymentSettings;
