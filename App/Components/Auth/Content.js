import React, {useRef, useState} from 'react';
import {StyleSheet, View, Image} from 'react-native';
import {Text} from 'components';
import {Colors, Fonts, Spacing, Images} from 'themes';
import {useTranslation} from 'context/Language';

const Content = ({title, text, style}) => {
  const translation = useTranslation();
  return (
    <View style={[styles.wrap, style]}>
      {Boolean(title) && (
        <Text bold fs="h5" centered>
          {title}
        </Text>
      )}
      {Boolean(text) && (
        <Text centered mt={15} fs="md" color={Colors.l6}>
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
});

export default Content;
