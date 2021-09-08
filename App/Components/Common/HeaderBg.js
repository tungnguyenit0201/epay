import React, {useState} from 'react';
import {View, Image, StyleSheet, Text} from 'react-native';
import {Colors, Images, Spacing, base} from 'themes';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {scale} from 'utils/Functions';

//import {getStatusBarHeight} from 'react-native-status-bar-height';
//getStatusBarHeight()

const bgheader = require('images/home/homeHeader.jpg');

const Header = ({children, bgimg, style}) => {
  const {top} = useSafeAreaInsets();
  return (
    <View
      style={[base.container, styles.header, {paddingTop: top + 10}, style]}>
      <View style={styles.bg}>
        <Image source={bgimg ? bgimg : bgheader} style={styles.img} />
      </View>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    paddingBottom: 10,
    marginBottom: 20,
  },
  bg: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    overflow: 'hidden',
    borderBottomRightRadius: 24,
    borderBottomLeftRadius: 24,
    backgroundColor: Colors.cl1,
  },
  img: {
    width: scale(375),
    height: '100%',
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    resizeMode: 'cover',
  },
});

export default Header;
