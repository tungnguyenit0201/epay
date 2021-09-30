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
import Modal from 'react-native-modal';
import moment from 'moment';
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
import FooterContainer from 'components/Auth/FooterContainer';

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
          {
            height: 56,
            alignItems: 'center',
            justifyContent: 'center',
          },
          isChecked && {backgroundColor: blurBlue},
        ]}>
        <Image
          source={icon}
          style={{
            width: iconWidth ? iconWidth : 24,
            height: iconHeight ? scale(iconHeight) : 24,
          }}
          resizeMode="contain"
        />
      </View>

      <Text centered mt={5} style={{fontSize: 12}}>
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
      <View
        style={[
          styles.blockShadow,
          {
            height: 56,
            alignItems: 'center',
            justifyContent: 'center',
          },
        ]}>
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
            style={[
              styles.iconStick,
              {
                position: 'absolute',
                top: -5,
                right: -5,
              },
            ]}
            resizeMode="contain"
          />
        )}
      </View>

      <Text centered mt={5} style={{fontSize: 12}}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const ModalFilter = ({showModal, onHideModal, renderRightComponent}) => {
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
      name: 'Chuyển tiền',
      isChecked: false,
    },
    {
      id: `id3-${Math.random(0, 100)}`,
      icon: Images.TransactionHistory.CardEdit,
      name: 'Chuyển tiền',
      isChecked: false,
    },
    {
      id: `id4-${Math.random(0, 100)}`,
      icon: Images.TransactionHistory.CardTick,
      name: 'Chuyển tiền',
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
      name: 'Giao thông',
      isChecked: false,
    },
    {
      id: `id3-${Math.random(0, 100)}`,
      icon: Images.TransactionHistory.Passport,
      name: 'Giao thông',
      isChecked: false,
    },
    {
      id: `id4-${Math.random(0, 100)}`,
      icon: Images.TransactionHistory.Medic,
      name: 'Giao thông',
      isChecked: false,
    },
    {
      id: `id5-${Math.random(0, 100)}`,
      icon: Images.TransactionHistory.Medic,
      name: 'Giao thông',
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
    <Modal
      isVisible={showModal}
      animationIn="slideInUp"
      animationOut="slideOutDown"
      style={[styles.fullWidth, styles.mlZero, styles.mbZero, styles.mtZero]}
      hideModalContentWhileAnimating
      backdropTransitionOutTiming={0}
      onBackdropPress={onHideModal}>
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
            <Text bold fs="h6" mb={-10}>
              {translation.by_month}
            </Text>

            <View>
              <Text bold fs="md">
                Từ:
              </Text>
              <DatePicker
                label={translation.date_of_birth_ddmmyyyy}
                // value={info.DateOfBirth}
                // value={''}
                // required
                placeholder="dd/mm/yyyy"
                noIconBg
              />
            </View>

            <View>
              <Text bold fs="md">
                Từ:
              </Text>
              <DatePicker
                label={translation.date_of_birth_ddmmyyyy}
                placeholder="dd/mm/yyyy"
                noIconBg
              />
            </View>
          </View>

          <Calendar
            // Handler which gets executed on day press. Default = undefined
            onDayPress={day => {
              console.log('selected day', day);
            }}
            // Handler which gets executed on day long press. Default = undefined
            // onDayLongPress={(day) => {console.log('selected day', day)}}
            // Month format in calendar title. Formatting values: http://arshaw.com/xdate/#Formatting
            monthFormat={'MM/yyyy'}
            // Hide month navigation arrows. Default = false
            // hideArrows={true}
            // Replace default arrows with custom ones (direction can be 'left' or 'right')
            // renderArrow={(direction) => (<Arrow/>)}
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
                  {date.toString('MM/yyyy')}
                </Text>
              );
            }}
            markingType={'period'}
            markedDates={{
              '2021-09-19': {
                startingDay: true,
                color: '#50cebb',
                textColor: 'white',
              },
              '2021-09-20': {color: '#70d7c7', textColor: 'white'},
              // '2021-09-21': {color: '#70d7c7', textColor: 'white', marked: true, dotColor: 'white'},
              '2021-09-21': {color: '#70d7c7', textColor: 'white'},
              '2021-09-22': {color: '#70d7c7', textColor: 'white'},
              '2021-09-23': {
                endingDay: true,
                color: '#50cebb',
                textColor: 'white',
              },
            }}
            enableSwipeMonths={true}
            // dayComponent={({date, state}) => {
            //   return (
            //     <View>
            //       <Text style={{textAlign: 'center', color: state === 'disabled' ? 'gray' : 'black'}}>
            //         {date.day}
            //       </Text>
            //     </View>
            //   );
            // }}
          />

          <View style={styles.wrap}>
            <Row space={16}>
              {!!transactionList &&
                transactionList.map((item, index) => {
                  return (
                    <Col
                      width="25%"
                      key={item.id}
                      space={16}
                      style={{marginBottom: 10}}>
                      <ItemType1
                        title={item.name}
                        icon={item.icon}
                        iconHeight={item.iconHeight}
                        iconWidth={item.iconWidth}
                        isChecked={item.isChecked}
                        onChooseOption={() => onChooseTransaction(item.id)}
                      />
                    </Col>
                  );
                })}
            </Row>
          </View>

          <View style={styles.wrap}>
            <FlatList
              data={serviceList}
              renderItem={({item, index}) => (
                <View style={[styles.w2, styles.mr1]}>
                  <ItemType2
                    title={item.name}
                    icon={item.icon}
                    iconHeight={item.iconHeight}
                    iconWidth={item.iconWidth}
                    isChecked={item.isChecked}
                    onChooseOption={() => onChooseService(item.id)}
                  />
                </View>
              )}
              keyExtractor={(item, index) =>
                `${item.name}-${Math.random(0, 100)}`
              }
              horizontal={true}
              style={styles.flatList1}
            />
          </View>

          <View style={styles.wrap}>
            <Row space={16}>
              <Col space={16} width="50%">
                <TouchableOpacity
                  // key={index}
                  style={[styles.blockShadow]}>
                  <Text
                    centered
                    style={[styles.textSize1, styles.px1, styles.py2]}>
                    {translation.all}
                  </Text>
                  {/* {isChecked && ( */}
                  <Image
                    source={Images.TransactionHistory.Success}
                    style={[
                      styles.iconStick,
                      {
                        position: 'absolute',
                        top: -5,
                        right: -5,
                      },
                    ]}
                    resizeMode="contain"
                  />
                  {/* )} */}
                </TouchableOpacity>
              </Col>
              <Col space={16} width="50%">
                <TouchableOpacity
                  // key={index}
                  style={[styles.blockShadow]}>
                  <Text
                    centered
                    style={[styles.textSize1, styles.px1, styles.py2]}>
                    {translation.all}
                  </Text>
                  {/* {isChecked && ( */}
                  <Image
                    source={Images.TransactionHistory.Success}
                    style={[
                      styles.iconStick,
                      {
                        position: 'absolute',
                        top: -5,
                        right: -5,
                      },
                    ]}
                    resizeMode="contain"
                  />
                  {/* )} */}
                </TouchableOpacity>
              </Col>
            </Row>
          </View>
        </ScrollView>

        <FooterContainer>
          {/* <Button label={translation.apply} bold 
            bgImg={0} bg={'white'} color={Colors.Highlight}
            border={Colors.blue}/> */}
          <Button
            label={translation.apply}
            bold
            bgImg={0}
            bg={'white'}
            color={Colors.Highlight}
            border={Colors.blue}
          />
        </FooterContainer>
      </View>
    </Modal>
  );
};

