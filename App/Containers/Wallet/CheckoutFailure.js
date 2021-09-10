import React, {useRef, useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  useWindowDimensions,
  TouchableOpacity,
} from 'react-native';
import {
  Text,
  InputBlock,
  Header,
  Button,
  FWLoading,
  TextInput,
  Icon,
} from 'components';
import {Colors, Fonts, Spacing, Images} from 'themes';
import Navigator from 'navigations/Navigator';
import Password from 'components/Auth/Password';
import {SCREEN} from 'configs/Constants';
import {scale} from 'utils/Functions';
const Withdraw = () => {
  let {height, width} = useWindowDimensions();
  let [loading, setLoading] = useState(false);
  let [value, setValue] = useState();
  let [error, setError] = useState(false);
  let forgotRef = useRef({
    phone: '',
  });
  const onChange = (key, val) => {
    forgotRef.current[key] = val;
  };
  const renderItem = (key, val) => {
    return (
      <View style={styles.content}>
        <Text semibold style={styles.textContent}>
          {key}
        </Text>
        <Text style={styles.textContent}>{val}</Text>
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
          <Text style={styles.header}>Rút tiền không thành công</Text>
          <Text style={styles.textSub}>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry.
          </Text>
        </View>
        <View style={styles.flexBox}>
          <View style={styles.wrap}>
            {renderItem('NH nhận tiền', 'Vietcombank')}
            {renderItem('Số tiền', '1.000.000 vnđ')}
            {renderItem('Phí giao dịch', 'miễn phí')}
            {renderItem('Tổng tiền', '1.000.000 vnđ')}
            {renderItem('Số dư ví', '1.800.000 vnđ')}
            <Button
              label="Thực hiện lại"
              style={styles.buttonBlock}
              fs={Fonts.FONT_MEDIUM}
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
  header: {
    fontSize: Fonts.H4,
    marginTop: scale(14),
    color: Colors.white,
    fontWeight: 'bold',
    paddingBottom: Spacing.PADDING,
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
export default Withdraw;
