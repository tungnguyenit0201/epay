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
          <Header back title="Đổi mật khẩu" back />
        </HeaderBg>
        <View style={base.container}>
          <Text mb={20}>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry.
          </Text>
          <InputBlock password label="Mật khẩu hiện tại" />
        </View>
      </ScrollView>
      <View style={base.bottom}>
        <Button
          label={TEXT.CHANGE_PASSWORD}
          onPress={() => Navigator.push(SCREEN.NEW_PASSWORD)}
        />
      </View>
    </>
  );
};

export default ChangePassword;

const styles = StyleSheet.create({});
