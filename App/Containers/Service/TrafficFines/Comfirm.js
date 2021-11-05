import React from 'react';
import {View} from 'react-native';
import {Text, Button} from 'components';
import Navigator from 'navigations/Navigator';
import {SCREEN} from 'configs/Constants';
const Comfirm = () => {
  return (
    <View>
      <Text>Comfirm</Text>
      <Button
        label="Số quyết định"
        onPress={() => Navigator.navigate(SCREEN.TRAFFIC_FINES_DECISION)}
      />
      <Button
        label=" Kết quả giao dịch "
        onPress={() => Navigator.navigate(SCREEN.TRAFFIC_FINES_RESULT)}
      />
    </View>
  );
};

export default Comfirm;
