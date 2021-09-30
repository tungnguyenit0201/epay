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
import Text from '../../Atoms/Text';
import FooterContainer from '../../Atoms/FooterContainer';
import Wrapper from '../../Groups/Wrapper';
import {Colors, Fonts, Images, Spacing, base} from 'themes';

import InputMoney from '../../Groups/InputMoney';
import SelectBank from '../../Groups/SelectBank';

const SelectMoney = () => {
  const translation = require('../../../Context/Language/vi.json');
  const [value, setValue] = useState();
  return (
    <Wrapper>
      <ScrollView style={{backgroundColor: Colors.white, paddingBottom: 20}}>
        <HeaderBg style={{marginBottom: 30}}>
          <Header
            title={translation.top_up}
            back
            style={{marginTop: 24, marginBottom: -15}}
          />
        </HeaderBg>
        <View style={base.container}>
          <View style={base.boxShadow}>
            <Text bold style={{marginBottom: 15}}>
              Nhập số tiền muốn nhận
            </Text>
            <InputMoney handleValue={setValue} />
          </View>
        </View>
      </ScrollView>
      <FooterContainer>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <Image
            source={require('images/storybook/cancel.png').default}
            style={{
              width: 166,
              height: 48,
              cursor: 'pointer',
            }}
          />
          <Image
            source={require('images/gradient/B_confirm.png').default}
            style={{
              width: 166,
              height: 48,
              cursor: 'pointer',
            }}
          />
        </View>
      </FooterContainer>
    </Wrapper>
  );
};

export default SelectMoney;
