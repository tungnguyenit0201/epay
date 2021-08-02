import React from 'react';
import {View, Text} from 'react-native';
import {Button} from 'components';
import Navigator from 'navigations/Navigator';
import {SCREEN} from 'configs/Constants';

const BankResult = () => {
  return (
    <View>
      <Text>Chi tiết giao dịch</Text>

      <Button
        onPress={() => Navigator.navigate(SCREEN.TAB_NAVIGATION)}
        label="Trở về trang chủ"
      />
    </View>
  );
};

export default BankResult;
