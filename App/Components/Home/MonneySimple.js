import React, {useState} from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {Button, Icon, Text} from 'components';
import {Colors, Fonts, Images, Spacing, base} from 'themes';
import {useTranslation} from 'context/Language';

import {formatMoney} from 'utils/Functions';
import {useMoney} from 'context/Wallet/utils';
import {useWallet} from 'context/Wallet';

const Monney = ({style}) => {
  const translation = useTranslation();
  const {showMoney, setShowMoney} = useMoney();
  const {wallet} = useWallet();

  return (
    <View style={[styles.item, base.shadow, style]}>
      <View style={[]}>
        <Text fs="h6" style={styles.title}>
          {translation.my_wallet}
        </Text>
      </View>
      <View style={[styles.right]}>
        <View style={base.row}>
          {!showMoney ? (
            <Text fs="h6" style={[styles.text, {paddingTop: 5}]}>
              ******
            </Text>
          ) : (
            <Text bold fs="h5" style={styles.text}>
              {formatMoney(wallet?.AvailableBlance)}đ
            </Text>
          )}
          <TouchableOpacity
            style={{marginLeft: 10}}
            onPress={() => setShowMoney(!showMoney)}>
            <Icon
              icon={showMoney ? Images.Eye2 : Images.EyeGray2}
              tintColor={Colors.white}
              size={20}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {color: Colors.white},
  right: {
    marginLeft: 'auto',
  },
  text: {
    height: 25,
    color: Colors.white,
    marginBottom: 5,
  },
});

export default React.memo(Monney);
