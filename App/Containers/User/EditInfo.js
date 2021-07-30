import React from 'react';
import {StyleSheet, View, ScrollView} from 'react-native';
import {Colors, Fonts, Images, Spacing,  base} from 'themes';
import {Button, Header, InputBlock, Radio, Checkbox} from 'components';
import {SCREEN, TEXT} from 'configs/Constants';
import Navigator from 'navigations/Navigator';

const EditInfo = () => {
  return (
    <ScrollView style={{backgroundColor:'#fff'}}> 
      <Header title="sfsd" back />
      <View style={[base.container]}>
        <Checkbox onPress={() => true} label="sdfsd sdfs"></Checkbox>
        <Radio onPress={() => true}></Radio>

        <InputBlock numeric label="Họ và Tên" value="Nguyen Van A" 
          style={{marginBottom:10}}
        />
        <InputBlock numeric label="Ngày sinh" value="09/09/1999" 
          style={{marginBottom:10}}
        />        
      </View>
    </ScrollView>
  );
};

export default EditInfo;

const styles = StyleSheet.create({});
