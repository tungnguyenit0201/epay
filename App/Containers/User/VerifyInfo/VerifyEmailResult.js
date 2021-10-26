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
import {Colors, Fonts, Images, Spacing, base} from 'themes';
import WebView from 'components/WebView/Partial';

import {SCREEN} from 'configs/Constants';
import {scale} from 'utils/Functions';

import {useTranslation} from 'context/Language';
import {useEmail} from 'context/User/utils';

const VerifyEmailResult = ({route}) => {
  const translation = useTranslation();
  const {onAction} = useEmail();
  const success = route?.params?.type === 'success';

  return (
    <>
      <HeaderBg>
        <Header title={'Xác thực email'} back />
      </HeaderBg>
      <View style={[base.bgWhite, styles.flex1]}>
        <ScreenBackground />
        <ScrollView
          style={styles.wrap}
          contentContainerStyle={styles.alignCenter}
        >
          <Image
            source={
              success
                ? Images.TransactionHistory.Success
                : Images.TransactionHistory.Warning
            }
            style={styles.icon}
            resizeMode="contain"
          />
          <View style={[base.container, styles.alignCenter]}>
            <Text bold size={Fonts.H5} mb={20}>
              Xác thực email {success ? 'thành công' : 'không thành công'}
            </Text>
            <View style={styles.block}>
              {success ? (
                <Text centered>
                  Tài khoản đã được xác thực email để nhận thông báo và ưu đã
                  mới nhất từ EPAY
                </Text>
              ) : (
                <WebView
                  style={{
                    minHeight: 70,
                    width: scale(343),
                  }}
                  source={{
                    html: `<style> div { color: red !important } </style> ${route?.params?.message}`,
                  }}
                />
              )}
            </View>
          </View>
        </ScrollView>
        <FooterContainer>
          <Button
            label={success ? 'Trang chủ' : 'Trang cá nhân'}
            onPress={() => onAction(success)}
          />
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

export default VerifyEmailResult;
