import React from 'react';
import {View, Image, StyleSheet} from 'react-native';
import {Images, Spacing, Colors, base} from 'themes';

/* import { useLanguage } from 'context/Language/utils'; */
import Button from '../../Atoms/Button';
import FooterContainer from '../../Atoms/FooterContainer';
import Wrapper from '../../Groups/Wrapper';
const Language = () => {
  /* const { chooseLanguage } = useLanguage(); */
  return (
    <Wrapper>
      <View style={[styles.container]}>
        <Image source={Images.Splash.default} style={[styles.img]} />
      </View>
      <FooterContainer>
        <Button
          label="English"
          bold
          style={{height: 48}}
          bg={Colors.white}
          color={Colors.cl1}
          border={Colors.cl1}
          mb={Spacing.PADDING}
          onPress={() => chooseLanguage('en')}
        />
        <Image
          source={Images.Gradient.B_Vietnamese.default}
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
export default Language;