const History = () => {
  const translation = useTranslation();
  const bgBlue = '#F2F8FF';
  const gray = '#848181';
  const red = '#D80000';
  const {historyData, onDetail, onFilter, onSearch, onGetHistory} =
    useHistory();
  const [showModal, setShowModal] = useState(false);
  const onShowModal = () => {
    setShowModal(true);
  };

  const onHideModal = () => {
    setShowModal(false);
  };

  const months = [
    {data: 'Tháng 8/2021'},
    {data: 'Tháng 8/2021'},
    {data: 'Tháng 8/2021'},
    {data: 'Tháng 8/2021'},
    {data: 'Tháng 8/2021'},
    {data: 'Tháng 8/2021'},
    {data: 'Tháng 8/2021'},
  ];

  const renderRightComponent = () => (
    <TouchableOpacity
      onPress={() => setShowModal(false)}
      style={styles.rightMinus2}>
      <Icon
        icon={Images.WidthDraw.Close}
        tintColor={Colors.white}
        style={styles.iconPrimary}
      />
    </TouchableOpacity>
  );

  // const renderListMonth = ({item, index}) => (
  //   <TouchableOpacity
  //     // key={index}
  //     style={[styles.blockShadow, styles.w2, styles.mr1]}>
  //     <Text centered style={[styles.textSize1, styles.px1, styles.py2]}>
  //       {item.data}
  //     </Text>
  //   </TouchableOpacity>
  // );

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
        {/* {renderNotifyComponent({label: `Tháng ${key}`, income, expense})} */}
        {renderTransactionSections(list)}
      </View>
    );
  };

  return (
    <>
      <View style={[styles.bgWhite]}>
        <HeaderBg>
          <Header back title={translation?.transaction_history} />
        </HeaderBg>

        {/* delete when no use
        <Header back title="Lịch sử" avoidStatusBar blackIcon />
        <Pressable onPress={() => Navigator.navigate(SCREEN.DETAIL_HISTORY)}>
          <Text>Chi tiết</Text>
        </Pressable> */}

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
              onPress={onShowModal}>
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
        <View style={[styles.blockShadow, styles.mx1]}>
          <FlatList
            data={historyData}
            renderItem={renderTransactionSections}
            keyExtractor={item => item?.TransCode}
            refreshControl={
              <RefreshControl
                refreshing={!historyData?.length}
                onRefresh={onGetHistory}
              />
            }
          />
        </View>

        {/* layout search not found
        <ScrollView contentContainerStyle={[styles.flex1,
          styles.alignCenter,styles.justifyCenter]}>
          <View style={styles.alignCenter}>
            <Image
              style={styles.iconBarCross}
              source={Images.TransactionHistory.BarCross}

              //img Search not found
              // source={Images.TransactionHistory.SearchZoomOut} 
            />
            <Text centered mt={20} fs="h6" color={Colors.gray}>
              Chưa có giao dịch để hiển thị
            </Text>
          </View>
        </ScrollView> */}
      </View>

      <ModalFilter
        showModal={showModal}
        onHideModal={onHideModal}
        renderRightComponent={renderRightComponent}
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
  left1: {left: 14},
  //------------------
  fullWidth: {width: '100%'},
  //------------------
  minWidth1: {minWidth: 97},
  w1: {width: 65},
  w2: {width: 74},
  //margin and padding
  mbZero: {marginBottom: 0},
  mlZero: {marginLeft: 0},
  mtZero: {marginTop: 0},
  pbZero: {paddingBottom: 0},
  //------------------
  mx1: {marginHorizontal: Spacing.PADDING},
  //------------------
  mr1: {marginRight: 12},
  //------------------
  mb1: {marginBottom: 4},
  //------------------
  pt1: {paddingTop: 20},
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
  //end
  bgWhite: {backgroundColor: Colors.white},
  //------------------
  zIndex1: {zIndex: 1},
  lineHeight1: {lineHeight: 14},
  //------------------
  textSize1: {fontSize: 12},
  textSize2: {fontSize: 14},
  textSize3: {fontSize: 10},
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
});
export default History;
