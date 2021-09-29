import React from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {scale} from 'utils/Functions';
import {Images, Colors, Spacing, Fonts} from 'themes';
import Header from '../../../Atoms/Header';
import HeaderBg from '../../../Atoms/HeaderBg';
import Text from '../../../Atoms/Text';
const History = () => {
  const translation = require('../../../../Context/Language/vi.json');
  const bgBlue = '#F2F8FF';
  const gray = '#848181';
  const red = '#D80000';
  const listTransactionSection = [
    {
      title: 'Nạp tiền vào ví từ Vietcombank',
      time: '03:30',
      date: '23/07/2021',
      money: '+50.000đ',
      icon: require('images/storybook/tick.png').default,
      type: 1,
    },
    {
      title: 'Chuyển tiền vào ví từ Vietcombank',
      time: '03:30',
      date: '23/07/2021',
      money: '-1.200.000đ',
      icon: require('images/storybook/arrow-up.png').default,
      type: 2,
    },
    {
      title: 'Nạp tiền vào ví từ Vietcombank',
      time: '03:30',
      date: '23/07/2021',
      money: '+200.000đ',
      icon: require('images/storybook/tick.png').default,
      type: 1,
    },
    {
      title: 'Nạp tiền vào ví từ Vietcombank',
      time: '03:30',
      date: '23/07/2021',
      money: '+500.000đ',
      icon: require('images/storybook/tick.png').default,
      type: 1,
    },
    {
      title: 'Nạp tiền vào ví từ Vietcombank',
      time: '03:30',
      date: '23/07/2021',
      money: '+1.200.000đ',
      icon: require('images/storybook/tick.png').default,
      type: 1,
    },
  ];

  return (
    <>
      <View style={[styles.bgWhite]}>
        <HeaderBg>
          <Header
            title={translation?.transaction_history}
            style={{marginLeft: 45, marginTop: 25, marginBottom: -15}}
          />
        </HeaderBg>
        <View style={[styles.wrap, styles.pb1]}>
          <View style={[styles.flexRow, styles.alignCenter]}>
            <View style={[styles.flex1, styles.pr2]}>
              <Image
                source={require('images/storybook/search-normal.png').default}
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
                // onChange={handleChange('phone')}
                // onBlur={handleBlur('phone')}
                style={[styles.textInput, styles.pl1]}
              />
            </View>

            <TouchableOpacity style={[styles.pr1, styles.width1]}>
              <Text bold>{translation.filter}</Text>

              <View style={[styles.absolute, styles.topZero, styles.rightZero]}>
                <Image
                  source={Images.TransactionHistory.filter.default}
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

      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          height: 250,
        }}>
        <Image
          source={require('images/storybook/bag-cross.png').default}
          style={{width: 88, height: 88}}
        />
        <Text style={{marginTop: 15}}>Chưa có giao dịch để hiển thị</Text>
      </View>
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
    width: 23,
    height: 23,
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
export default History;
