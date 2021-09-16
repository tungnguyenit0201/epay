import React, {useState, useEffect} from 'react';
import {View, Pressable, Image, StyleSheet, Platform} from 'react-native';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import {Text, Icon} from 'components';
import {Colors, Fonts, Images, Spacing} from 'themes';
import Navigator from 'navigations/Navigator';
import {scale} from 'utils/Functions';
import _ from 'lodash';
import {SCREEN} from 'configs/Constants';

const Header = ({
  title,
  shadow = true,
  style,
  titleStyle,
  back = false,
  cart = false,
  onPressBack,
  renderRightComponent,
  avoidStatusBar = false,
  blackIcon = false,
  logo,
}) => {
  const goBack = () => {
    !!onPressBack ? onPressBack() : Navigator.goBack();
  };
  return (
    <View
      style={[
        styles.wrap,
        blackIcon && {backgroundColor: Colors.white},
        style,
      ]}>
      {avoidStatusBar && <View style={styles.avoidStatusBar} />}
      <View style={[{minHeight: scale(24)}]}>
        {!!title && (
          <Text
            semibold
            fs="h6"
            style={[
              styles.title,
              titleStyle,
              blackIcon && {color: Colors.black},
            ]}
            mb={10}>
            {title}
          </Text>
        )}
        <View
          style={[styles.flexRow, styles.alignCenter, styles.justifybetween]}>
          {Platform.isPad || Platform.OS == 'macos' ? (
            <Pressable
              style={styles.menuIcon}
              onPress={() => Navigator.openDrawer()}>
              <Image
                source={Images.MenuIcon}
                style={{height: scale(12), width: scale(12)}}
              />
            </Pressable>
          ) : (
            <>
              {back ? (
                <Pressable
                  onPress={() => goBack()}
                  hitSlop={{
                    right: scale(30),
                    top: scale(20),
                    bottom: scale(20),
                    left: scale(30),
                  }}>
                  <View style={styles.back}>
                    <Icon
                      icon={Images.ArrowLeft}
                      tintColor={blackIcon ? Colors.BLACK : Colors.white}
                    />
                  </View>
                </Pressable>
              ) : (
                <View />
              )}
            </>
          )}

          {/* Please do not move logo go anywhere.Because:
            *logo is aligning between icon left and icon right
            *you must to declare both icon left and right when you use
              logo.
            *I used to use absolute, but logo will overlap 
              icon left and right@@.
            *caution use [cart], because logo will 
              align a bit to left if cart is existed. */}
          {!!logo && (
            <Pressable
              onPress={() => {
                Navigator.navigate(SCREEN.TAB_NAVIGATION);
              }}>
              <Image source={logo} resizeMode="contain" style={[styles.logo]} />
            </Pressable>
          )}

          {cart && (
            <View
              style={{
                marginHorizontal: Spacing.PADDING,
              }}></View>
          )}
          {!!renderRightComponent && renderRightComponent()}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrap: {paddingBottom: scale(10)},
  //-----------------------------
  // absolute: {position: 'absolute'},
  // topZero: {top: 0},
  // leftZero: {left: 0},
  // rightZero: {right: 0},
  // botZero: {bottom: 0},
  //-----------------------------
  flexRow: {flexDirection: 'row'},
  justifybetween: {justifyContent: 'space-between'},
  alignCenter: {alignItems: 'center'},
  //-----------------------------
  avoidStatusBar: {height: getStatusBarHeight()},
  // flexRowBetween: {
  //   flexDirection: 'row',
  //   justifyContent: 'space-between',
  //   alignItems: 'center',
  // },
  back: {paddingHorizontal: Spacing.PADDING / 2},
  title: {
    textAlign: 'center',
    color: Colors.white,
    paddingTop: 5,
  },
  menuIcon: {
    paddingLeft: Spacing.PADDING,
    paddingVertical: scale(8),
    paddingRight: Spacing.PADDING * 10,
  },
  logo: {
    width: 110,
    height: 40,
  },
});

export default React.memo(Header);
