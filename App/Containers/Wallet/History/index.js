import React, {useState} from 'react';
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
import {Header, HeaderBg, Text, Button, Icon} from 'components';
import {useTranslation} from 'context/Language';
import {formatMoney, scale} from 'utils/Functions';
import {Images, Colors, Spacing, Fonts} from 'themes';
import {COMMON_ENUM, TRANS_DETAIL, TRANS_TYPE} from 'configs/Constants';
import {useHistory} from 'context/Wallet/utils';
import Modal from 'react-native-modal';
import moment from 'moment';
import FooterContainer from 'components/Auth/FooterContainer';

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
    <TouchableOpacity onPress={() => setShowModal(false)}>
      <Icon
        icon={Images.WidthDraw.Close}
        tintColor={Colors.white}
        style={styles.iconPrimary}
      />
    </TouchableOpacity>
  );

  const renderListMonth = ({item, index}) => (
    <TouchableOpacity
      // key={index}
      style={[styles.bgWhite, styles.blockShadow, styles.w2, styles.mr1]}>
      <Text centered style={[styles.textSize1, styles.px1, styles.py2]}>
        {item.data}
      </Text>
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

        {/* <Header back title="Lịch sử" avoidStatusBar blackIcon />
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
            style={[styles.bgWhite, styles.borderRadius1, styles.blockShadow]}
            refreshControl={
              <RefreshControl
                refreshing={!historyData?.length}
                onRefresh={onGetHistory}
              />
            }
          />
        </View>
      </View>

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

          <ScrollView style={[styles.wrap, styles.pt1]}>
            <Text bold fs="h6" mb={-10}>
              {translation.by_month}
            </Text>

            <FlatList
              data={months}
              renderItem={renderListMonth}
              keyExtractor={(item, index) => `${item}-${Math.random(0, 100)}`}
              horizontal={true}
              style={styles.listMonthBtn}
            />
          </ScrollView>

          <FooterContainer>
            <Button label="Đã hiểu" bold />
          </FooterContainer>
        </View>
      </Modal>
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
  //------------------
  left1: {left: 14},
  //------------------
  fullWidth: {width: '100%'},
  //------------------
  minWidth1: {minWidth: 97},
  w1: {width: 65},
  w2: {width: 112},
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
  listMonthBtn: {
    marginLeft: -3,
    marginRight: -Spacing.PADDING,
    paddingVertical: 20,
    paddingLeft: 5,
  },
});
export default History;
