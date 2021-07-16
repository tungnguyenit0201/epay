import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Text} from 'components';
import {scale} from 'utils/Functions';
import Fonts from 'themes/Fonts';

const Label = ({text, style}) => {
  return (
    <View style={[styles.container, style]}>
      <Text style={styles.text}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: scale(15),
    borderBottomColor: '#D8D8D8',
    borderBottomWidth: 1,
    marginBottom: scale(18),
  },
  text: {
    fontSize: Fonts.FONT_LARGE,
    fontWeight: 'bold',
    marginBottom: scale(11),
    textTransform: 'uppercase',
  },
});

export default Label;
