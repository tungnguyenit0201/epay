import React from 'react';
import {View} from 'react-native';
import {Text, Button} from 'components';
import Navigator from 'navigations/Navigator';
import {SCREEN} from 'configs/Constants';
const TrafficFines = () => {
  return (
    <View>
      <Text>Thanh toán vi phạm giao thông</Text>
      <Text>TrafficFines</Text>
      <Button
        label="Nơi nhận kết quả"
        onPress={() => Navigator.navigate(SCREEN.TRAFFIC_FINES_ADDRESS)}
      />
      <Button
        label="Đơn vị vận chuyển"
        onPress={() => Navigator.navigate(SCREEN.TRAFFIC_FINES_TRANSPORT)}
      />
      <Button
        label="Xác nhận thanh toán"
        onPress={() => Navigator.navigate(SCREEN.TRAFFIC_FINES_CONFIRM)}
      />
    </View>
  );
};

export default TrafficFines;
