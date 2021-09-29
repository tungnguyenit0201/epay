import React from 'react';
import {
  ScrollView,
  Pressable,
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {Colors, Fonts, Images, Spacing, base} from 'themes';
import {scale} from '../Utils/Functions';
import Button from '../Atoms/Button';
import Text from '../Atoms/Text';
const TransferBank = ({myPay = 1, wallet}) => {
  return (
    //TODO : translation
    <>
      <View>
        <Text bold fs="h6" mb={20}>
          Chọn nguồn tiền
        </Text>
        {wallet === false ? (
          <View></View>
        ) : (
          <View style={[styles.itemBank]}>
            <Image
              style={[styles.iconBank]}
              source={require('images/qrpay/Wallet.png').default}
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
                source={require('images/qrpay/Circle.png').default}
              />
              <Text>Phí giao dịch: X.000đ</Text>
            </View>
            {myPay === 0 && (
              <>
                <Text style={styles.opaciy}>opaciy</Text>
                <Button
                  //onPress={onLogout}
                  style={styles.pushMoney}
                  size="sm"
                  type={1}
                  label="Nạp tiền "
                  bold
                />
              </>
            )}
          </View>
        )}
        <View style={[styles.itemBank, styles.itemBankActive]}>
          <Image
            style={[styles.iconBank]}
            source={require('images/qrpay/VCB.png').default}
          />
          <View>
            <Text fs="h6" bold>
              Vietcombank
            </Text>
            <Text>9704 45********678</Text>
          </View>
          <View style={styles.itemRight}>
            <Image
              style={[styles.iconCircle]}
              source={require('images/qrpay/CircleDown.png').default}
            />
            <Text>Phí giao dịch: X.000đ</Text>
          </View>
        </View>

        <View style={[styles.itemBank]}>
          <Image
            style={[styles.iconBank]}
            source={require('images/qrpay/EXB.png').default}
          />
          <View>
            <Text fs="h6" bold>
              Vietcombank
            </Text>
            <Text>9704 45********678</Text>
          </View>
          <View style={styles.itemRight}>
            <Image
              style={[styles.iconCircle]}
              source={require('images/qrpay/Circle.png').default}
            />
            <Text>Phí giao dịch: X.000đ</Text>
          </View>
        </View>
        <Text bold fs="h6" mb={20} mt={10}>
          Thêm ngân hàng
        </Text>

        <Pressable
          //onPress={() => onPress(item)}
          style={styles.addBank}>
          <Text fs="h6">Thêm tài khoản ngân hàng</Text>
          <Image
            style={[styles.iconAddBank]}
            source={require('images/qrpay/plus.png').default}
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
