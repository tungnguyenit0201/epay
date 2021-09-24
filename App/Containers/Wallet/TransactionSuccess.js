import React from 'react';
import {ScrollView, StyleSheet, View, Image, Pressable} from 'react-native';
import {Text, Header, Button, Row, Col, ListItem, HeaderBg} from 'components';
import {Colors, Fonts, Images, Spacing, base} from 'themes';

import Navigator from 'navigations/Navigator';
import {SCREEN} from 'configs/Constants';

import {scale} from 'utils/Functions';

import {useTranslation} from 'context/Language';
import {useTransactionResult} from 'context/Wallet/utils';

const TransactionResult = () => {
  const translation = useTranslation();
  const {data, message, onRetry, onBackHome} = useTransactionResult();

  return (
    <>
      <HeaderBg>
        <Header title={translation.transaction_details} back />
      </HeaderBg>
      <ScrollView style={base.wrap}>
        <View style={base.container}>
          <View style={styles.success}>
            <Image
              //source={require('images/noti/Error.png')}
              source={require('images/noti/Success.png')}
              style={styles.imgSuccess}
            />
            <Text bold fs="h5" mb={15}>
              {translation.successful_transaction}
            </Text>
            <Text centered>{message}</Text>
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
                    ]}>
                    <Text style={styles.textLeft}>{item.label}</Text>

                    <Text bold style={styles.textRight}>
                      {item.value}
                    </Text>
                  </View>
                </View>
              );
            })}

            <View style={[styles.wtotal, base.shadow]}>
              <Image
                source={require('images/naptien/BgSupport.png')}
                style={styles.bgToal}
              />
              <View style={[styles.total]}>
                <Image
                  source={require('images/naptien/Call.png')}
                  style={[{width: 20, height: 20}]}
                />
                <Text color={Colors.white} ml={10}>
                  Hỗ trợ khiếu nại
                </Text>
                <Text color={Colors.white} bold style={base.leftAuto}>
                  Gọi 1900-0000
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
      <View style={base.boxBottom}>
        <Row space={10}>
          <Col space={10} width="50%">
            <Button
              bgImg={0}
              bg={Colors.white}
              border={Colors.cl1}
              color={Colors.cl1}
              label="Về trang chủ"
              labelStyle={{fontSize: 14}}
              onPress={() => Navigator.navigate(SCREEN.HOME)}
            />
          </Col>
          <Col space={10} width="50%">
            <Button
              label="Thêm giao dịch"
              onPress={() => Navigator.navigate(SCREEN.TOP_UP)}
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
    borderBottomColor: Colors.l3,
    borderBottomWidth: 1,
    paddingVertical: 15,
  },
  wtotal: {
    position: 'relative',
    marginTop: 20,
  },

  total: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    //paddingVertical: 10,
    borderRadius: 10,
    height: 44,
  },
  bgToal: {
    width: scale(343),
    height: scale(40),
    position: 'absolute',
    top: 0,
    left: 0,
    maxWidth: '100%',
  },
  textLeft: {
    color: Colors.cl3,
  },
  textRight: {
    color: Colors.BLACKTEXT,
    maxWidth: scale(160),
  },
});
export default TransactionResult;
