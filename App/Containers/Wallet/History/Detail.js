import {Header, HeaderBg, Text, Button, Icon} from 'components';
import {useTranslation} from 'context/Language';
import React, {useState, useCallback, useEffect} from 'react';
import DashedLine from 'react-native-dashed-line';
import LinearGradient from 'react-native-linear-gradient';
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
import {Images, Colors, Spacing, Fonts} from 'themes';
import _ from 'lodash';
import FooterContainer from 'components/Auth/FooterContainer';
import {TRANS_DETAIL, TRANS_TYPE} from 'configs/Constants';
import {formatMoney} from 'utils/Functions';

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
        numberOfLines={numLines}
      >
        {text}
      </Text>
      {showMoreButton && (
        <Text
          onPress={toggleTextShown}
          style={[styles.textRight]}
          color={Colors.cl1}
          bold
        >
          {textShown ? 'Thu gọn' : 'Xem thêm'}
        </Text>
      )}
    </>
  );
};

const DetailHistory = ({route}) => {
  const translation = useTranslation();

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

  const dataRowMain = {
    default: [
      {title: 'Tài khoản nguồn', value: SrcAccount},
      {title: translation.amount, value: formatMoney(RequestedAmount)},
      {title: translation.transaction_fee, value: formatMoney(TransFee)},
      {
        title: translation.total,
        value: formatMoney(TransAmount) || formatMoney(CommittedAmount),
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
      {title: 'Số quyết định ', value: '51G-5678, Loại 1 < 12 chỗ biển trắng'},
      {title: 'Họ tên người vi phạm ', value: 'Nguyen Van A'},
      {title: 'CMND/CCCD/Hộ chiếu ', value: '12******678'},
      {title: 'Số tiền ', value: '1.000.000 Vnd '},
      {
        title: 'Hành vi vi phạm ',
        value:
          '51G-5678, Loại 1 < 12 chỗ biển trắng,51G-5678, Loại 1 < 12 chỗ biển trắng',
      },
      {title: 'Thời gian vi phạm ', value: '11-09-2021 '},
      {
        title: 'Hình thức phạt bổ sung ',
        value:
          'Lorem ipsum dolor sit amet conse Lorem ipsum dolor sit amet conse',
      },
      {title: 'Từ ngày phạt bổ sung ', value: '11-09-2021 '},
      {title: 'Đến ngày phạt bổ sung ', value: '11-09-2021 '},
      {title: 'Địa điểm vi phạm ', value: '123, Đống Đa '},
      {title: 'Ngày ra quyết định ', value: '20-10-2021 '},
      {title: 'Cơ quan quyết định ', value: 'CSGT số 1/ TP HN'},
      {title: 'Trang thái quyết định ', value: 'Đã có quyết định'},
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
    <>
      <HeaderBg>
        <Header back title={translation?.transaction_details} />
      </HeaderBg>
      <ScrollView style={styles.bgWhite}>
        <View style={[styles.pt1, {backgroundColor: blue}]}>
          <View style={[styles.alignCenter, styles.wrap, styles.pb1]}>
            <Image
              source={
                Status === 1
                  ? Images.TransactionHistory.Success
                  : Images.TransactionHistory.Fail
              }
              style={styles.iconSuccess}
              resizeMode="contain"
            />
          </View>

          <View style={[styles.alignCenter, styles.pb2]}>
            <Text fs="h5" bold style={styles.maxWidth1} centered mb={7}>
              {translation[
                TRANS_DETAIL.SERVICE.find(x => x.value === TransType).label
              ] +
                ' ' +
                translation[
                  TRANS_DETAIL.STATUS.find(x => x.value === Status).label
                ].toLowerCase()}
            </Text>

            {!!TransAmount && (
              <Text
                fs="h3"
                bold
                color={isIncome ? blue_1 : Colors.Highlight}
                centered
                style={styles.wrap}
              >
                {isIncome ? '+' : '-'} {formatMoney(TransAmount, ' Vnđ')}
              </Text>
            )}

            <View style={styles.mt2}>
              <Text fs="md" centered color={Colors.gray}>
                Mã giao dịch: {TransCode}
              </Text>
              <Text fs="md" centered color={Colors.gray}>
                Thời gian: {TransTime}
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
            ]}
          >
            <Image
              source={Images.TransactionHistory.LogoBg}
              style={styles.logoBg}
              resizeMode="contain"
            />
          </View>

          {dataRow.map((item, index) => (
            <>
              <View
                style={[styles.flexRow, styles.pt2, styles.pb3]}
                key={index}
              >
                <Text fs="h6" style={[styles.haftWidth, styles.pr1]}>
                  {item.title}
                </Text>
                <Text
                  fs="h6"
                  bold
                  color={Colors.gray}
                  style={[styles.haftWidth, styles.textRight]}
                >
                  {item.value}
                </Text>
              </View>
              {index < dataRow.length - 1 && (
                <DashedLine
                  dashLength={4}
                  dashThickness={1}
                  dashColor={Colors.l3}
                />
              )}
            </>
          ))}

          <LinearGradient
            start={{x: 0, y: 0.75}}
            end={{x: 1, y: 0.25}}
            colors={[Colors.barLeft, Colors.barRight]}
            style={[
              styles.borderRadius1,
              styles.px1,
              styles.py1,
              styles.mt1,
              styles.mb2,
            ]}
          >
            <TouchableOpacity
              style={[styles.flexRow]}
              onPress={() => Linking.openURL('tel:19000000')}
            >
              <View style={[styles.flexRow, styles.flex1, styles.pr1]}>
                <Icon
                  icon={Images.Phone_1}
                  tintColor={Colors.white}
                  style={styles.iconPhone}
                />
                <Text color={Colors.white} ml={8} bold>
                  Hỗ trợ
                </Text>
              </View>
              <Text color={Colors.white} bold>
                1900-0000
              </Text>
            </TouchableOpacity>
          </LinearGradient>

          {dataRowMoreInfo[TransType] && (
            <>
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
                ]}
              >
                {dataRowMoreInfo[TransType].map((item, index) => (
                  <View key={index}>
                    <View style={[styles.flexRow, styles.pt2, styles.pb3]}>
                      <Text fs="md" style={[styles.haftWidth, styles.pr1]}>
                        {item.title}
                      </Text>
                      <View style={[styles.haftWidth]}>
                        <ToggleRightText text={item.value} />
                      </View>
                    </View>
                    {index < dataRowMoreInfo[TransType].length - 1 && (
                      <DashedLine
                        dashLength={4}
                        dashThickness={1}
                        dashColor={Colors.l3}
                      />
                    )}
                  </View>
                ))}
              </View>
            </>
          )}
        </View>
      </ScrollView>
      {/* <View style={styles.bgWhite}>
        <FooterContainer>
          <Button type={1} label="Tải biên lai" bold />
        </FooterContainer>
      </View> */}
    </>
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
  mt2: {marginTop: 24},
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
    width: 60,
    height: 60,
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
