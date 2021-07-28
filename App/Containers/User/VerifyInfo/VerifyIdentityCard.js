import React, {useRef, useState} from 'react';
import {ScrollView, StyleSheet, View, useWindowDimensions} from 'react-native';
import {Text, InputBlock, Header, Button, FWLoading} from 'components';
import {Colors, Fonts, Spacing} from 'themes';
import Navigator from 'navigations/Navigator';
import {SCREEN, TEXT} from 'configs/Constants';
import {useVerifyInfo} from 'context/User/utils';
import Progress from 'components/User/VerifyInfo/Progress';
import SelectImage from 'components/User/VerifyInfo/SelectImage';

const VerifyIdentityCard = ({route}) => {
  const {onChange, onContinue} = useVerifyInfo(route?.params);

  return (
    <View style={styles.container}>
      <Header back title={TEXT.VERIFY_ACCOUNT} />
      <ScrollView>
        <Progress />
        <SelectImage
          title="Mặt trước"
          onSelectImage={value => {
            onChange('frontIDCard', value);
          }}
        />
        <SelectImage
          title="Mặt sau"
          onSelectImage={value => onChange('backIDCard', value)}
        />
      </ScrollView>
      <Button
        label={TEXT.CONTINUE}
        onPress={() => onContinue(SCREEN.VERIFY_USER_PORTRAIT)}
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
export default VerifyIdentityCard;
