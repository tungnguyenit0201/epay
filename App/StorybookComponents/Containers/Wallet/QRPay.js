import React, {useState, useRef} from 'react';
import {ScrollView, Text, View, StyleSheet, Image, Share} from 'react-native';

// import QRCode from 'react-native-qrcode-svg';
import {Colors, Fonts, Spacing, Images, base} from 'themes';
import Col from '../../Atoms/Col';
import Row from '../../Atoms/Row';
import HeaderBg from '../../Atoms/HeaderBg';
import Header from '../../Atoms/Header';
import Button from '../../Atoms/Button';


const QRPay = ({route}) => {
  const translation = require('../../../Context/Language/vi.json');
  const myQRCode = useRef('null');

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
    <ScrollView style={base.wrap}>
      <HeaderBg>
        <Header title={translation.payment_code} back />
      </HeaderBg>
      <View style={[base.container, styles.flexCenter]}>
        <Text
          bold
          style={{
            fontSize: 15,
            paddingHorizontal: 80,
            textAlign: 'center',
            lineHeight: 25,
            marginBottom: 25,
          }}>
          Nhận tiền từ bạn bè nhanh hơn bằng mã QR của bạn
        </Text>
        {/* <QRCode
          getRef={myQRCode}
          value={'epay'}
          size={250}
          color="black"
          backgroundColor="white"
        /> */}
        <Image
          source={Images.QRCode.default}
          style={{height: 200, width: 200}}
        />
        {route?.params?.value ? (
          <Text style={{paddingTop: Spacing.PADDING, fontSize: Fonts.H6}}>
            {route?.params?.value}
          </Text>
        ) : (
          <View></View>
        )}
        <Button
          bg={Colors.white}
          border={Colors.cl1}
          color={Colors.cl1}
          label={'Nhập số tiền'} // TODO: translate
          onPress={() => {
            console.log('hello')
          }}
          style={styles.buttonSelect}
        />
        <View style={base.bottom}>
          <Row>
            <Col width="50%">
              <Button
                bg={Colors.white}
                border={Colors.cl1}
                color={Colors.cl1}
                label={translation.save_photo}
              />
            </Col>
            <Col width="50%">
              <Button
                label={translation.share_photo}
                onPress={console.log('hello')}
              />
            </Col>
          </Row>
        </View>
      </View>
    </ScrollView>
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
