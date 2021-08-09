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
  Row,
  Col,
} from 'components';
import {Colors, Fonts, Spacing, Images, base} from 'themes';
import Navigator from 'navigations/Navigator';
import Password from 'components/Auth/Password';
import {SCREEN} from 'configs/Constants';
import {scale} from 'utils/Functions';
import HeaderBg from 'components/Common/HeaderBg';
import {useTranslation} from 'context/Language';
const AutoPayment = () => {
  const translation = useTranslation();
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
  const moneyData = [
    {
      id: '1',
      money: '10000',
    },
    {
      id: '2',
      money: '20000',
    },
    {
      id: '3',
      money: '50000',
    },
    {
      id: '4',
      money: '100000',
    },
    {
      id: '5',
      money: '200000',
    },
    {
      id: '6',
      money: '1000000',
    },
  ];
  const handlePress = params => {
    setValue(params);
  };
  const handleChange = e => {
    setValue(e);
  };
  const handleSubmit = () => {
    if (value && value < 10000) {
      setError(true);
    } else {
      setError(false);
      Navigator.navigate(SCREEN.CONFIRMATION);
    }
  };
  // Coppy from Utils/Functions but don't use unit
  const formatMoney = number =>
    new Intl.NumberFormat({style: 'currency', currency: 'VND'}).format(number);

  return (
    <ScrollView style={base.wrap}>
      <HeaderBg>
        <Header back title="Nạp tiền tự động" back />
      </HeaderBg>
      <View style={styles.mt_30}>
        <View style={styles.contentAbove}>
          <View style={styles.wrap}>
            <View>
              <TextInput
                placeholder="Nhập số tiền nạp"
                style={styles.inputMoney}
                placeholderTextColor={Colors.BLACK}
                value={value}
                onChange={handleChange}
                showErrorLabel={error}
                error={error ? '*Số tiền rút tối thiểu là 10.000 vnđ' : ''}
              />
              <Text style={styles.subText}>VND</Text>
            </View>
            {/* Input with Text */}
            <Row space="10">
              {moneyData.map((item, index) => (
                <Col width="33.33%" space="10" key={index}>
                  <Text
                    style={styles.item}
                    onPress={() => {
                      handlePress(item.money);
                    }}>
                    {formatMoney(item.money)}
                  </Text>
                </Col>
              ))}
            </Row>
          </View>
        </View>
        <View style={styles.flexBox}>
          <View style={styles.wrap}>
            <View>
              <Text style={styles.textLable}>Ngân hàng nhận tiền</Text>
              {/* Input with Icon */}
              <View>
                <TextInput style={styles.input} value="Vietcombank" />
                <TouchableOpacity style={styles.iconLocation}>
                  <Icon
                    style={styles.icon}
                    icon={Images.WidthDraw.Done}
                    tintColor={Colors.g9}
                  />
                </TouchableOpacity>
              </View>
              {/* Input with Icon */}
            </View>
            <View>
              <Text style={styles.textLable}>Thêm ngân hàng nhận tiền</Text>
              {/* Input with Icon */}
              <View>
                <TextInput
                  style={styles.input}
                  value="Thêm tài khoản ngân hàng"
                />
                <TouchableOpacity style={styles.iconLocation}>
                  <Icon
                    style={styles.icon}
                    icon={Images.WidthDraw.Plus}
                    tintColor={Colors.g9}
                  />
                </TouchableOpacity>
              </View>
              {/* Input with Icon */}
            </View>
            <Button
              label="Tiếp tục"
              onPress={handleSubmit}
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
    fontSize: Fonts.FONT_LARGE,
    fontWeight: 'bold',
    paddingBottom: Spacing.PADDING,
  },
  loading: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  blackColor: {
    backgroundColor: Colors.g9,
  },
  input: {
    borderColor: Colors.BLACK,
    color: Colors.BLACK,
    backgroundColor: 'transparent',
    fontSize: Fonts.H6,
  },
  textWhite: {
    color: Colors.white,
  },
  contentAbove: {
    flex: 1,
    backgroundColor: Colors.g9,
  },
  subText: {
    position: 'absolute',
    right: scale(10),
    top: scale(20),
    fontSize: Fonts.FONT_MEDIUM,
  },
  textLable: {
    color: Colors.BLACK,
    fontSize: Fonts.FONT_MEDIUM,
    textTransform: 'uppercase',
    marginVertical: Spacing.PADDING,
  },
  textMedium: {
    color: Colors.WHITETEXT,
    fontSize: Fonts.FONT_MEDIUM,
  },
  textLarge: {
    color: Colors.WHITETEXT,
    fontSize: Fonts.H4,
    fontWeight: 'bold',
  },
  inputMoney: {
    fontSize: Fonts.H6,
    marginTop: scale(6),
  },
  listItem: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: scale(20),
    marginTop: Spacing.PADDING,
    margin: scale(-5),
  },
  item: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 5,
    paddingVertical: 10,
    borderColor: '#ffffff',
    borderWidth: 1,
    color: '#ffffff',
    textAlign: 'center',
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
  },
  icon: {
    width: scale(23),
    height: scale(20),
  },
  iconLocation: {
    position: 'absolute',
    right: scale(15),
    top: scale(15),
  },
});
export default AutoPayment;
