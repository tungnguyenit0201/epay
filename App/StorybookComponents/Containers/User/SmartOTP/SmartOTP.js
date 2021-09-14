import React from 'react';
import {ScrollView, StyleSheet, View, TouchableOpacity} from 'react-native';

import Text from '../../../Atoms/Text';
import Button from '../../../Atoms/Button';
import Header from '../../../Atoms/Header';
import HeaderBg from '../../../Atoms/HeaderBg';
import Icon from '../../../Atoms/Icon';

import {Colors, Fonts, Images, Spacing, base} from 'themes';

const SmartOtp = () => {
  const translation = require('../../../../Context/Language/vi.json');

  return (
    <>
      <ScrollView style={base.wrap}>
        <HeaderBg>
          <Header back title={translation.password_and_security} />
        </HeaderBg>

        <Text>Số serial: {'123455233' || '...'}</Text>
        <Text>Smart OTP: Phiên bản {'12.13' || '...'}</Text>

        <TouchableOpacity
          style={styles.item}
          onPress={() => console.log('hello')}>
          <Icon
            mr={8}
            icon={Images.Profile.MaThanhToan}
            size={24}
            tintColor={Colors.cl1}
          />
          <Text style={styles.text}> Đổi mật khẩu smart OTP</Text>
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
          <Text style={styles.text}> Quên mật khẩu smart OTP</Text>
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
          <Text style={styles.text}> Smart OTP không hoạt động</Text>
          <Icon
            style={[base.leftAuto]}
            icon={Images.ArrowRight}
            size={24}
            tintColor="#000"
          />
        </TouchableOpacity>
      </ScrollView>
      <View style={base.bottom}>
        <Button label="Huỷ kích hoạt" onPress={() => console.log('hello')} />
      </View>
    </>
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
export default SmartOtp;
