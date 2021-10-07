import React, {useCallback, useState} from 'react';
import {
  ScrollView,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {Header, HeaderBg, Text} from 'components';
import {useTranslation} from 'context/Language';
import {scale} from 'utils/Functions';
import {SCREEN} from 'configs/Constants';
import {Images, Colors, Spacing, Fonts, base} from 'themes';
import Navigator from 'navigations/Navigator';

const TrafficFee = () => {
  const translation = useTranslation();
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
      screen: SCREEN.TRAFFIC_REGISTER,
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
        style={styles.blockTransaction}
        onPress={() => Navigator.navigate(item.screen)}>
        <View style={[styles.flex1, styles.flexRow, styles.alignCenter]}>
          <Image
            source={item.img}
            style={styles.iconOption1}
            resizeMethod="contain"
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

      <View style={[base.wrap, styles.flex1, styles.pt1]}>
        <Image
          source={require('images/wave.png')}
          style={styles.bgImg}
          resizeMode="stretch"
        />
        <View style={[base.container]}>
          <View style={[styles.blockShadow]}>
            <FlatList
              data={options}
              renderItem={renderOption}
              // keyExtractor={item => item?.TransCode}
              keyExtractor={item => `item-${Math.random(0, 100)}`}
            />
          </View>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  flex1: {flex: 1},
  flexRow: {flexDirection: 'row'},
  //------------------
  alignCenter: {alignItems: 'center'},
  //------------------
  pbZero: {paddingBottom: 0},
  //------------------
  pt1: {paddingTop: 40},
  //------------------
  iconOption1: {
    width: 20,
    height: 20,
  },
  iconRight1: {
    width: 15,
    height: 20,
  },
  bgImg: {
    width: '100%',
    height: scale(375),
    position: 'absolute',
    bottom: 0,
    right: 0,
  },
  //------------
  blockCardTick: {
    width: 40,
    height: 40,
    alignItems: 'center',
    paddingTop: 10,
    backgroundColor: Colors.l2,
    borderRadius: 100,
  },
  blockTransaction: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 17,
    paddingHorizontal: 13,
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
});

export default TrafficFee;
