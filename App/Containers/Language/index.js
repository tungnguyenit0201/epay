import React from 'react';
import {View, Image, StyleSheet} from 'react-native';
import {Images} from 'themes';

const Language = () => {
  return (
    <View style={styles.container}>
      <Image source={Images.Splash} style={styles.img} />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  img: {
    width: '100%',
    height: '100%',
  },
});
export default Language;
