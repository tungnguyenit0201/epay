import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Button, Header, InputBlock} from 'components';
import {SCREEN, TEXT} from 'configs/Constants';
import Navigator from 'navigations/Navigator';

const ChangePassword = () => {
  return (
    <View>
      <Header title={'Mật khẩu mới'} back />
      <Button
        label={TEXT.SAVE}
        onPress={() => Navigator.navigate(SCREEN.TAB_NAVIGATION)}
      />
    </View>
  );
};

export default ChangePassword;

const styles = StyleSheet.create({});
