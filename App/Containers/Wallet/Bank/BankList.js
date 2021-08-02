import React from 'react';
import {View, Text} from 'react-native';
import {Button} from 'components';
import Navigator from 'navigations/Navigator';
import {SCREEN} from 'configs/Constants';

const BankList = () => {
  return (
    <View>
      <Text>Danh sách ngân hàng</Text>

      <Button
        onPress={() => Navigator.push(SCREEN.BANK_INFO)}
        label="Vietcombank"
      />
    </View>
  );
};

export default BankList;
