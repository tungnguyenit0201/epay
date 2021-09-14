import React, {useRef, useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  Pressable,
  Image,
  FlatList,
} from 'react-native';
import Text from '../../../Atoms/Text';
import Header from '../../../Atoms/Header';
import HeaderBg from '../../../Atoms/HeaderBg';
import Button from '../../../Atoms/Button';
import {Colors, Fonts, Images, Spacing, base} from 'themes';
import {scale} from 'utils/Functions';

const VerifyEmailResult = ({route, success}) => {

  return (
    <>
      <ScrollView style={base.wrap}>
        <HeaderBg style={{marginBottom: 50}}>
          <Header title={'Xác thực email'} back />
        </HeaderBg>
        <View style={base.container}>
          <Text bold size={Fonts.H5} mb={20}>
            Xác thực email {success ? 'thành công' : 'không thành công'}
          </Text>
          <View style={styles.block}>
            <Image
              source={require('images/bgXacNhan.png').default}
              style={styles.bgImg}
            />
            <Text>
              {success
                ? 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.'
                : 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.'}
            </Text>
          </View>
        </View>
      </ScrollView>
      <View style={base.bottom}>
        <Button
          label={success ? 'Trang chủ' : 'Đóng'}
          onPress={() => console.log('press')}
        />
      </View>
    </>
  );
};
const styles = StyleSheet.create({
  block: {
    marginBottom: 20,
    position: 'relative',
    minHeight: 128,
  },
  bgImg: {
    width: 128,
    height: 128,
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{translateX: scale(-64)}, {translateY: scale(-64)}],
  },
});

export default VerifyEmailResult;
