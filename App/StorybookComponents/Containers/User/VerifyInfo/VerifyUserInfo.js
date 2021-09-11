import React, {useRef, useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  Image,
  View,
  useWindowDimensions,
  TouchableOpacity,
} from 'react-native';
import Text from '../../../Atoms/Text';
import Header from '../../../Atoms/Header';
import Button from '../../../Atoms/Button';
import HeaderBg from '../../../Atoms/HeaderBg';
import {base, Images, Colors, Spacing} from 'themes';
import Progress from '../../../Groups/Progress';
import SelectImage from '../../../Groups/SelectImage';
import _ from 'lodash';
// import { Colors } from 'react-native/Libraries/NewAppScreen';

const VerifyUserInfo = ({}) => {
  const translation = require('../../../../Context/Language/vi.json');
  const identityCard = 1;

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

          <SelectImage
            title="Mặt trước" // TODO: translate
            onSelectImage={value => console.log('heelo')}
            css={styles.mb1}
          />
          {identityCard != 3 && (
            <SelectImage
              title="Mặt sau" // TODO: translate
              onSelectImage={value => console.log('heelo')}
              css={styles.mb1}
            />
          )}
        </View>
      </ScrollView>

      <View style={[styles.wrap, styles.bgWhite, styles.py1]}>
        <Button
          disabled={false}
          label="Tiếp tục" // TODO: translate
          onPress={() => console.log('hello')}
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
