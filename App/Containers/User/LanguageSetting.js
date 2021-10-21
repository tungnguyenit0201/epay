import React, {useState} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {Text, Icon, Header, HeaderBg, Button} from 'components';
import {SCREEN} from 'configs/Constants';
import Navigator from 'navigations/Navigator';
import {Colors, Fonts, Images, Spacing, base} from 'themes';
import {useTranslation} from 'context/Language';
import {useLanguage} from 'context/Language/utils';

const LanguageSettings = () => {
  const translation = useTranslation();
  const {chooseLanguage} = useLanguage();

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
            mode={
              item.value !== translation.selectedLanguage
                ? 'outline'
                : 'contain'
            }
            mb={Spacing.PADDING}
            onPress={() => chooseLanguage(item.value)}
          />
        );
      })}
    </ScrollView>
  );
};
const styles = StyleSheet.create({});
export default LanguageSettings;
