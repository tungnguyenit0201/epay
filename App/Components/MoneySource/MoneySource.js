import React, {useState, useEffect} from 'react';
import {Text} from 'components';
import {FlatList, View, StyleSheet, Pressable, Image} from 'react-native';
import {Colors, Fonts, Images, Spacing} from 'themes';
import {useTranslation} from 'context/Language';
import {scale} from 'utils/Functions';
import MoneySourceItem from './MoneySourceItem';

const ItemSeparatorComponent = () => (
  <View style={styles.moneySourceSeparator} />
);

const MoneySource = ({listSource = [], onSelectMoneySource = () => {}}) => {
  const translation = useTranslation();
  const [moneySourceIndex, setMoneySourceIndex] = useState(0);

  const onChangeMoneySource = index => {
    setMoneySourceIndex(index);
    onSelectMoneySource(listSource?.[index]);
  };

  return (
    <View style={styles.wrap}>
      <Text bold style={styles.textH6}>
        {translation.source}
      </Text>
      <FlatList
        scrollEnabled={false}
        style={styles.moneySourceList}
        data={listSource}
        ItemSeparatorComponent={ItemSeparatorComponent}
        ListHeaderComponent={ItemSeparatorComponent}
        ListFooterComponent={ItemSeparatorComponent}
        renderItem={({item, index}) => {
          return (
            <MoneySourceItem
              item={item}
              icon={Images.Transfer.MyWallet}
              isSelected={index === moneySourceIndex}
              onSelectItem={() => onChangeMoneySource(index)}
            />
          );
        }}
      />
      <Text bold fs="h6" mb={20} mt={10}>
        Thêm ngân hàng
      </Text>

      <Pressable
        //onPress={() => onPress(item)}
        style={styles.addBank}>
        <Text fs="h6">Thêm tài khoản ngân hàng</Text>
        <Image
          style={[styles.iconAddBank]}
          source={require('images/qrpay/plus.png')}
        />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
  },
  textH6: {
    fontSize: Fonts.H6,
  },
  moneySourceSeparator: {
    height: scale(10),
  },
  moneySourceList: {
    overflow: 'visible',
  },
  addBank: {
    borderWidth: 1,
    borderColor: Colors.l3,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
  },
  iconAddBank: {
    width: scale(24),
    height: scale(24),
    marginLeft: 'auto',
  },
});

export default MoneySource;
