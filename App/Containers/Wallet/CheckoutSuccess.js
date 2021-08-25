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
import {useShowModal} from 'context/Common/utils';
const CheckoutSuccess = () => {
  const translation = useTranslation();
  const {showModalSmartOTP} = useShowModal();
  const data = [
    {
      name: 'Nguồn tiền',
      val: 'Vietcombank',
    },
    {
      name: 'Số tiền',
      val: '550.000 vnđ',
    },
    {
      name: 'Phí giao dịch',
      val: '0 vnđ',
    },
    {
      name: 'Tổng số tiền',
      val: '550.000 vnđ',
    },
  ];

  return (
    <>
      <ScrollView style={base.wrap}>
        <HeaderBg style={{marginBottom: 50}}>
          <Header title={translation.transaction_details} back />
        </HeaderBg>
        <View style={base.container}>
          <Text bold size={Fonts.H5} mb={20}>
            Nạp tiền thành công
          </Text>
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

                    {index + 1 === data.length ? (
                      <Text bold size={Fonts.H6} style={styles.textRight}>
                        {item.val}
                      </Text>
                    ) : (
                      <Text size={Fonts.H6} style={styles.textRight}>
                        {item.val}
                      </Text>
                    )}
                  </View>
                </View>
              );
            })}

            <View style={styles.total}>
              <Text size={Fonts.H6} bold>
                Số dư ví
              </Text>
              <Text size={Fonts.H6} bold color={Colors.cl1}>
                1.550.000 vnđ
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
      <View style={base.bottom}>
        <Row>
          <Col width="50%">
            <Button
              bg="#fff"
              border={Colors.cl1}
              color={Colors.cl1}
              label="Quay về ví"
              onPress={() => {
                showModalSmartOTP(true);
                Navigator.navigate(SCREEN.TAB_NAVIGATION);
              }}
            />
          </Col>
          <Col width="50%">
            <Button
              label="Tiếp tục"
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
  bgImg: {
    width: 128,
    height: 128,
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{translateX: scale(-64)}, {translateY: scale(-64)}],
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomColor: Colors.l3,
    borderBottomWidth: 1,
    paddingVertical: 15,
  },

  textLeft: {
    fontSize: Fonts.H6,
    color: '#969696',
  },
  textRight: {
    fontSize: Fonts.H6,
    color: '#222222',
  },

  total: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    backgroundColor: '#C8DFF4',
    borderRadius: 8,
    overflow: 'hidden',
  },
});
export default CheckoutSuccess;
