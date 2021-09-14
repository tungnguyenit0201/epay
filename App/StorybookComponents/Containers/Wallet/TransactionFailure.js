import React from 'react';
import { ScrollView, StyleSheet, View, Text } from 'react-native';
// import Text from '../../Atoms/Text';
import Header from '../../Atoms/Header';
import Button from '../../Atoms/Button';
import Icon from '../../Atoms/Icon';

import { Colors, Fonts, Spacing, Images } from 'themes';
import { scale, formatMoney } from 'utils/Functions';
const data = [
  {
    name: 'Nguồn tiền',
    value: 'VietComBank',
  },
  {
    name: 'Số tiền',
    value: formatMoney('100000', true),
  },
  {
    name: 'Phí giao dịch',
    value: formatMoney('100000', true),
  },
  {
    name: 'Tổng số tiền',
    value: formatMoney('100000', true),
    bold: true,
  },
];

const TransactionFailure = () => {
  const renderItem = (key, value) => {
    return (
      <View style={styles.content} key={key}>
        <Text semibold style={styles.textContent}>
          {key}
        </Text>
        <Text style={styles.textContent}>{value}</Text>
      </View>
    );
  };
  return (
    <ScrollView style={styles.container}>
      <Header
        style={styles.blackColor}
        titleStyle={styles.textWhite}
        avoidStatusBar
        back
        title="Chi tiết giao dịch"
      />
      <View style={styles.mt_30}>
        <View style={styles.contentAbove}>
          <Icon
            style={styles.icon}
            icon={Images.WidthDraw.Close}
            tintColor={Colors.white}
          />
          <Text style={styles.header}>Nạp tiền không thành công</Text>
          <Text style={styles.textSub}>Hãy thử lại sau</Text>
        </View>
        <View style={styles.flexBox}>
          <View style={styles.wrap}>
            {data.map(item => renderItem(item.name, item.value))}
            <Button
              label="Thực hiện lại"
              style={styles.buttonBlock}
              fs={Fonts.FONT_MEDIUM}
              onPress={console.log('hello')}
            />
            <Button
              label="Về trang chủ"
              style={styles.buttonBlock}
              fs={Fonts.FONT_MEDIUM}
              onPress={console.log('hello')}
            />
          </View>
        </View>
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.BACKGROUNDCOLOR,
  },
  wrap: {
    paddingHorizontal: Spacing.PADDING,
    paddingTop: Spacing.PADDING,
  },
  blackColor: {
    backgroundColor: Colors.g9,
  },
  textWhite: {
    color: Colors.white,
  },
  contentAbove: {
    flex: 1,
    backgroundColor: Colors.g9,
    justifyContent: 'center',
    alignItems: 'center',
  },
  // eslint-disable-next-line react-native/no-color-literals
  header: {
    fontSize: Fonts.H4,
    marginTop: scale(14),
    color: '#fff',
    fontWeight: 'bold',
    paddingBottom: Spacing.PADDING,
  },
  // eslint-disable-next-line react-native/no-color-literals
  textSub: {
    color: '#fff',
    paddingHorizontal: Spacing.PADDING + scale(45),
    fontSize: Fonts.FONT_MEDIUM,
    lineHeight: scale(26),
    textAlign: 'center',
    marginBottom: scale(32),
  },
  icon: {
    width: scale(26),
    height: scale(26),
    marginTop: scale(40),
  },
  buttonBlock: {
    marginTop: Spacing.PADDING,
    paddingVertical: Spacing.PADDING,
    backgroundColor: Colors.g9,
  },
  mt_30: {
    marginBottom: scale(30),
  },
  flexBox: {
    flex: 3,
    marginTop: scale(25),
  },
  content: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: scale(12),
  },
  textContent: {
    fontSize: Fonts.FONT_MEDIUM,
    textTransform: 'uppercase',
  },
});
export default TransactionFailure;
