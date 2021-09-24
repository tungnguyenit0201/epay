import React from 'react';
import {View} from 'react-native';
import Button from '../../Atoms/Button';
import Header from '../../Atoms/Header';
const QRPay = () => {
  return (
    <View>
      <Header back title="Quét mã" avoidStatusBar />

      <Button
        onPress={() => console.log('onPress')}
        mt={10}
        label="Chuyển tiền số điện thoại"></Button>
    </View>
  );
};
export default QRPay;
