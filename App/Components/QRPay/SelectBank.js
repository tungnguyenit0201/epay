import React from 'react';
import {Pressable, View, Image, StyleSheet} from 'react-native';
import {Col, Text} from 'components';

import Navigator from 'navigations/Navigator';
import {Colors} from 'themes';
import {scale} from 'utils/Functions';

import {useTranslation} from 'context/Language';

const SelectBank = ({onPress, bankInfo, sourceTitle, disabled}) => {
  const translation = useTranslation();

  const {BankLogoUrl, CardNumber, BankNumber, BankName} = bankInfo || {};
  return (
    //TODO : translation
    <>
      <View style={styles.block}>
        <Text fw="700" fs="lg" mb={10}>
          {sourceTitle || translation.topup.moneySource}
        </Text>
        <Pressable
          disabled={disabled}
          onPress={onPress}
          style={[styles.itemBank]}>
          <Image
            style={[styles.iconBank]}
            source={
              BankLogoUrl
                ? {uri: BankLogoUrl}
                : require('images/qrpay/Wallet.png')
            }
            resizeMode={'contain'}
          />
          <Col
            style={{
              alignItems: '',
            }}
            width="70%">
            <Text fs="h6" bold>
              {BankName}
            </Text>
            {!!CardNumber || !!BankNumber ? (
              <Text>{CardNumber || BankNumber}</Text>
            ) : null}
          </Col>
          <View style={styles.itemRight}>
            <Image
              style={[styles.iconCircle]}
              source={require('images/qrpay/Edit.png')}
            />
          </View>
        </Pressable>
      </View>
    </>
  );
};
const styles = StyleSheet.create({
  block: {
    height: scale(120),
  },
  itemBank: {
    flex: 1,
    backgroundColor: Colors.cl5,
    borderRadius: 10,
    shadowColor: Colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,

    flexDirection: 'row',
    alignItems: 'center',
    padding: scale(10),
  },
  itemRight: {
    marginLeft: 'auto',
    alignItems: 'flex-end',
  },
  iconBank: {
    width: scale(24),
    height: scale(24),
    marginRight: 10,
  },
  iconCircle: {
    width: scale(18),
    height: scale(18),
    marginBottom: 5,
  },
});
export default SelectBank;
