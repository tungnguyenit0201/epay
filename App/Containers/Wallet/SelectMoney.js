import React, {useRef, useState} from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  useWindowDimensions,
} from 'react-native';
import {Header, HeaderBg, Button, Text} from 'components';
import {Colors, Fonts, Images, Spacing, base} from 'themes';
import Navigator from 'navigations/Navigator';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import Monney from 'components/Home/Monney';

import InputMoney from 'components/User/InputMoney';
import SelectBank from 'components/User/TopUp/SelectBank';

import {SCREEN} from 'configs/Constants';
import {useTranslation} from 'context/Language';
import FooterContainer from 'components/Auth/FooterContainer';
const SelectMoney = () => {
  const translation = useTranslation();
  const [value, setValue] = useState();
  return (
    <>
      <HeaderBg>
        <Header
          //title={translation.top_up}
          title="Mã của tôi" // TODO: translate
          back
          style={{marginBottom: 20}}
        />
      </HeaderBg>
      <ScrollView style={base.wrap}>
        <View style={base.container}>
          <Text fs="h6" mb={12} bold>
            Nhập số tiền muốn nhận
          </Text>
          <InputMoney handleValue={setValue} />
        </View>
      </ScrollView>

      <FooterContainer>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <Button
            label="Hủy"
            onPress={() => Navigator.goBack()}
            style={{
              width: '45%',
              borderWidth: 1,
              borderColor: Colors.cl1,
              backgroundColor: Colors.white,
            }}
            labelStyle={{color: Colors.BLACK}}
          />
          <Button
            label="Xác nhận"
            onPress={() => Navigator.navigate(SCREEN.MY_QR, {value})}
            disabled={value ? false : true}
            style={{
              width: '45%',
              borderWidth: 1,
            }}
          />
        </View>
      </FooterContainer>
    </>
  );
};

export default SelectMoney;
