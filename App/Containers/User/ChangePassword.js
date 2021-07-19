import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Button, Header, InputBlock} from 'components';
import {SCREEN, TEXT} from 'configs/Constants';
import Navigator from 'navigations/Navigator';

const ChangePassword = () => {
  return (
    <View>
      <Header title={'Đổi mật khẩu'} back />
      <InputBlock label="Mật khẩu hiện tại" />
      <Button
        label={TEXT.CHANGE_PASSWORD}
        onPress={() => Navigator.push(SCREEN.NEW_PASSWORD)}
      />
    </View>
  );
};

export default ChangePassword;

const styles = StyleSheet.create({});
