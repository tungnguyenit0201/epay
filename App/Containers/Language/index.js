import React from 'react';
import {View, Image, StyleSheet, Dimensions} from 'react-native';
import {scale} from 'utils/Functions';
import {Images, Spacing, Colors} from 'themes';
import {Button} from 'components';
import {useLanguage} from 'context/Language/utils';

const Language = () => {
  const {chooseLanguage} = useLanguage();
  return (
    <View style={[styles.flex1, styles.alignCenter, styles.justifyCenter]}>
      <Image
        source={Images.Background}
        style={styles.bgImgBlue}
        resizeMode="stretch"
      />
      <Image source={Images.Logo} style={[styles.logo, styles.topMinus1]} />

      <View style={styles.groupButton}>
        <View style={styles.mb1}>
          <Image
            source={require('images/bg/border-blue.png')}
            style={styles.bgImgBlue}
            resizeMode="stretch"
          />
          <Button
            label="English"
            bg={Colors.white}
            color={Colors.cl1}
            onPress={() => chooseLanguage('en')}
            bgImg={0}
            style={{margin: 2}}
          />
        </View>
        <Button label="Tiếng Việt" onPress={() => chooseLanguage('vi')} />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  flex1: {flex: 1},
  //-----------------
  justifyCenter: {justifyContent: 'center'},
  alignCenter: {alignItems: 'center'},
  //-----------------
  topMinus1: {top: scale(-50)},
  //-----------------
  mb1: {marginBottom: 16},
  //-----------------
  logo: {width: 160, height: 58},
  //-----------------
  bgImgBlue: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
  },
  groupButton: {
    position: 'absolute',
    bottom: 0,
    backgroundColor: Colors.white,
    width: '100%',
    paddingBottom: 45,
    paddingTop: Spacing.PADDING,
    paddingHorizontal: Spacing.PADDING,
    borderTopLeftRadius: Spacing.PADDING,
    borderTopRightRadius: Spacing.PADDING,
  },
});
export default Language;
