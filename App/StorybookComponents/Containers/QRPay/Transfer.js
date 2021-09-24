import React from 'react';
import {
  ScrollView,
  Pressable,
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {Colors, Fonts, Images, Spacing, base} from 'themes';
import {scale} from '../../Utils/Functions';
import Bank from '../../Groups/Bank';
import Modal from '../../Groups/ModalCustom';
import Button from '../../Atoms/Button';
import Text from '../../Atoms/Text';
import Header from '../../Atoms/Header';
import HeaderBg from '../../Atoms/HeaderBg';
import TextInput from '../../Atoms/TextInput';
import Radio from '../../Atoms/Radio';
const Transfer = () => {
  const [showModal, setShowModal] = React.useState(true);
  return (
    <>
      <HeaderBg mb={0}>
        <Header back title="Chuyển tiền số điện thoại" />
      </HeaderBg>
      <ScrollView style={base.wrap}>
        <View style={[styles.block]}>
          <View style={{alignItems: 'center', marginBottom: 20}}>
            <View style={styles.avatar}>
              <Image
                style={{width: 94, height: 94}}
                source={Images.Kyc.Test.default}
                resizeMode="cover"
              />
            </View>

            <Text fs="h5" bold mb={5}>
              Phước Lộc
            </Text>
            <Text mb={10}>0907999999</Text>
          </View>

          <TextInput
            placeholder="Nhập tiền"
            maxLength={100}
            selectTextOnFocus
          />

          <TextInput
            placeholder="Nhập lời nhắn"
            maxLength={100}
            selectTextOnFocus
          />
          <Radio
            //onChange={onAcceptTermConditions}
            selectedValue={1}
            items={[
              {label: 'Người gửi chịu phí', value: 1},
              {label: 'Người nhận chịu phí ', value: 2},
            ]}
          />
        </View>
        <View style={[base.container, {paddingTop: 20}]}>
          <Bank myPay={0} />
        </View>
        <View style={{height: 50}}></View>
      </ScrollView>
      <View style={styles.boxBottom}>
        <Button type={1} label="Tiếp tục" bold />
      </View>

      <Modal
        visible={showModal}
        onClose={() => setShowModal(false)}
        icon={require('images/qrpay/MoneySend.png').default}>
        <Text centered mb={20}>
          Tiêu đề thông báo Bạn đã nhập số tiền chuyển vượt hạn mức giao dịch
          trong ngày, hạn mức hiện tại của bạn là X0.000.000 vnđ
        </Text>
        <Button
          type={1}
          mb={10}
          label="Đóng"
          onPress={() => setShowModal(false)}
        />
      </Modal>
    </>
  );
};
const styles = StyleSheet.create({
  block: {
    paddingHorizontal: Spacing.PADDING,
    borderBottomColor: Colors.l2,
    borderBottomWidth: 10,
  },
  avatar: {
    overflow: 'hidden',
    height: 94,
    width: 94,
    borderRadius: 99,
    marginBottom: 15,
    backgroundColor: Colors.g4,
  },

  boxBottom: {
    padding: scale(20),
    paddingBottom: scale(40),
    backgroundColor: Colors.white,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    shadowColor: Colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
export default Transfer;
