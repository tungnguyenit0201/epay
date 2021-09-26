import React, {useState} from 'react';
import {View, StyleSheet, TextInput, TouchableOpacity} from 'react-native';
import Fonts from 'themes/Fonts';
import {Colors, Images} from 'themes';
import {Icon, Text} from 'components';
import {useTranslation} from 'context/Language';
import {scale} from 'utils/Functions';

const formatNumberToMoney = (number, currency = '') => {
  if (!number || isNaN(number) || Number(number) === 0) {
    return `0${currency}`;
  }

  const array = [];
  let result = '';
  let isNegative = false;

  if (number < 0) {
    isNegative = true;
  }

  const numberString = Math.abs(number).toString();
  if (numberString.length < 3) {
    return numberString + currency;
  }

  let count = 0;
  for (let i = numberString.length - 1; i >= 0; i -= 1) {
    count += 1;
    if (numberString[i] === '.' || numberString[i] === ',') {
      array.push(',');
      count = 0;
    } else {
      array.push(numberString[i]);
    }
    if (count === 3 && i >= 1) {
      array.push('.');
      count = 0;
    }
  }

  for (let i = array.length - 1; i >= 0; i -= 1) {
    result += array[i];
  }

  if (isNegative) {
    result = `-${result}`;
  }

  return result + currency;
};

const formatMoneyToNumber = (money, currencyUnit) => {
  if (money && money.length > 0) {
    const moneyString = money
      .replace(currencyUnit, '')
      .replace(/,/g, '')
      .replace(/đ/g, '')
      .replace(/\./g, '')
      .replace(/ /g, '');
    const number = Number(moneyString);
    if (isNaN(number)) {
      return 0;
    }
    return number;
  }

  return money;
};
const TransferMoneyTextInput = ({maxAmount = 1000000000}) => {
  const translation = useTranslation();
  const [value, setValue] = useState('');
  const [focus, setFocus] = useState(false);
  const onChangeText = str => {
    const number = formatMoneyToNumber(str);
    if (number <= maxAmount) {
      setValue(formatMoneyToNumber(str));
    }
  };

  const onFocus = () => {
    setFocus(true);
  };

  const onBlur = () => {
    setFocus(false);
  };

  const clearMoney = () => {
    setValue('');
  };

  return (
    <View style={[styles.container]}>
      <TextInput
        keyboardType={'numeric'}
        value={formatNumberToMoney(value)}
        onChangeText={onChangeText}
        style={[styles.textInput, focus && styles.focusState]}
        onFocus={onFocus}
        onBlur={onBlur}
        onEndEditing={onBlur}
      />
      <View style={[styles.currencyView]}>
        <Text semibold style={styles.currency}>
          {translation.currency}
        </Text>
      </View>

      {value ? (
        <View style={[styles.currencyView]}>
          <TouchableOpacity style={[styles.deleteIcon]} onPress={clearMoney}>
            <Icon
              icon={Images.Transfer.CloseFillCircle}
              style={styles.deleteIcon}
            />
          </TouchableOpacity>
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'stretch',
    justifyContent: 'center',
  },
  textInput: {
    flexShrink: 1,
    fontSize: Fonts.H1,
    backgroundColor: Colors.white,
    fontFamily: Fonts.FONT_500,
  },
  currency: {
    marginLeft: scale(4),
    color: Colors.textCurrency,
  },
  focusState: {
    borderBottomWidth: 1.5,
    borderColor: Colors.focusBorderTextMoneyInput,
  },
  deleteIcon: {
    width: scale(20),
    height: scale(20),
    marginLeft: scale(5),
  },
  currencyView: {
    justifyContent: 'center',
  },
});

export default TransferMoneyTextInput;
