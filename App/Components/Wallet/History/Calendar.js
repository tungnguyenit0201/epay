import React, {useState, useRef, useEffect} from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {Text, Icon, DatePicker, Row, Col} from 'components';
import {useTranslation} from 'context/Language';
import {scale} from 'utils/Functions';
import {Images, Colors, Spacing, Fonts} from 'themes';
import {COMMON_ENUM} from 'configs/Constants';
import moment from 'moment';
import {Calendar} from 'react-native-calendars';
import _ from 'lodash';

// import {LocaleConfig} from 'react-native-calendars';

//use to change day name,month name, must to set all,
//can not set each orther@@
// LocaleConfig.locales['fr'] = {
//   monthNames: ['Janvier','Février','Mars','Avril','Mai','Juin','Juillet','Août','Septembre','Octobre','Novembre','Décembre'],
//   monthNamesShort: ['Janv.','Févr.','Mars','Avril','Mai','Juin','Juil.','Août','Sept.','Oct.','Nov.','Déc.'],
//   dayNames: ['Chủ nhật','Thứ 2','Thứ 3','Thứ 4','Thứ 5','Thứ 6','Thứ 7'],
//   dayNamesShort: ['CN','T2','T3','T4','T5','T6','T7'],
//   today: 'Aujourd\'hui'
// };

// LocaleConfig.defaultLocale = 'fr';

const calendarFormat = 'yyyy-MM-DD';

