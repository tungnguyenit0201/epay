import React, {useState} from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  useWindowDimensions,
  Pressable,
} from 'react-native';
import HeaderBg from '../../Atoms/HeaderBg';
import Header from '../../Atoms/Header';
import Button from '../../Atoms/Button';
import Text from '../../Atoms/Text';
import ModalCustom from '../../Groups/ModalCustom';
import KeyboardSuggestion from '../../Groups/KeyboardSuggestion';

import {Colors, Fonts, Images, Spacing, base} from 'themes';

import Monney from '../../Groups/Money';

import InputMoney from '../../Groups/InputMoney';
import SelectBank from '../../Groups/SelectBank';
import Wrapper from '../../Groups/Wrapper';
import FooterContainer from '../../Atoms/FooterContainer';
import {formatMoney} from '../../Utils/Functions';
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
  {
    id: 1,
    icon: require('images/bank/Vietinbank.png').default,
    BankName: 'Vietinbank',
  },
  {
    id: 2,
    icon: require('images/bank/Eximbank.png').default,
    BankName: 'Eximbank',
  },
  {
    id: 3,
    icon: require('images/bank/Vietcombank.png').default,
    BankName: 'Vietcombank',
  },
];
const TopUp = () => {
  const translation = require('../../../Context/Language/vi.json');
  const [money, setMoney] = useState('');
  const [open, setOpen] = useState(false);
  const [click, setClick] = useState(false);
  const [bankFeeData, setBankFeeData] = useState({
    [TRANS_FORM_TYPE.CONNECTED_BANK]: null,
    [TRANS_FORM_TYPE.NAPAS_CARD]: null,
    [TRANS_FORM_TYPE.INTERNATIONAL_CARD]: null,
  });
  const handlePress = () => {
    if (money * 1 > 7000000) {
      setOpen(true);
    }
  };
  return (
    <Wrapper>
      <HeaderBg>
        <Header
          title={translation.top_up}
          back
          style={{marginTop: 25, marginBottom: -15}}
        />
      </HeaderBg>
      <ScrollView style={{backgroundColor: Colors.white, paddingVertical: 10}}>
        <View style={base.container}>
          <View style={base.boxShadow}>
            <Monney />
            <InputMoney onChange={setMoney} />
          </View>
          <SelectBank
            data={bankData}
            label={translation.source}
            setClick={setClick}
          />
        </View>
        <ModalCustom
          visible={open}
          onClose={() => setShow(false)}
          icon={require('images/storybook/money-send.png').default}>
          <Text
            bold
            style={{fontSize: 18, textAlign: 'center', marginBottom: 10}}>
            Số tiền vượt hạn mức
          </Text>
          <Text centered mb={20} style={{fontSize: 13}}>
            {`Bạn đã nhập số tiền vượt hạn \n mức giao dịch trong ngày, hạn mức \n hiện tại của bạn là `}
            <Text bold>7.000.000</Text> vnđ
          </Text>
          <Pressable onPress={() => setOpen(false)}>
            <Image
              source={require('images/gradient/B_close.png').default}
              style={{height: 48, borderRadius: 8, cursor: 'pointer'}}
            />
          </Pressable>
        </ModalCustom>
      </ScrollView>
      <FooterContainer>
        {click === true && money ? (
          <Pressable onPress={handlePress}>
            <Image
              source={Images.Gradient.B_Continue.default}
              style={base.buttonSB}
            />
          </Pressable>
        ) : (
          <Image
            source={Images.Gradient.B_continueDisable.default}
            style={base.buttonSB}
          />
        )}
      </FooterContainer>
    </Wrapper>
  );
};

export default TopUp;
