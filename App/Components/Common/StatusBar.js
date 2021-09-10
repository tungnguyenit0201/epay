import {View, Image, StyleSheet, StatusBar} from 'react-native';
import React from 'react';
import {useIsFocused} from '@react-navigation/native';

const StatusBarCustom = ({barStyle = 'dark-content', ...props}) => {
  const isFocused = useIsFocused();
  return isFocused ? <StatusBar barStyle={barStyle} {...props} /> : null;
};
export default React.memo(StatusBarCustom);
