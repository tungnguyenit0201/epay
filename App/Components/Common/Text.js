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
  bold,
  children,
  size,
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
  } else if (bold) {
    fontFamily = Fonts.FONT_BOLD;
  }

  return (
    <Text
      style={[
        styles.text,
        {
          color,
          fontFamily,
          textAlign: centered ? 'center' : right ? 'right' : 'left',
          fontSize: size || Fonts.FONT_MEDIUM,
          marginTop: mt || mv,
          marginBottom: mb || mv,
          marginLeft: ml || mh,
          marginRight: mr || mh,
          //lineHeight,
        },
        style,
      ]}
      {...props}>
      {children}
    </Text>
  );
};
const styles = StyleSheet.create({
  text: {
    lineHeight: 20,
  },
});
export default CustomText;
