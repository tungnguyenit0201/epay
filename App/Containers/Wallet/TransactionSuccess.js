import React from 'react';
import {ScrollView, StyleSheet, View, Image} from 'react-native';
import {Text, Header, Button, Row, Col, ListItem, HeaderBg} from 'components';
import {Colors, Fonts, Images, Spacing, base} from 'themes';

import {scale} from 'utils/Functions';

import {useTranslation} from 'context/Language';
import {useTransactionResult} from 'context/Wallet/utils';

const TransactionResult = () => {
  const translation = useTranslation();
  const {data, message, onRetry, onBackHome} = useTransactionResult();

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

                    <Text bold size={Fonts.H6} style={styles.textRight}>
                      {item.value}
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
              bg={Colors.white}
              border={Colors.cl1}
              color={Colors.cl1}
              label={translation.save_photo}
              labelStyle={{fontSize: 14}}
              onPress={onRetry}
            />
          </Col>
          <Col space={10} width="50%">
            <Button
              size="sm"
              label={translation.share_photo}
              onPress={onBackHome}
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
