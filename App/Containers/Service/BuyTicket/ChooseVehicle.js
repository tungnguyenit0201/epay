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
import { BlockShadowGray } from 'components/Service';
import Title from 'components/Service/Title';

export default () => {
  const translation = useTranslation();

  return (
    //TODO: TRANGSLATE
    <View flex={1} style={base.bgWhite}>
      <HeaderBg>
        <Header back title="Mua vé tháng/ quí" style={styles.pbZero} />
      </HeaderBg>

			<Image
				source={require('images/wave.png')}
				style={styles.bgImg}
				resizeMode="stretch"
			/>

      <ScrollView contentContainerStyle={[base.container,styles.py1]}>
				<Title>Chọn Xe</Title>
        <BlockShadowGray
          callback={() => Navigator.navigate(SCREEN.CHOOSE_STATION)}
          title={'51G-6789'} noArrow
					text={'Xe loại 1: Xe < 12 chỗ'}/>

				<BlockShadowGray
          callback={() => Navigator.navigate(SCREEN.CHOOSE_STATION)}
          title={'51G-5678'} noArrow
					text={'Xe loại 1: Xe < 12 chỗ'}/>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
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
});
