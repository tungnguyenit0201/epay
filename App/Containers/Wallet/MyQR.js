import React, {useState, useRef} from 'react';
import {ScrollView, Text, View, StyleSheet, Share} from 'react-native';

import QRCode from 'react-native-qrcode-svg';
import {Colors, Fonts, Spacing, base} from 'themes';
import Navigator from 'navigations/Navigator';
import {SCREEN} from 'configs/Constants';
import {Header, HeaderBg, Button, Col, Row} from 'components';
import {useTranslation} from 'context/Language';
import {useUser} from 'context/User';
import {useQRCode} from 'context/User/utils';
import FooterContainer from 'components/Auth/FooterContainer';
const QRPay = ({route}) => {
  const translation = useTranslation();
  const {userInfo} = useUser();
  const {myQRCode, shareQRCode} = useQRCode();

  /* const saveQrToDisk = () => {
    RNQRGenerator.generate({
      value: '1313354654awfwaf654',
      height: 100,
      width: 100,
      base64: true,
      backgroundColor: 'black',
      color: 'white',
    })
      .then(response => {
        const {uri, width, height, base64} = response;
        CameraRoll.save(uri);
      })
      .catch(error => console.log('Cannot create QR code', error));
  }; */
  return (
    // TODO: translate
    <View style={{flex: 1, backgroundColor: Colors.bs4}}>
      <HeaderBg>
        <Header
          title="Mã của tôi" // TODO: translate
          back
        />
      </HeaderBg>
      <ScrollView style={[base.wrap]}>
        <View style={[base.container, styles.flexCenter]}>
          <Text
            bold
            style={{
              fontSize: 15,
              paddingHorizontal: 30,
              textAlign: 'center',
              lineHeight: 25,
              marginBottom: 25,
            }}
          >
            Nhận tiền từ bạn bè nhanh hơn bằng mã QR của bạn
          </Text>
          <QRCode
            getRef={myQRCode}
            value={userInfo?.qrCode ? userInfo?.qrCode : 'epay'}
            size={250}
            color="black"
            backgroundColor="white"
          />
          {route?.params?.value ? (
            <Text style={{paddingTop: Spacing.PADDING, fontSize: Fonts.H6}}>
              {route?.params?.value}
            </Text>
          ) : (
            <View></View>
          )}
        </View>
      </ScrollView>

      <View style={[base.container, styles.flexCenter]}>
        <Button
          //mode="outline"
          mb={20}
          label={'Nhập số tiền bạn muốn nhận'} // TODO: translate
          onPress={() => {
            Navigator.navigate(SCREEN.SELECT_MONEY);
          }}
          style={styles.buttonSelect}
        />
      </View>
      <FooterContainer>
        <Row>
          <Col width="50%">
            <Button mode="outline" label={translation.save_photo} />
          </Col>
          <Col width="50%">
            <Button
              label={translation.share_photo}
              onPress={shareQRCode}
              bold
            />
          </Col>
        </Row>
      </FooterContainer>
    </View>
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
