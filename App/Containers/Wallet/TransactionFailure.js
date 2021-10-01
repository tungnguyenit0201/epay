import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import {
  Text,
  Row,
  Header,
  Button,
  FWLoading,
  TextInput,
  Icon,
} from 'components';
import { Colors, Fonts, Spacing, Images, base } from 'themes';
import { scale } from 'utils/Functions';
import { useTransactionResult } from 'context/Wallet/utils';

const TransactionFailure = () => {
  const { data, message, onRetry, onBackHome } = useTransactionResult();

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
    <>
    <Header
          style={styles.blackColor}
          titleStyle={styles.textWhite}
          avoidStatusBar
          back
          title="Chi tiết giao dịch"
        />
      <ScrollView>
        
        <View style={styles.mt_30}>
          <View style={styles.contentAbove}>
            <Icon
              style={styles.icon}
              icon={Images.WidthDraw.Close}
              tintColor={Colors.white}
            />
            <Text style={styles.header}>Nạp tiền không thành công</Text>
            <Text style={styles.textSub}>{message}</Text>
          </View>
          <View style={styles.flexBox}>
            <View style={styles.wrap}>
              {data.map(item => renderItem(item.label, item.value))}

            </View>
          </View>
        </View>

      </ScrollView>
      <View style={[base.boxBottom,styles.bottomButtonContainer]}>
        <Button
          label="Thực hiện lại"
          style={styles.buttonBlock}
          fs={Fonts.FONT_MEDIUM}
          onPress={onRetry}
        />
        <Button
          label="Về trang chủ"
          style={styles.buttonBlock}
          fs={Fonts.FONT_MEDIUM}
          onPress={onBackHome}
        />
      </View>
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
  header: {
    fontSize: Fonts.H4,
    marginTop: scale(14),
    color: Colors.white,
    fontWeight: 'bold',
    paddingBottom: Spacing.PADDING,
  },
  textSub: {
    color: Colors.white,
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
    flex:1,
    marginHorizontal: 5,
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
  bottomButtonContainer: {
    flexDirection: 'row',
    paddingVertical: scale(10),
  }
});
export default TransactionFailure;
