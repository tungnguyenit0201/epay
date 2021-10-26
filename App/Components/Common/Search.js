import React from 'react';
import {StyleSheet, TextInput, View} from 'react-native';
import {Colors, Fonts, Images, Spacing} from 'themes';
import {Icon} from 'components';
import {TEXT} from 'configs/Constants';

const Search = ({onChange, style, ...props}) => (
  <View style={[styles.container, style]}>
    <Icon icon={Images.Search} />
    <TextInput
      autoCapitalize={'none'}
      autoCompleteType={'off'}
      autoCorrect={false}
      placeholderTextColor={Colors.tp3}
      style={styles.textInput}
      placeholder={TEXT.SEARCH_PLACEHOLDER}
      onChangeText={value => onChange(value?.trim())}
      {...props}
    />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.PADDING,
    borderRadius: Spacing.PADDING,
    backgroundColor: Colors.bs3,
    height: Spacing.PADDING * 3,
  },
  textInput: {
    fontFamily: Fonts.FONT_REGULAR,
    paddingLeft: Spacing.PADDING,
    paddingVertical: 2,
  },
});

export default Search;
