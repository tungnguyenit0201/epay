import React, {useCallback, useState} from 'react';
import {
  ScrollView,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {ButtonAdd, Header, HeaderBg, InputBlock, Select, Text} from 'components';
import {useTranslation} from 'context/Language';
import {scale} from 'utils/Functions';
import {SCREEN} from 'configs/Constants';
import {Images, Colors, Spacing, Fonts, base} from 'themes';
import Navigator from 'navigations/Navigator';
import {useError} from 'context/Common/utils';
import { BlockShadowGray, BlockTicket, InfoLineBottom, SwitchLineBottom } from 'components/Service';

const ItemTypeOne = ({title, item, callback, checked}) => (
  <TouchableOpacity
    style={[styles.boxItem1, base.boxShadow,
      checked || {backgroundColor: Colors.g2}]}
    onPress={() => {
      callback?.(item);
    }}
  >
    <View style={[styles.alignCenter,styles.flexRow]}>
      <View flex={1}>
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
        <View flex={1} flexDirection='row' alignItems={'center'}>
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
          resizeMode='contain'
        />
      </TouchableOpacity>
    );
  };

  return (
    //TODO: TRANGSLATE
    <>
      <HeaderBg>
        <Header back title="Mua vé tháng/ quí" style={styles.pbZero} />
      </HeaderBg>

      <ScrollView contentContainerStyle={[base.container,styles.py1]} 
        style={base.bgWhite}>
        <BlockShadowGray
          callback={() => Navigator.navigate(SCREEN.EDIT_AUTO_RECHARGE)}
          title={'Phí giao thông'} noArrow/>

        <View>
          <InputBlock
            rightIcon={Images.Down}
            isSelect
            // required={!wardEmpty}
            // value={info?.Ward}
            // error={error.Ward}
            // onPress={() => !wardEmpty && goRegionSelect('wards')}
            defaultValue={'Tháng 10'}
          />
          <InputBlock
            rightIcon={Images.Down}
            isSelect
            defaultValue={'Tháng 10'}
          />
        </View>

        <InfoLineBottom name={'Gia hạn tự động'} 
          data={'Gia hạn tự động'}/>
        
        <SwitchLineBottom name={'Gia hạn tự động'}/>

        <BlockTicket 
          arrayData={[
            {
              name: 'Xe',
              data: '51G-6789',
            },
            {
              name: 'Loại vé',
              data: 'Vé tháng',
            },
            {
              name: 'Giá vé',
              data: '450.000đ',
            },
            {
              name: 'Nguồn tiền',
              data: 'Ví EPAY',
            },
            {
              name: 'Tự động gia hạn',
              switch: true,
            },
          ]}
          mt={10}/>
      </ScrollView>
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
    width: 20,
    aspectRatio: 1,
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

  //layout buy ticket
  py1: {paddingVertical: Spacing.PADDING},
  //---------------
  iconRight3: {
    width: 20,
    tintColor: Colors.tp3,
    aspectRatio: 1,
  },
  //---------------
  boxShadowGray: {
    backgroundColor: Colors.bs4,
    shadowOpacity: 0.2,
    shadowOffset: {width: 0, height: 0},
    elevation: 24,
    shadowRadius: 8,
    borderRadius: 8,
  },
  //---------------
  boxItem2: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 17,
    paddingHorizontal: 16,
  },
});

export default TrafficFee;
