import React from 'react';
import {StyleSheet, View, ScrollView} from 'react-native';
import {Button, Header, InputBlock, Text, HeaderBg} from 'components';
import {SCREEN, TEXT} from 'configs/Constants';
import Navigator from 'navigations/Navigator';
import {useTranslation} from 'context/Language';
import {base} from 'themes';
const ChangePassword = () => {
  const translation = useTranslation();
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
          label={TEXT.SAVE}
          onPress={() => Navigator.push(SCREEN.LOGIN)}
        />
      </View>
    </>
  );
};

export default ChangePassword;

const styles = StyleSheet.create({});
