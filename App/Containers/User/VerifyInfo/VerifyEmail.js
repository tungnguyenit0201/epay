import React, {useRef, useState} from 'react';
import {ScrollView, StyleSheet, View, useWindowDimensions} from 'react-native';
import {Text, Header, Button, TextInput, HeaderBg} from 'components';
import {base, Colors} from 'themes';
import {SCREEN, TEXT} from 'configs/Constants';
import Progress from 'components/User/VerifyInfo/Progress';
import {useVerifyInfo} from 'context/User/utils';
import SelectImage from 'components/User/VerifyInfo/SelectImage';

const VerifyEmail = () => {
  const {onChange, onContinue} = useVerifyInfo();

  return (
    <>
      <ScrollView style={base.wrap}>
        <HeaderBg>
          <Header back title="Xác thực Email" />
        </HeaderBg>

        <View style={[base.container, {paddingTop: 20}]}>
          <Text fs="h5" bold mb={10}>
            Nhập email
          </Text>
          <Text mb={20}>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry.
          </Text>

          <TextInput
            placeholder="Nhập email "
            placeholderTextColor={Colors.l5}
          />
        </View>
      </ScrollView>
      <View style={base.bottom}>
        <Button label={TEXT.CONTINUE} onPress={() => onContinue(SCREEN.OTP)} />
      </View>
    </>
  );
};

export default VerifyEmail;
