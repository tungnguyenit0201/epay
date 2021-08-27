import React, {useState, useRef} from 'react';
import {
  ScrollView,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Share,
  ToastAndroid,
} from 'react-native';

import QRCode from 'react-native-qrcode-svg';
import {Colors, Fonts, Spacing, base} from 'themes';
import Navigator from 'navigations/Navigator';
import {SCREEN} from 'configs/Constants';
import {Header, HeaderBg, Button, Col, Row} from 'components';
import {useTranslation} from 'context/Language';
import {useUser} from 'context/User';
const QRPay = ({route}) => {
  const translation = useTranslation();
  const {userInfo} = useUser();
  let myQRCode = useRef();
  const shareQRCode = () => {
    myQRCode.toDataURL(dataURL => {
      let shareImageBase64 = {
        title: 'Epay',
        url: `data:image/png;base64,${dataURL}`,
        subject: 'QR Code',
      };
      Share.share(shareImageBase64).catch(error => console.log(error));
    });
  };

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
        <QRCode
          getRef={ref => (myQRCode = ref)}
          value={userInfo?.qrCode}
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
        <Button
          bg={Colors.white}
          border={Colors.cl1}
          color={Colors.cl1}
          label={'Nhập số tiền'} //translate
          onPress={() => {
            Navigator.navigate(SCREEN.SELECT_MONEY);
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
              <Button label={translation.share_photo} onPress={shareQRCode} />
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
