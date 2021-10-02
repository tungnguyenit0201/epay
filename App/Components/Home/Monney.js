import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { Icon, Text} from 'components';
import {Colors, Fonts, Images} from 'themes';
import {useTranslation} from 'context/Language';
import { useWallet } from 'context/Wallet';
import { formatCurrency } from 'utils/Functions';
import { useMoney } from 'context/Wallet/utils';
const Monney = ({style, title, showing}) => {
  const {showMoney, setShowMoney} = useMoney(showing);
  const {wallet} = useWallet();
  const translation = useTranslation();
  return (
    <View style={[styles.item, style]}>
      <View style={[]}>
        <Text fs="h6">{title || translation.my_wallet}</Text>
      </View>
      <View style={[styles.right]}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          {!showMoney ? (
            <Text size={Fonts.H2} style={[styles.text, {paddingTop: 3}]}>
              ******
            </Text>
          ) : (
            <Text bold size={Fonts.H5} style={styles.text}>
              {formatCurrency(wallet?.AvailableBlance, translation.topup.currency)}
            </Text>
          )}
          <TouchableOpacity
            style={{marginLeft: 10}}
            onPress={() => setShowMoney(!showMoney)}>
            <Icon
              icon={showMoney ? Images.Eye : Images.EyeGray}
              //tintColor={isMoney ? Colors.l4 : ''}
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
    backgroundColor: Colors.l1,
    borderRadius: 4,
    padding: 10,
    marginBottom: 20,
  },

  right: {
    marginLeft: 'auto',
  },
  text: {
    height: 20,
  },
});

export default Monney;
