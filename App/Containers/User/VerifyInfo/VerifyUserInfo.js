import React, {useRef, useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  Image,
  View,
  useWindowDimensions,
  TouchableOpacity,
} from 'react-native';
import {Text, InputBlock, Header, Button, HeaderBg} from 'components';
import {base, Images, Colors, Spacing} from 'themes';
import {IC_TPYE, SCREEN} from 'configs/Constants';
import Progress from 'components/User/VerifyInfo/Progress';
import {useVerifyInfo} from 'context/User/utils';
import SelectImage from 'components/User/VerifyInfo/SelectImage';
import DropImage from 'components/User/VerifyInfo/DropImage';
import {useTranslation} from 'context/Language';
import _ from 'lodash';
// import { Colors } from 'react-native/Libraries/NewAppScreen';

const VerifyUserInfo = ({route}) => {
  const {disabledIdentify, onChange, onContinue} = useVerifyInfo(route?.params);
  const translation = useTranslation();
  const identityCard = _.get(route, 'params.identifyCard.ICType', IC_TPYE.CMND);

  return (
    //TODO: translate
    <>
      <HeaderBg style={[styles.bgWhite, styles.headerContainer]}>
        <Header back title={translation?.account_verification} />
        <TouchableOpacity
          // onPress={() => onChange('')}
          style={styles.guildBtn}>
          <Text fs="md" color={Colors.white}>
            Hướng dẫn
          </Text>
        </TouchableOpacity>
        <Progress step={1} />
        <Image
          source={Images.VerifyUserInfo.iconDown}
          style={[styles.triangleDown, styles.triangleDownImg]}
          resizeMode="contain"
        />
      </HeaderBg>
      <ScrollView style={base.wrap}>
        <View style={[base.container, styles.pt1]}>
          {/* <Progress step={1} /> */}

          {/* <Picker
            items={[
              {label: 'Nữ', value: 1},
              {label: 'Nam', value: 2},
            ]}
            onChange={index => onPicker(index)}
            value={domain}
          /> */}
          {/* 
          <InputBlock
            label={'Họ và tên'}
            onChange={value => onChange('name', value)}
          />
          <InputBlock
            label={'Ngày sinh'}
            onChange={value => onChange('birthday', value)}
          /> */}

          {/* <SelectImage
            title="Mặt trước" // TODO: translate
            onSelectImage={value => {
              onChange('ICFrontPhoto', value?.data);
              identityCard == 3 && onChange('ICBackPhoto', value?.data);
            }}
            css={styles.mb1}
          /> */}
          <DropImage
            title="Ảnh mặt trước" // TODO: translate
            onDropImage={value => {
              onChange('ICFrontPhoto', value?.data);
              identityCard == IC_TPYE.PASSPORT &&
                onChange('ICBackPhoto', value?.data);
            }}
            style={styles.mb1}
          />
          {identityCard != IC_TPYE.PASSPORT && (
            <DropImage
              title="Ảnh mặt sau" // TODO: translate
              onDropImage={value => onChange('ICBackPhoto', value?.data)}
              style={styles.mb1}
            />
          )}
        </View>
      </ScrollView>

      <View style={[styles.wrap, styles.bgWhite, styles.py1]}>
        <Button
          disabled={disabledIdentify}
          label="Tiếp tục" // TODO: translate
          onPress={() => onContinue(SCREEN.VERIFY_IDENTITY_CARD)}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  wrap: {
    paddingHorizontal: Spacing.PADDING,
  },
  py1: {paddingVertical: Spacing.PADDING},
  pt1: {paddingTop: 48},
  mb1: {marginBottom: 32},
  bgWhite: {backgroundColor: Colors.white},
  headerContainer: {
    position: 'relative',
    paddingBottom: 0,
    marginBottom: 0,
    zIndex: 1,
  },
  guildBtn: {
    position: 'absolute',
    right: 15,
    top: 65,
  },
  triangleDown: {
    position: 'absolute',
    left: 30,
    bottom: -9,
  },
  triangleDownImg: {
    width: 20,
    height: 10,
  },
});

export default VerifyUserInfo;
