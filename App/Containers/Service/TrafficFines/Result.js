import React from 'react';
import {View} from 'react-native';
import {Text, Button} from 'components';
import Navigator from 'navigations/Navigator';
import {SCREEN} from 'configs/Constants';
const Result = () => {
  return (
    <View>
      <Text>Result</Text>
      <Button
        label=" Kết quả giao dịch "
        onPress={() => Navigator.navigate(SCREEN.TRAFFIC_FINES_RECEIPT)}
      />
    </View>
  );
};

export default Result;
