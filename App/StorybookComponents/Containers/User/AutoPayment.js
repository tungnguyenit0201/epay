import React, {useRef, useState} from 'react';
import {View, ScrollView} from 'react-native';
import Header from '../../Atoms/Header';
import Button from '../../Atoms/Button';
import HeaderBg from '../../Atoms/HeaderBg';
import {Images, Spacing, base} from 'themes';
import Navigator from 'navigations/Navigator';

import Monney from '../../Groups/Money';

import InputMoney from '../../Groups/InputMoney';
import SelectBank from '../../Groups/SelectBank';

import {SCREEN} from 'configs/Constants';

const TopUp = () => {
  const translation = require('../../../Context/Language/vi.json');
  const dataBank = [
    {
      id: 1,
      icon: Images.Bank.Vietinbank.default,
      name: 'Vietinbank',
      screen: 'Hello',
    },
    {
      id: 2,
      icon: Images.Bank.Eximbank.default,
      name: 'Eximbank',
      screen: SCREEN.TOP_UP,
    },
    {
      id: 3,
      icon: Images.Bank.Vietcombank.default,
      name: 'Vietcombank',
      screen: SCREEN.TOP_UP,
    },
  ];

  return (
    <>
      <ScrollView style={base.wrap}>
        <HeaderBg style={{marginBottom: 50}}>
          <Header title="Nạp tiền tự động" back style={{marginBottom: 20}} />
          <Monney
            style={[
              {
                position: 'absolute',
                bottom: -20,
                left: Spacing.PADDING,
                right: Spacing.PADDING,
              },
            ]}
          />
        </HeaderBg>
        <View style={base.container}>
          <InputMoney />
          <SelectBank data={dataBank} label={translation.source} />
        </View>
      </ScrollView>
      <View style={base.bottom}>
        <Button label="Nạp" onPress={() => console.log('Nạp')} />
      </View>
    </>
  );
};

export default TopUp;
