import React, {useCallback, useState} from 'react';
import {
  ScrollView,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {ButtonAdd, Header, HeaderBg, Text} from 'components';
import {useTranslation} from 'context/Language';
import {scale} from 'utils/Functions';
import {SCREEN} from 'configs/Constants';
import {Images, Colors, Spacing, Fonts, base} from 'themes';
import Navigator from 'navigations/Navigator';
import {useError} from 'context/Common/utils';

const ItemType1 = ({title, item, callback, checked}) => (
  <TouchableOpacity
    style={[styles.boxItem1, base.boxShadow,
      checked || {backgroundColor: Colors.g2}]}
    onPress={() => {
      callback?.(item);
    }}
  >
    <View style={[styles.alignCenter,styles.flexRow]}>
      <View style={styles.flex1}>
        <Text bold size={Fonts.LG} mb={4}>
          {title}
          {checked && <Image
            source={Images.TransactionHistory.Success}
            style={[styles.ml1,styles.iconSuccess]}
            resizeMode={'contain'}
          />}
        </Text>

        <Text fs='md' color={Colors.tp3}>{'Hoạt động  |  Xe loại 1: Xe < 12 chỗ'}</Text>
      </View>
      <Image
        source={Images.Right}
        style={styles.iconRight2}
        resizeMode={'contain'}
      />
    </View>
  </TouchableOpacity>
);

const TrafficFee = () => {
  const translation = useTranslation();
  const {setError} = useError();
  const options = [
    {
      img: Images.TrafficFee.Moneys,
      title: 'Phí giao thông',
      screen: SCREEN.TRAFFIC_REGISTER,
    },
    {
      img: Images.TransactionHistory.Warning,
      title: 'Vi phạm giao thông',
      screen: SCREEN.TRAFFIC_REGISTER_RESULT,
    },
    {
      img: Images.TrafficFee.Station,
      title: 'Mua vé xe',
      screen: SCREEN.TRAFFIC_FEE,
    },
    {
      img: Images.TrafficFee.Ticket,
      title: 'Trạm xe',
      screen: SCREEN.TRAFFIC_REGISTER,
    },
  ];

  //function
  const renderOption = ({item}) => {
    return (
      <TouchableOpacity
        // key={item?.TransCode}
        style={styles.boxTransaction}
        onPress={() =>
          // setError({
          //   ErrorMessage: 'Comming soon',
          //   icon: Images.Homes.Setting,
          // })
          Navigator.navigate(item.screen)
        }
      >
        <View style={[styles.flex1, styles.flexRow, styles.alignCenter]}>
          <Image
            source={item.img}
            style={styles.iconOption1}
            //resizeMethod="contain"
          />
          <Text fs="h6" semibold ml={6}>
            {item.title}
          </Text>
        </View>
        <Image
          source={Images.TrafficFee.ArrowRight}
          style={styles.iconRight1}
        />
      </TouchableOpacity>
    );
  };

  return (
    //TODO: TRANGSLATE
    <>
      <HeaderBg>
        <Header back title="Dịch vụ giao thông" style={styles.pbZero} />
      </HeaderBg>

      {/* layout no register fee */}
      <View style={[base.wrap, styles.flex1, styles.pt1]}>
        <Image
          source={require('images/wave.png')}
          style={styles.bgImg}
          resizeMode="stretch"
        />
        <View style={[base.container]}>
          <View style={[styles.boxShadow]}>
            <FlatList
              data={options}
              renderItem={renderOption}
              // keyExtractor={item => item?.TransCode}
              keyExtractor={item => `item-${Math.random(0, 100)}`}
            />
          </View>
        </View>
      </View>

      {/* layout registered Vehicle
      <ScrollView 
        contentContainerStyle={[base.wrap, styles.flex1]}>
        <View style={[base.container,styles.pb1]}>
          <Text size={Fonts.LG} bold mb={16}>Xe đã đăng ký</Text>

          <ItemType1
            // callback={onPress}
            // callback={() => Navigator.navigate(SCREEN.LINKED_BANK_DETAIL)}
            // bankInfo={bankInfo}
            // title={item.BankName}
            // icon={{uri: item.BankLogoUrl}}
            // item={item}
            title={'51G-6789'}
            checked
            // item={item}
          />
          <ItemType1 title={'51G-6789'}/>
        </View>

        <View style={[styles.lineGray1, styles.mb1]}></View>

        <View style={base.container}>
          <Text size={Fonts.LG} bold mb={16}>Thêm đăng ký xe</Text>
          <ButtonAdd label={'Thêm đăng ký xe'}/>
        </View>
      </ScrollView> */}
    </>
  );
};

const styles = StyleSheet.create({
  flex1: {flex: 1},
  flexRow: {flexDirection: 'row'},
  flexWrap: {flexWrap: 'wrap'},
  //------------------
  alignCenter: {alignItems: 'center'},
  //------------------
  mb1: {marginBottom: 32},
  //------------------
  ml1: {marginLeft: 10},
  //------------------
  pbZero: {paddingBottom: 0},
  //------------------
  pt1: {paddingTop: 40},
  //------------------
  pb1: {paddingBottom: 4},
  //------------------
  iconOption1: {
    width: 20,
    height: 20,
  },
  iconRight1: {
    width: 15,
    height: 20,
  },
  iconRight2: {
    width: 20,
    tintColor: Colors.tp3,
    aspectRatio: 1,
  },
  iconSuccess: {
    width: 20,
    height: 20,
    aspectRatio: 1,
  },
  //------------------
  bgImg: {
    width: '100%',
    height: scale(375),
    position: 'absolute',
    bottom: 0,
    right: 0,
  },
  //------------
  boxTransaction: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 17,
    paddingHorizontal: 13,
    borderBottomWidth: 1,
    borderColor: Colors.bs2,
  },
  boxShadow: {
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
  boxItem1: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 14,
  },
  //--------------
  lineGray1: {
    height: 12,
    backgroundColor: Colors.bs2,
  },
});

export default TrafficFee;
