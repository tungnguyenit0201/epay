import React, {useState, useContext} from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  TouchableOpacity,
  Pressable,
  Switch,
} from 'react-native';

import Text from '../../Atoms/Text';
import Icon from '../../Atoms/Icon';
import Header from '../../Atoms/Header';
import HeaderBg from '../../Atoms/HeaderBg';

import {Colors, Fonts, Images, Spacing, base} from 'themes';

// import {Switch} from 'react-native-ui-lib'; //eslint-disable-line
const PaymentSettings = () => {
  const translation = require('../../../Context/Language/vi.json');
  const [xacNhan, isXacNhan] = useState(false);
  // const {onGetLimit} = useUserInfo();
  return (
    <ScrollView style={base.wrap}>
      <HeaderBg>
        <Header back title={translation.payment_setting} />
      </HeaderBg>

      <TouchableOpacity
        style={styles.item}
        onPress={() => {
          console.log('hello');
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
          console.log('hello');
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
      <Pressable style={styles.item} onPress={() => console.log('hello')}>
        <Icon
          mr={8}
          icon={Images.Profile.MaThanhToan}
          size={24}
          tintColor={Colors.cl1}
        />
        <Text style={styles.text}> Hạn mức trong ngày</Text>
      </Pressable>
      <TouchableOpacity
        style={styles.item}
        onPress={() => {
          console.log('hello');
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
