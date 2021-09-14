import React, {useRef, useState} from 'react';
import {ScrollView, StyleSheet, View, useWindowDimensions} from 'react-native';
import Text from '../../../Atoms/Text';
import Header from '../../../Atoms/Header';
import Button from '../../../Atoms/Button';
import HeaderBg from '../../../Atoms/HeaderBg';
import {Colors, Fonts, Spacing, base, Row, Col} from 'themes';
import Progress from '../../../Groups/Progress';
import SelectImage from '../../../Groups/SelectImage';
const VerifyIdentityCard = ({route, disabledAvatar}) => {
  const translation = require('../../../../Context/Language/vi.json');

  return (
    <ScrollView style={{backgroundColor: Colors.white}}>
      <HeaderBg>
        <Header back title={translation?.account_verification} />
      </HeaderBg>
      <View style={[base.container, {paddingTop: 20}]}>
        <Progress space={1} step={2} />

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
  // container: {
  //   flex: 1,
  //   backgroundColor: Colors.BACKGROUNDCOLOR,
  // },
});
export default VerifyIdentityCard;
