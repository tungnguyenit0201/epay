import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Pressable,
  Image,
} from 'react-native';
import Button from '../../../Atoms/Button';
import Header from '../../../Atoms/Header';
import HeaderBg from '../../../Atoms/HeaderBg';
import {Colors, Fonts, Spacing, Images, base} from 'themes';

const listConnectBank = [
  {
    BankName: 'Vietcombank',
    BinNumbers: '1234567'
  },
  {
    BankName: 'Vietcombank',
    BinNumbers: '1234567'
  },
  {
    BankName: 'Vietcombank',
    BinNumbers: '1234567'
  },
  {
    BankName: 'Vietcombank',
    BinNumbers: '1234567'
  }
]
const BankLinked = () => {
  const translation = require('../../../../Context/Language/vi.json');
  const renderListBank = banks => {
    if (banks && banks.length !== 0) {
      return banks.map((value, index) => (
        <Pressable
          onPress={() => console.log('hello')}
          key={index}
          style={{
            padding: 10,
            borderWidth: 1,
            borderColor: Colors.g6,
          }}>
          <Text bold style={{fontSize: Fonts.H6}}>
            {value?.BankName}
          </Text>
          <Text style={{marginTop: 10}}>{value?.BinNumbers}</Text>
        </Pressable>
      ));
    } else {
      return <Text>Chưa có</Text>;
    }
  };
  return (
    <>
      <ScrollView style={[styles.container]}>
        <HeaderBg>
          <Header back title={translation.connect_bank} />
        </HeaderBg>

        <View style={styles.wrap}>
          <View>
            <Text bold style={{textTransform: 'uppercase', marginBottom: 16}}>
              Ngân hàng liên kết
            </Text>
            {renderListBank(listConnectBank)}
          </View>
          <View>
            <Text bold style={{textTransform: 'uppercase', marginBottom: 16}}>
              Ngân hàng nội địa
            </Text>
            {renderListBank(listConnectBank)}
          </View>
          <View>
            <Text bold style={{textTransform: 'uppercase', marginBottom: 16}}>
              Thẻ thanh toán quốc tế
            </Text>
            {renderListBank(listConnectBank)}
          </View>
        </View>
      </ScrollView>
      <View style={base.bottom}>
        <Button
          label={translation.connect_bank}
          onPress={() => console.log('hello')}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.BACKGROUNDCOLOR,
  },
  wrap: {
    paddingHorizontal: Spacing.PADDING,
  },
});

export default BankLinked;
