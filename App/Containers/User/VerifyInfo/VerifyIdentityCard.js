import React, {useRef, useState} from 'react';
import {ScrollView, StyleSheet, View, useWindowDimensions} from 'react-native';
import {Text, InputBlock, Header, Button, FWLoading} from 'components';
import {Colors, Fonts, Spacing, base, Row, Col} from 'themes';
import Navigator from 'navigations/Navigator';
import {SCREEN, TEXT} from 'configs/Constants';
import {useVerifyInfo} from 'context/User/utils';
import Progress from 'components/User/VerifyInfo/Progress';
import SelectImage from 'components/User/VerifyInfo/SelectImage';

const VerifyIdentityCard = ({route}) => {
  const {onChange, onContinue} = useVerifyInfo(route?.params);

  return (
    <ScrollView style={{backgroundColor: '#fff'}}>
      <Header back title={TEXT.VERIFY_ACCOUNT} />
      <View style={[base.container, {paddingTop: 20}]}>
        <Progress space={1} step={2} />

        <SelectImage
          title="Hình minh họa"
          onSelectImage={value => onChange('portrait', value)}
        />

        <Button
          label={TEXT.CONTINUE}
          onPress={() => onContinue(SCREEN.VERIFY_USER_PORTRAIT)}
        />
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.BACKGROUNDCOLOR,
  },
});
export default VerifyIdentityCard;
