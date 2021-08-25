import React, {useState, useContext} from 'react';
import {ScrollView, StyleSheet, View, TouchableOpacity} from 'react-native';

import {Text, Button, Icon, Header, HeaderBg} from 'components';
import {SCREEN, TEXT} from 'configs/Constants';
import Navigator from 'navigations/Navigator';
import {Colors, Fonts, Images, Spacing, base} from 'themes';
import {useTranslation} from 'context/Language';

import {Switch} from 'react-native-ui-lib'; //eslint-disable-line

const PaymentSettings = () => {
  const translation = useTranslation();
  const [xacNhan, isXacNhan] = useState(false);

  return (
    <ScrollView style={base.wrap}>
      <HeaderBg>
        <Header back title={translation.payment_setting} back />
      </HeaderBg>

      <TouchableOpacity
        style={styles.item}
        onPress={() => {
          Navigator.push(SCREEN.AUTOPAYMENT);
        }}>
        <Icon
          mr={8}
          icon={Images.Profile.MaThanhToan}
          size={24}
          tintColor={Colors.cl1}
        />
        <Text style={styles.text}> Cài đặt nạp tiền tự động</Text>
        <Icon
          style={[base.leftAuto]}
          icon={Images.ArrowRight}
          size={24}
          tintColor="#000"
        />
      </TouchableOpacity>
      <View
        style={styles.item}
        onPress={() => {
          Navigator.push(SCREEN.NOTIFICATION);
        }}>
        <Icon
          mr={8}
          icon={Images.Profile.MaThanhToan}
          size={24}
          tintColor={Colors.cl1}
        />
        <Text style={styles.text}> Xác nhận thanh toán nhanh</Text>
        <Switch
          style={base.leftAuto}
          onColor={Colors.cl1}
          offColor={Colors.l3}
          value={xacNhan}
          onValueChange={isXacNhan}
        />
      </View>
      <View
        style={styles.item}
        onPress={() => {
          Navigator.push(SCREEN.NOTIFICATION);
        }}>
        <Icon
          mr={8}
          icon={Images.Profile.MaThanhToan}
          size={24}
          tintColor={Colors.cl1}
        />
        <Text style={styles.text}> Hạn mức trong ngày</Text>
      </View>
      <TouchableOpacity
        style={styles.item}
        onPress={() => {
          Navigator.push(SCREEN.NOTIFICATION);
        }}>
        <Icon
          mr={8}
          icon={Images.Profile.MaThanhToan}
          size={24}
          tintColor={Colors.cl1}
        />
        <Text style={styles.text}> Đăng ký thanh toán giao thông</Text>
        <Icon
          style={[base.leftAuto]}
          icon={Images.ArrowRight}
          size={24}
          tintColor="#000"
        />
      </TouchableOpacity>

      <View style={[base.container]}>
        <Text>Cài đặt hạn mức: 50000000đ</Text>
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
