import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import Images from 'themes/Images';
import {scale} from 'utils/Functions';

const ScreenBackground = () => {
  return <Image source={Images.TrafficFee.Wave} style={styles.bgImg} />;
};

export default ScreenBackground;

const styles = StyleSheet.create({
  bgImg: {
    width: scale(375),
    height: scale(375),
    position: 'absolute',
    bottom: 0,
    right: 0,
  },
});
