import React, {memo, useState} from 'react';
import {
  ScrollView,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {Header, HeaderBg, Text, Button, DatePicker, Row, Col} from 'components';
import {useTranslation} from 'context/Language';
import {scale} from 'utils/Functions';
import {Images, Colors, Spacing, Fonts} from 'themes';
import {TRANS_DETAIL} from 'configs/Constants';
import Modal from 'react-native-modal';
import FooterContainer from 'components/Auth/FooterContainer';
import Calendar from 'components/Wallet/History/Calendar';
import _ from 'lodash';

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

const GroupFilter = memo(({translation, onSelect, initialData}) => {
  const type = initialData?.serviceID ? 'serviceID' : 'type2';
  const [selectedData, setSelectedData] = useState({
    type,
    list: initialData[type] || [],
  });

  const _onSelect = ({value, type}) => {
    // change type
    if (type !== selectedData.type) {
      setSelectedData({type, list: [value]});
      if (!onSelect) {
        return;
      }
      onSelect({type, value});
      onSelect({type: selectedData.type, value: []});
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
    onSelect && onSelect({type, value: list});
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

            {/* <View style={styles.grayLine1} /> */}
          </View>

          <Calendar
            key={showModal + 'calendar'}
            onSelectRange={([startDate, endDate]) => {
              onSetTempFilter({type: 'startDate', value: startDate});
              onSetTempFilter({type: 'endDate', value: endDate});
            }}
            initialStạrtDate={filterData.startDate}
            initialEndDate={filterData.endDate}
          />

          <View style={[styles.grayLine2, styles.mt1]} />

          <GroupFilter
            translation={translation}
            onSelect={({type, value}) => onSetTempFilter({type, value})}
            initialData={filterData}
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
  textSize1: {fontSize: Fonts.SM},
  textSize4: {fontSize: Fonts.LG},
  textSize5: {fontSize: Fonts.H6},
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
