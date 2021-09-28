import React, {useRef, useState} from 'react';
import {StyleSheet, View, Image} from 'react-native';
import Text from './Text';
import {Colors, Fonts, Spacing, Images} from 'themes';
import {useTranslation} from 'context/Language';

const Content = ({
  title,
  text,
  style,
  titleMb,
  textMb,
  styleText,
  colorTitle,
}) => {
  const translation = useTranslation();
  return (
    <View style={style}>
      {Boolean(title) && (
        <Text
          bold
          fs="h3"
          style={[
            colorTitle ? {color: colorTitle} : styles.textWhite,
            titleMb ? {marginBottom: titleMb} : styles.mb1,
          ]}>
          {title}
        </Text>
      )}
      {Boolean(text) && (
        <Text
          fs="h6"
          style={[
            styles.textGray,
            textMb ? {marginBottom: textMb} : styles.mb2,
            styleText,
          ]}>
          {text}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  wrap: {
    paddingHorizontal: Spacing.PADDING,
  },
  //-----------------------
  mb1: {marginBottom: 14},
  mb2: {marginBottom: 26},
  //-----------------------
  textWhite: {color: Colors.white},
  textGray: {color: Colors.gray},
});

export default Content;
