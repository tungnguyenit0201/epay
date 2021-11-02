import React from 'react';
import {View} from 'react-native';
import {Button, Text} from 'components';
import Navigator from 'navigations/Navigator';
import {SCREEN} from 'configs/Constants';
const DetailOrder = () => {
  return (
    <View>
      <Text>DetailOrder</Text>
      <Button
        label="go to RECEIPT"
        onPress={() => Navigator.navigate(SCREEN.RECEIPT)}
      />
    </View>
  );
};
export default DetailOrder;
