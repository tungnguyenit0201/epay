import React, {useState, useEffect} from 'react';
import {View, Pressable, Image, StyleSheet, Platform} from 'react-native';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import {Colors, Fonts, Images, Spacing} from 'themes';
import {scale} from 'utils/Functions';
import _ from 'lodash';
import Text from './Text';
import Icon from './Icon';
const Header = ({
  title,
  shadow = true,
  style,
  titleStyle,
  back = false,
  onPressBack,
  renderRightComponent,
  avoidStatusBar = false,
  blackIcon = false,
  logo,
  onPressLogo,
}) => {
  const goBack = () => {
    console.log('goBack');
  };
  return (
    <View
      style={[
        styles.wrap,
        blackIcon && {backgroundColor: Colors.white},
        style,
      ]}>
      {avoidStatusBar && <View style={styles.avoidStatusBar} />}
      <View style={styles.header}>
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
        <View style={styles.wrapCenter}>
          {!!title && (
            <Text
              fw="700"
              fs="h6"
              color={Colors.white}
              centered
              style={[titleStyle, blackIcon && {color: Colors.black}]}>
              {title}
            </Text>
          )}
          {!!logo && (
            <Pressable onPress={onPressLogo}>
              <Image source={logo} resizeMode="contain" style={[styles.logo]} />
            </Pressable>
          )}
        </View>

        {!!renderRightComponent ? (
          renderRightComponent()
        ) : (
          <View style={styles.rightIcon} />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrap: {paddingVertical: scale(10)},

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: scale(24),
  },

  avoidStatusBar: {height: getStatusBarHeight()},

  back: {paddingHorizontal: Spacing.PADDING / 2},
  wrapCenter: {
    alignItems: 'center',
    flex: 1,
  },

  logo: {
    width: 110,
    height: 40,
  },
  rightIcon: {
    width: Spacing.PADDING * 2.5,
  },
});

export default React.memo(Header);
