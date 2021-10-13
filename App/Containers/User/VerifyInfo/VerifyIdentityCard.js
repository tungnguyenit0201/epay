import React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {Colors, Spacing, base} from 'themes';
import {useVerifyInfo} from 'context/User/utils';
import DropImage from 'components/User/VerifyInfo/DropImage';
import {useTranslation} from 'context/Language';
import BaseVerifyInfo from './BaseVerifyInfo';
import {Text, InputBlock, Header, Button, HeaderBg} from 'components';
import {SCREEN} from 'configs/Constants';
import Progress from 'components/User/VerifyInfo/Progress';
import SelectImage from 'components/User/VerifyInfo/SelectImage';
import CapturePicture from 'components/User/VerifyInfo/CapturePicture';

const VerifyIdentityCard = ({route}) => {
  const {onDoneCaptureFace, onChange, verifyInfo} = useVerifyInfo(
    route?.params,
  );
  const translation = useTranslation();

  return (
    <BaseVerifyInfo
      step={2}
      disableButton={!verifyInfo?.Avatar}
      buttonTitle={translation?.continue}
      onPressButton={onDoneCaptureFace}
    >
      <ScrollView style={{backgroundColor: Colors.white}}>
        <View style={[base.container, styles.main]}>
          <CapturePicture
            title={translation?.portrait_photo.toUpperCase()}
            onDropImage={value => onChange('Avatar', value)}
            cameraType="front"
            style={styles.drop}
            draft={verifyInfo?.Avatar}
            verifyParams={route?.params}
          />
        </View>
      </ScrollView>
    </BaseVerifyInfo>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
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
