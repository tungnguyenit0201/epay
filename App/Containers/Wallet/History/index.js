import React from 'react';
import {
  View,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  FlatList,
  RefreshControl,
} from 'react-native';
import {Header, HeaderBg, Text} from 'components';
import {useTranslation} from 'context/Language';
import {formatMoney, scale} from 'utils/Functions';
import {Images, Colors, Spacing, Fonts} from 'themes';
import {COMMON_ENUM, TRANS_TYPE} from 'configs/Constants';
import {useHistory} from 'context/Wallet/utils';
import moment from 'moment';

const filterData = {
  service: [
    {value: 0, label: 'all'},
    {value: TRANS_TYPE.CashIn, label: 'top_up'},
    {value: TRANS_TYPE.CashOut, label: 'withdraw'},
    {
      value: TRANS_TYPE.CashTransfer,
      label: 'transfer',
    },
    {
      value: TRANS_TYPE.AutoCashIn,
      label: 'automatically_top_up',
    },
    {
      value: TRANS_TYPE.CashReceive,
      label: 'receive',
    },
    {
      value: `${TRANS_TYPE.PaymentToll},${TRANS_TYPE.PaymentMerchant}`,
      label: 'bill_pay',
    },
  ],
  status: [
    {
      value: 0,
      label: 'all',
    },
    {
      value: 1,
      label: 'successful',
    },
    {
      value: 3,
      label: 'processing',
    },
    {
      value: 2,
      label: 'failed',
    },
  ],
};

const History = () => {
  const translation = useTranslation();
  const bgBlue = '#F2F8FF';
  const gray = '#848181';
  const red = '#D80000';
  const {historyData, onDetail, onFilter, onSearch, onGetHistory} =
    useHistory();

  const renderTransactionSections = data =>
    data.map(item => {
      let title = item?.Description;
      if (!title) {
        title = filterData.service.find(x => x.value === item?.TransType).label;
        title = translation[title] || title;
      }
      return (
        <TouchableOpacity
          key={item?.TransCode}
          style={[
            styles.wrap,
            styles.flexRow,
            styles.alignCenter,
            styles.blockTransaction,
          ]}
          onPress={() => onDetail(item)}>
          <View style={styles.blockCardTick}>
            <Image
              source={Images.TransactionHistory.cardTick}
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
              <Text fs="md" bold>
                {(item?.isIncome ? '+' : '-') +
                  formatMoney(item?.TransAmount, 'đ')}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      );
    });

  const renderNotifyComponent = ({label, income, expense}) => (
    <View
      style={[
        styles.wrap,
        styles.flexRow,
        styles.justifyBetween,
        styles.fWrap,
        styles.alignCenter,
        styles.py1,
        {backgroundColor: bgBlue},
      ]}>
      <Text bold fs="h6">
        {label}
      </Text>
      <View style={styles.blockSumIncome}>
        <View style={[styles.flexRow, styles.justifyBetween, styles.minWidth1]}>
          <Text style={[styles.textSize1, styles.pr1]}>Thu:</Text>
          <Text style={styles.textSize1}>{formatMoney(income, 'đ')}</Text>
        </View>
        <View style={[styles.flexRow, styles.justifyBetween, styles.minWidth1]}>
          <Text style={[styles.textSize1, styles.pr1]}>Chi:</Text>
          <Text style={styles.textSize1}>{formatMoney(expense, 'đ')}</Text>
        </View>
      </View>
    </View>
  );

  const renderMonth = ({item}) => {
    const {key, list, income, expense} = item;
    return (
      <View>
        {renderNotifyComponent({label: `Tháng ${key}`, income, expense})}
        {renderTransactionSections(list)}
      </View>
    );
  };

  return (
    <>
      <View style={[styles.bgWhite]}>
        <HeaderBg>
          <Header title={translation?.transaction_history} />
        </HeaderBg>

        {/* <Header back title="Lịch sử" avoidStatusBar blackIcon />
        <Pressable onPress={() => Navigator.navigate(SCREEN.DETAIL_HISTORY)}>
          <Text>Chi tiết</Text>
        </Pressable> */}

        <View style={[styles.wrap, styles.pb1]}>
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

            <TouchableOpacity style={[styles.pr1, styles.width1]}>
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

      <FlatList
        data={historyData}
        renderItem={renderMonth}
        refreshControl={
          <RefreshControl
            refreshing={!historyData?.length}
            onRefresh={onGetHistory}
          />
        }
      />
    </>
  );
};

const styles = StyleSheet.create({
  wrap: {paddingHorizontal: Spacing.PADDING - 4},
  flexRow: {flexDirection: 'row'},
  flex1: {flex: 1},
  fWrap: {flexWrap: 'wrap'},
  justifyBetween: {justifyContent: 'space-between'},
  absolute: {position: 'absolute'},
  topZero: {top: 0},
  rightZero: {right: 0},
  top1: {top: 11},
  topMinus1: {top: -5},
  rightMinus1: {right: -2},
  left1: {left: 14},
  minWidth1: {minWidth: 97},
  width1: {width: 65},
  //margin and padding
  mb1: {marginBottom: 4},
  pr1: {paddingRight: 10},
  pr2: {paddingRight: 16},
  pb1: {paddingBottom: 16},
  pl1: {paddingLeft: 40},
  pl2: {paddingLeft: 8},
  py1: {paddingVertical: 4},
  //end
  bgWhite: {backgroundColor: Colors.white},
  alignCenter: {alignItems: 'center'},
  zIndex1: {zIndex: 1},
  lineHeight1: {lineHeight: 14},
  textSize1: {fontSize: 12},
  textSize2: {fontSize: 14},
  textSize3: {fontSize: 10},
  cirle: {borderRadius: 100},
  textCenter: {textAlign: 'center'},
  textWhite: {color: Colors.white},
  //-----------------------------
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
    width: 20,
    height: 17,
  },
  iconPrimary: {
    width: 12,
    height: 12,
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
});
export default History;
