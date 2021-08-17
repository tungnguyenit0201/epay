import React, {useState, useContext} from 'react';
import {ScrollView, StyleSheet, View, TouchableOpacity} from 'react-native';

import {Text, Button, Icon, Header} from 'components';
import {SCREEN, TEXT} from 'configs/Constants';
import Navigator from 'navigations/Navigator';
import {Colors, Fonts, Images, Spacing, base} from 'themes';
import HeaderBg from 'components/Common/HeaderBg';
import {useTranslation} from 'context/Language';

import {Switch} from 'react-native-ui-lib'; //eslint-disable-line

const SmartOtp = () => {
  const translation = useTranslation();
  const [value1, setValue1] = useState(false);
  const [value2, setValue2] = useState(false);
  const [value3, setValue3] = useState(false);
  const [value4, setValue4] = useState(false);

  return (
    <>
      <ScrollView style={base.wrap}>
        <HeaderBg>
          <Header back title={translation.password_and_security} back />
        </HeaderBg>

        <TouchableOpacity
          style={styles.item}
          onPress={() => {
            Navigator.push(SCREEN.CHANGE_PASSWORD);
          }}>
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
        <TouchableOpacity
          style={styles.item}
          onPress={() => {
            Navigator.push(SCREEN.CHANGE_PASSWORD);
          }}>
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
        <TouchableOpacity
          style={styles.item}
          onPress={() => {
            Navigator.push(SCREEN.CHANGE_PASSWORD);
          }}>
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
        <Button
          label="Huỷ kích hoạt"
          //onPress={() => Navigator.push(SCREEN.SMART_OTP)}
        />
      </View>
    </>
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
export default SmartOtp;
