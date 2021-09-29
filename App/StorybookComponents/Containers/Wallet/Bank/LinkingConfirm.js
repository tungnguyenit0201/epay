import React, {useState, useCallback, useEffect} from 'react';
import DashedLine from 'react-native-dashed-line';
import Header from '../../../Atoms/Header';
import HeaderBg from '../../../Atoms/HeaderBg';
import Text from '../../../Atoms/Text';
import Button from '../../../Atoms/Button';
import Icon from '../../../Atoms/Icon';
import Wrapper from '../../../Groups/Wrapper';
import FooterContainer from '../../../Atoms/FooterContainer';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import ModalCustom from '../../../Groups/ModalCustom';
import {
  ScrollView,
  View,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  Linking,
  Pressable,
} from 'react-native';
import {Images, Colors, Spacing, Fonts, base} from 'themes';
import _ from 'lodash';
/* import FooterContainer from 'components/Auth/FooterContainer'; */
import {formatMoney} from '../../../Utils/Functions';
const TRANS_DETAIL = {
  SERVICE: [
    {value: 0, label: 'all'},
    {value: 1, label: 'top_up'},
    {value: 2, label: 'withdraw'},
    {
      value: 3,
      label: 'transfer',
    },
    {
      value: 4,
      label: 'automatically_top_up',
    },
    {
      value: 5,
      label: 'receive',
    },
    {
      values: [6, 9],
      value: '6,9',
      label: 'bill_pay',
    },
  ],
  STATUS: {
    0: 'all',
    1: 'successful',
    2: 'failed',
    3: 'processing',
  },
};
const ToggleRightText = ({text}) => {
  const [textShown, setTextShown] = useState(false);
  const [showMoreButton, setShowMoreButton] = useState(false);
  const [numLines, setNumLines] = useState(undefined);

  const toggleTextShown = () => {
    setTextShown(!textShown);
  };
  useEffect(() => {
    setNumLines(textShown ? undefined : 2);
  }, [textShown]);

  //show link show more/less if line length > 2
  const onTextLayout_1 = useCallback(
    e => {
      if (e.nativeEvent.lines.length > 2 && !textShown) {
        setShowMoreButton(true);
        setNumLines(2);
      }
    },
    [textShown],
  );

  return (
    <>
      <Text
        fs="md"
        bold
        style={[styles.textRight]}
        onTextLayout={onTextLayout_1}
        numberOfLines={numLines}>
        {text}
      </Text>
      {showMoreButton && (
        <Text
          onPress={toggleTextShown}
          style={[styles.textRight]}
          color={Colors.cl1}
          bold>
          {textShown ? 'Thu gọn' : 'Xem thêm'}
        </Text>
      )}
    </>
  );
};

