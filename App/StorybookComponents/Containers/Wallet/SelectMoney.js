import React, {useRef, useState} from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  useWindowDimensions,
} from 'react-native';
import HeaderBg from '../../Atoms/HeaderBg';
import Header from '../../Atoms/Header';
import Button from '../../Atoms/Button';

import {Colors, Fonts, Images, Spacing, base} from 'themes';

import InputMoney from '../../Groups/InputMoney';
import SelectBank from '../../Groups/SelectBank';

const SelectMoney = () => {
  const translation = require('../../../Context/Language/vi.json');
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
              onPress={() => console.log('hello')}
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
              onPress={() => console.log('press')}
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
