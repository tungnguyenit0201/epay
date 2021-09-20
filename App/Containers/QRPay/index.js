import React from 'react';
import {View} from 'react-native';
import {Text, Button, Header} from 'components';
import Navigator from 'navigations/Navigator';
import {SCREEN} from 'configs/Constants';
const QRPay = () => {
  return (
    <View>
      <Header back title="Quét mã" avoidStatusBar />

      <Button
        onPress={() => Navigator.navigate(SCREEN.QR_TRANSFER)}
        mt={10}
        label="Chuyển tiền số điện thoại"></Button>
    </View>
  );
};
export default QRPay;
