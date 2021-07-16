import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {scale} from 'utils/Functions';

const ProgressBar = ({rate, style, color}) => {
  return (
    <View style={[styles.container, style]}>
      <View style={{backgroundColor: color, flex: rate, height: '100%'}} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: scale(95),
    height: scale(4),
    borderRadius: scale(10),
    backgroundColor: '#EDEDED',
    flexDirection: 'row',
    overflow: 'hidden',
  },
});

export default ProgressBar;
