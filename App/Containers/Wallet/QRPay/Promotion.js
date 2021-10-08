import {Header, HeaderBg, Button, TextInput} from 'components';
import {useTranslation} from 'context/Language';
import React from 'react';
import {View, StyleSheet, useWindowDimensions} from 'react-native';
import FooterContainer from 'components/Auth/FooterContainer';
import {Colors, Spacing} from 'themes';
import {scale} from 'utils/Functions';

const Promotion = () => {
  const translation = useTranslation();
  const {width} = useWindowDimensions();
  return (
    <View style={styles.container}>
      <HeaderBg>
        <Header back title={translation.addPromoCode} />
      </HeaderBg>
      <View style={styles.wrapInput}>
        <TextInput
          isDeleted
          style={styles.input}
          placeholder={translation.fillPromoCode}
        />
        <Button label={translation.apply} />
      </View>
      <FooterContainer style={[styles.bottomBtn, {width: width}]}>
        <Button label={translation.use} />
      </FooterContainer>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  wrapInput: {
    flexDirection: 'row',
    paddingHorizontal: scale(18),
    paddingTop: scale(24),
    justifyContent: 'space-between',
  },
  input: {
    width: scale(240),
  },
  bottomBtn: {
    position: 'absolute',
    bottom: 0,
  },
});
export default Promotion;
