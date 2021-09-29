import React, {useState, useCallback, useEffect} from 'react';
import DashedLine from 'react-native-dashed-line';
import Header from '../../../Atoms/Header';
import HeaderBg from '../../../Atoms/HeaderBg';
import Text from '../../../Atoms/Text';
import Button from '../../../Atoms/Button';
import Icon from '../../../Atoms/Icon';
import Wrapper from '../../../Groups/Wrapper';
import FooterContainer from '../../../Atoms/FooterContainer';
import {
  ScrollView,
  View,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  Linking,
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

const DetailHistory = ({route}) => {
  const translation = require('../../../../Context/Language/vi.json');

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
      {title: 'Tài khoản nguồn', value: 'ví epay  09*****567'},
      {title: 'Số tiền', value: '15.000'},
      {title: 'Phí giao dịch', value: 'Miễn phí'},
      {
        title: 'Tổng tiền',
        value: '15.000',
      },
    ],
    [TRANS_TYPE.CashReceive]: [
      {title: translation.amount, value: formatMoney(RequestedAmount)},
      {title: translation.transaction_fee, value: formatMoney(TransFee)},
      {
        title: translation.total,
        value: formatMoney(CommittedAmount),
      },
    ],
    [TRANS_TYPE.CashOut]: [
      {title: 'Tài khoản đích', value: DstAccount},
      {title: translation.amount, value: formatMoney(RequestedAmount)},
      {title: translation.transaction_fee, value: formatMoney(TransFee)},
      {
        title: translation.total,
        value: formatMoney(CommittedAmount),
      },
    ],
  };
  const dataRowMoreInfo = {
    [TRANS_TYPE.PaymentToll]: [
      {
        title: 'Hành vi vi phạm ',
        value:
          '51G-5678, Loại 1 < 12 chỗ biển trắng,51G-5678, Loại 1 < 12 chỗ biển trắng',
      },
      {title: 'Trạm/Làn ', value: 'Trạm An Sương Làn A'},
      {
        title: 'Loại vé',
        value: 'Vé tháng',
      },
      {
        title: 'Giá vé',
        value: '15.000',
      },
    ],
    [TRANS_TYPE.CashReceive]: [
      {title: 'Số tài khoản', value: SrcAccount},
      {title: 'Nội dung', value: Description},
    ],
    [TRANS_TYPE.CashTransfer]: [
      {title: 'Số tài khoản', value: DstAccount},
      {title: 'Người chịu phí', value: Payoneer ? 'Người nhận' : 'Người gửi'},
      {title: 'Nội dung', value: Description},
    ],
  };
  const dataRow = dataRowMain[TransType] || dataRowMain['default'];

  return (
    <Wrapper>
      <HeaderBg>
        <Header back title={translation?.transaction_details} />
      </HeaderBg>
      <ScrollView style={styles.bgWhite}>
        <View style={[styles.pt1, {backgroundColor: blue}]}>
          <View style={[styles.alignCenter, styles.wrap, styles.pb1]}>
            <Image
              source={
                Status === 1
                  ? Images.TransactionHistory.Success.default
                  : Images.TransactionHistory.Fail.default
              }
              style={styles.iconSuccess}
              resizeMode="contain"
            />
          </View>

          <View style={[styles.alignCenter, styles.pb2]}>
            <Text fs="h5" bold style={styles.maxWidth1} centered mb={7}>
              {`Thanh toán phí giao thông \n thành công`}
            </Text>

            {!!TransAmount && (
              <Text
                fs="h3"
                bold
                color={isIncome ? blue_1 : Colors.Highlight}
                centered
                style={styles.wrap}>
                {isIncome ? '+' : '-'} {formatMoney(TransAmount, ' Vnđ')}
              </Text>
            )}

            <View style={styles.mt2}>
              <Text fs="md" centered color={Colors.gray}>
                Mã giao dịch: 346278456276
              </Text>
              <Text fs="md" centered color={Colors.gray}>
                Thời gian: 22-10-2021 20:10:09
              </Text>
            </View>
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
              <View style={[styles.flexRow, {paddingVertical: 12}]} key={index}>
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
          <Image
            source={require('images/storybook/support.png').default}
            style={{
              width: 362,
              height: 40,
              marginVertical: 15,
              marginLeft: -17,
            }}
          />
          <Text fs="h6" bold mb={16}>
            Thông tin thêm
          </Text>
          <View
            style={[
              styles.blockShadow,
              styles.bgWhite,
              styles.mb2,
              styles.px2,
              styles.py2,
            ]}>
            {dataRowMoreInfo[TRANS_TYPE.PaymentToll].map((item, index) => (
              <View key={index}>
                <View style={[styles.flexRow, styles.pt2, styles.pb3]}>
                  <Text fs="md" style={[styles.haftWidth, styles.pr1]}>
                    {item.title}
                  </Text>
                  <View style={[styles.haftWidth]}>
                    <ToggleRightText text={item.value} />
                  </View>
                </View>
                {index < dataRowMoreInfo[TRANS_TYPE.PaymentToll].length - 1 && (
                  <DashedLine
                    dashLength={4}
                    dashThickness={1}
                    dashColor={Colors.l3}
                  />
                )}
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
      <FooterContainer>
        <Image
          source={require('images/gradient/B_bill_disable.png').default}
          style={base.buttonSB}
        />
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
    width: 50,
    height: 50,
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
export default DetailHistory;
