import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Button, Header} from 'components';
import {SCREEN, TEXT} from 'configs/Constants';
import Navigator from 'navigations/Navigator';

const EditInfo = () => {
  return (
    <View>
      <Header title={TEXT.EDIT_INFO} back />
      <Button label={TEXT.SAVE} onPress={() => Navigator.goBack()} />
    </View>
  );
};

export default EditInfo;

const styles = StyleSheet.create({});
