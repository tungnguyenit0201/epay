import React, {useRef, useState} from 'react';
import {ScrollView, StyleSheet, View, useWindowDimensions} from 'react-native';
import {Text, InputBlock, Header, Button, HeaderBg} from 'components';
import {Colors, Fonts, Spacing, base, Row, Col} from 'themes';
import {SCREEN} from 'configs/Constants';
import {useVerifyInfo} from 'context/User/utils';
import Progress from 'components/User/VerifyInfo/Progress';
import SelectImage from 'components/User/VerifyInfo/SelectImage';
import DropImage from 'components/User/VerifyInfo/DropImage';
import {useTranslation} from 'context/Language';

const VerifyIdentityCard = ({route}) => {
  const {disabledAvatar, onChange, onContinue} = useVerifyInfo(route?.params);
  const translation = useTranslation();

  return (
    <ScrollView style={{backgroundColor: Colors.white}}>
      <HeaderBg>
        <Header back title={translation?.account_verification} />
      </HeaderBg>
      <View style={[base.container, {paddingTop: 20}]}>
        <Progress space={1} step={2} />

        <DropImage
          title="Hình minh họa" // TODO: translate
          onDropImage={value => onChange('Avatar', value?.data)}
        />

        <Button
          disabled={disabledAvatar}
          label={'Tiếp tục'} // TODO: translate
          onPress={() => onContinue(SCREEN.VERIFY_USER_PORTRAIT)}
        />
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  // container: {
  //   flex: 1,
  //   backgroundColor: Colors.BACKGROUNDCOLOR,
  // },
});
export default VerifyIdentityCard;
