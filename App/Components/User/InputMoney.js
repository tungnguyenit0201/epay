import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {Text, TextInput, Row, Col} from 'components';
import {Colors} from 'themes';
import {useTranslation} from 'context/Language';

const InputMoney = ({style, handleValue}) => {
  const translation = useTranslation();
  let [value, setValue] = useState();
  let [error, setError] = useState(false);
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
  const handlePress = params => {
    setValue(params);
    handleValue(params);
  };
  const handleChange = e => {
    setValue(e);
    handleValue(e);
  };
  // Coppy from Utils/Functions but don't use unit
  const formatMoney = number =>
    new Intl.NumberFormat({style: 'currency', currency: 'VND'}).format(number);

  return (
    <View style={[styles.block, style]}>
      <View style={styles.rowInput}>
        <TextInput
          placeholder="Nhập số tiền nạp"
          style={styles.input}
          placeholderTextColor={Colors.l5}
          value={value}
          onChange={handleChange}
          showErrorLabel={error}
          error={error ? '*Số tiền nạp tối thiểu là 10.000 vnđ' : ''}
        />
        <Text style={styles.subText}>vnđ</Text>
      </View>
      <Row space="10">
        {moneyData.map((item, index) => (
          <Col width="33.33%" space="10" key={index}>
            <Text
              style={styles.item}
              onPress={() => {
                handlePress(item.money);
              }}>
              {formatMoney(item.money)}
            </Text>
          </Col>
        ))}
      </Row>
    </View>
  );
};
const styles = StyleSheet.create({
  block: {
    marginBottom: 15,
  },
  rowInput: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
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
});
export default InputMoney;
