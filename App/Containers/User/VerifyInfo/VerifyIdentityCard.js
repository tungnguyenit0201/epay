import React, {useRef, useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  Image,
  useWindowDimensions,
} from 'react-native';
import {Text, InputBlock, Header, Button, HeaderBg} from 'components';
import {Colors, Fonts, Spacing, base, Images} from 'themes';
import {SCREEN} from 'configs/Constants';
import {useVerifyInfo} from 'context/User/utils';
import Progress from 'components/User/VerifyInfo/Progress';
import SelectImage from 'components/User/VerifyInfo/SelectImage';
import DropImage from 'components/User/VerifyInfo/DropImage';
import {useTranslation} from 'context/Language';

const VerifyIdentityCard = ({route}) => {
  const {disabledAvatar, onChange, onContinue, verifyInfo} = useVerifyInfo(
    route?.params,
  );
  const translation = useTranslation();
  const {width} = useWindowDimensions();

  return (
    <ScrollView style={{backgroundColor: Colors.white}}>
      <HeaderBg>
        <Header back title={translation?.account_verification} />
        <Progress space={1} step={2} />
        <Image
          source={Images.VerifyUserInfo.iconDown}
          style={[styles.triangleDown, {left: width / 2 - 10}]}
          resizeMode="contain"
        />
      </HeaderBg>
      <View style={[base.container, {paddingTop: 20}]}>
        <DropImage
          title="Hình minh họa" // TODO: translate
          onDropImage={value => onChange('Avatar', value)}
          cameraType="front"
          style={styles.drop}
          draft={verifyInfo?.Avatar}
        />

        <Button
          disabled={!verifyInfo?.Avatar}
          label={'Tiếp tục'} // TODO: translate
          onPress={() => onContinue(SCREEN.VERIFY_USER_PORTRAIT)}
        />
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  triangleDown: {
    position: 'absolute',
    left: Spacing.PADDING * 2,
    bottom: -9,
    width: 20,
    height: 10,
  },

  drop: {
    marginBottom: Spacing.PADDING,
  },
});
export default VerifyIdentityCard;
