import React, {useState, useContext} from 'react';
import {ScrollView, StyleSheet, View, TouchableOpacity} from 'react-native';

import {Text, Button, Icon, Header} from 'components';
import {SCREEN, TEXT} from 'configs/Constants';
import Navigator from 'navigations/Navigator';
import {Colors, Fonts, Images, Spacing, base} from 'themes';
import HeaderBg from 'components/Common/HeaderBg';
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
          style={[styles.icon]}
          icon={Images.Profile.MaThanhToan}
          size={24}
          tintColor={Colors.cl1}
        />
        <Text size={Fonts.H6}> Cài đặt nạp tiền tự động</Text>
        <Icon
          style={[styles.itemRight]}
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
          style={[styles.icon]}
          icon={Images.Profile.MaThanhToan}
          size={24}
          tintColor={Colors.cl1}
        />
        <Text size={Fonts.H6}> Xác nhận thanh toán nhanh</Text>
        <Switch
          style={styles.itemRight}
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
          style={[styles.icon]}
          icon={Images.Profile.MaThanhToan}
          size={24}
          tintColor={Colors.cl1}
        />
        <Text size={Fonts.H6}> Hạn mức trong ngày</Text>
      </View>
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
        <Text size={Fonts.H6}> Đăng ký thanh toán giao thông</Text>
        <Icon
          style={[styles.itemRight]}
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
export default PaymentSettings;
