import {HeaderBg, Header, Text, Button, FooterContainer} from 'components';
import {useTranslation} from 'context/Language';
import React from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import {base, Colors, Spacing} from 'themes';
import {scale} from 'utils/Functions';
import Navigator from 'navigations/Navigator';

const Policy = ({route}) => {
  const translation = useTranslation();
  return (
    // TODO: translate
    <View style={[styles.container]}>
      <HeaderBg>
        <Header back title="Điều kiện & Điều khoản" />
      </HeaderBg>
      <ScrollView style={styles.scroll}>
        <View style={[styles.block, base.shadow]}>
          <Text fs="h5" fw="700">
            Điều kiện
          </Text>
          <Text fs="h6" mt={scale(12)}>
            {route?.params?.Policy}
            {/* {`Lorem ipsum dolor sit amet, consectetur adipiscing elit. Enim, sit cras in scelerisque non nunc libero dui viverra.

Tortor, diam sit at amet, ipsum. Malesuada facilisi tellus massa netus et.
Diam sodales augue duis nisi, nunc ut placerat dolor sagittis. Bibendum sagittis eu lorem egestas eget ultrices consectetu sit. Id mattis ornare auctor ut ac. Senectu nunc in ipsum sodales blandit diam sociis sit. Massa ipsum vitae elit fermentum.`}
           */}
          </Text>
        </View>
        <View style={[styles.block, base.shadow]}>
          <Text fs="h5" fw="700">
            Điều khoản
          </Text>
          <Text fs="h6" mt={scale(12)}>
            {route?.params?.Policy}
            {/* {`Lorem ipsum dolor sit amet, consectetur adipiscing elit. Enim, sit cras in scelerisque non nunc libero dui viverra.

Tortor, diam sit at amet, ipsum. Malesuada facilisi tellus massa netus et.
Diam sodales augue duis nisi, nunc ut placerat dolor sagittis. Bibendum sagittis eu lorem egestas eget ultrices consectetu sit. Id mattis ornare auctor ut ac. Senectu nunc in ipsum sodales blandit diam sociis sit. Massa ipsum vitae elit fermentum.`}
        */}
          </Text>
        </View>
      </ScrollView>
      <FooterContainer>
        <Button
          label={translation?.close}
          onPress={() => Navigator.goBack?.()}
        />
      </FooterContainer>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    // paddingHorizontal: Spacing.PADDING,
    flex: 1,
  },
  scroll: {
    flex: 1,
    backgroundColor: Colors.bs3,
  },
  block: {
    marginHorizontal: Spacing.PADDING,
    marginTop: scale(24),
    paddingHorizontal: Spacing.PADDING,
    paddingVertical: scale(24),
    backgroundColor: Colors.bs4,
    borderRadius: scale(8),
    // borderColor: 'red',
    // borderWidth: 1,
  },
});
export default Policy;
