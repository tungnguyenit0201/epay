import React, {useRef, useState} from 'react';
import {ScrollView, StyleSheet, View, useWindowDimensions} from 'react-native';
import {Text, InputBlock, Header, Button, FWLoading} from 'components';
import {Colors, Fonts, Spacing} from 'themes';
import {SCREEN, TEXT} from 'configs/Constants';
import Progress from 'components/User/VerifyInfo/Progress';
import {useVerifyInfo} from 'context/User/utils';

const VerifyUserInfo = () => {
  const {onChange, onContinue} = useVerifyInfo();

  return (
    <View style={styles.container}>
      <Header back title={TEXT.VERIFY_ACCOUNT} />
      <ScrollView>
        <Progress />
        <InputBlock
          label={'Họ và tên'}
          onChange={value => onChange('name', value)}
        />
        <InputBlock
          label={'Ngày sinh'}
          onChange={value => onChange('birthday', value)}
        />
      </ScrollView>
      <Button
        label={TEXT.CONTINUE}
        onPress={() => onContinue(SCREEN.VERIFY_IDENTITY_CARD)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.BACKGROUNDCOLOR,
  },
});
export default VerifyUserInfo;
