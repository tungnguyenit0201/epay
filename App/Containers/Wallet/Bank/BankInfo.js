import React from 'react';
import {View, Text} from 'react-native';
import {Button} from 'components';
import Navigator from 'navigations/Navigator';
import {SCREEN} from 'configs/Constants';

const BankInfo = () => {
  return (
    <View>
      <Text>Ngân hàng nội địa / quốc tế</Text>

      <Button
        onPress={() => Navigator.push(SCREEN.BANK_RESULT)}
        label="Tiếp tục"
      />
    </View>
  );
};

export default BankInfo;
