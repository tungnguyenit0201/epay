import React, {useEffect} from 'react';
import {
  View,
  Image,
  StyleSheet,
  Pressable,
  Text,
  useWindowDimensions,
} from 'react-native';
const Wrapper = ({children}) => {
  const {width, height} = useWindowDimensions();
  return (
    <View style={{flex: 1, height: height - 32, position: 'relative'}}>
      {children}
    </View>
  );
};
export default Wrapper;
