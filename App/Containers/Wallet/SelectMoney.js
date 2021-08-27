import React, {useRef, useState} from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  useWindowDimensions,
} from 'react-native';
import {Header, HeaderBg, Button} from 'components';
import {Colors, Fonts, Images, Spacing, base} from 'themes';
import Navigator from 'navigations/Navigator';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import Monney from 'components/Home/Monney';

import InputMoney from 'components/User/InputMoney';
import SelectBank from 'components/User/TopUp/SelectBank';

import {SCREEN} from 'configs/Constants';
import {useTranslation} from 'context/Language';

const SelectMoney = () => {
  const translation = useTranslation();
  const [value, setValue] = useState();
  return (
    <>
      <ScrollView style={base.wrap}>
        <HeaderBg style={{marginBottom: 50}}>
          <Header title={translation.top_up} back style={{marginBottom: 20}} />
        </HeaderBg>
        <View style={base.container}>
          <InputMoney handleValue={setValue} />
          <View
            style={{
              flex: 1,
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
                backgroundColor: 'transparent',
              }}
              labelStyle={{color: Colors.BLACK}}
            />
            <Button
              label="Xác nhận"
              onPress={() => Navigator.navigate(SCREEN.QRPAY, {value})}
              disabled={value ? false : true}
              style={{
                width: '45%',
                borderWidth: 1,
              }}
            />
          </View>
        </View>
      </ScrollView>
    </>
  );
};

export default SelectMoney;
