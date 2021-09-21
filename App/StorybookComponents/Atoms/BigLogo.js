import React from 'react';
import {StyleSheet, View, Image} from 'react-native';
import {Colors, Fonts, Spacing, Images} from 'themes';

const BigLogo = ({mb, style}) => {
  return (
    <View
      style={[styles.alignCenter, mb ? {marginBottom: mb} : styles.mb, style]}>
      <Image
        style={{width: 120, height: 72}}
        source={Images.logoEpay.default}
        resizeMode="contain"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  alignCenter: {alignItems: 'center'},
  mb: {marginBottom: Spacing.PADDING + 40},
});

export default BigLogo;
