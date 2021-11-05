import React from 'react';
import {View} from 'react-native';
import {Text, Button} from 'components';
import Navigator from 'navigations/Navigator';
import {SCREEN} from 'configs/Constants';
const Address = () => {
  return (
    <View>
      <Text>Nơi nhận kết quả</Text>
      <Text>Address</Text>
      <Button label="back" onPress={() => Navigator.goBack()} />
    </View>
  );
};

export default Address;
