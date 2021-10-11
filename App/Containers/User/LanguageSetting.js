import React, {useState} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {Text, Icon, Header, HeaderBg, Button} from 'components';
import {SCREEN} from 'configs/Constants';
import Navigator from 'navigations/Navigator';
import {Colors, Fonts, Images, Spacing, base} from 'themes';
import {useTranslation} from 'context/Language';
import {useLanguage} from 'context/Language/utils';

const PaymentSettings = () => {
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
            // size="lg"
            {...(item.value !== translation.selectedLanguage && {
              // bold: true,
              bg: Colors.white,
              color: Colors.cl1,
              border: Colors.cl1,
            })}
            mb={Spacing.PADDING}
            onPress={() => chooseLanguage(item.value)}
          />
        );
      })}
    </ScrollView>
  );
};
const styles = StyleSheet.create({});
export default PaymentSettings;
