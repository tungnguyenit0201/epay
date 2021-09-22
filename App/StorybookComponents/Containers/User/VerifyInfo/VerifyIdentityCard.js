import React, {useRef, useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  useWindowDimensions,
  Image,
} from 'react-native';
import Text from '../../../Atoms/Text';
import Header from '../../../Atoms/Header';
import Button from '../../../Atoms/Button';
import HeaderBg from '../../../Atoms/HeaderBg';
import {Colors, Fonts, Spacing, base, Row, Col, Images} from 'themes';
import Progress from '../../../Groups/Progress';
import SelectImage from '../../../Groups/SelectImage';
const VerifyIdentityCard = ({route, disabledAvatar}) => {
  const translation = require('../../../../Context/Language/vi.json');
  const {width} = useWindowDimensions();
  return (
    <ScrollView style={{backgroundColor: Colors.white}}>
      <HeaderBg>
        <Header back title={translation?.account_verification} />
        <Progress space={1} step={2} />
        <Image
          source={Images.VerifyUserInfo.iconDown.default}
          style={[styles.triangleDown, {left: width / 2 - 10}]}
          resizeMode="contain"
        />
      </HeaderBg>
      <View style={[base.container, {paddingTop: 20}]}>
        <SelectImage
          title="Hình minh họa" // TODO: translate
          onSelectImage={value => console.log(value)}
        />

        <Button
          disabled={disabledAvatar}
          label={'Tiếp tục'} // TODO: translate
          onPress={() => console.log('tiep tuc')}
          style={{marginTop: 20}}
        />
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  triangleDown: {
    position: 'absolute',
    left: Spacing.PADDING * 2,
    bottom: -9,
    width: 20,
    height: 10,
  },

  drop: {
    marginBottom: Spacing.PADDING,
  },
});
export default VerifyIdentityCard;
