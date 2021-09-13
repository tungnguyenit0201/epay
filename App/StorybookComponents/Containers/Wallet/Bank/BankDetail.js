import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Pressable,
  Image,
} from 'react-native';
import Header from '../../../Atoms/Header';
import {Colors, Fonts, Spacing, Images} from 'themes';
import HeaderBg from '../../../Atoms/HeaderBg';
import {useUser} from 'context/User';
const BankLinked = ({route}) => {
  const translation = require('../../../../Context/Language/vi.json');
  return (
    <>
      <ScrollView style={[styles.container]}>
        <HeaderBg>
          <Header back title={translation.connect_bank} />
        </HeaderBg>

        <View style={styles.wrap}>
          <Text>Tên ngân hàng: {'VietCombank'}</Text>
          <Text>Chủ tài khoản: {'Phạm Như Huy Hùng'}</Text>
          <Text>Số seri: {'1234561234546'}</Text>
          <Text>Thời gian liên kết: {'20 tháng'}</Text>
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
