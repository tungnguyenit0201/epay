import React from 'react';
import {Pressable, Image, StyleSheet, View} from 'react-native';
import {Colors, Fonts, Spacing} from 'themes';
import {scale} from 'utils/Functions';
import Text from './Text';
import {useSelector} from 'react-redux';
import Navigator from 'navigations/Navigator';

export default ({
  mode = 'contain', //outline
  onPress,
  bgImg = true,
  label,
  label2,
  icon,
  leftIcon,
  fw = '700',
  size,
  mt,
  mb,
  ml,
  mr,
  mh,
  mv,
  disabled,
  style,
  color,
  label2Style,
  labelStyle,
  border,
  bold,
  bg,
  radius,
  fs,
}) => {
  return (
    <Pressable
      disabled={disabled}
      onPress={onPress}
      style={[
        styles.button,
        mode == 'contain' && styles.contain,
        mode == 'outline' && styles.outline,
        mode == 'outline' && {borderColor: disabled ? Colors.l3 : Colors.cl1},
        size == 'xxs' ? styles.xxs : '',
        size == 'xs' ? styles.xs : '',
        size == 'sm' ? styles.sm : '',
        size == 'lg' ? styles.lg : '',
        size == 'xl' ? styles.xl : '',
        // border && {borderColor: border, borderWidth: 1},
        // radius && {borderRadius: radius},
        // bg && {backgroundColor: bg},
        mt && {marginTop: mt},
        mb && {marginBottom: mb},
        ml && {marginLeft: ml},
        mr && {marginRight: mr},
        mv && {marginVertical: mv},
        mh && {marginHorizontal: mh},
        style,
      ]}
    >
      {!!bgImg && mode == 'contain' && (
        <Image
          source={
            disabled
              ? require('images/ButtonDisable.png')
              : require('images/Button.png')
          }
          style={styles.bgImg}
        />
      )}

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
          // size == 'sm' && {fontSize: Fonts.H6},
          size == 'lg' && {fontSize: scale(18)},
          size == 'xl' && {fontSize: scale(20)},
          {
            color:
              mode == 'outline'
                ? disabled
                  ? Colors.black
                  : Colors.cl1
                : Colors.white,
          },
          color && {color: color},
          // labelStyle,
        ]}
      >
        {label}
        {label2 && <Text style={label2Style}>{` ${label2}`}</Text>}
      </Text>
      {!!icon && (
        <Image source={icon} style={[styles.image]} resizeMode={'contain'} />
      )}
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
    width: '100%',
    position: 'relative',
    overflow: 'hidden',
    paddingHorizontal: Spacing.PADDING,
  },
  contain: {
    backgroundColor: Colors.cl1,
  },
  outline: {
    borderWidth: 1.5,
    borderColor: Colors.l3,
    backgroundColor: Colors.white,
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
  sm: {height: 40, paddingHorizontal: 15},
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

{
  /* <Button
  label="Đăng ký" 
  mode = 'contain'
  onPress={() => Navigator.navigate(SCREEN.REGISTER)}
/> */
}
