import React, {useCallback, useState} from 'react';
import {
  ScrollView,
  View,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  FlatList,
  RefreshControl,
  // useWindowDimensions,
} from 'react-native';
import {
  Header,
  HeaderBg,
  Text,
  Button,
  Icon,
  DatePicker,
  Row,
  Col,
} from 'components';
import {useTranslation} from 'context/Language';
import {formatMoney, scale} from 'utils/Functions';
import {Images, Colors, Spacing, Fonts} from 'themes';
import {COMMON_ENUM, TRANS_DETAIL, TRANS_TYPE} from 'configs/Constants';
import {useHistory} from 'context/Wallet/utils';
import moment from 'moment';
import FilterModal from 'components/Wallet/History/FilterModal';

const History = () => {
  const translation = useTranslation();
  const bgBlue = '#F2F8FF';
  const gray = '#848181';
  const red = '#D80000';
  const {
    historyData,
    onDetail,
    onSearch,
    onGetHistory,
    isFiltering,
    showFilter,
    filterData,
    onFilter,
    onToggleFilter,
    onSetTempFilter,
    onResetTempFilter,
  } = useHistory();

  const renderRightComponent = () => (
    <TouchableOpacity onPress={onToggleFilter} style={styles.rightMinus2}>
      <Icon
        icon={Images.WidthDraw.Close}
        tintColor={Colors.white}
        style={styles.iconPrimary}
      />
    </TouchableOpacity>
  );

  const renderTransactionSections = ({item}) => {
    const blue = '#1F5CAB';
    let title = item?.Description;
    if (!title) {
      title = TRANS_DETAIL.SERVICE.find(x => x.value === item?.TransType).label;
      title = translation[title] || title;
    }

    return (
      <TouchableOpacity
        key={item?.TransCode}
        style={[
          styles.px1,
          styles.flexRow,
          styles.alignCenter,
          styles.blockTransaction,
        ]}
        onPress={() => onDetail(item)}>
        <View style={styles.blockCardTick}>
          <Image
            source={Images.TransactionHistory.CardTick}
            style={styles.iconCardTick}
          />
        </View>
        <View style={[styles.flex1, styles.pl2]}>
          <Text style={[styles.textSize2, styles.mb1]}>{title}</Text>
          <View style={[styles.flexRow, styles.justifyBetween, styles.flex1]}>
            <Text style={[styles.textSize1, {color: gray}]}>
              {moment(item?.TransTime, COMMON_ENUM.DATETIME_FORMAT).format(
                'hh:mm   DD/MM/YYYY',
              )}
            </Text>
            <Text
              fs="md"
              bold
              style={
                item?.isIncome ? {color: blue} : {color: Colors.Highlight}
              }>
              {(item?.isIncome ? '+' : '-') +
                formatMoney(item?.TransAmount, 'đ')}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <>
      <View style={[styles.bgWhite]}>
        <HeaderBg>
          <Header back title={translation?.transaction_history} />
        </HeaderBg>

        <View style={[styles.wrap, styles.ptb1]}>
          <View style={[styles.flexRow, styles.alignCenter]}>
            <View style={[styles.flex1, styles.pr2]}>
              <Image
                source={Images.Search}
                style={[
                  styles.iconSearch,
                  styles.absolute,
                  styles.zIndex1,
                  styles.top1,
                  styles.left1,
                ]}
              />
              <TextInput
                autoCapitalize={'none'}
                autoFocus={false}
                importantForAutofill={'yes'}
                placeholder={translation.search_a_transaction}
                onChangeText={onSearch}
                style={[styles.textInput, styles.pl1]}
              />
            </View>

            <TouchableOpacity
              style={[styles.pr1, styles.w1]}
              onPress={onToggleFilter}>
              <Text bold>{translation.filter}</Text>

              <View style={[styles.absolute, styles.topZero, styles.rightZero]}>
                <Image
                  source={Images.TransactionHistory.filter}
                  style={styles.iconFilter}
                />
                <View
                  style={[
                    styles.absolute,
                    styles.topMinus1,
                    styles.rightMinus1,
                    styles.iconPrimary,
                    styles.cirle,
                    {backgroundColor: red},
                  ]}>
                  <Text
                    style={[
                      styles.textCenter,
                      styles.textSize3,
                      styles.textWhite,
                      styles.lineHeight1,
                    ]}>
                    3
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View style={[styles.bgWhite, styles.flex1, styles.pb1]}>
        {historyData?.length !== 0 ? (
          <View style={[styles.blockShadow, styles.mx1]}>
            <FlatList
              data={historyData}
              renderItem={renderTransactionSections}
              keyExtractor={item => item?.TransCode}
              refreshControl={
                <RefreshControl
                  refreshing={!historyData}
                  onRefresh={onGetHistory}
                />
              }
            />
          </View>
        ) : (
          <View
            style={[
              styles.alignCenter,
              styles.flex1,
              {justifyContent: 'center'},
            ]}>
            <Image
              style={styles.iconBarCross}
              source={
                isFiltering
                  ? Images.TransactionHistory.SearchZoomOut
                  : Images.TransactionHistory.BarCross
              }
            />
            <Text centered mt={20} fs="h6" color={Colors.gray}>
              {isFiltering
                ? 'Không tìm thấy kết quả phù hợp'
                : 'Chưa có giao dịch để hiển thị'}
            </Text>
          </View>
        )}
      </View>
      <View style={[styles.bottom, styles.bgWhite]} />

      <FilterModal
        filterData={filterData}
        showModal={showFilter}
        onHideModal={onToggleFilter}
        renderRightComponent={renderRightComponent}
        onFilter={onFilter}
        onSetTempFilter={onSetTempFilter}
        onResetTempFilter={onResetTempFilter}
      />
    </>
  );
};

const styles = StyleSheet.create({
  wrap: {paddingHorizontal: Spacing.PADDING - 4},
  //------------------
  flexRow: {flexDirection: 'row'},
  flex1: {flex: 1},
  fWrap: {flexWrap: 'wrap'},
  //------------------
  justifyBetween: {justifyContent: 'space-between'},
  justifyCenter: {justifyContent: 'center'},
  //------------------
  alignCenter: {alignItems: 'center'},
  //------------------
  absolute: {position: 'absolute'},
  topZero: {top: 0},
  rightZero: {right: 0},
  //------------------
  top1: {top: 11},
  topMinus1: {top: -5},
  //------------------
  rightMinus1: {right: -2},
  rightMinus2: {right: -20},
  //------------------
  right1: {right: 50},
  //------------------
  left1: {left: 14},
  left2: {left: 50},
  //------------------
  fullWidth: {width: '100%'},
  //------------------
  minWidth1: {minWidth: 97},
  w1: {width: 65},
  w2: {width: 74},
  //------------------
  h1: {height: 38},
  //margin and padding
  mbZero: {marginBottom: 0},
  mlZero: {marginLeft: 0},
  mtZero: {marginTop: 0},
  pbZero: {paddingBottom: 0},
  //------------------
  mx1: {marginHorizontal: Spacing.PADDING},
  //------------------
  mt1: {marginTop: 8},
  //------------------
  mr1: {marginRight: 12},
  //------------------
  mb1: {marginBottom: 4},
  mb2: {marginBottom: 10},
  //------------------
  pt1: {paddingTop: 20},
  pt2: {paddingTop: 24},
  //------------------
  pr1: {paddingRight: 10},
  pr2: {paddingRight: 16},
  //------------------
  pl1: {paddingLeft: 40},
  pl2: {paddingLeft: 8},
  //------------------
  px1: {paddingHorizontal: 8},
  //------------------
  py1: {paddingVertical: 4},
  py2: {paddingVertical: 9},
  //------------------
  ptb1: {paddingVertical: 16},
  //------------------
  pb1: {paddingBottom: Spacing.PADDING * 1.5},
  pb2: {paddingBottom: 45},
  pb3: {paddingBottom: 40},
  //end
  bgWhite: {backgroundColor: Colors.white},
  //------------------
  zIndex1: {zIndex: 1},
  lineHeight1: {lineHeight: 14},
  //------------------
  textSize1: {fontSize: Fonts.SM},
  textSize2: {fontSize: Fonts.MD},
  textSize3: {fontSize: Fonts.SX},
  //------------------
  cirle: {borderRadius: 100},
  //------------------
  textCenter: {textAlign: 'center'},
  textWhite: {color: Colors.white},
  //-----------------
  borderRadius1: {borderRadius: 8},
  //-----------------
  textInput: {
    margin: 0,
    paddingHorizontal: scale(10),
    height: 38,
    borderRadius: scale(8),
    backgroundColor: Colors.l2,
    fontFamily: Fonts.FONT_REGULAR,
    color: Colors.TEXT,
    fontSize: Fonts.FONT_MEDIUM,
  },
  iconSearch: {
    width: 17,
    height: 17,
  },
  iconFilter: {
    width: 18,
    height: 18,
  },
  iconCardTick: {
    width: 24,
    height: 20,
  },
  iconPrimary: {
    width: 12,
    height: 12,
  },
  iconStick: {
    width: 16,
    height: 16,
  },
  iconBarCross: {
    width: 88,
    height: 88,
  },
  iconArrow1: {
    width: 25,
    height: 15,
  },
  blockSumIncome: {
    paddingLeft: 8,
    borderLeftWidth: 0.8,
    borderColor: Colors.l4,
  },
  blockCardTick: {
    width: 40,
    height: 40,
    alignItems: 'center',
    paddingTop: 10,
    backgroundColor: Colors.l2,
    borderRadius: 100,
  },
  blockTransaction: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: Colors.l2,
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
    backgroundColor: Colors.white,
  },
  flatList1: {
    // marginLeft: -10,
    marginRight: -Spacing.PADDING,
    paddingVertical: 10,
    paddingLeft: 5,
  },
  blockStatus1: {
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
  },
  //----------------
  position1: {
    position: 'absolute',
    top: -5,
    right: -5,
  },
  //----------------
  grayLine1: {
    paddingTop: 16,
    borderBottomWidth: 1,
    borderColor: Colors.l3,
  },
  grayLine2: {
    paddingTop: 8,
    backgroundColor: Colors.l3,
  },
  bottom: {
    height: scale(80),
    width: '100%',
  },
});
export default History;
