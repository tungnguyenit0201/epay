import React, {useRef, useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  Pressable,
  Image,
  FlatList,
} from 'react-native';
import {Text, Header, Button, Row, Col, ListItem, HeaderBg} from 'components';
import {Colors, Fonts, Images, Spacing, base} from 'themes';
import Navigator from 'navigations/Navigator';

import {SCREEN} from 'configs/Constants';
import {scale} from 'utils/Functions';

import {useTranslation} from 'context/Language';

const TransactionResult = () => {
  const translation = useTranslation();
  const data = [
    {
      name: 'Chuyển từ',
      val: 'Ví Epay',
    },
    {
      name: 'Chuyển đến',
      val: 'Bảo An Đỗ',
    },
    {
      name: 'Số điện thoại',
      val: '909000999',
    },
    {
      name: 'Số tiền',
      val: '100.000.000 vnđ',
    },
    {
      name: 'Lời nhắn',
      val: 'Nạp tiền điện thoại cho An...',
    },
    {
      name: 'Phí giao dịch',
      val: '0 vnđ',
    },
    {
      name: 'Tổng số tiền',
      val: '100.550.000 vnđ',
    },
  ];

  return (
    <>
      <ScrollView style={base.wrap}>
        <HeaderBg>
          <Header title={translation.transaction_details} back />
        </HeaderBg>
        <View style={base.container}>
          <View style={styles.success}>
            <Image
              source={require('images/Success.png')}
              style={styles.imgSuccess}
            />
            <Text bold size={Fonts.H5} mb={15}>
              {translation.successful_transaction}
            </Text>
            <Text centered>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry.
            </Text>
          </View>
          <View style={styles.block}>
            <Image
              source={require('images/bgXacNhan.png')}
              style={styles.bgImg}
            />
            {data.map((item, index) => {
              console.log(item);
              return (
                <View key={index}>
                  <View
                    style={[
                      styles.row,
                      index + 1 === data.length && {
                        borderBottomWidth: 0,
                      },
                    ]}>
                    <Text style={styles.textLeft}>{item.name}</Text>

                    <Text bold size={Fonts.H6} style={styles.textRight}>
                      {item.val}
                    </Text>
                  </View>
                </View>
              );
            })}
          </View>
        </View>
      </ScrollView>
      <View style={base.bottom}>
        <Row space={10}>
          <Col space={10} width="50%">
            <Button
              size="sm"
              bg="#fff"
              border={Colors.cl1}
              color={Colors.cl1}
              label={translation.save_photo}
              labelStyle={{fontSize: 14}}
              onPress={() => Navigator.navigate(SCREEN.NOTIFICATION)}
            />
          </Col>
          <Col space={10} width="50%">
            <Button
              size="sm"
              label={translation.share_photo}
              onPress={() => Navigator.navigate(SCREEN.NOTIFICATION)}
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

  textLeft: {
    fontSize: Fonts.H6,
    color: Colors.cl3,
  },
  textRight: {
    fontSize: Fonts.H6,
    color: Colors.BLACKTEXT,
    maxWidth: 160,
  },
});
export default TransactionResult;
