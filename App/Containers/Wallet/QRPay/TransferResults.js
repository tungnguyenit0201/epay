import React from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  Image,
  Pressable,
  useWindowDimensions,
} from 'react-native';
import {Text, Header, Button, Row, Col, ListItem, HeaderBg} from 'components';
import {Colors, Fonts, Images, Spacing, base} from 'themes';

import Navigator from 'navigations/Navigator';
import {SCREEN} from 'configs/Constants';

import {scale} from 'utils/Functions';

import {useTranslation} from 'context/Language';
import {useTransactionResult} from 'context/Wallet/utils';

import ModalBottom from 'components/Common/ModalBottom';

import Bank from 'components/QRPay/Bank';
import SelectBank from 'components/QRPay/SelectBank';

import {useSafeAreaInsets} from 'react-native-safe-area-context';

const TransactionResult = () => {
  const translation = useTranslation();
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
    <>
      <HeaderBg>
        <Header title="Xác nhận chuyển tiền" back />
      </HeaderBg>
      <ScrollView style={base.wrap}>
        <View style={base.container}>
          <SelectBank onPress={() => setShowModal(!showModal)} />
          <View style={styles.block}>
            <Image
              source={require('images/bgXacNhan.png')}
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
                    ]}
                  >
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
        <Button
          onPress={() => {
            Navigator.navigate(SCREEN.TRANSFER_SUCCESS);
          }}
          type={1}
          label="Chuyển tiền"
          bold
        />
      </View>

      <ModalBottom visible={showModal} onClose={() => setShowModal(false)}>
        <Bank />
      </ModalBottom>
    </>
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
