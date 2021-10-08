import React from 'react';
import {StyleSheet, Text} from 'react-native';
import {Fonts, Colors, Spacing} from 'themes';
import {scale} from 'utils/Functions';

const CustomText = ({
  style: _style,
  color = Colors.BLACKTEXT,
  centered,
  right,
  regular,
  italic,
  semibold,
  underline,
  bold,
  children,
  size,
  fs,
  // fs = 'md',
  fw,
  lineHeight,
  mt,
  mb,
  ml,
  mr,
  mh,
  mv,
  ...props
}) => {
  let style = {};
  if (Array.isArray(_style)) {
    style = {...style, ...StyleSheet.flatten(_style)};
  } else {
    style = {...style, ..._style};
  }

  let fontFamily = Fonts.FONT_REGULAR;
  if (italic) {
    fontFamily = Fonts.FONT_ITALIC;
  } else if (semibold) {
    fontFamily = Fonts.FONT_500;
  } else if (bold) {
    fontFamily = Fonts.FONT_BOLD;
  }

  return (
    <Text
      style={[
        {
          color,
          fontFamily,
          textAlign: centered ? 'center' : right ? 'right' : 'left',
          fontSize: size || Fonts.MD,
          marginTop: mt || mv,
          marginBottom: mb || mv,
          marginLeft: ml || mh,
          marginRight: mr || mh,
        },
        underline && {textDecorationLine: 'underline'},
        fs === 'sm' && {fontSize: Fonts.SM, lineHeight: 48},
        fs === 'md' && {fontSize: Fonts.MD, lineHeight: 20},
        fs === 'lg' && {fontSize: Fonts.LG, lineHeight: 26},
        fs === 'h1' && {fontSize: Fonts.H1, lineHeight: 44},
        fs === 'h2' && {fontSize: Fonts.H2, lineHeight: 40},
        fs === 'h3' && {fontSize: Fonts.H3, lineHeight: 36},
        fs === 'h4' && {fontSize: Fonts.H4, lineHeight: 32},
        fs === 'h5' && {fontSize: Fonts.H5, lineHeight: 28},
        fs === 'h6' && {fontSize: Fonts.H6, lineHeight: 24},
        !!fw && {fontWeight: fw},

        style,
      ]}
      {...props}>
      {children}
    </Text>
  );
};

export default CustomText;
