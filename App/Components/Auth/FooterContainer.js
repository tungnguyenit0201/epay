import React, {useState} from 'react';
import {View, Image, StyleSheet, useWindowDimensions} from 'react-native';
import {Colors, Images, Spacing, base} from 'themes';

const FooterContainer = ({children, pb, style}) => {
  // const {top} = useSafeAreaInsets();
  const {width} = useWindowDimensions();
  return (
    <View
      style={[
        {paddingBottom: !!pb ? pb : 45},
        styles.pt1,
        styles.blockBtn,
        styles.wrap,
        styles.bgWhite,
        style,
      ]}
    >
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  wrap: {paddingHorizontal: Spacing.PADDING},
  //------------------
  pt1: {paddingTop: Spacing.PADDING},
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
