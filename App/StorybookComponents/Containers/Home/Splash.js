import React from 'react';
import {View, Image, StyleSheet} from 'react-native';
import {Images, Spacing, Colors} from 'themes';

/* import { useLanguage } from 'context/Language/utils'; */
import Button from '../../Atoms/Button';
const Language = () => {
  /* const { chooseLanguage } = useLanguage(); */
  return (
    <View style={[styles.container]}>
      <Image source={Images.Splash.default} style={[styles.img]} />
    </View>
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
