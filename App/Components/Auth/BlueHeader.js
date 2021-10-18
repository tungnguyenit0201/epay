import React, {useState} from 'react';
import {
  View,
  Image,
  StyleSheet,
  useWindowDimensions,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import {Colors, Images, Spacing, base} from 'themes';
// import {useSafeAreaInsets} from 'react-native-safe-area-context';
// import {scale} from 'utils/Functions';
//import {getStatusBarHeight} from 'react-native-status-bar-height';
//getStatusBarHeight()

const BlueHeader = ({children, bgimg, style, heightBg}) => {
  // const {top} = useSafeAreaInsets();
  const {width} = useWindowDimensions();
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={[styles.flex1, styles.bgWhite, styles.pt1, style]}>
        <Image
          source={bgimg ? bgimg : Images.SignUp.BgBlue}
          style={[
            styles.absolute,
            styles.topZero,
            styles.leftZero,
            {width: width},
            heightBg ? {height: heightBg} : {height: 220},
          ]}
        />
        {children}
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  flex1: {flex: 1},
  absolute: {position: 'absolute'},
  topZero: {top: 0},
  leftZero: {left: 0},
  pt1: {paddingTop: 43},
  //-------------------------
  bgWhite: {backgroundColor: Colors.bs4},
});

export default BlueHeader;
