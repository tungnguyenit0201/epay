import React, {useState, useContext} from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
} from 'react-native';

import Text from '../../Atoms/Text';
import Icon from '../../Atoms/Icon';
import Header from '../../Atoms/Header';
import HeaderBg from '../../Atoms/HeaderBg';
import Switch from '../../Atoms/Switch';
import Wrapper from '../../Groups/Wrapper';
import {Colors, Fonts, Images, Spacing, base} from 'themes';

const PaymentSettings = () => {
  const translation = require('../../../Context/Language/vi.json');
  const [touchIdEnabled, setTouchId] = useState(false);

  return (
    <Wrapper>
      <ScrollView style={base.wrap}>
        <HeaderBg>
          <Header back title={translation.password_and_security} />
        </HeaderBg>

        <View style={[base.wrap, base.boxShadow]}>
          <TouchableOpacity
            style={styles.item}
            onPress={() => {
              console.log('hello');
            }}>
            <Text style={[styles.text]}>Đổi mật khẩu</Text>
            <Icon
              style={[base.leftAuto]}
              icon={Images.ArrowRight}
              size={24}
              tintColor="#000"
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.item}
            onPress={() => {
              console.log('hello');
            }}>
            <Text style={[styles.text]}>Đổi số điện thoại</Text>
            <Icon
              style={[base.leftAuto]}
              icon={Images.ArrowRight}
              size={24}
              tintColor="#000"
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.item}
            onPress={() => {
              console.log('hello');
            }}>
            <Text style={[styles.text]}>Lịch sử truy cập ví</Text>
            <Icon
              style={[base.leftAuto]}
              icon={Images.ArrowRight}
              size={24}
              tintColor="#000"
            />
          </TouchableOpacity>
          <View style={[styles.item]}>
            <Text style={[styles.text]}> Cài đặt Face ID cho đăng nhập</Text>
            <Switch
              key={touchIdEnabled}
              initialValue={touchIdEnabled}
              onChange={() => setTouchId(!touchIdEnabled)}
            />
          </View>
          <View style={styles.item}>
            <View style={{marginRight: -28}}>
              <Text style={[styles.text]}> Cài đặt Face ID cho thanh toán</Text>
              <Text style={{fontSize: 12}}>
                Thanh toán cho giao dịch dưới 5 triệu
              </Text>
            </View>
            <Switch
              key={touchIdEnabled}
              initialValue={touchIdEnabled}
              onChange={() => setTouchId(!touchIdEnabled)}
            />
          </View>
          <View style={styles.item}>
            <Text style={[styles.text]}>Tự động khóa ứng dụng</Text>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                marginLeft: 10,
              }}>
              <Text style={{fontSize: 12}}>5 phút</Text>
              <Image
                source={require('images/Down.png').default}
                style={{width: 18, height: 18}}
              />
            </View>
          </View>
        </View>
      </ScrollView>
      <Image source={require('images/wave.png').default} style={styles.bgImg} />
    </Wrapper>
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
    fontWeight: '600',
  },
  bgImg: {
    width: 375,
    height: 375,
    position: 'absolute',
    bottom: 0,
    right: 0,
  },
});
export default PaymentSettings;
