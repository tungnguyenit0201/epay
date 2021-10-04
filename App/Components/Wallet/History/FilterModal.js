import React, {memo, useState} from 'react';
import {
  ScrollView,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
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
import Modal from 'react-native-modal';
import moment from 'moment';
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
import FooterContainer from 'components/Auth/FooterContainer';
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

const ItemType1 = ({
  title,
  icon,
  value,
  iconHeight,
  iconWidth,
  isChecked,
  onChooseOption,
}) => {
  const blurBlue = '#F2F8FF';
  return (
    <TouchableOpacity onPress={onChooseOption}>
      <View
        style={[
          styles.blockShadow,
          styles.blockStatus1,
          isChecked && {backgroundColor: blurBlue},
        ]}
      >
        <Image
          source={icon}
          style={{
            width: iconWidth ? iconWidth : 24,
            height: iconHeight ? scale(iconHeight) : 24,
          }}
          resizeMode="contain"
        />
      </View>

      <Text centered mt={12} style={styles.textSize1}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const ItemType2 = ({
  title,
  icon,
  value,
  iconHeight,
  iconWidth,
  isChecked,
  onChooseOption,
}) => {
  return (
    <TouchableOpacity onPress={onChooseOption}>
      <View style={[styles.blockShadow, styles.blockStatus1]}>
        <Image
          source={icon}
          style={{
            width: iconWidth ? iconWidth : 24,
            height: iconHeight ? scale(iconHeight) : 24,
          }}
          resizeMode="contain"
        />
        {isChecked && (
          <Image
            source={Images.TransactionHistory.Success}
            style={[styles.iconStick, styles.position1]}
            resizeMode="contain"
          />
        )}
      </View>

      <Text centered mt={12} style={styles.textSize1}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const StatusBtn = ({isChecked, title, onPress}) => (
  <TouchableOpacity style={[styles.blockShadow]} onPress={onPress}>
    <Text
      centered
      semibold
      fs="md"
      style={[styles.textSize1, styles.px1, styles.py2]}
    >
      {title}
    </Text>
    {isChecked && (
      <Image
        source={Images.TransactionHistory.Success}
        style={[styles.iconStick, styles.position1]}
        resizeMode="contain"
      />
    )}
  </TouchableOpacity>
);

const GroupFilter = memo(({translation, onSelect, selectedStatus}) => {
  const [selectedData, setSelectedData] = useState({
    type: 'serviceID',
    list: [],
  });

  const _onSelect = ({value, type}) => {
    // change type
    if (type !== selectedData.type) {
      setSelectedData({type, list: [value]});
      onSelect &&
        onSelect({type, value: `${value}`}) &&
        onSelect({type: selectedData.type, value: ''});
      return;
    }
    // same type
    let list = [...selectedData.list];
    if (list.findIndex(x => x == value) === -1) {
      list.push(value);
    } else {
      list = _.difference(list, [value]);
    }
    setSelectedData({type, list});
    onSelect && onSelect({type, value: list.join(',')});
  };

  return (
    <View style={[styles.wrap, styles.pt2]}>
      <Text bold mb={15} style={styles.textSize4}>
        {translation.service_group}
      </Text>
      <Text bold mb={6} color={Colors.gray} style={styles.textSize5}>
        Nhóm giao dịch
      </Text>

      <FlatList
        data={TRANS_DETAIL.SERVICE}
        renderItem={({item}) => (
          <View style={[styles.w2, styles.mr1]}>
            <ItemType1
              title={translation[item.label] || item.label}
              icon={item.icon}
              isChecked={selectedData.list.includes(item.value)}
              onChooseOption={() =>
                _onSelect({value: item.value, type: 'serviceID'})
              }
            />
          </View>
        )}
        keyExtractor={item => `${item.value}`}
        horizontal={true}
        style={[styles.flatList1, styles.mb2]}
      />

      <Text bold mb={6} style={styles.textSize5} color={Colors.gray}>
        Nhóm dịch vụ
      </Text>

      <FlatList
        data={TRANS_DETAIL.TYPE2}
        renderItem={({item}) => (
          <View style={[styles.w2, styles.mr1]}>
            <ItemType2
              title={translation[item.label] || item.label}
              icon={item.icon}
              isChecked={selectedData.list.includes(item.value)}
              onChooseOption={() =>
                _onSelect({value: item.value, type: 'type2'})
              }
            />
          </View>
        )}
        keyExtractor={item => `${item.value}`}
        horizontal={true}
        style={styles.flatList1}
      />
    </View>
  );
});

const StatusFilter = memo(({translation, onSelect, selectedStatus}) => {
  const [selectedValue, setSelectedValue] = useState(selectedStatus);
  return TRANS_DETAIL.STATUS.map(({label, value}) => (
    <Col space={16} width="50%" style={styles.mb2} key={value}>
      <StatusBtn
        title={translation[label]}
        onPress={() => {
          setSelectedValue(value);
          onSelect && onSelect(value);
        }}
        isChecked={value === selectedValue}
      />
    </Col>
  ));
});

const FilterModal = ({
  showModal,
  onHideModal,
  renderRightComponent,
  filterData,
  onFilter,
  onSetTempFilter,
  onResetTempFilter,
}) => {
  const translation = useTranslation();
  const [chooseService, setChooseService] = useState(false);
  const [transactionList, setTransactionList] = useState([
    {
      id: `id1-${Math.random(0, 100)}`,
      icon: Images.TransactionHistory.CardReceive,
      name: 'Chuyển tiền',
      isChecked: false,
    },
    {
      id: `id2-${Math.random(0, 100)}`,
      icon: Images.TransactionHistory.CardSend,
      name: 'Nhận tiền',
      isChecked: false,
    },
    {
      id: `id3-${Math.random(0, 100)}`,
      icon: Images.TransactionHistory.CardEdit,
      name: 'Nạp tiền',
      isChecked: false,
    },
    {
      id: `id4-${Math.random(0, 100)}`,
      icon: Images.TransactionHistory.CardTick,
      name: 'Thanh toán',
      isChecked: false,
    },
    {
      id: `id5-${Math.random(0, 100)}`,
      icon: Images.TransactionHistory.EmptyWalletChange,
      name: 'Hoàn tiền',
      isChecked: false,
    },
  ]);

  const [serviceList, setServiceList] = useState([
    {
      id: `id1-${Math.random(0, 100)}`,
      icon: Images.TransactionHistory.Car,
      name: 'Giao thông',
      isChecked: false,
    },
    {
      id: `id2-${Math.random(0, 100)}`,
      icon: Images.TransactionHistory.ShieldTick,
      name: 'Bảo hiểm',
      isChecked: false,
    },
    {
      id: `id3-${Math.random(0, 100)}`,
      icon: Images.TransactionHistory.Passport,
      name: 'Sân bay',
      isChecked: false,
    },
    {
      id: `id4-${Math.random(0, 100)}`,
      icon: Images.TransactionHistory.Medic,
      name: 'Vaccine',
      isChecked: false,
    },
    {
      id: `id5-${Math.random(0, 100)}`,
      icon: Images.TransactionHistory.Warning,
      name: 'Công an',
      isChecked: false,
    },
    {
      id: `id6-${Math.random(0, 100)}`,
      icon: Images.TransactionHistory.Passport,
      name: 'Giao thông',
      isChecked: false,
    },
  ]);

  const onChooseTransaction = id => {
    // console.log(transactionList);
    if (chooseService) {
      setChooseService(false);
      setServiceList(
        serviceList.map((item, index) => {
          item.isChecked = false;
          return {...item};
        }),
      );
    }

    setTransactionList(
      transactionList.map((item, index) => {
        if (item.id === id) {
          item.isChecked = !item.isChecked;
        }
        return {...item};
      }),
    );
  };

  const onChooseService = id => {
    // console.log(serviceList);
    if (!chooseService) {
      setChooseService(true);
      setTransactionList(
        transactionList.map((item, index) => {
          item.isChecked = false;
          return {...item};
        }),
      );
    }

    setServiceList(
      serviceList.map((item, index) => {
        if (item.id === id) {
          item.isChecked = !item.isChecked;
        }
        return {...item};
      }),
    );
  };

  return (
    //TODO: Translate
    <Modal
      isVisible={!!showModal}
      animationIn="slideInUp"
      animationOut="slideOutDown"
      style={[styles.fullWidth, styles.mlZero, styles.mbZero, styles.mtZero]}
      hideModalContentWhileAnimating
      backdropTransitionOutTiming={0}
      onBackdropPress={onHideModal}
    >
      <View style={[styles.flex1, styles.bgWhite]}>
        <HeaderBg>
          <Header
            title={translation?.transaction_history}
            renderRightComponent={() => renderRightComponent()}
            style={styles.pbZero}
          />
        </HeaderBg>

        <ScrollView style={styles.pt1}>
          <View style={styles.wrap}>
            <Text bold fs="h6" mb={8}>
              Lọc theo ngày tháng
            </Text>

            <Row space={24}>
              <Col width="50%" space={24}>
                <View style={[styles.flexRow, styles.alignCenter]}>
                  <Text fs="md" mr={10}>
                    Từ:
                  </Text>
                  <DatePicker
                    // label={translation.date_of_birth_ddmmyyyy}
                    // value={info.DateOfBirth}
                    // value={''}
                    // required
                    placeholder="dd/mm/yyyy"
                    noIconBg
                    style={[styles.flex1, styles.h1]}
                  />
                </View>
              </Col>

              <Col width="50%" space={24}>
                <View style={[styles.flexRow, styles.alignCenter]}>
                  <Text fs="md" mr={10}>
                    Đến:
                  </Text>
                  <DatePicker
                    placeholder="dd/mm/yyyy"
                    noIconBg
                    style={[styles.flex1, styles.h1]}
                  />
                </View>
              </Col>
            </Row>
            <View style={styles.grayLine1}></View>
          </View>

          <Calendar
            // Handler which gets executed on day press. Default = undefined
            onDayPress={day => {
              console.log('selected day', day);
            }}
            // Handler which gets executed on day long press. Default = undefined
            // onDayLongPress={(day) => {console.log('selected day', day)}}
            // Month format in calendar title. Formatting values: http://arshaw.com/xdate/#Formatting
            // monthFormat={'MM/yyyy'}
            // Hide month navigation arrows. Default = false
            // hideArrows={true}
            // Replace default arrows with custom ones (direction can be 'left' or 'right')
            renderArrow={direction => {
              if (direction === 'left') {
                return (
                  <Icon
                    icon={Images.ArrowLeft}
                    tintColor={Colors.gray}
                    style={[styles.iconArrow1, styles.left2]}
                    resizeMode="contain"
                  />
                );
              }
              if (direction === 'right') {
                return (
                  <Icon
                    icon={Images.ArrowRight}
                    style={[styles.iconArrow1, styles.right1]}
                    tintColor={Colors.gray}
                    resizeMode="contain"
                  />
                );
              }
            }}
            // If hideArrows = false and hideExtraDays = false do not switch month when tapping on greyed out
            // day from another month that is visible in calendar page. Default = false
            // disableMonthChange={true}
            // If firstDay=1 week starts from Monday. Note that dayNames and dayNamesShort should still start from Sunday
            firstDay={1}
            // Handler which gets executed when press arrow icon left. It receive a callback can go back month
            // onPressArrowLeft={subtractMonth => subtractMonth()}
            // Handler which gets executed when press arrow icon right. It receive a callback can go next month
            // onPressArrowRight={addMonth => addMonth()}
            // Disable left arrow. Default = false
            // disableArrowLeft={true}
            // Disable right arrow. Default = false
            // disableArrowRight={true}
            // Disable all touch events for disabled days. can be override with disableTouchEvent in markedDates
            // disableAllTouchEventsForDisabledDays={true}
            // Replace default month and year title with custom one. the function receive a date as parameter
            renderHeader={date => {
              return (
                <Text centered fs="h6" bold>
                  Tháng {date.toString('MM/yyyy')}
                </Text>
              );
            }}
            markingType={'period'}
            markedDates={{
              '2021-09-19': {
                startingDay: true,
                color: Colors.blue,
                textColor: Colors.white,
              },
              '2021-09-20': {color: Colors.cl5},
              // '2021-09-21': {color: '#70d7c7', textColor: 'white', marked: true, dotColor: 'white'},
              '2021-09-21': {color: Colors.cl5},
              '2021-09-22': {color: Colors.cl5},
              '2021-09-23': {
                endingDay: true,
                color: Colors.blue,
                textColor: Colors.white,
              },
            }}
            enableSwipeMonths={true}
            // dayComponent={({date, state,marking}) => {
            //   console.log(marking);
            //   return (
            //     <View>
            //       <Text style={{textAlign: 'center', color: state === 'disabled' ? 'gray' : 'black'}}>
            //         {date.day}
            //       </Text>
            //     </View>
            //   );
            // }}
            theme={{
              //rememder to delete comment no use
              // selectedDayBackgroundColor: '#00adf5',
              // selectedDayTextColor: 'red',
              textSectionTitleColor: Colors.BLACK,
              // 'stylesheet.calendar.header': {
              //   backgroundColor: 'red'
              // }
            }}
          />

          <View style={[styles.grayLine2, styles.mt1]} />

          <GroupFilter
            translation={translation}
            onSelect={({type, value}) => onSetTempFilter({type, value})}
            key={showModal}
          />

          <View style={[styles.grayLine2, styles.mt1]} />

          <View style={[styles.wrap, styles.pt2, styles.pb2]}>
            <Text bold mb={15} style={styles.textSize4}>
              {translation.status}
            </Text>
            <Row space={16}>
              <StatusFilter
                translation={translation}
                onSelect={value => onSetTempFilter({type: 'stateID', value})}
                selectedStatus={filterData?.stateID}
                key={showModal}
              />
            </Row>
          </View>
        </ScrollView>

        <FooterContainer style={styles.pb3}>
          <Row space={8}>
            <Col space={8} width="50%">
              <Button
                label={translation.clear_filter}
                bold
                bgImg={0}
                bg={'white'}
                color={Colors.blue}
                border={Colors.blue}
                onPress={onResetTempFilter}
              />
            </Col>

            <Col space={8} width="50%">
              <Button label={translation.apply} bold onPress={onFilter} />
            </Col>
          </Row>
        </FooterContainer>
      </View>
    </Modal>
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
  textSize1: {fontSize: 12},
  textSize2: {fontSize: 14},
  textSize3: {fontSize: 10},
  textSize4: {fontSize: 18},
  textSize5: {fontSize: 16},
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

export default FilterModal;
