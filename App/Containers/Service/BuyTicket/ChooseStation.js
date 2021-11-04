import React, {useCallback, useState} from 'react';
import {
  ScrollView,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import {ButtonAdd, Header, HeaderBg, TextInput, Select, Text} from 'components';
import {useTranslation} from 'context/Language';
import {scale} from 'utils/Functions';
import {SCREEN} from 'configs/Constants';
import {Images, Colors, Spacing, Fonts, base} from 'themes';
import Navigator from 'navigations/Navigator';
import {useError} from 'context/Common/utils';
import { BlockShadowGray } from 'components/Service';
import Title from 'components/Service/Title';

const dataTest=['Lán Hòa Lạc','Quốc lộ 5', 'An Sương'];

const ChooseStation = () => {
  const translation = useTranslation();

  return (
    //TODO: TRANGSLATE
    <View flex={1} style={base.bgWhite}>
      <HeaderBg>
        <Header back title="Phí giao thông" style={styles.pbZero} />
      </HeaderBg>

			<Image
				source={require('images/wave.png')}
				style={styles.bgImg}
				resizeMode="stretch"
			/>

      <ScrollView contentContainerStyle={[base.container,styles.py1]}>
				<View style={styles.mb1}>
					<Image source={Images.TrafficFee.Search} 
						style={[styles.iconSearch,styles.pos1]} resizeMode="contain"/>
					<TextInput
						// onBlur={onBlur}
						// onFocus={onFocus}
						placeholder={'Tìm trạm, tỉnh, thành phố'}
						style={styles.input}
						// onChange={onChange}

						// leftIcon was note as same as design, if use, undo code
						// leftIcon={Images.TrafficFee.Search}
					/>
				</View>

				<Text fs='h4' bold mb={10}>Chọn trạm</Text>
				<View style={styles.mb2}>
					<Title>An Giang</Title>
					{dataTest.map((e, index)=>(
						<BlockShadowGray key={index}
							callback={() => Navigator.navigate(SCREEN.CHOOSE_TERM)}
							title={e} noArrow/>
					))}
				</View>

				<View style={styles.mb2}>
					<Title>Bà Rịa Vũng Tàu</Title>
					{dataTest.map((e, index)=>(
						<BlockShadowGray
							key={index}
							callback={() => Navigator.navigate(SCREEN.CHOOSE_TERM)}
							title={e} noArrow/>
					))}
				</View>

				<View style={styles.mb2}>
					<Title>Bà Rịa Vũng Tàu</Title>
					{dataTest.map((e, index)=>(
						<BlockShadowGray key={index}
							// callback={() => Navigator.navigate(SCREEN.TICKET_RESULT)}
							title={e} noArrow/>
					))}
				</View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
	mb1: {marginBottom: 10},
	mb2: {marginBottom: 20},
	//----------------
  pbZero: {paddingBottom: 0},
	//----------------
	py1: {
		paddingTop: Spacing.PADDING+10,
		paddingBottom: Spacing.PADDING,
	},
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

export default ChooseStation;
