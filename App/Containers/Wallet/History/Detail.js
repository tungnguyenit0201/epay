import {Header} from 'components';
import React from 'react';
import {View, Text} from 'react-native';
const DetailHistory = () => {
  return (
    <View>
      <Header back title="Xem chi tiết" avoidStatusBar blackIcon />
      <Text>History</Text>
    </View>
  );
};

export default DetailHistory;
