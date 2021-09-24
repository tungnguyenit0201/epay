import {Header, HeaderBg, Text, Button, Icon} from 'components';
import {useTranslation} from 'context/Language';
import React, {useState, useCallback} from 'react';
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
} from 'react-native';
import {Images, Colors, Spacing, Fonts} from 'themes';
import _ from 'lodash';
import FooterContainer from 'components/Auth/FooterContainer';

const ToggleRightText = ({text}) => {
  const [textShown, setTextShown] = useState(false);
  const [showMoreButton, setShowMoreButton] = useState(false);

  const toggleTextShown = () => {
    setTextShown(!textShown);
  };

  const onTextLayout_1 = useCallback(
    e => {
      if (e.nativeEvent.lines.length >= 2 && !textShown) {
        setShowMoreButton(true);
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
        numberOfLines={textShown ? undefined : 2}>
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
  const translation = useTranslation();

  const blue = '#FAFCFF';
  const blue_1 = '#1F5CAB';
  const dataTest_1 = [
    {title: 'Tài khoản nguồn', content: 'ví epay  09*****567'},
    {title: translation.amount, content: '15.000'},
    {title: translation.transaction_fee, content: translation.free},
    {title: translation.total, content: '15.000'},
  ];
  const dataTest_2 = [
    {title: 'Số quyết định ', content: '51G-5678, Loại 1 < 12 chỗ biển trắng'},
    {title: 'Họ tên người vi phạm ', content: 'Nguyen Van A'},
    {title: 'CMND/CCCD/Hộ chiếu ', content: '12******678'},
    {title: 'Số tiền ', content: '1.000.000 Vnd '},
    {
      title: 'Hành vi vi phạm ',
      content:
        '51G-5678, Loại 1 < 12 chỗ biển trắng,51G-5678, Loại 1 < 12 chỗ biển trắng',
    },
    {title: 'Thời gian vi phạm ', content: '11-09-2021 '},
    {
      title: 'Hình thức phạt bổ sung ',
      content:
        'Lorem ipsum dolor sit amet conse Lorem ipsum dolor sit amet conse',
    },
    {title: 'Từ ngày phạt bổ sung ', content: '11-09-2021 '},
    {title: 'Đến ngày phạt bổ sung ', content: '11-09-2021 '},
    {title: 'Địa điểm vi phạm ', content: '123, Đống Đa '},
    {title: 'Ngày ra quyết định ', content: '20-10-2021 '},
    {title: 'Cơ quan quyết định ', content: 'CSGT số 1/ TP HN'},
    {title: 'Trang thái quyết định ', content: 'Đã có quyết định'},
  ];

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
    CommitedAmount,
    Payoneer,
  } = _.get(route, 'params.data', {});

  return (
    <>
      <HeaderBg>
        <Header back title={translation?.transaction_details} />
      </HeaderBg>
      <ScrollView style={styles.bgWhite}>
        <View style={[styles.pt1, {backgroundColor: blue}]}>
          <View style={[styles.alignCenter, styles.wrap, styles.pb1]}>
            <Image
              source={Images.TransactionHistory.Success}
              style={styles.iconSuccess}
              resizeMode="contain"
            />
          </View>

          <View style={[styles.alignCenter, styles.pb2]}>
            <Text fs="h5" bold style={styles.maxWidth1} centered mb={7}>
              Thanh toán phí giao thông thành công
            </Text>

            <Text fs="h3" bold color={blue_1} centered style={styles.wrap}>
              - 1.000.000 Vnđ
            </Text>

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
              source={Images.TransactionHistory.LogoBg}
              style={styles.logoBg}
              resizeMode="contain"
            />
          </View>

          {dataTest_1.map((item, index) => (
            <>
              <View
                style={[styles.flexRow, styles.pt2, styles.pb3]}
                key={index}>
                <Text fs="h6" style={[styles.haftWidth, styles.pr1]}>
                  {item.title}
                </Text>
                <Text
                  fs="h6"
                  bold
                  color={Colors.gray}
                  style={[styles.haftWidth, styles.textRight]}>
                  {item.content}
                </Text>
              </View>
              {index < dataTest_1.length - 1 && (
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
            ]}>
            <TouchableOpacity style={[styles.flexRow]}>
              <View style={[styles.flexRow, styles.flex1, styles.pr1]}>
                <Icon
                  icon={Images.Phone_1}
                  tintColor={Colors.white}
                  style={styles.iconPhone}
                />
                <Text color={Colors.white} ml={8} bold>
                  Hỗ trợ khiếu nại
                </Text>
              </View>
              <Text color={Colors.white} bold>
                1900-0000
              </Text>
            </TouchableOpacity>
          </LinearGradient>

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
            {dataTest_2.map((item, index) => (
              <>
                <View
                  style={[styles.flexRow, styles.pt2, styles.pb3]}
                  key={index}>
                  <Text fs="md" style={[styles.haftWidth, styles.pr1]}>
                    {item.title}
                  </Text>
                  <View style={[styles.haftWidth]}>
                    <ToggleRightText text={item.content} />
                  </View>
                </View>
                {index < dataTest_1.length && (
                  <DashedLine
                    dashLength={4}
                    dashThickness={1}
                    dashColor={Colors.l3}
                  />
                )}
              </>
            ))}
          </View>
        </View>
      </ScrollView>
      <View style={styles.bgWhite}>
        <FooterContainer>
          <Button type={1} label="Tải biên lai" bold />
        </FooterContainer>
      </View>
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
