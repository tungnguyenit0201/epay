import React from 'react';
import {View, StyleSheet} from 'react-native';
import {UIActivityIndicator} from 'react-native-indicators';
import {Colors} from 'themes';
import {scale} from 'utils/Functions';

const FWLoading = ({
  wrapStyle,
  color = Colors.brd1,
  size = scale(25),
  loadingStyle,
}) => (
  <View style={[styles.wrap, wrapStyle]}>
    {/* <View style={[styles.background, loadingStyle]}> */}
    <UIActivityIndicator color={color} size={size} />
    {/* </View> */}
  </View>
);

const styles = StyleSheet.create({
  wrap: {
    ...StyleSheet.absoluteFill,
    backgroundColor: Colors.tp2,
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 0.5,
  },
  background: {
    backgroundColor: Colors.bs4,
    borderRadius: scale(5),
    width: scale(72),
    height: scale(64),
  },
});

export default FWLoading;
