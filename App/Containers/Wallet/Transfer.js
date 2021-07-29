import React from 'react';
import {View} from 'react-native';
import {Button, Header} from 'components';
import Navigator from 'navigations/Navigator';
import {SCREEN} from 'configs/Constants';

const Transfer = () => {
  return (
    <View>
      <Header back />
      <Button
        label="Chuyển tiền tới SĐT"
        onPress={() => Navigator.push(SCREEN.CONTACTS)}
      />
    </View>
  );
};

export default Transfer;
