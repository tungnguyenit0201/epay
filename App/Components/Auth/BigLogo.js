import React from 'react';
import {StyleSheet, View, Image, Pressable} from 'react-native';
import {Colors, Fonts, Spacing, Images} from 'themes';

const BigLogo = ({style, onPress}) => {
  return (
    <Pressable onPress={onPress} style={[styles.alignCenter, style]}>
      <Image
        source={Images.logoEpay}
        resizeMode="contain"
        style={styles.logo}
      />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  alignCenter: {alignItems: 'center'},
  logo: {
    width: 110,
    height: 40,
  },
});

export default BigLogo;
