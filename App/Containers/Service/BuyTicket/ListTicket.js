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
import {base} from 'themes';
import {useError} from 'context/Common/utils';
import { BlockTicket, BlockTicketBank } from 'components/Service';

const ListTicket = () => {
  const translation = useTranslation();
  const {setError} = useError();

  return (
    //TODO: TRANGSLATE
    <View flex={1} style={base.bgWhite}>
      <HeaderBg>
        <Header back title={translation?.buy_monthlyquarterly_tickets} 
					style={styles.pbZero}/>
      </HeaderBg>

      <ScrollView contentContainerStyle={[base.py1,base.container]}>
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
				<Button label={'Mua vé xe'}
					// onPress={() => Navigator.navigate(SCREEN.CONFIRM_BUY_TICKET)}
				/>
			</FooterContainer>
    </View>
  );
};

const styles = StyleSheet.create({
  pbZero: {paddingBottom: 0},
});

export default ListTicket;
