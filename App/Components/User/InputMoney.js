import React, {useState, forwardRef, useImperativeHandle} from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {Text, TextInput, Row, Col} from 'components';
import {Colors, Fonts, Spacing} from 'themes';
import {useTranslation} from 'context/Language';
import {formatMoney} from 'utils/Functions';

const InputMoney = forwardRef(({style, onChange}, ref) => {
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
      money: '1000000',
    },
  ];

  const onPress = value => {
    ref.current.setValue(value);
    onChange && onChange(value);
  };

  return (
    <View style={[styles.block, style]}>
      <Input ref={ref} onChange={onChange} />
      <Row space="10">
        {moneyData.map((item, index) => (
          <Col width="33.33%" space="10" key={item.money}>
            <TouchableOpacity onPress={() => onPress(item.money)}>
              <Text style={styles.item}>{formatMoney(item.money)}</Text>
            </TouchableOpacity>
          </Col>
        ))}
      </Row>
    </View>
  );
});

const Input = forwardRef(({onChange}, ref) => {
  const [value, setValue] = useState('');

  useImperativeHandle(ref, () => ({
    value,
    setValue,
  }));

  const _onChange = value => {
    setValue(value);
    onChange && onChange(value);
  };

  return (
    <View>
      <View style={styles.rowInput}>
        <TextInput
          numeric
          placeholder="Nhập số tiền nạp"
          style={styles.input}
          placeholderTextColor={Colors.l5}
          value={value}
          onChange={_onChange}
          // showErrorLabel={error}
          // error={'*Số tiền nạp tối thiểu là 10.000 vnđ'}
        />
        <Text style={styles.subText}>vnđ</Text>
      </View>
      <Text style={styles.warningText}>
        *Số tiền nạp tối thiểu là 10.000 vnđ
      </Text>
    </View>
  );
});

const styles = StyleSheet.create({
  block: {
    marginBottom: 15,
  },
  rowInput: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {width: '100%', paddingRight: 50},
  subText: {marginLeft: 'auto', marginRight: 10, fontWeight: '700'},
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
