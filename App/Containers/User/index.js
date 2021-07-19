import React, {useEffect, useState} from 'react';
import Login from 'components/User/Login';
import {Text, Button} from 'components';
import {ScrollView} from 'react-native';
import {SCREEN} from 'configs/Constants';
import Navigator from 'navigations/Navigator';

const User = () => {
  return (
    <ScrollView>
      <Text>Nguyễn Văn A</Text>
      <Text>9999đ</Text>
      <Button
        label="Thông tin cá nhân"
        onPress={() => Navigator.push(SCREEN.USER_INFO)}
      />
      <Button
        label="Ngân hàng liên kết (2)"
        onPress={() => Navigator.push(SCREEN.BANK)}
      />
      <Text>Cài đặt</Text>
      <Button
        label="Cài đặt thanh toán"
        onPress={() => Navigator.push(SCREEN.PAYMENT_SETTINGS)}
      />
      <Button
        label="Mật khẩu và bảo mật"
        onPress={() => Navigator.push(SCREEN.SECURITY)}
      />
    </ScrollView>
  );
};
export default User;
