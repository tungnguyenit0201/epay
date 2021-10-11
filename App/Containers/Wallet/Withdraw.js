import React, {useEffect, useRef} from 'react';
import {View, ScrollView, StyleSheet} from 'react-native';
import {Header, HeaderBg, KeyboardSuggestion} from 'components';
import {base, Colors} from 'themes';
import Monney from 'components/Home/Monney';
import InputMoney from 'components/User/InputMoney';
import SelectBank from 'components/User/TopUp/SelectBank';
import {useTranslation} from 'context/Language';
import {formatMoney} from 'utils/Functions';
import {useTopUp, useWithDraw} from 'context/Wallet/utils';
import {useIsFocused} from '@react-navigation/core';

const Withdraw = () => {
  const translation = useTranslation();
  // const isFocused = useIsFocused();
  const bankRef = useRef(null);
  const {
    inputRef,
    onSuggestMoney,
    bankData,
    bankFeeData,
    isContinueEnabled,
    onSelectBank,
    onChangeCash,
    onContinue,
  } = useWithDraw();

  // useEffect(() => {
  //   inputRef.current.setValue("");
  //   bankRef.current.reset();
  // },[isFocused]);

  return (
    <>
      <HeaderBg>
        <Header title={'Rút tiền'} back />
      </HeaderBg>
      <ScrollView style={base.wrap} showsVerticalScrollIndicator={false}>
        <View style={[base.container, styles.mainContainer]}>
          <View style={base.boxShadow}>
            <Monney title={translation.topup?.walletAmount} showing />
            <InputMoney
              placeholder={'Nhập số tiền rút'}
              errorMessage={'*Số tiền rút tối thiểu là 10.000đ'}
              ref={inputRef}
              onChange={onChangeCash}
              errorStyle={{
                borderColor: Colors.cl4,
              }}
            />
          </View>

          <SelectBank
            ref={bankRef}
            data={bankData}
            feeData={bankFeeData}
            label={translation.source}
            onChange={onSelectBank}
          />
        </View>
      </ScrollView>

      <KeyboardSuggestion
        optionList={[30000, 300000, 3000000].map(x => ({
          value: x,
          label: formatMoney(x),
        }))}
        onPress={onSuggestMoney}
        onContinue={onContinue}
        isContinueEnabled={isContinueEnabled}
      />
    </>
  );
};

export default Withdraw;

const styles = StyleSheet.create({
  mainContainer: {
    marginBottom: 150,
  },
});
