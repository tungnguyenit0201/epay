import React from 'react';
import {ScrollView, StyleSheet, View, Image} from 'react-native';
import {Text, Header, Button, FooterContainer, HeaderBg} from 'components';
import {Fonts, Images, base} from 'themes';
import WebView from 'components/WebView/Partial';

import {scale} from 'utils/Functions';

import {useTranslation} from 'context/Language';
import {useAutoWithdraw} from 'context/Wallet/utils';

const ActiveAutoWithdraw = props => {
  const translation = useTranslation();
  const {onCheckSmartOTP} = useAutoWithdraw();
  return (
    <>
      <HeaderBg>
        <Header title={'Nạp ví tự động'} back />
      </HeaderBg>
      <View style={[base.bgWhite, styles.flex1]}>
        <ScrollView
          style={styles.wrap}
          contentContainerStyle={styles.alignCenter}
        >
          <Image
            source={Images.AutoWithdraw}
            style={styles.icon}
            resizeMode="contain"
          />
          <View style={[base.container, styles.alignCenter, styles.mh]}>
            <Text centered bold size={Fonts.H5} mb={20}>
              Thanh toán nhanh chóng và tiện lợi hơn với Nạp tiền tự động
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
          <Button
            label="Đăng ký nạp ví tự động"
            onPress={() => onCheckSmartOTP()}
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
    width: scale(80),
    height: scale(80),
    marginVertical: scale(30),
  },
  alignCenter: {
    alignItems: 'center',
  },
  mh: {
    marginHorizontal: scale(18),
  },
});

export default ActiveAutoWithdraw;
