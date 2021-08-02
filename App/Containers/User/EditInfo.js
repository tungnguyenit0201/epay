import React from 'react';
import {StyleSheet, View, ScrollView} from 'react-native';
import {Colors, Fonts, Images, Spacing, base} from 'themes';
import {Button, Header, InputBlock, Radio, Checkbox} from 'components';
import {SCREEN, TEXT} from 'configs/Constants';
import Navigator from 'navigations/Navigator';

const EditInfo = () => {
  return (
    <ScrollView style={{backgroundColor: '#fff'}}>
      <Header title="Thông tin cá nhân" back />
      <View style={[base.container, {paddingTop: 20}]}>
        {/* <Checkbox onPress={() => true} label="sdfsd sdfs"></Checkbox> */}
        <InputBlock
          label="Họ và Tên"
          value="Nguyen Van A"
          style={{marginBottom: 10}}
        />
        <InputBlock
          label="Ngày sinh"
          value="09/09/1999"
          style={{marginBottom: 10}}
        />
        <Radio
          items={[
            {label: 'Nữ', value: 1},
            {label: 'Nam', value: 2},
          ]}
        />

        <InputBlock
          label="CMND / CCCD"
          value="356789099"
          style={{marginBottom: 10}}
        />
        <InputBlock
          label="Nơi cấp"
          value="TP. HỒ Chí Minh"
          style={{marginBottom: 10}}
        />
        <InputBlock
          label="Địa chỉ"
          value="TP. HỒ Chí Minh"
          rightIcon={Images.Down}
          style={{marginBottom: 10}}
        />
        <Button label="Save" onPress={() => Navigator.goBack()} />
      </View>
    </ScrollView>
  );
};

export default EditInfo;

const styles = StyleSheet.create({});
