import React, {useRef, useState} from 'react';
import {StyleSheet, View, Image} from 'react-native';
import {Text} from 'components';
import {Colors, Fonts, Spacing, Images} from 'themes';
import {useTranslation} from 'context/Language';

const Content = ({title, text, style, titleMb, textMb, styleText}) => {
  const translation = useTranslation();
  return (
    <View style={style}>
      {Boolean(title) && (
        <Text
          bold
          fs="h3"
          style={[
            styles.textWhite,
            titleMb ? {marginBottom: titleMb} : styles.mb1,
          ]}
          numberOfLines={2}
        >
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
          ]}
        >
          {text}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  //-----------------------
  mb1: {marginBottom: 14},
  mb2: {marginBottom: 26},
  //-----------------------
  textWhite: {color: Colors.bs4},
  textGray: {color: Colors.tp3},
});

export default Content;
