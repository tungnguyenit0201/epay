import React from 'react';
import {View, Image, StyleSheet} from 'react-native';
import {Images, Spacing, Colors, base} from 'themes';

/* import { useLanguage } from 'context/Language/utils'; */
import Button from '../../../Atoms/Button';
import FooterContainer from '../../../Atoms/FooterContainer';
import Header from '../../../Atoms/Header';
import Wrapper from '../../../Groups/Wrapper';
import Text from '../../../Atoms/Text';
const PreviewImage = () => {
  /* const { choosePreviewImage } = useLanguage(); */
  return (
    <Wrapper>
      <View style={[styles.container]}>
        <Image source={Images.Background.default} style={[styles.img]} />
      </View>
      <Header
        back
        title="Ảnh chân dung"
        style={{
          position: 'absolute',
          top: 15,
          left: 100,
        }}
      />
      <Image
        source={require('images/storybook/preview.png').default}
        style={{
          width: 310,
          height: 180,
          borderRadius: 8,
          position: 'absolute',
          top: 120,
          left: 33,
        }}
      />
      <Text
        style={{
          textDecorationLine: 'underline',
          color: Colors.white,
          marginTop: 16,
          position: 'absolute',
          top: 320,
          left: 160,
        }}>
        Chụp lại
      </Text>
      <FooterContainer>
        <Image
          source={Images.Gradient.B_Continue.default}
          style={base.buttonSB}
        />
      </FooterContainer>
    </Wrapper>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  img: {
    width: '100%',
    minHeight: 850,
  },
  groupButton: {
    position: 'absolute',
    bottom: 0,
    backgroundColor: Colors.white,
    width: '100%',
    paddingBottom: Spacing.PADDING * 2,
    paddingTop: Spacing.PADDING,
    paddingHorizontal: Spacing.PADDING,
    borderTopLeftRadius: Spacing.PADDING,
    borderTopRightRadius: Spacing.PADDING,
  },
});
export default PreviewImage;