const CalendarCustom = ({
  onSelectRange,
  initialStạrtDate,
  initialEndDate,
  format = COMMON_ENUM.DATETIME_FORMAT,
}) => {
  const translation = useTranslation();
  const calendarRef = useRef(null);
  const [markedDates, setMarkedDates] = useState({});

  const onDayPress = date => {
    let newMarkedDates = {};
    if (
      Object.values(markedDates).findIndex(x => x.startingDay) !== -1 &&
      Object.values(markedDates).findIndex(x => x.endingDay) === -1
    ) {
      // if only 1 date is marked
      let startDateKey = Object.keys(markedDates)[0];
      const startDate = {...markedDates[startDateKey]};
      let endDateKey = date.dateString;
      if (endDateKey === startDateKey) {
        // same day
        newMarkedDates = {[startDateKey]: {...startDate, endingDay: true}};
        onSelectRange &&
          onSelectRange([
            moment(startDateKey + ' 00:00:00').format(format),
            moment(startDateKey + ' 23:59:59').format(format),
          ]);
      } else {
        // not the same day
        // set startingDay & endingDay
        const isReversed = moment(startDateKey) > moment(endDateKey);
        if (isReversed) {
          startDate.endingDay = true;
          delete startDate.startingDay;
        }
        newMarkedDates[startDateKey] = startDate;
        newMarkedDates[endDateKey] = {
          color: Colors.tp1,
          textColor: Colors.bs4,
          [isReversed ? 'startingDay' : 'endingDay']: true,
        };
        // mark all days between startingDay & endingDay
        isReversed && ([startDateKey, endDateKey] = [endDateKey, startDateKey]);
        newMarkedDates = onMarkRange(newMarkedDates, startDateKey, endDateKey);
        // parent component's callback
        onSelectRange &&
          onSelectRange([
            moment(startDateKey + ' 00:00:00').format(format),
            moment(endDateKey + ' 23:59:59').format(format),
          ]);
      }
    } else {
      // if both dates are marked
      newMarkedDates[date.dateString] = {
        startingDay: true,
        color: Colors.tp1,
        textColor: Colors.bs4,
      };
    }
    setMarkedDates(newMarkedDates);
  };

  const onMarkRange = (range, startDate, endDate) => {
    const result = {...range};
    let iterativeDate = moment(startDate);
    let isReached = false;
    while (!isReached) {
      iterativeDate.add(1, 'days');
      const iterativeDateFormatted = iterativeDate.format(calendarFormat);
      if (iterativeDateFormatted === endDate) {
        // reach endingDay
        isReached = true;
      } else {
        // not reach
        result[iterativeDateFormatted] = {color: Colors.bg1};
      }
    }
    return result;
  };

  const getDateText = key => {
    const dateData = Object.entries(markedDates).find(
      ([date, value]) => value[key],
    );
    return dateData
      ? moment(dateData[0], calendarFormat).format('DD/MM/YY')
      : '';
  };

  const onChangeMonth = date => {
    const currentMonth = moment(calendarRef.current?.state?.currentMonth);
    const diff = moment(date, 'DD-MM-yyyy').diff(currentMonth, 'months');
    console.log('diff', diff);
    calendarRef.current.addMonth(diff);
  };

  useEffect(() => {
    if (!initialStạrtDate || !initialEndDate) {
      return;
    }
    const startDate = moment(initialStạrtDate, format).format(calendarFormat);
    const endDate = moment(initialEndDate, format).format(calendarFormat);
    if (startDate === endDate) {
      // same day
      setMarkedDates({
        [startDate]: {
          endingDay: true,
          startingDay: true,
          color: Colors.tp1,
          textColor: Colors.bs4,
        },
      });
      return;
    }
    setMarkedDates(
      onMarkRange(
        {
          [startDate]: {
            startingDay: true,
            color: Colors.tp1,
            textColor: Colors.bs4,
          },
          [endDate]: {
            endingDay: true,
            color: Colors.tp1,
            textColor: Colors.bs4,
          },
        },
        startDate,
        endDate,
      ),
    );
  }, []);

  const renderHeader = date => {
    return (
      <View
        style={[
          styles.flexRow,
          styles.alignCenter,
          styles.borderTopBottom,
          styles.fullWidth,
          styles.justifyCenter,
          styles.mb2,
        ]}
      >
        <TouchableOpacity onPress={() => calendarRef.current.addMonth(-1)}>
          <Icon
            icon={Images.ArrowLeft}
            tintColor={Colors.tp3}
            style={styles.iconArrow1}
            resizeMode="contain"
          />
        </TouchableOpacity>
        <Text centered fs="h6" bold style={styles.mx2}>
          Tháng {date.toString('MM/yyyy')}
        </Text>
        <TouchableOpacity onPress={() => calendarRef.current.addMonth(1)}>
          <Icon
            icon={Images.ArrowRight}
            style={styles.iconArrow1}
            tintColor={Colors.tp3}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <>
      <Row space={-8} style={styles.mb2}>
        <Col width="50%" space={24}>
          <View style={[styles.flexRow, styles.alignCenter]}>
            <Text fs="md" mr={10}>
              Từ:
            </Text>
            <DatePicker
              value={getDateText('startingDay')}
              placeholder="dd/mm/yyyy"
              noIconBg
              style={[styles.flex1, styles.h1]}
              // onChange={date => onChangeMonth(date)}
              disabled
            />
          </View>
        </Col>

        <Col width="50%" space={24}>
          <View style={[styles.flexRow, styles.alignCenter]}>
            <Text fs="md" mr={10}>
              Đến:
            </Text>
            <DatePicker
              value={getDateText('endingDay')}
              placeholder="dd/mm/yyyy"
              noIconBg
              style={[styles.flex1, styles.h1]}
              // onChange={date => onChangeMonth(date)}
              disabled
            />
          </View>
        </Col>
      </Row>
      <Calendar
        ref={calendarRef}
        onDayPress={onDayPress}
        firstDay={1}
        renderHeader={renderHeader}
        markingType={'period'}
        markedDates={markedDates}
        hideArrows
        theme={{
          textSectionTitleColor: Colors.tp2,
        }}
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
  mx2: {marginHorizontal: Spacing.PADDING * 2},
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
  bgWhite: {backgroundColor: Colors.bs4},
  //------------------
  zIndex1: {zIndex: 1},
  lineHeight1: {lineHeight: 14},
  //------------------
  cirle: {borderRadius: 100},
  //------------------
  textCenter: {textAlign: 'center'},
  textWhite: {color: Colors.bs4},
  //-----------------
  borderRadius1: {borderRadius: 8},
  //-----------------
  textInput: {
    margin: 0,
    paddingHorizontal: scale(10),
    height: 38,
    borderRadius: scale(8),
    backgroundColor: Colors.bs2,
    fontFamily: Fonts.FONT_REGULAR,
    color: Colors.tp3,
    fontSize: Fonts.MD,
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
    borderColor: Colors.bs1,
  },
  blockCardTick: {
    width: 40,
    height: 40,
    alignItems: 'center',
    paddingTop: 10,
    backgroundColor: Colors.bs2,
    borderRadius: 100,
  },
  blockTransaction: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: Colors.bs2,
  },
  blockShadow: {
    borderRadius: 8,
    shadowColor: Colors.tp2,
    shadowOffset: {
      width: 0,
      height: 1.8,
    },
    shadowOpacity: 0.16,
    shadowRadius: 8,
    elevation: 24,
    backgroundColor: Colors.bs4,
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
    borderColor: Colors.bs1,
  },
  grayLine2: {
    paddingTop: 8,
    backgroundColor: Colors.bs1,
  },
  bottom: {
    height: scale(80),
    width: '100%',
  },
  borderTopBottom: {
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: Colors.bs1,
    paddingVertical: scale(6),
  },
});

export default CalendarCustom;
