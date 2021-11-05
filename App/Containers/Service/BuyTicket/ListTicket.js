import React, {useCallback, useState} from 'react';
import {
  ScrollView,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {Button, Header, HeaderBg, Text, FooterContainer} from 'components';
import {useTranslation} from 'context/Language';
import {scale} from 'utils/Functions';
import {SCREEN} from 'configs/Constants';
import {Images, Colors, Spacing, Fonts, base} from 'themes';
import Navigator from 'navigations/Navigator';
import {useError} from 'context/Common/utils';
import { BlockTicket, BlockTicketBank } from 'components/Service';

const ListTicket = () => {
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
      screen: SCREEN.BUY_TICKET,
    },
    {
      img: Images.TrafficFee.Ticket,
      title: 'Trạm xe',
      screen: SCREEN.TRAFFIC_REGISTER,
    },
    {
      img: Images.TransactionHistory.Car,
      title: 'Phí gửi xe',
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
          <Text fs="h6" semibold ml={9}>
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
    <View flex={1} style={base.bgWhite}>
      <HeaderBg>
        <Header back title={translation?.buy_monthlyquarterly_tickets} 
					style={styles.pbZero} />
      </HeaderBg>

      <ScrollView contentContainerStyle={[base.wrap,base.container]}>
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
							name: 'Thời gian hiệu lực',
							data: '09/09/21 - 09/10/21',
						},
						{
							name: 'Giá vé',
							data: '450.000đ',
						},
						{
							name: 'Nguồn tiền',
							data: 'Vietcombank',
						},
						{
							name: 'Tự động gia hạn',
							switch: true,
						},
					]}/>
				<BlockTicketBank
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
							name: 'Thời gian hiệu lực',
							data: '09/09/21 - 09/10/21',
						},
						{
							name: 'Giá vé',
							data: '450.000đ',
						},
						{
							name: 'Nguồn tiền',
							data: 'Vietcombank',
						},
						{
							name: 'Tự động gia hạn',
							switch: true,
						},
					]}/>
      </ScrollView>

			<FooterContainer>
				<Button
					label={'Mua vé xe'}
					// onPress={() => Navigator.navigate(SCREEN.CONFIRM_BUY_TICKET)}
				/>
			</FooterContainer>
    </View>
  );
};

const styles = StyleSheet.create({
  flex1: {flex: 1},
  flexRow: {flexDirection: 'row'},
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
});

export default ListTicket;
