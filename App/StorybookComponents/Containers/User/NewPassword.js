import React from 'react';
import {StyleSheet, View, ScrollView} from 'react-native';
import Button from '../../Atoms/Button';
import Header from '../../Atoms/Header';
import InputBlock from '../../Atoms/InputBlock';
import Text from '../../Atoms/Text';
import HeaderBg from '../../Atoms/HeaderBg';

import {base} from 'themes';
const NewPassword = () => {
  const translation = require('../../../Context/Language/vi.json');
  return (
    <>
      <ScrollView style={base.wrap}>
        <HeaderBg>
          <Header back title="Đặt mật khẩu mới" back />
        </HeaderBg>
        <View style={base.container}>
          <Text mb={20}>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry.
          </Text>
          <InputBlock password label="Mật khẩu khẩu" />
          <InputBlock password label="Xác nhận mật" />
        </View>
      </ScrollView>
      <View style={base.bottom}>
        <Button
          label={'Lưu'}
          onPress={() => console.log('hello')}
        />
      </View>
    </>
  );
};

export default NewPassword;

const styles = StyleSheet.create({});
