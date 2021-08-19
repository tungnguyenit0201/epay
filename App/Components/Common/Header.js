import React, {useState, useEffect} from 'react';
import {View, Pressable, Image, StyleSheet, Platform} from 'react-native';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import {Text, Icon} from 'components';
import {Colors, Fonts, Images, Spacing} from 'themes';
import Navigator from 'navigations/Navigator';
import {scale} from 'utils/Functions';
import _ from 'lodash';

const Header = ({
  title,
  shadow = true,
  style,
  titleStyle,
  back = false,
  cart = false,
  onPressBack,
  renderRightComponent,
  avoidStatusBar = true,
}) => {
  const goBack = () => {
    !!onPressBack ? onPressBack() : Navigator.goBack();
  };
  return (
    <View style={[style, {}]}>
      {avoidStatusBar && <View style={styles.avoidStatusBar} />}
      <View style={{minHeight: scale(24)}}>
        <Text semibold size={Fonts.H6} style={[styles.title, titleStyle]}>
          {title}
        </Text>
        <View
          style={{
            flexDirection: 'row',
            position: 'absolute',
            justifyContent: 'space-between',
            bottom: 0,
            left: 0,
            right: 0,
          }}>
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
                  style={styles.left}
                  onPress={() => goBack()}
                  hitSlop={{
                    right: scale(30),
                    top: scale(20),
                    bottom: scale(20),
                    left: scale(30),
                  }}>
                  <View style={styles.back}>
                    <Icon icon={Images.ArrowLeft} tintColor="#fff" />
                  </View>
                </Pressable>
              ) : (
                <View />
              )}
            </>
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
  wrap: {
    paddingBottom: scale(10),
    backgroundColor: Colors.BACKGROUNDCOLOR,
  },
  avoidStatusBar: {height: getStatusBarHeight()},
  shadow: {
    shadowColor: Colors.BLACK,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.15,
    shadowRadius: 2,
    elevation: 5,
    zIndex: 1,
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  back: {
    paddingHorizontal: Spacing.PADDING / 2,
  },
  right: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontWeight: 'bold',
    alignSelf: 'center',
    color: '#fff',
    paddingTop: 5,
  },
  menuIcon: {
    paddingLeft: Spacing.PADDING,
    paddingVertical: scale(8),
    paddingRight: Spacing.PADDING * 10,
  },
});

export default React.memo(Header);
