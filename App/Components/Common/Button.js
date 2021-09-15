import React from 'react';
import {Pressable, Image, StyleSheet, View} from 'react-native';
import {Colors, Fonts} from 'themes';
import {scale} from 'utils/Functions';
import Text from './Text';
import {useSelector} from 'react-redux';
import Navigator from 'navigations/Navigator';

export default ({
  onPress,
  type,
  label,
  label2,
  icon,
  leftIcon,
  border,
  color,
  bold,
  bg,
  radius,
  fs,
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
}) => {
  return (
    <Pressable
      disabled={disabled}
      onPress={onPress}
      style={[
        styles.button,
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
        style,
        disabled && {backgroundColor: Colors.g4},
      ]}>
      {type == 'img' && (
        <Image source={require('images/BgHeader.jpg')} style={styles.bgImg} />
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
        style={[
          size == 'xxs' && {fontSize: scale(10)},
          size == 'xs' && {fontSize: scale(12)},
          size == 'sm' && {fontSize: scale(14)},
          size == 'lg' && {fontSize: scale(18)},
          size == 'xl' && {fontSize: scale(20)},
          fs && {fontSize: fs},
          bold && {fontWeight: 'bold'},
          {
            color: color ? color : Colors.white,
            lineHeight: 20,
          },
          labelStyle,
        ]}>
        {label}
        {
          label2 && [
            <>
              <Text> </Text>
              <Text style={label2Style}>{label2}</Text>
            </>,
          ]
          //label2 && typeof label2 == 'function' ? label2() : label2
        }
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
    paddingVertical: 5,
    paddingHorizontal: scale(20),
    borderRadius: scale(8),
    backgroundColor: Colors.cl1,
    height: 48,
    position: 'relative',
    overflow: 'hidden',
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
    right: 0,
    bottom: 0,
    top: 0,
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
  border='#fff'
  color='#f00'
  bg='#999'
  radius={50}
  style={[{marginTop:30}]}
  onPress={() => Navigator.navigate(SCREEN.REGISTER)}
/> */
}
