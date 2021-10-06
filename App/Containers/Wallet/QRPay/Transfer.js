import React, {useState} from 'react';
import {
  ScrollView,
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {
  Button,
  Text,
  Header,
  HeaderBg,
  TextInput,
  Radio,
  KeyboardSuggestion,
} from 'components';
import {SCREEN, PERSONAL_IC, GENDER, FUNCTION_TYPE} from 'configs/Constants';
import Navigator from 'navigations/Navigator';
import {Colors, Fonts, Images, Spacing, base} from 'themes';
import {scale, formatMoney} from 'utils/Functions';

import {useUser} from 'context/User';
import {usePhone} from 'context/Auth/utils';
import {useTranslation} from 'context/Language';

import Modal from 'components/Common/ModalCustom';
import Bank from 'components/QRPay/Bank';
import {useQRTransfer} from 'context/Wallet/utils';
const Transfer = ({route}) => {
  console.log('route :>> ', route);
  const {bankFee, sourceMoney, transfer, onChange} = useQRTransfer(
    route?.params,
  );

  const {phone} = usePhone();
  const {userInfo} = useUser();
  const translation = useTranslation();
  const [showModal, setShowModal] = useState(false);

  const PersonalInfo = userInfo.personalInfo;

  return (
    // TODO: translate

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
                source={
                  PersonalInfo?.Avatar
                    ? {uri: PersonalInfo.Avatar}
                    : Images.DefaultUser
                }
                resizeMode="cover"
              />
            </View>

            <Text fs="h5" bold mb={5}>
              {PersonalInfo?.FullName}
            </Text>
            <Text mb={10}>{phone}</Text>
          </View>

          <TextInput
            placeholder="Nhập tiền"
            maxLength={100}
            selectTextOnFocus
            numeric
            onChange={text => onChange('amount', text)}
          />

          <TextInput
            placeholder="Nhập lời nhắn"
            maxLength={100}
            selectTextOnFocus
            onChange={text => onChange('content', text)}
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
          <Bank bankFee={bankFee} sourceMoney={sourceMoney} />
        </View>
        <View style={{height: 50}}></View>
      </ScrollView>
      {/* <View style={base.bgWhite}>
        <View style={styles.boxBottom}>
          <Button
            onPress={() => {
              Navigator.navigate(SCREEN.QR_PROMOTION);
            }}
            type={1}
            label="Tiếp tục"
            bold
          />
        </View>
      </View> */}

      <KeyboardSuggestion
        optionList={[30000, 300000, 3000000].map(x => ({
          value: x,
          label: formatMoney(x),
        }))}
        onPress={() => true}
        onContinue={() => true}
        isContinueEnabled={true}
      />
      {showModal && (
        <Modal
          visible={showModal}
          onClose={() => setShowModal(false)}
          icon={require('images/qrpay/MoneySend.png')}>
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
      )}
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
