import React, {useRef, useState} from 'react';
import {ScrollView, StyleSheet, View, useWindowDimensions} from 'react-native';
import {Text, InputBlock, Header, Button, HeaderBg} from 'components';
import {base} from 'themes';
import {SCREEN} from 'configs/Constants';
import Progress from 'components/User/VerifyInfo/Progress';
import {useVerifyInfo} from 'context/User/utils';
import SelectImage from 'components/User/VerifyInfo/SelectImage';
import {useTranslation} from 'context/Language';

const VerifyUserInfo = () => {
  const {onChange, onContinue} = useVerifyInfo();
  const translation = useTranslation();

  return (
    <>
      <ScrollView style={base.wrap}>
        <HeaderBg>
          <Header back title={translation?.account_verification} />
        </HeaderBg>

        <View style={[base.container, {paddingTop: 20}]}>
          <Progress step={1} />

          {/* <Picker
            items={[
              {label: 'Nữ', value: 1},
              {label: 'Nam', value: 2},
            ]}
            onChange={index => onPicker(index)}
            value={domain}
          /> */}
          {/* 
          <InputBlock
            label={'Họ và tên'}
            onChange={value => onChange('name', value)}
          />
          <InputBlock
            label={'Ngày sinh'}
            onChange={value => onChange('birthday', value)}
          /> */}

          <SelectImage
            title="Mặt trước"
            onSelectImage={value => onChange('ICFrontPhoto', value?.data)}
          />
          <SelectImage
            title="Mặt sau"
            onSelectImage={value => onChange('ICBackPhoto', value?.data)}
          />

          <Button
            label="Tiếp tục" //todo translate
            onPress={() => onContinue(SCREEN.VERIFY_IDENTITY_CARD)}
          />
        </View>
      </ScrollView>
    </>
  );
};

export default VerifyUserInfo;
