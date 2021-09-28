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
import Wrapper from '../../../Groups/Wrapper';
import FooterContainer from '../../../Atoms/FooterContainer';
const VerifyIdentityCard = ({route, disabledAvatar}) => {
  const translation = require('../../../../Context/Language/vi.json');
  const {width} = useWindowDimensions();
  return (
    <Wrapper>
      <ScrollView style={{backgroundColor: Colors.white}}>
        <HeaderBg>
          <Header back title={translation?.account_verification} />
          <Image
            source={require('images/storybook/step2.png').default}
            style={{height: 60, marginTop: 25}}
          />
          <Image
            source={Images.VerifyUserInfo.iconDown.default}
            style={[styles.triangleDown, {left: width / 2 - 10}]}
            resizeMode="contain"
          />
        </HeaderBg>
        <View style={[base.container, {paddingTop: 20}]}>
          <View
            style={{
              width: 300,
              height: 186,
              backgroundColor: '#EEEEEE',
              borderRadius: 8,
              marginHorizontal: 'auto',
              marginVertical: 0,
              position: 'relative',
            }}>
            <View
              style={{
                flex: 1,
                width: 300,
                height: 186,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{textTransform: 'uppercase', fontSize: Fonts.H6}}
                bold>
                Ảnh chân dung
              </Text>
              <Image
                source={Images.Gradient.B_photo.default}
                style={{
                  height: 40,
                  width: 120,
                  borderRadius: 8,
                  cursor: 'pointer',
                  marginTop: 25,
                  zIndex: 9999999,
                }}
              />
            </View>
            <Image
              source={Images.Storybook.Wave.default}
              style={{
                position: 'absolute',
                width: 172,
                height: 160,
                right: 0,
                bottom: 0,
              }}
            />
          </View>
        </View>
      </ScrollView>
      <FooterContainer>
        <Image
          source={Images.Gradient.B_continueDisable.default}
          style={base.buttonSB}
        />
      </FooterContainer>
    </Wrapper>
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
