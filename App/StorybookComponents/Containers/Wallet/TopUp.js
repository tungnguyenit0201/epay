import React, { useState } from 'react';
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
import KeyboardSuggestion from '../../Groups/KeyboardSuggestion';

import { Colors, Fonts, Images, Spacing, base } from 'themes';

import Monney from '../../Groups/Money';

import InputMoney from '../../Groups/InputMoney';
import SelectBank from '../../Groups/SelectBank';

import { formatMoney } from 'utils/Functions';
const TRANS_FORM_TYPE = {
  CONNECTED_BANK: 1,
  NAPAS_CARD: 2,
  INTERNATIONAL_CARD: 3,
  WALLET: 4,
};

/* const bankData = {
  [TRANS_FORM_TYPE.CONNECTED_BANK]: [],
  [TRANS_FORM_TYPE.NAPAS_CARD]: [],
  [TRANS_FORM_TYPE.INTERNATIONAL_CARD]: [],
}; */

const bankData = [
  { id: 1, icon: Images.Bank.Vietinbank.default, BankName: 'Vietinbank' },
  { id: 2, icon: Images.Bank.Eximbank.default, BankName: 'Eximbank' },
  { id: 3, icon: Images.Bank.Vietcombank.default, BankName: 'Vietcombank' },
];
const TopUp = () => {
  const translation = require('../../../Context/Language/vi.json');


  const [bankFeeData, setBankFeeData] = useState({
    [TRANS_FORM_TYPE.CONNECTED_BANK]: null,
    [TRANS_FORM_TYPE.NAPAS_CARD]: null,
    [TRANS_FORM_TYPE.INTERNATIONAL_CARD]: null,
  });

  return (
    <>
      <ScrollView style={base.wrap}>
        <HeaderBg style={{ marginBottom: 50 }}>
          <Header title={translation.top_up} back style={{ marginBottom: 20 }} />
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
          <InputMoney onChange={console.log('hello')} />
          <SelectBank
            data={bankData}
            feeData={bankFeeData}
            label={translation.source}
            onChange={console.log('hello')}
          />
        </View>
      </ScrollView>
      <View style={base.bottom}>
        <Button
          label="Tiếp tục"
          onPress={console.log('hello')}
          disabled={!true}
        />
      </View>
      <KeyboardSuggestion
        optionList={[100000, 500000, 1000000].map(x => ({
          value: x,
          label: formatMoney(x),
        }))}
        onPress={console.log('hello')}
      />
    </>
  );
};

export default TopUp;