const LinkingResult = ({route}) => {
  const translation = require('../../../../Context/Language/vi.json');
  const [open, setOpen] = useState(false);
  const blue = '#FAFCFF';
  const blue_1 = '#1F5CAB';

  const {
    SrcAccount,
    DstAccount,
    TransCode,
    TransType,
    TransFormType,
    TransTime,
    Status,
    Description,
    TransFee,
    RequestedAmount,
    TransAmount,
    CommittedAmount,
    Payoneer,
    isIncome,
  } = _.get(route, 'params.data', {});
  const TRANS_TYPE = {
    CashIn: 1,
    CashOut: 2,
    CashTransfer: 3,
    AutoCashIn: 4,
    CashReceive: 5,
    PaymentToll: 6,
    ActiveCustomer: 7,
    DeactiveCustomer: 8,
    PaymentMerchant: 9,
  };
  const dataRowMain = {
    default: [
      {title: 'Ngân hàng', value: 'Vietcombank'},
      {title: 'Số thẻ', value: '1234567899098'},
      {title: 'Họ tên', value: 'NGUYEN VAN A'},
      {title: 'Loại GTTT', value: 'CMND'},
      {title: 'Số ID', value: '13232435'},
      {
        title: 'Địa chỉ liên hệ',
        value: '123 CMT8, Phường 7, Quận 3, TP.HCM',
      },
    ],
  };

  const dataRow = dataRowMain[TransType] || dataRowMain['default'];

  return (
    <Wrapper>
      <SafeAreaProvider>
        <HeaderBg>
          <Header
            back
            title={translation?.transaction_details}
            style={{marginTop: 30, marginBottom: -16}}
          />
        </HeaderBg>
        <ScrollView style={styles.bgWhite}>
          <View style={[styles.pt1]}>
            <View style={[styles.alignCenter, styles.wrap, styles.pb1]}>
              <Image
                source={require('images/storybook/convert-card.png').default}
                style={styles.iconSuccess}
                resizeMode="contain"
              />
            </View>

            <View style={[styles.alignCenter, styles.pb2]}>
              <Text fs="h5" bold style={styles.maxWidth1} centered mb={7}>
                {`Liên kết ngân hàng`}
              </Text>
            </View>
          </View>
          <View style={[styles.wrap]}>
            <View
              style={[
                styles.alignCenter,
                styles.leftZero,
                styles.topZero,
                styles.botZero,
                styles.rightZero,
                styles.absolute,
              ]}>
              <Image
                source={Images.TransactionHistory.LogoBg.default}
                style={styles.logoBg}
                resizeMode="contain"
              />
            </View>

            {dataRow.map((item, index) => (
              <>
                <View
                  style={[styles.flexRow, {paddingVertical: 12}]}
                  key={index}>
                  <Text fs="h6" style={[styles.haftWidth, styles.pr1]}>
                    {item.title}
                  </Text>
                  <Text
                    fs="h6"
                    bold
                    color={Colors.gray}
                    style={[styles.haftWidth, styles.textRight]}>
                    {item.value}
                  </Text>
                </View>
                <DashedLine
                  dashLength={4}
                  dashThickness={1}
                  dashColor={Colors.l3}
                />
              </>
            ))}
          </View>
        </ScrollView>
      </SafeAreaProvider>
      <ModalCustom
        visible={open}
        onClose={() => setShow(false)}
        icon={require('images/storybook/keyboard.png').default}>
        <Text centered mb={20}>
          {`Bạn cần phải xác thực lại GTTT đã 
          đăng ký với ngân hàng vì nó không 
          trùng khớp với GTTT đã xác thực với 
          Epay, việc này sẽ gián đoạn việc 
          chuyển tiền của bạn, hãy liên kết 
          ngân hàng trước khi thực hiện các 
          giao dịch hoặc thay đổi ngân hàng 
          khác.`}
        </Text>
        <Pressable onPress={() => setOpen(false)}>
          <Image
            source={require('images/gradient/B-continue.png').default}
            style={base.buttonSB}
          />
        </Pressable>
        <Pressable onPress={() => setOpen(false)}>
          <View
            style={{
              width: 270,
              height: 45,
              borderWidth: 1,
              borderColor: blue_1,
              borderRadius: 8,
              marginTop: 15,
            }}>
            <Text
              bold
              style={{color: blue_1, textAlign: 'center', marginTop: 12}}>
              Đổi ngân hàng
            </Text>
          </View>
        </Pressable>
      </ModalCustom>
      <View style={base.bottom}>
        <Text style={{fontSize: 13}}>
          Khi nhấn Liên Kết, Quý khách đã xác nhận đồng ý với{' '}
          <Text style={{cursor: 'pointer', color: blue_1}}>
            Thỏa thuận người sử dụng
          </Text>{' '}
          của EPAY và Vietcombank
        </Text>
      </View>
      <FooterContainer>
        <Pressable onPress={() => setOpen(true)}>
          <Image
            source={require('images/gradient/B-continue.png').default}
            style={base.buttonSB}
          />
        </Pressable>
      </FooterContainer>
    </Wrapper>
  );
};

const styles = StyleSheet.create({
  wrap: {paddingHorizontal: Spacing.PADDING - 4},
  //------------------
  flexRow: {flexDirection: 'row'},
  flex1: {flex: 1},
  //------------------
  alignCenter: {alignItems: 'center'},
  //------------------
  absolute: {position: 'absolute'},
  topZero: {top: 0},
  rightZero: {right: 0},
  botZero: {bottom: 0},
  leftZero: {left: 0},
  //------------------
  haftWidth: {width: '50%'},
  //------------------
  maxWidth1: {maxWidth: 291},
  //margin and padding
  mt1: {marginTop: 12},
  //------------------
  mt2: {marginTop: 15},
  //------------------
  mb2: {marginBottom: 32},
  //------------------
  px1: {paddingHorizontal: 17},
  px2: {paddingHorizontal: 12},
  //------------------
  py1: {paddingVertical: 11},
  py2: {paddingVertical: 5},
  //------------------
  pt1: {paddingTop: 22},
  pt2: {paddingTop: 13},
  //------------------
  pr1: {paddingRight: 5},
  //------------------
  pb1: {paddingBottom: 22},
  pb2: {paddingBottom: 38},
  pb3: {paddingBottom: 13},
  //end
  textRight: {textAlign: 'right'},
  //-----------------
  bgWhite: {backgroundColor: Colors.white},
  //-----------------
  borderRadius1: {borderRadius: 8},
  //-----------------
  iconSuccess: {
    width: 68,
    height: 68,
  },
  logoBg: {
    width: 109,
    height: 101,
  },
  iconPhone: {
    width: 17,
    height: 17,
  },
  blockShadow: {
    borderRadius: 8,
    shadowColor: Colors.black,
    shadowOffset: {
      width: 0,
      height: 1.8,
    },
    shadowOpacity: 0.16,
    shadowRadius: 8,
    elevation: 24,
  },
});
export default LinkingResult;
