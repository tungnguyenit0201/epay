import React from 'react';
import {
  ScrollView,
  Pressable,
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {
  Button,
  Text,
  Icon,
  Header,
  HeaderBg,
  ActionSheet,
  TextInput,
  Radio,
} from 'components';
import {SCREEN, PERSONAL_IC, GENDER, FUNCTION_TYPE} from 'configs/Constants';
import Navigator from 'navigations/Navigator';
import {Colors, Fonts, Images, Spacing, base} from 'themes';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {scale} from 'utils/Functions';

import {useUser} from 'context/User';
import {usePhone} from 'context/Auth/utils';
import {useTranslation} from 'context/Language';
import {useUserStatus, useUserInfo, useVerifyInfo} from 'context/User/utils';

import Modal from 'components/Common/ModalCustom';
import Bank from 'components/QRPay/Bank';

const Transfer = () => {
  const {phone} = usePhone();
  const {userInfo} = useUser();
  const translation = useTranslation();
  const [showModal, setShowModal] = React.useState(true);

  const PersonalInfo = userInfo.personalInfo;

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
        <Button
          onPress={() => {
            Navigator.navigate(SCREEN.TRANSFER_RESULTS);
          }}
          type={1}
          label="Tiếp tục"
          bold
        />
      </View>

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
