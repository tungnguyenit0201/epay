import React from 'react';
import {Pressable, View, Image, StyleSheet} from 'react-native';
import {Text} from 'components';

import Navigator from 'navigations/Navigator';
import {Colors} from 'themes';
import {scale} from 'utils/Functions';

import {useTranslation} from 'context/Language';

const TransferBank = ({onPress}) => {
  const translation = useTranslation();

  return (
    //TODO : translation
    <>
      <View style={styles.block}>
        <Text bold fs="h6" mb={10}>
          Nguồn tiền
        </Text>
        <Pressable onPress={onPress} style={[styles.itemBank]}>
          <Image
            style={[styles.iconBank]}
            source={require('images/qrpay/Wallet.png')}
          />
          <View>
            <Text fs="h6" bold>
              Ví của tôi
            </Text>
            <Text>9704 45********678</Text>
          </View>
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
    marginBottom: 20,
  },
  itemBank: {
    position: 'relative',
    marginBottom: 20,
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
export default TransferBank;
