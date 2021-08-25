import React, {useRef, useState} from 'react';
import {ScrollView, StyleSheet, View, useWindowDimensions} from 'react-native';
import {Text, InputBlock, Header, Button, HeaderBg} from 'components';
import {Colors, Fonts, Spacing, base, Row, Col} from 'themes';
import Navigator from 'navigations/Navigator';
import {SCREEN} from 'configs/Constants';
import {useVerifyInfo} from 'context/User/utils';
import Progress from 'components/User/VerifyInfo/Progress';
import SelectImage from 'components/User/VerifyInfo/SelectImage';
import {useTranslation} from 'context/Language';

const VerifyIdentityCard = ({route}) => {
  const {onChange, onContinue} = useVerifyInfo(route?.params);
  const translation = useTranslation();

  return (
    <ScrollView style={{backgroundColor: '#fff'}}>
      <HeaderBg>
        <Header back title={translation?.account_verification} />
      </HeaderBg>
      <View style={[base.container, {paddingTop: 20}]}>
        <Progress space={1} step={2} />

        <SelectImage
          title="Hình minh họa" //translate
          onSelectImage={value => onChange('Avatar', value?.data)}
        />

        <Button
          label={'Tiếp tục'} //translate
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
