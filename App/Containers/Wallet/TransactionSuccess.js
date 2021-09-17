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

            <View style={[styles.total]}>
              <Text style={styles.textLeft}>Hỗ trợ khiếu nại</Text>

              <Text bold style={styles.textRight}>
                Gọi 1900-0000
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
      <View style={base.boxBottom}>
        <Row space={10}>
          <Col space={10} width="50%">
            <Button
              bg={Colors.white}
              border={Colors.cl1}
              color={Colors.cl1}
              label={translation.save_photo}
              labelStyle={{fontSize: 14}}
              onPress={() => Navigator.navigate(SCREEN.NOTIFICATION)}
            />
          </Col>
          <Col space={10} width="50%">
            <Button
              type={1}
              label={translation.share_photo}
              onPress={() => Navigator.navigate(SCREEN.NOTIFICATION)}
            />
          </Col>
        </Row>
        <Pressable
          onPress={() => {
            Navigator.push(SCREEN.HOME);
          }}>
          <Text centered mt={10} style={styles.linkHome}>
            Về trang chủ
          </Text>
        </Pressable>
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
  total: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderColor: Colors.l3,
    borderWidth: 1,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
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
