import React, {useState} from 'react';
import {
  Pressable,
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {Button, Text} from 'components';
import {Colors, Images} from 'themes';
import {scale} from 'utils/Functions';
import _ from 'lodash';
import {useTranslation} from 'context/Language';
import {SCREEN} from 'configs/Constants';
import Navigator from 'navigations/Navigator';

const TransferBank = ({sourceMoney = [], onPress}) => {
  console.log('sourceMoney :>> ', sourceMoney);
  const [isSelect, setSelect] = useState(0);
  const translation = useTranslation();
  const renderItem = (item, index) => {
    const fee = item?.StaticFee;
    return (
      <TouchableOpacity
        onPress={() => {
          onPress(item);
          setSelect(index);
        }}
        style={[styles.itemBank, isSelect == index && styles.itemBankActive]}
        key={`${item?.SourceId}-sourceMoney`}
      >
        <Image
          style={[styles.iconBank]}
          source={
            item?.LogoUrl && item?.SourceId
              ? {uri: item?.LogoUrl}
              : Images.TabBar.Home
          }
          resizeMode="contain"
        />
        <View>
          <Text fs="h6" bold>
            {item?.SourceName}
          </Text>
          <Text>{item?.SourceAccount}</Text>
        </View>
        <View style={styles.itemRight}>
          <Image
            style={[styles.iconCircle]}
            source={
              isSelect == index
                ? require('images/qrpay/CircleDown.png')
                : require('images/qrpay/Circle.png')
            }
          />
          {Number.isInteger(fee) && (
            <Text>{`${translation.transaction_fee}: ${
              fee == 0 ? translation.free : `${fee}đ`
            }`}</Text>
          )}
        </View>
        {/* {!item?.BankId && (
          <>
            <Button
              //onPress={onLogout}
              style={styles.pushMoney}
              size="sm"
              type={1}
              label="Nạp tiền "
              bold
            />
          </>
        )} */}
      </TouchableOpacity>
    );
  };

  return (
    <>
      <View>
        <Text bold fs="h6" mb={20}>
          {translation.source}
        </Text>
        {sourceMoney?.map((item, index) => renderItem(item, index))}

        <Text bold fs="h6" mb={20} mt={10}>
          {translation.add_bank}
        </Text>

        <Pressable
          onPress={() => Navigator.navigate(SCREEN.MAP_BANK_FLOW)}
          style={styles.addBank}
        >
          <Text fs="h6">{translation.add_bank_account}</Text>
          <Image
            style={[styles.iconAddBank]}
            source={require('images/qrpay/plus.png')}
          />
        </Pressable>
      </View>
    </>
  );
};
const styles = StyleSheet.create({
  itemBank: {
    position: 'relative',
    marginBottom: 20,
    backgroundColor: Colors.bs4,
    borderRadius: 10,
    shadowColor: Colors.tp2,
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
  itemBankActive: {
    backgroundColor: Colors.bg1,
  },
  opaciy: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: Colors.tp2,
    opacity: 0.3,
    fontSize: 0,
    borderRadius: 10,
    overflow: 'hidden',
  },
  pushMoney: {
    position: 'absolute',
    top: 16,
    right: 10,
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
  addBank: {
    borderWidth: 1,
    borderColor: Colors.bs1,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
  },
  iconAddBank: {
    width: scale(24),
    height: scale(24),
    marginLeft: 'auto',
  },
});
export default TransferBank;
