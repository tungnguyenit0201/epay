import React from 'react';
import {ScrollView, StyleSheet, View, Image, Pressable} from 'react-native';
import {Text, Header, Button, Row, Col, ListItem, HeaderBg} from 'components';
import {Colors, Fonts, Images, Spacing, base} from 'themes';

import Navigator from 'navigations/Navigator';
import {SCREEN} from 'configs/Constants';

import {scale} from 'utils/Functions';

import {useTranslation} from 'context/Language';
import {useTransactionResult} from 'context/Wallet/utils';

const BankLinkResult = () => {
  const translation = useTranslation();
  const {message, onRetry, onBackHome} = useTransactionResult();
  const data = [
    {
      label: 'Mã giao dịch',
      value: '123456789',
    },
    {
      label: 'Thời gian',
      value: '22-10-2021 20:10:09 ',
    },
  ];
  return (
    <>
      <HeaderBg>
        <Header title="Kết quả giao dịch" back />
      </HeaderBg>
      <ScrollView style={base.wrap}>
        <View style={base.container}>
          <View style={styles.success}>
            <Image
              //source={require('images/noti/Error.png')}
              source={require('images/noti/Success.png')}
              style={styles.imgSuccess}
            />
            <Text bold fs="h5" color={Colors.brd1} mb={15}>
              1.0005.000đ
            </Text>
            <Text centered>
              Cho dịch vụ The Coffee House Nội dung: Thanh toán ly Cold Brew
              Margarita
            </Text>
          </View>

          <View style={styles.block}>
            <Image
              source={require('images/bgXacNhan.png')}
              style={styles.bgImg}
            />
            {data.map((item, index) => {
              return (
                <View key={index}>
                  <View
                    style={[
                      styles.row,
                      index + 1 === data.length && {
                        borderBottomWidth: 0,
                      },
                    ]}
                  >
                    <Text style={styles.textLeft}>{item.label}</Text>

                    <Text bold style={styles.textRight}>
                      {item.value}
                    </Text>
                  </View>
                </View>
              );
            })}
            <View style={[base.row]}>
              <View style={[base.row]}>
                <Image
                  source={require('images/qrpay/Save.png')}
                  style={[{width: 24, height: 24, marginRight: 5}]}
                />
                <Text bold color={Colors.brd1}>
                  Lưu ảnh
                </Text>
              </View>

              <View style={[base.row, base.leftAuto]}>
                <Image
                  source={require('images/qrpay/Share.png')}
                  style={[{width: 24, height: 24}]}
                />
                <Text bold color={Colors.brd1}>
                  {' '}
                  Chia sẻ ảnh{' '}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
      <View
        style={[
          base.boxBottom,
          {position: 'absolute', bottom: 0, left: 0, right: 0},
        ]}
      >
        <Row space={10}>
          <Col space={10} width="50%">
            <Button
              bg={Colors.bs4}
              border={Colors.brd1}
              color={Colors.brd1}
              label="Về trang chủ"
              labelStyle={{fontSize: 14}}
              onPress={() => Navigator.navigate(SCREEN.HOME)}
            />
          </Col>
          <Col space={10} width="50%">
            <Button
              type={1}
              label="Thực hiện lại"
              onPress={() => Navigator.navigate(SCREEN.QR_TRANSFER)}
            />
          </Col>
        </Row>
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
  success: {
    alignItems: 'center',
    marginBottom: 20,
  },
  imgSuccess: {
    width: 80,
    height: 80,
    marginBottom: 10,
  },
  bgImg: {
    width: 128,
    height: 128,
    position: 'absolute',
    top: 20,
    left: '50%',
    transform: [{translateX: scale(-64)}, {translateY: 0}],
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomColor: Colors.bs1,
    borderBottomWidth: 1,
    paddingVertical: 15,
  },

  textLeft: {
    color: Colors.cl3,
  },
  textRight: {
    color: Colors.tp2,
    maxWidth: scale(160),
  },
});
export default BankLinkResult;
