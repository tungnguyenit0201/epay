import React from 'react';
import {View} from 'react-native';
import {Button, Text} from 'components';
import Navigator from 'navigations/Navigator';
import {SCREEN} from 'configs/Constants';
const MyOrder = () => {
  return (
    <View>
      <Text>MyOrder</Text>
      <Button
        label="go to detail"
        onPress={() => Navigator.navigate(SCREEN.ORDER_DETAIL)}
      />
    </View>
  );
};
export default MyOrder;
