import React from 'react';
import {View} from 'react-native';

export default ({height = 2, marginBottom, styles}) => (
  <View style={[{backgroundColor: '#eee', height, marginBottom}, styles]} />
);
