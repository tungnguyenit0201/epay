import React from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  useWindowDimensions,
} from 'react-native';
import {Header, HeaderBg, Button, KeyboardSuggestion} from 'components';
import {Colors, Fonts, Images, Spacing, base} from 'themes';
import Navigator from 'navigations/Navigator';

import Monney from 'components/Home/Monney';

import InputMoney from 'components/User/InputMoney';
import SelectBank from 'components/User/TopUp/SelectBank';

import {SCREEN} from 'configs/Constants';
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
      <ScrollView style={base.wrap}>
        <HeaderBg style={{marginBottom: 50}}>
          <Header title={translation.top_up} back style={{marginBottom: 20}} />
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
          <InputMoney ref={inputRef} onChange={onChangeCash} />
          <SelectBank
            data={bankData}
            feeData={bankFeeData}
            label={translation.source}
            onChange={onSelectBank}
          />
        </View>
      </ScrollView>
      <View style={base.bottom}>
        <Button
          label="Tiếp tục"
          onPress={onContinue}
          disabled={!isContinueEnabled}
        />
      </View>
      <KeyboardSuggestion
        optionList={[100000, 500000, 1000000].map(x => ({
          value: x,
          label: formatMoney(x),
        }))}
        onPress={onSuggestMoney}
      />
    </>
  );
};

export default TopUp;
