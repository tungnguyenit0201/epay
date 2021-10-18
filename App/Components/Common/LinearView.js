import React from 'react';
import {StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {Colors} from 'themes';
import {scale} from 'utils/Functions';

const LinearView = ({children, style, linearColors}) => {
  const linearArray = linearColors || [Colors.grd1, Colors.grd2];
  return (
    <LinearGradient
      colors={linearArray}
      style={[styles.linearGradient, style]}
      start={{x: 0, y: 0}}
      end={{x: 1, y: 0}}
    >
      {children}
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  linearGradient: {
    padding: scale(2),
    borderRadius: scale(300),
  },
});

export default LinearView;
