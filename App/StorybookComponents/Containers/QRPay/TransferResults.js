import React from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  Image,
  Pressable,
  useWindowDimensions,
} from 'react-native';
import {Colors, base} from 'themes';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {scale} from '../../Utils/Functions';
import Text from '../../Atoms/Text';
import Header from '../../Atoms/Header';
import Button from '../../Atoms/Button';
import HeaderBg from '../../Atoms/HeaderBg';
import ModalBottom from '../../Groups/ModalBottom';

import Bank from '../../Groups/Bank';
/* import SelectBank from 'components/QRPay/SelectBank'; */

const TransactionResult = () => {
  const [showModal, setShowModal] = React.useState(false);

  const data = [
    {
      label: 'Chuyển đến ',
      value: 'NGUYEN VAN B ',
    },
    {
      label: 'Số điện thoại ',
      value: '0909000999 ',
    },
    {
      label: 'Nội dung ',
      value: 'FROM AN ',
    },
    {
      label: 'Phí giao dịch',
      value: 'Miễn phí',
    },
    {
      label: 'Người chịu phí ',
      value: 'Người gửi ',
    },
    {
      label: 'Thực chuyển ',
      value: '1.000.000 vnd',
    },
    {
      label: 'Tổng số tiền',
      value: <Text bold>1.005.000 vnđ</Text>,
    },
  ];
  return (
    <SafeAreaProvider>
      <HeaderBg>
        <Header title="Xác nhận chuyển tiền" back />
      </HeaderBg>
      <ScrollView style={base.wrap}>
        <View style={base.container}>
          {/* <SelectBank onPress={() => setShowModal(!showModal)} /> */}
          <View style={styles.block}>
            <Image
              source={require('images/bgXacNhan.png').default}
              style={styles.bgImg}
            />
            {data.map((item, index) => {
              return (
                <View key={index}>
                  <View
                    style={[
                      styles.row,
                      index + 1 === data.length && {
                        borderBottomWidth: 0,
                      },
                    ]}>
                    <Text style={styles.textLeft}>{item.label}</Text>

                    <Text style={styles.textRight}>{item.value}</Text>
                  </View>
                </View>
              );
            })}
          </View>
        </View>
        <View style={{height: 50}}></View>
      </ScrollView>
      <View style={[base.boxBottom]}>
        <Button type={1} label="Chuyển tiền" bold />
      </View>

      <ModalBottom visible={showModal} onClose={() => setShowModal(false)}>
        <Bank />
      </ModalBottom>
    </SafeAreaProvider>
  );
};
const styles = StyleSheet.create({
  block: {
    marginBottom: 20,
    position: 'relative',
    minHeight: 128,
  },

  bgImg: {
    width: 128,
    height: 128,
    position: 'absolute',
    top: 20,
    left: '50%',
    transform: [{translateX: scale(-64)}, {translateY: 0}],
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomColor: Colors.l3,
    borderBottomWidth: 1,
    paddingVertical: 15,
  },

  textLeft: {
    color: Colors.cl3,
  },
  textRight: {
    color: Colors.BLACKTEXT,
    maxWidth: scale(160),
  },
});
export default TransactionResult;
