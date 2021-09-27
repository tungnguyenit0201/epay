import React, { useEffect } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
} from 'react-native';
import {Header, HeaderBg, KeyboardSuggestion} from 'components';
import {base} from 'themes';
import Monney from 'components/Home/Monney';
import InputMoney from 'components/User/InputMoney';
import SelectBank from 'components/User/TopUp/SelectBank';
import {useTranslation} from 'context/Language';
import {formatMoney} from 'utils/Functions';
import {useTopUp} from 'context/Wallet/utils';

const TopUp = () => {
  const translation = useTranslation();
  const {
    inputRef,
    onSuggestMoney,
    bankData,
    bankFeeData,
    isContinueEnabled,
    onSelectBank,
    onChangeCash,
    onContinue,
  } = useTopUp();

  return (
    <>
      <HeaderBg>
        <Header title={translation.top_up} back />
      </HeaderBg>
      <ScrollView style={base.wrap} showsVerticalScrollIndicator={false}>
        <View style={[base.container,styles.mainContainer]}>
          <View style={base.boxShadow}>
            <Monney title={translation.topup.walletAmount}/>
            <InputMoney ref={inputRef} onChange={onChangeCash} errorStyle={{
              borderWidth: 0
            }}/>
          </View>

          <SelectBank
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

export default TopUp;

const styles = StyleSheet.create({
  mainContainer: {
    marginBottom: 150
  },
});
