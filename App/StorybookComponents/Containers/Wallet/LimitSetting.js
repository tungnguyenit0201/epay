import React, { useState, useContext } from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  TouchableOpacity,
  FlatList,
  Switch,
} from 'react-native';

import Text from '../../Atoms/Text';
import Icon from '../../Atoms/Icon';
import HeaderBg from '../../Atoms/HeaderBg';
import Header from '../../Atoms/Header';
import Button from '../../Atoms/Button';

import { Colors, Fonts, Images, Spacing, base } from 'themes';

import { formatMoney } from 'utils/Functions';
const LimitSetting = ({ route }) => {
  const amountLimit = 3000000;
  const translation = require('../../../Context/Language/vi.json');
  const listLimit = [
    {
      id: 1,
      limit: 1000000,
    },
    {
      id: 2,
      limit: 2000000,
    },
    {
      id: 3,
      limit: 3000000,
    },
    {
      id: 4,
      limit: 5000000,
    },
    {
      id: 5,
      limit: 10000000,
    },
    {
      id: 6,
      limit: 15000000,
    },
    {
      id: 7,
      limit: 20000000,
    },
    {
      id: 8,
      limit: 30000000,
    },
    {
      id: 9,
      limit: 50000000,
    },
  ];
  const [limit, setLimit] = useState('');
  const renderListLimit = ({ item }) => (
    <TouchableOpacity
      disabled={item.limit <= amountLimit ? false : true}
      onPress={() => setLimit(item.limit)}>
      <View style={styles.containerItem}>
        <Text style={[item.limit <= amountLimit ? styles.item : styles.disabled]}>
          {formatMoney(item.limit)}
        </Text>
        {limit === item.limit ? (
          <Icon
            style={{ height: 20, width: 20 }}
            icon={Images.WidthDraw.Done}
            tintColor={Colors.black}
          />
        ) : (
          <View></View>
        )}
      </View>
    </TouchableOpacity>
  );
  return (
    <View style={styles.container}>
      <HeaderBg>
        <Header back title={translation.payment_setting} />
      </HeaderBg>
      <View style={styles.wrap}>
        <Text>
          {`Bạn đang là tài khoản cá nhân, hạn mức thanh toán trong ngày tối đa là ${formatMoney(
            amountLimit,
          )}`}
        </Text>

        {/* Icon Rectangle */}
        <Icon
          style={styles.iconRectangle}
          icon={Images.Transfer.Rectangle}
          tintColor={Colors.g2}
        />
        {/* Icon Rectangle */}

        <Text
          style={{
            paddingBottom: 10,
            fontSize: Fonts.H6,
            textTransform: 'uppercase',
          }}>
          Hạn mức trong ngày
        </Text>
        <FlatList
          data={listLimit}
          renderItem={renderListLimit}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
        />
        <Button
          label="Tiếp tục"
          style={{ marginVertical: 25 }}
          onPress={() => console.log('hello')}
        />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.BACKGROUNDCOLOR,
  },
  wrap: {
    paddingHorizontal: Spacing.PADDING,
    paddingTop: Spacing.PADDING,
    flex: 1,
  },
  iconRectangle: {
    height: 5,
    width: '100%',
    marginVertical: 17,
  },
  containerItem: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: Colors.g2,
  },
  item: {
    fontWeight: 'bold',
    fontSize: Fonts.H6,
    paddingVertical: 15,
  },
  disabled: {
    fontWeight: 'bold',
    fontSize: Fonts.H6,
    paddingVertical: 15,
    color: Colors.g4,
  },
});
export default LimitSetting;
