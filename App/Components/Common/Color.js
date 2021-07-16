import React from 'react';
import { View } from 'react-native';

export default ({ size = 20, color = 'white', ml, mr }) => (
  <View
    style={{
      width: size,
      height: size,
      backgroundColor: color,
      borderRadius: size / 2,
      marginLeft: ml,
      marginRight: mr
    }}
  />
);
