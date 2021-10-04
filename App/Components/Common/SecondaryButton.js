import React from 'react';
import {Pressable, Image, StyleSheet, View} from 'react-native';
import {Colors, Fonts, Spacing} from 'themes';
import {scale} from 'utils/Functions';
import Text from './Text';
import {LinearView} from 'components';

export default ({
  onPress,
  bgImg = 1,
  label,
  label2,
  icon,
  leftIcon,
  border,
  color,
  bold = true,
  bg,
  radius,
  fs,
  fw,
  size,
  mt,
  mb,
  ml,
  mr,
  mh,
  mv,
  disabled,
  style,
  labelStyle,
  label2Style,
  mode = 'contain', //outline
  buttonStyle,
}) => {
  return (
    <Pressable disabled={disabled} onPress={onPress}>
      <LinearView
        style={[{borderRadius: scale(8)}, style]}
        linearColors={[Colors.primary, Colors.blue]}>
        <View
          style={[
            styles.button,
            mode == 'contain' && styles.contain,
            mode == 'outline' && styles.outline,
            border && {borderColor: border, borderWidth: 1},
            radius && {borderRadius: radius},
            bg && {backgroundColor: bg},
            mt && {marginTop: mt},
            mb && {marginBottom: mb},
            ml && {marginLeft: ml},
            mr && {marginRight: mr},
            mv && {marginVertical: mv},
            mh && {marginHorizontal: mh},
            size == 'xxs' ? styles.xxs : '',
            size == 'xs' ? styles.xs : '',
            size == 'sm' ? styles.sm : '',
            size == 'lg' ? styles.lg : '',
            size == 'xl' ? styles.xl : '',
            disabled && {backgroundColor: Colors.g4},
            buttonStyle,
          ]}>
          {!!leftIcon && (
            <Image
              source={leftIcon}
              style={[styles.leftIcon]}
              resizeMode={'contain'}
            />
          )}
          <Text
            centered
            size={Fonts.H6}
            fw={fw}
            style={[
              size == 'xxs' && {fontSize: scale(10)},
              size == 'xs' && {fontSize: scale(12)},
              size == 'sm' && {fontSize: scale(14)},
              size == 'lg' && {fontSize: scale(18)},
              size == 'xl' && {fontSize: scale(20)},
              fs && {fontSize: fs},
              bold && {fontWeight: 'bold'},
              {
                color: color ? color : Colors.blue,
                lineHeight: 20,
              },
              labelStyle,
            ]}>
            {label}
            {label2 && [
              <>
                <Text style={label2Style}>{label2}</Text>
              </>,
            ]}
          </Text>
          {!!icon && (
            <Image
              source={icon}
              style={[styles.image]}
              resizeMode={'contain'}
            />
          )}
        </View>
      </LinearView>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: scale(8),
    height: scale(48),
    position: 'relative',
    overflow: 'hidden',
    paddingHorizontal: Spacing.PADDING,
  },
  contain: {
    backgroundColor: Colors.white,
  },
  outline: {
    borderWidth: 1,
    borderColor: Colors.white,
  },
  xxs: {
    height: 20,
    paddingHorizontal: 6,
    paddingVertical: 0,
  },
  xs: {
    height: 28,
    paddingHorizontal: 10,
    paddingVertical: 0,
  },
  sm: {height: 34, paddingHorizontal: 15},
  lg: {height: 55},
  xl: {height: 70},

  bgImg: {
    position: 'absolute',
    left: 0,
    bottom: 0,
    top: 0,
    width: scale(375),
    height: scale(64),
    resizeMode: 'cover',
  },

  image: {
    width: scale(15),
    height: scale(15),
    marginRight: scale(9),
  },
  leftIcon: {
    width: 24,
    marginRight: 8,
  },
  // ...stylesCss,
});
