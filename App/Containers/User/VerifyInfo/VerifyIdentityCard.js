import React from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  Image,
  useWindowDimensions,
} from 'react-native';
import { Header, Button, HeaderBg } from 'components';
import { Colors, Spacing, base, Images } from 'themes';
import { useVerifyInfo } from 'context/User/utils';
import Progress from 'components/User/VerifyInfo/Progress';
import DropImage from 'components/User/VerifyInfo/DropImage';
import { useTranslation } from 'context/Language';

const VerifyIdentityCard = ({ route }) => {
  const { onDoneCaptureFace, onChange, verifyInfo } = useVerifyInfo(
    route?.params,
  );
  const translation = useTranslation();
  const { width } = useWindowDimensions();

  return (
    <View>
      <HeaderBg>
        <Header back title={translation?.account_verification} />
        <Progress space={1} step={2} />
        <Image
          source={Images.VerifyUserInfo.iconDown}
          style={[styles.triangleDown, { left: width / 2 - 10 }]}
          resizeMode="contain"
        />
      </HeaderBg>
      <ScrollView style={{ backgroundColor: Colors.white }}>
        <View style={[base.container, styles.main]}>
          <DropImage
            title="Hình minh họa" // TODO: translate
            onDropImage={value => onChange('Avatar', value)}
            cameraType="front"
            style={styles.drop}
            draft={verifyInfo?.Avatar}
          />
        </View>
      </ScrollView>
      <View style={styles.buttonContainer}>
        <Button
          disabled={!verifyInfo?.Avatar}
          label={'Tiếp tục'} // TODO: translate
          onPress={onDoneCaptureFace}
        />
      </View>
    </View>
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
  buttonContainer: {
    padding: Spacing.PADDING,
    backgroundColor: Colors.white,
  },
  main: {
    paddingTop: 20,
    flex: 1,
  },
});
export default VerifyIdentityCard;
