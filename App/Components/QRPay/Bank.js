import React from 'react';
import {Pressable, View, Image, StyleSheet} from 'react-native';
import {Button, Text} from 'components';
import {Colors, Images} from 'themes';
import {scale} from 'utils/Functions';
import _ from 'lodash';
import {useTranslation} from 'context/Language';

const TransferBank = ({sourceMoney = []}) => {
  console.log('sourceMoney :>> ', sourceMoney);
  const translation = useTranslation();
  const renderItem = (item, index) => {
    const fee = item?.StaticFee;
    return (
      <View
        style={[styles.itemBank, !item?.SourceId && styles.itemBankActive]}
        key={`${Math.random(1, 100)}-sourceMoney`}>
        <Image
          style={[styles.iconBank]}
          source={
            item?.BankLogoUrl ? {uri: item?.BankLogoUrl} : Images.TabBar.Home
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
              !item?.SourceId
                ? require('images/qrpay/CircleDown.png')
                : require('images/qrpay/Circle.png')
            }
          />
          {Number.isInteger(fee) && (
            <Text>{`Phí giao dịch: ${fee == 0 ? 'Miễn phí' : `${fee}đ`}`}</Text>
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
      </View>
    );
  };

  return (
    // TODO: translate
    <>
      <View>
        <Text bold fs="h6" mb={20}>
          Chọn nguồn tiền
        </Text>
        {sourceMoney?.map((item, index) => renderItem(item, index))}

        <Text bold fs="h6" mb={20} mt={10}>
          Thêm ngân hàng
        </Text>

        <Pressable
          //onPress={() => onPress(item)}
          style={styles.addBank}>
          <Text fs="h6">Thêm tài khoản ngân hàng</Text>
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
    backgroundColor: Colors.white,
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
  itemBankActive: {
    backgroundColor: Colors.cl5,
  },
  opaciy: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: Colors.black,
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
    borderColor: Colors.l3,
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
