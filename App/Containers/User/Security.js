import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Button, Header} from 'components';
import {SCREEN, TEXT} from 'configs/Constants';
import Navigator from 'navigations/Navigator';

const Security = () => {
  return (
    <View>
      <Header title={'Mật khẩu và bảo mật'} back />
      <Button
        label={TEXT.CHANGE_PASSWORD}
        onPress={() => Navigator.push(SCREEN.CHANGE_PASSWORD)}
      />
    </View>
  );
};

export default Security;

const styles = StyleSheet.create({});
