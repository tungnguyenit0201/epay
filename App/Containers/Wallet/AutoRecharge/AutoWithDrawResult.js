import React, {useRef, useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  Pressable,
  Image,
  FlatList,
} from 'react-native';
import {
  Text,
  Header,
  Button,
  FooterContainer,
  HeaderBg,
  ScreenBackground,
} from 'components';
import {Fonts, Images, base} from 'themes';
import WebView from 'components/WebView/Partial';

import {SCREEN} from 'configs/Constants';
import {scale} from 'utils/Functions';

import {useTranslation} from 'context/Language';
const AutoWithDrawResult = ({route}) => {
  const translation = useTranslation();
  const success = route?.params?.type === 'success';

  return (
    <>
      <HeaderBg>
        <Header title={'Xác thực tài khoản'} back />
      </HeaderBg>
      <View style={[base.bgWhite, styles.flex1]}>
        <ScreenBackground />
        <ScrollView
          style={styles.wrap}
          contentContainerStyle={styles.alignCenter}
        >
          <Image
            source={
              success ? Images.Transaction.Success : Images.Transaction.Failure
            }
            style={styles.icon}
            resizeMode="contain"
          />
          <View style={[base.container, styles.alignCenter]}>
            <Text bold size={Fonts.H5} mb={20}>
              Cài đặt nạp ví tự động{' '}
              {success ? 'thành công' : 'không thành công'}
            </Text>
            <View style={styles.block}>
              <Text centered>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry.
              </Text>
            </View>
          </View>
        </ScrollView>
        <FooterContainer>
          <Button label={success ? 'Về trang chủ' : 'Trang cá nhân'} />
        </FooterContainer>
      </View>
    </>
  );
};
const styles = StyleSheet.create({
  wrap: {
    flex: 1,
  },
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
  flex1: {
    flex: 1,
  },
  icon: {
    width: scale(60),
    height: scale(60),
    marginVertical: scale(38),
  },
  alignCenter: {
    alignItems: 'center',
  },
});

export default AutoWithDrawResult;
