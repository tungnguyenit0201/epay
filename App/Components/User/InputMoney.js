import React, {useState, forwardRef, useImperativeHandle} from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {Text, TextInput, Row, Col} from 'components';
import {Colors, Fonts, Spacing} from 'themes';
import {useTranslation} from 'context/Language';
import {formatMoney} from 'utils/Functions';

const InputMoney = forwardRef(({style, onChange, errorStyle}, ref) => {
  const translation = useTranslation();
  const moneyData = [
    {
      id: '1',
      money: '10000',
    },
    {
      id: '2',
      money: '20000',
    },
    {
      id: '3',
      money: '50000',
    },
    {
      id: '4',
      money: '100000',
    },
    {
      id: '5',
      money: '200000',
    },
    {
      id: '6',
      label:`1 ${translation.topup.milion}`,
      money: '1000000',
    },
  ];

  const onPress = value => {
    ref.current.setValue(value);
    onChange && onChange(value);
  };

  return (
    <View style={[style]}>
      <Input ref={ref} onChange={onChange} errorStyle={errorStyle}/>
      <Row space="10">
        {moneyData.map((item, index) => (
          <Col width="33.33%" space="10" key={item.money}>
            <TouchableOpacity onPress={() => onPress(item.money)}>
              <Text bold style={styles.item}>
                {item.label || formatMoney(item.money)}
              </Text>
            </TouchableOpacity>
          </Col>
        ))}
      </Row>
    </View>
  );
});

const Input = forwardRef(({onChange, errorStyle}, ref) => {
  const [value, setValue] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const translation = useTranslation();

  useImperativeHandle(ref, () => ({
    value,
    setValue,
    setError
  }));

  const _onChange = value => {
    setValue(value);
    onChange && onChange(value);
  };

  const setError = (message)=>{
    setErrorMessage(message);
  }

  return (
    <View>
      <View style={styles.rowInput}>
        <TextInput
          numeric
          placeholder={translation.topup.cashInInputMoney}
          style={[styles.input]}
          errorStyle={errorStyle}
          placeholderTextColor={Colors.l5}
          value={value}
          onChange={_onChange}
          showErrorLabel={!!errorMessage}
          error={errorMessage}
        />
        <Text style={styles.subText}>vnđ</Text>
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  rowInput: {
    position: 'relative',
  },
  input: {width: '100%', paddingRight: 50},
  subText: {
    fontWeight: '700',
    position: 'absolute',
    right: 10,
    top: 12,
  },
  item: {
    textAlign: 'center',
    lineHeight: 40,
    backgroundColor: Colors.moneyItem,
    borderRadius: 8,
    height: 40,
    overflow: 'hidden',
    marginBottom: 10,
    color: Colors.cl1,
  },
  warningText: {
    fontSize: Fonts.FONT_SMALL,
    marginBottom: Spacing.PADDING,
  },
});
export default InputMoney;
