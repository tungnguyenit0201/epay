import React from 'react';
import {View, StyleSheet} from 'react-native';
import {UIActivityIndicator} from 'react-native-indicators';
import {Colors} from 'themes';
import {scale} from 'utils/Functions';

const FWLoading = ({
  wrapStyle,
  color = Colors.cl1,
  size = scale(20),
  loadingStyle,
}) => (
  <View style={[styles.wrap, wrapStyle]}>
    <View style={[styles.background, loadingStyle]}>
      <UIActivityIndicator color={color} size={size} />
    </View>
  </View>
);

const styles = StyleSheet.create({
  wrap: {
    ...StyleSheet.absoluteFill,
    backgroundColor: Colors.black,
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 0.5,
  },
  background: {
    backgroundColor: Colors.white,
    borderRadius: scale(5),
    width: scale(72),
    height: scale(64),
  },
});

export default FWLoading;
