import React from 'react';
import {
  StyleSheet,
  FlatList,
  View,
  useWindowDimensions,
  Image,
  TouchableOpacity,
} from 'react-native';
import {Text} from 'components';
import {Colors, Images, Spacing} from 'themes';
import {scale} from 'utils/Functions';
import Navigator from 'navigations/Navigator';

const Content = () => {
  return (
    <View style={styles.container}>
      {[
        {name: 'Thanh toán vi phạm gt', screen: 'TrafficFee'},
        {name: 'Dịch vụ phí gt', screen: 'TrafficViolationPayment'},
      ].map(item => {
        return (
          <TouchableOpacity
            key={item.screen}
            style={[styles.item]}
            onPress={() => Navigator.push(item.screen)}>
            <Image
              source={Images.VNPay}
              style={{width: scale(24), height: scale(24)}}
            />
            <Text>{item.name}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
  item: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: Spacing.PADDING,
    borderBottomColor: Colors.BOTTOMBORDER,
    borderRightColor: Colors.BOTTOMBORDER,
    borderBottomWidth: 1,
    borderRightWidth: 1,
    width: '25%',
  },
});

export default Content;
