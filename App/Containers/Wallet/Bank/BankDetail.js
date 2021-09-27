import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Pressable,
  Image,
} from 'react-native';
import {Button, Header, InputBlock} from 'components';
import Navigator from 'navigations/Navigator';
import {SCREEN} from 'configs/Constants';
import {Colors, Fonts, Spacing, Images} from 'themes';
import {useTranslation} from 'context/Language';
import HeaderBg from 'components/Common/HeaderBg';
import {useWallet} from 'context/Wallet';
import {useUser} from 'context/User';
const BankLinked = ({route}) => {
  const translation = useTranslation();
  const {userInfo} = useUser();
  const bankInfo = route.params;
  return (
    <>
      <ScrollView style={[styles.container]}>
        <HeaderBg>
          <Header back title={translation.connect_bank} />
        </HeaderBg>

        <View style={styles.wrap}>
          <Text>Tên ngân hàng: {bankInfo?.BankName}</Text>
          <Text>Chủ tài khoản: {userInfo?.personalInfo?.FullName}</Text>
          <Text>Số seri: {bankInfo?.BinNumbers}</Text>
          <Text>Thời gian liên kết: {bankInfo?.ConnectTime}</Text>
          <Text>Trạng thái: Đang liên kết</Text>
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.BACKGROUNDCOLOR,
  },
  wrap: {
    paddingHorizontal: Spacing.PADDING,
  },
});

export default BankLinked;
