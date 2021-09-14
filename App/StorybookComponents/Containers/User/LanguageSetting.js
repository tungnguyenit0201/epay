import React, {useState} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import Header from '../../Atoms/Header';
import HeaderBg from '../../Atoms/HeaderBg';
import Button from '../../Atoms/Button';
import {Colors, Fonts, Images, Spacing, base} from 'themes';

const LanguageSetting = () => {
  const translation = require('../../../Context/Language/vi.json');

  return (
    <ScrollView style={base.wrap}>
      <HeaderBg>
        <Header back title={translation.language_setting} />
      </HeaderBg>
      {[
        {label: 'English', value: 'en'},
        {label: 'Việt Nam', value: 'vi'},
      ].map(item => {
        return (
          <Button
            key={item.value}
            label={item.label}
            size="lg"
            {...(item.value !== translation.selectedLanguage && {
              bold: true,
              bg: Colors.white,
              color: Colors.cl1,
              border: Colors.cl1,
            })}
            mb={Spacing.PADDING}
            onPress={() => console.log(item.value)}
          />
        );
      })}
    </ScrollView>
  );
};
const styles = StyleSheet.create({});
export default LanguageSetting;
