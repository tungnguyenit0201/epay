import React from 'react';
import {ScrollView, StyleSheet, View, TouchableOpacity} from 'react-native';

import {Text, Button, Icon, Header, HeaderBg} from 'components';
import {Colors, Fonts, Images, Spacing, base} from 'themes';
import {useTranslation} from 'context/Language';
import {useSmartOTPInfo} from 'context/User/utils';

const SmartOtp = () => {
  const translation = useTranslation();
  const {
    smartOTPInfo,
    onChangePassword,
    onForgetPassword,
    onSyncSmartOTP,
    onDeactivateSmartOTP,
  } = useSmartOTPInfo();

  return (
    <>
      <ScrollView style={base.wrap}>
        <HeaderBg>
          <Header back title={translation.password_and_security} />
        </HeaderBg>

        <Text mt={20}>Số serial: {smartOTPInfo?.serialNumber || '...'}</Text>
        <Text>Smart OTP: Phiên bản {smartOTPInfo?.version || '...'}</Text>

        <TouchableOpacity style={styles.item} onPress={onChangePassword}>
          <Icon
            mr={8}
            icon={Images.Profile.MaThanhToan}
            size={24}
            tintColor={Colors.brd1}
          />
          <Text style={styles.text}> Đổi mật khẩu smart OTP</Text>
          <Icon
            style={[base.leftAuto]}
            icon={Images.ArrowRight}
            size={24}
            tintColor="#000"
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.item} onPress={onForgetPassword}>
          <Icon
            mr={8}
            icon={Images.Profile.MaThanhToan}
            size={24}
            tintColor={Colors.brd1}
          />
          <Text style={styles.text}> Quên mật khẩu smart OTP</Text>
          <Icon
            style={[base.leftAuto]}
            icon={Images.ArrowRight}
            size={24}
            tintColor="#000"
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.item} onPress={onSyncSmartOTP}>
          <Icon
            mr={8}
            icon={Images.Profile.MaThanhToan}
            size={24}
            tintColor={Colors.brd1}
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
        <Button label="Huỷ kích hoạt" onPress={onDeactivateSmartOTP} />
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
