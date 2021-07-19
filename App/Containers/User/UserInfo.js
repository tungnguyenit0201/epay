import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Button, Header} from 'components';
import {SCREEN, TEXT} from 'configs/Constants';
import Navigator from 'navigations/Navigator';

const UserInfo = () => {
  return (
    <View>
      <Header title={'Thông tin cá nhân'} back />
      <Button
        label={TEXT.EDIT_INFO}
        onPress={() => Navigator.push(SCREEN.EDIT_INFO)}
      />
    </View>
  );
};

export default UserInfo;

const styles = StyleSheet.create({});
