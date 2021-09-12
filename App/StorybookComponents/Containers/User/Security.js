import React, {useState, useContext} from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  TouchableOpacity,
} from 'react-native';

import Text from '../../Atoms/Text';
import Icon from '../../Atoms/Icon';
import Header from '../../Atoms/Header';
import HeaderBg from '../../Atoms/HeaderBg';
import Switch from '../../Atoms/Switch';
import {Colors, Fonts, Images, Spacing, base} from 'themes';

const PaymentSettings = () => {
  const translation = require('../../../Context/Language/vi.json');
  const [touchIdEnabled, setTouchId] = useState(false);

  return (
    <ScrollView style={base.wrap}>
      <HeaderBg>
        <Header back title={translation.password_and_security} />
      </HeaderBg>

      <TouchableOpacity
        style={styles.item}
        onPress={() => {
          console.log('hello')
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
      <TouchableOpacity style={styles.item} onPress={() => console.log('hello')}>
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
          onChange={() => setTouchId(!touchIdEnabled)}
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
    backgroundColor: Colors.white,
    borderBottomColor: Colors.l2,
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
