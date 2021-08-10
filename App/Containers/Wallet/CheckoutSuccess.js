import React, {useRef, useState} from 'react';
import {ScrollView, StyleSheet, View, Pressable, Image} from 'react-native';
import {Text, Header, Button, Row, Col} from 'components';
import {Colors, Fonts, Images, Spacing, base} from 'themes';
import Navigator from 'navigations/Navigator';

import {SCREEN} from 'configs/Constants';
import {scale} from 'utils/Functions';

import HeaderBg from 'components/Common/HeaderBg';
import {useTranslation} from 'context/Language';
const CheckoutSuccess = () => {
  const translation = useTranslation();

  const renderItem = (key, val) => {
    return (
      <View style={styles.row}>
        <Text style={styles.textLeft}>{key}</Text>
        <Text style={styles.textRight}>{val}</Text>
      </View>
    );
  };

  return (
    <ScrollView style={base.wrap}>
      <HeaderBg style={{marginBottom: 50}}>
        <Header title={translation.transaction_details} back />
      </HeaderBg>
      <View style={base.container}>
        <View style={styles.block}>
          <Image
            source={require('images/bgXacNhan.png')}
            style={styles.bgImg}
          />
          {renderItem('Nguồn tiền', 'Vietcombank')}
          {renderItem('Số tiền', '550.000 vnđ')}
          {renderItem('Phí giao dịch', '0 vnđ')}
          {renderItem(
            'Tổng số tiền',
            <Text size={Fonts.H6} bold>
              550.000 vnđ
            </Text>,
          )}
        </View>
        <Row>
          <Col width="50%">
            <Button
              bg="#fff"
              border={Colors.cl1}
              color={Colors.cl1}
              label="Quay về ví"
              onPress={SCREEN.TOP_UP}
            />
          </Col>
          <Col width="50%">
            <Button label="Tiếp tục" onPress={SCREEN.TOP_UP} />
          </Col>
        </Row>
      </View>
    </ScrollView>
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
  title: {
    fontSize: scale(50),
  },

  textLeft: {
    fontSize: Fonts.H6,
    color: '#969696',
  },
  textRight: {
    fontSize: Fonts.H6,
    color: '#222222',
  },
});
export default CheckoutSuccess;
