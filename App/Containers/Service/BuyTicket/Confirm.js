import React, {useCallback, useState} from 'react';
import {
  ScrollView,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import {Button, FooterContainer, 
  Header, HeaderBg, Text, Checkbox,} from 'components';
import {useTranslation} from 'context/Language';
import {scale} from 'utils/Functions';
import {Images, Colors, Spacing, Fonts, base} from 'themes';
import {SCREEN} from 'configs/Constants';
import Navigator from 'navigations/Navigator';
import {useError} from 'context/Common/utils';
import { InfoLineBottom,SwitchLineBottom } from 'components/Service';

const ConfirmBuyTicket = () => {
  const translation = useTranslation();
  const dataTest= [
    {
      name: 'Loại xe',
      data: 'Vé tháng',
    },
    {
      name: 'Xe',
      data: '54G-6789\n Xe loại 1: Xe < 12 chỗ',
    },
    {
      name: 'Trạm',
      data: 'An Sương',
    },
    {
      name: 'Thời gian hiệu lực',
      data: 'Từ 09/09/2021\n Đến 09/10/2021',
    },
    {
      name: 'Gia hạn tự động',
      switch: true,
    },
    {
      name: 'Giá vé',
      data: '450.000đ',
    }];

  return (
    //TODO: TRANGSLATE
    <View flex={1} style={base.bgWhite}>
      <HeaderBg>
        <Header back title="Xác nhận thanh toán" style={styles.pbZero} />
      </HeaderBg>

			<View style={[styles.bgLogo]} alignItems='center' justifyContent='center'>
        <Image
          source={Images.TransactionHistory.LogoBg}
          style={styles.logoBg}
          resizeMode="contain"
        />
      </View>

      <ScrollView contentContainerStyle={[base.container,styles.py1]}>
        {dataTest.map((e, index) => {
          if (index === dataTest.length - 1) {
            return e.switch?
              <SwitchLineBottom key={index} name={e.name} 
                noLine={true} />:
              <InfoLineBottom key={index} name={e.name} data={e.data} 
                noLine={true}/>;
          } else {
            return e.switch?
              <SwitchLineBottom key={index} name={e.name}/>:
              <InfoLineBottom key={index} name={e.name} data={e.data}/>;
          }
				})}
      </ScrollView>

      <View paddingTop={Spacing.PADDING}>
        <View flexDirection='row' style={base.container} 
          marginBottom={16}>
          <Checkbox
            // onPress={setActive}
          />
          <Text ml={10} size={Fonts.MD}>
            {`Tôi đồng ý với các `}
            <Text
              // onPress={() => onGoTerm(SCREEN.POLICY)}
              size={Fonts.MD}
              style={styles.underline}
            >{'thỏa thuận người sử dụng '}</Text>và
            <Text
              // onPress={() => onGoTerm(SCREEN.POLICY)}
              size={Fonts.MD}
              style={styles.underline}
            >{' chính sách quyền riêng tư '}</Text>
            của EPAY
          </Text>
        </View>

        <FooterContainer>
          <Button
            label={translation?.bill_pay}
            onPress={() => Navigator.navigate(SCREEN.HOME)}
          />
        </FooterContainer>
      </View>
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
  //--------------
  underline: {textDecorationLine: 'underline'},
  //---------------
  bgLogo: {
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    height: '100%',
  },
  //---------------
  logoBg: {
    width: 109,
    height: 101,
    // aspectRatio: 1,
  },
});
export default ConfirmBuyTicket;
