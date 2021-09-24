import React, {useState} from 'react';
import {View, Image, StyleSheet, useWindowDimensions} from 'react-native';
import {Colors, Images, Spacing, base} from 'themes';
// import {useSafeAreaInsets} from 'react-native-safe-area-context';
// import {scale} from 'utils/Functions';
//import {getStatusBarHeight} from 'react-native-status-bar-height';
//getStatusBarHeight()

const BlueHeader = ({children, bgimg, style, heightBg}) => {
  // const {top} = useSafeAreaInsets();
  const {width} = useWindowDimensions();
  return (
    <View style={[styles.flex1, styles.bgWhite, styles.pt1, style]}>
      <Image
        source={bgimg ? bgimg.default : Images.SignUp.BgBlue.default}
        style={[
          styles.absolute,
          styles.topZero,
          styles.leftZero,
          {width: width - 32},
          heightBg ? {height: heightBg} : {height: 220},
        ]}
      />
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  flex1: {flex: 1},
  absolute: {position: 'absolute'},
  topZero: {top: 0},
  leftZero: {left: 0},
  rightZero: {right: 0},
  pt1: {paddingTop: 15},
  //-------------------------
  bgWhite: {backgroundColor: Colors.BACKGROUNDCOLOR},
});

export default BlueHeader;
