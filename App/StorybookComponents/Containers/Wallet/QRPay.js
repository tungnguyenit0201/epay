import React, {useState, useRef} from 'react';
import {ScrollView, Text, View, StyleSheet, Image, Share} from 'react-native';

// import QRCode from 'react-native-qrcode-svg';
import {Colors, Fonts, Spacing, Images, base} from 'themes';
import Col from '../../Atoms/Col';
import Row from '../../Atoms/Row';
import HeaderBg from '../../Atoms/HeaderBg';
import Header from '../../Atoms/Header';
import Button from '../../Atoms/Button';
import Wrapper from '../../Groups/Wrapper';
import FooterContainer from '../../Atoms/FooterContainer';
const QRPay = ({route}) => {
  const translation = require('../../../Context/Language/vi.json');
  const myQRCode = useRef('null');
  return (
    // TODO: translate
    <Wrapper>
      <ScrollView style={{backgroundColor: Colors.white, paddingBottom: 20}}>
        <HeaderBg>
          <Header
            title={translation.payment_code}
            back
            style={{marginTop: 24, marginBottom: -15}}
          />
        </HeaderBg>
        <View style={[base.container, styles.flexCenter]}>
          <Text bold style={{textAlign: 'center', marginBottom: 20}}>
            {`Nhận tiền từ bạn bè nhanh hơn bằng \n mã QR của bạn`}
          </Text>
          {/* <QRCode
          getRef={myQRCode}
          value={'epay'}
          size={250}
          color="black"
          backgroundColor="white"
        /> */}
          <Image
            source={require('images/storybook/qr.png').default}
            style={{height: 200, width: 200}}
          />
          {route?.params?.value ? (
            <Text style={{paddingTop: Spacing.PADDING, fontSize: Fonts.H6}}>
              {route?.params?.value}
            </Text>
          ) : (
            <View></View>
          )}
          <Image
            source={require('images/gradient/B_enter_money.png').default}
            style={{height: 48, width: 343, marginTop: 120, cursor: 'pointer'}}
          />
        </View>
      </ScrollView>
      <FooterContainer>
        <Row justify="space-between" style={{marginRight: -2}}>
          <Col width="49%">
            <Image
              source={require('images/storybook/save_image.png').default}
              style={{
                width: 167,
                height: 48,
                cursor: 'pointer',
              }}
            />
          </Col>
          <Col width="49%">
            <Image
              source={require('images/gradient/B_share.png').default}
              style={{width: 167, height: 48, cursor: 'pointer'}}
            />
          </Col>
        </Row>
      </FooterContainer>
    </Wrapper>
  );
};
export default QRPay;

const styles = StyleSheet.create({
  flexCenter: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonSelect: {
    width: '100%',
    marginTop: 20,
  },
});
