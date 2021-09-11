import {Header} from 'components';
import React from 'react';
import {View, Text, Pressable} from 'react-native';
import Navigator from 'navigations/Navigator';
import {SCREEN} from 'configs/Constants';
const History = () => {
  return (
    <View>
      <Header back title="Lịch sử" avoidStatusBar blackIcon />
      <Pressable onPress={() => Navigator.navigate(SCREEN.DETAIL_HISTORY)}>
        <Text>Chi tiết</Text>
      </Pressable>
    </View>
  );
};

export default History;
