import React from 'react';
import {
  ScrollView,
  Pressable,
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {
  Button,
  Text,
  Icon,
  Header,
  HeaderBg,
  ActionSheet,
  Modal,
  TextInput,
  Radio,
} from 'components';
import {SCREEN, PERSONAL_IC, GENDER, FUNCTION_TYPE} from 'configs/Constants';
import Navigator from 'navigations/Navigator';
import {Colors, Fonts, Images, Spacing, base} from 'themes';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {scale} from 'utils/Functions';

import {useUser} from 'context/User';
import {usePhone} from 'context/Auth/utils';
import {useTranslation} from 'context/Language';
import {useUserStatus, useUserInfo, useVerifyInfo} from 'context/User/utils';

const TransferBank = () => {
  const {phone} = usePhone();
  const {userInfo} = useUser();
  const translation = useTranslation();

  const PersonalInfo = userInfo.personalInfo;

  return (
    //TODO : translation
    <>
      <View style={[base.container]}>
        <Text bold fs="h6" mb={20} mt={30}>
          Chọn nguồn tiền
        </Text>
        <View style={[styles.itemBank]}>
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
              source={require('images/qrpay/Circle.png')}
            />
            <Text>Phí giao dịch: X.000đ</Text>
          </View>
          {/* <View style={styles.opaciy}> </View> */}
          <Text style={styles.opaciy}>opaciy</Text>
          <Button
            //onPress={onLogout}
            style={styles.pushMoney}
            size="sm"
            type={1}
            label="Nạp tiền "
            bold
          />
        </View>

        <View style={[styles.itemBank, styles.itemBankActive]}>
          <Image
            style={[styles.iconBank]}
            source={require('images/qrpay/EXB.png')}
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
              source={require('images/qrpay/CircleDown.png')}
            />
            <Text>Phí giao dịch: X.000đ</Text>
          </View>
        </View>

        <View style={[styles.itemBank]}>
          <Image
            style={[styles.iconBank]}
            source={require('images/qrpay/EXB.png')}
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
              source={require('images/qrpay/Circle.png')}
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
    backgroundColor: Colors.moneyItem,
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
