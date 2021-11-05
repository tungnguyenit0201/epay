import React, {useCallback, useState} from 'react';
import {
  ScrollView,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import {Header, HeaderBg, 
	FooterContainer, Text, Button,} from 'components';
import {useTranslation} from 'context/Language';
import {scale} from 'utils/Functions';
import {Images, Colors, Spacing, Fonts, base} from 'themes';
import Title from 'components/Service/Title';

import {SCREEN} from 'configs/Constants';
import Navigator from 'navigations/Navigator';
import FilterTerm from './FilterTerm';

const ChooseTerm = () => {
  const translation = useTranslation();

  return (
    //TODO: TRANGSLATE
    <View flex={1} style={base.bgWhite}>
      <HeaderBg>
        <Header back title="Phí giao thông" style={styles.pbZero}/>
      </HeaderBg>

      <ScrollView contentContainerStyle={styles.py1}>
				<View style={base.container}>
					<Title>Lọc theo ngày tháng</Title>
				</View>

				<FilterTerm
					// key={showModal + 'calendar'}
					// onSelectRange={([startDate, endDate]) => {
					// 	onSetTempFilter({type: 'startDate', value: startDate});
					// 	onSetTempFilter({type: 'endDate', value: endDate});
					// }}
					// initialStạrtDate={filterData.startDate}
					// initialEndDate={filterData.endDate}
				/>
      </ScrollView>

			<FooterContainer>
				<Button
					label={translation?.continue}
					// onPress={handleSubmit}
					onPress={() => Navigator.navigate(SCREEN.PRICE_NOTIFICATION)}
				/>
			</FooterContainer>
    </View>
  );
};

const styles = StyleSheet.create({
	pbZero: {paddingBottom: 0},
	//----------------
	py1: {paddingVertical: Spacing.PADDING},
	//---------------
  bgImg: {
    width: '100%',
    height: scale(375),
    position: 'absolute',
    bottom: 0,
    right: 0,
  },
	//---------------
	input: {
		paddingLeft: 40,
		backgroundColor: Colors.bs2
	},
	//---------------
	pos1: {
		position: 'absolute',
		top: -16,
		left: 12,
	},
	//---------------
	iconSearch: {
    width: 18,
		aspectRatio: 1,
		zIndex: 1,
  },
});

export default ChooseTerm;
