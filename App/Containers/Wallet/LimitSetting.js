import React, {useState, useContext} from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  TouchableOpacity,
  FlatList,
} from 'react-native';

import {Text, Button, Icon, Header} from 'components';
import {SCREEN, TEXT} from 'configs/Constants';
import Navigator from 'navigations/Navigator';
import {Colors, Fonts, Images, Spacing, base} from 'themes';
import HeaderBg from 'components/Common/HeaderBg';
import {useTranslation} from 'context/Language';

import {Switch} from 'react-native-ui-lib'; //eslint-disable-line
import {formatMoney} from 'utils/Functions';
const LimitSetting = ({route}) => {
  console.log('this is route', route.params.AmountLimit);
  const amountLimit = route.params.AmountLimit;
  const translation = useTranslation();
  const listLimit = [
    1000000, 2000000, 3000000, 5000000, 10000000, 15000000, 20000000, 30000000,
    50000000,
  ];
  const [check, setCheck] = useState('');
  const handleClick = item => {
    setCheck(item);
  };
  const renderListLimit = ({item}) => {
    if (item <= amountLimit) {
      return (
        <TouchableOpacity onPress={() => handleClick(item)}>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderBottomWidth: 1,
              borderColor: Colors.g2,
            }}>
            <Text
              style={{
                color: 'black',
                fontWeight: 'bold',
                fontSize: Fonts.H6,
                paddingVertical: 15,
              }}>
              {formatMoney(item)}
            </Text>

            {check === item ? (
              <Icon
                style={{height: 20, width: 20}}
                icon={Images.WidthDraw.Done}
                tintColor={Colors.black}
              />
            ) : (
              <View></View>
            )}
          </View>
        </TouchableOpacity>
      );
    } else {
      return (
        <TouchableOpacity onPress={() => handleClick(item)}>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderBottomWidth: 1,
              borderColor: Colors.g2,
            }}>
            <Text
              style={{
                color: 'red',
                fontWeight: 'bold',
                fontSize: Fonts.H6,
                paddingVertical: 15,
              }}>
              {formatMoney(item)}
            </Text>
            {check === item ? (
              <Icon
                style={{height: 20, width: 20}}
                icon={Images.WidthDraw.Done}
                tintColor={Colors.black}
              />
            ) : (
              <View></View>
            )}
          </View>
        </TouchableOpacity>
      );
    }
  };
  return (
    <View style={styles.container}>
      <HeaderBg>
        <Header back title={translation.payment_setting} back />
      </HeaderBg>
      <View style={styles.wrap}>
        <Text>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, Lorem ipsum
          dolor sit amet
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
        <Button label="Tiếp tục" style={{marginVertical: 25}} />
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
});
export default LimitSetting;
