import React, {useState} from 'react';
import {View, Image, StyleSheet, useWindowDimensions} from 'react-native';
import {Colors, Images, Spacing, base} from 'themes';

const FooterContainer = ({children, style}) => {
  // const {top} = useSafeAreaInsets();
  const {width} = useWindowDimensions();
  return (
    <View
      style={[styles.py1, styles.blockBtn, styles.wrap, styles.bgWhite, style]}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  wrap: {paddingHorizontal: Spacing.PADDING},
  //------------------
  py1: {paddingVertical: Spacing.PADDING},
  //------------------
  bgWhite: {backgroundColor: Colors.BACKGROUNDCOLOR},
  //------------------
  blockBtn: {
    borderTopLeftRadius: Spacing.PADDING,
    borderTopRightRadius: Spacing.PADDING,
    shadowColor: Colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.16,
    shadowRadius: 8,
    elevation: 24,
  },
});

export default FooterContainer;
