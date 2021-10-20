import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import {useContacts} from 'context/Wallet/utils';
import {HeaderBg, Text, TextInput, Icon, Button, Row, Col} from 'components';
import {TEXT} from 'configs/Constants';
import {Colors, Fonts, Spacing, Images} from 'themes';
import {scale} from 'utils/Functions';
import {SCREEN} from 'configs/Constants';
import Modal from 'react-native-modal';
import Navigator from 'navigations/Navigator';
import {useTranslation} from 'context/Language';
const TransactionDetails = () => {
  const translation = useTranslation();
  const listBanks = [
    {
      id: 1,
      bank: 'Viettinbank',
      image: Images.Transfer.VIETTINBANK,
    },
    {
      id: 2,
      bank: 'Vietcombank',
      image: Images.Transfer.VIETCOMBANK,
    },
    {
      id: 3,
      bank: 'Eximbank',
      image: Images.Transfer.EXIMBANK,
    },
  ];
  return (
    <ScrollView style={styles.container}>
      <HeaderBg>
        <Text bold style={styles.headerTitle}>
          {translation.transfer_to_phone_number}
        </Text>
        <View>
          <Text bold style={styles.textHeader}>
            {translation.transfer_to}:
          </Text>
          <View style={styles.blockUser}>
            <Image source={Images.Transfer.User_1} style={styles.avatar} />
            <View style={styles.ml_20}>
              <Text bold style={styles.nameUser}>
                Nguyen Van An
              </Text>
              <Text style={styles.textBlack}>0989000000</Text>
            </View>
          </View>
        </View>
      </HeaderBg>
      <View style={styles.flexBox}>
        <View style={styles.wrap}>
          {/* Input with Text */}
          <View>
            <TextInput
              placeholder={translation.enter_topup_amount}
              style={styles.inputCurrent}
              placeholderTextColor={Colors.tp2}
            />
            <Text bold style={styles.textCurrent}>
              đ
            </Text>
          </View>
          {/* Input with Text */}
          <TextInput
            placeholder={translation.enter_message}
            style={styles.inputBlock}
            placeholderTextColor={Colors.tp2}
          />
          {/* Icon Rectangle */}
          <Icon
            style={styles.iconRectangle}
            icon={Images.Transfer.Rectangle}
            tintColor={Colors.g2}
          />
          {/* Icon Rectangle */}
          <Text bold style={styles.textH6}>
            {translation.transfer_by_epay}
          </Text>

          <View style={{marginBottom: scale(20)}}>
            <View style={styles.emptyWallet}>
              <Image
                style={styles.iconWallet}
                source={Images.Transfer.EmptyWallet}
              />
              <Image
                style={styles.iconCheck}
                source={Images.Transfer.ArrowCircleDown}
              />
            </View>
            <Text style={styles.myWallet}>Ví của tôi</Text>
          </View>
          <Text bold style={styles.sendBank}>
            Chuyển tiền bằng TK Ngân hàng
          </Text>
          <Row justify="space-between">
            {listBanks.map(value => (
              <Col key={value.id} width="30%" style={styles.mb_15}>
                <TouchableOpacity style={styles.flexCenter}>
                  <View style={styles.bankBlock}>
                    <Image style={styles.bankImage} source={value.image} />
                  </View>
                  <Text>{value.bank}</Text>
                </TouchableOpacity>
              </Col>
            ))}
            <Col width="30%" style={styles.mb_15}>
              <TouchableOpacity style={styles.addBank}>
                <Icon icon={Images.Transfer.UNION} tintColor={Colors.brd1} />
                <Text style={styles.fontSmall}>Thêm liên kết NH</Text>
              </TouchableOpacity>
            </Col>
          </Row>

          <Button
            label="Tiếp tục"
            onPress={() => Navigator.navigate(SCREEN.CONFIRMATION)}
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default TransactionDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.bs4,
  },
  wrap: {
    paddingHorizontal: Spacing.PADDING,
    flex: 1,
  },
  textBlack: {
    color: Colors.bs4,
  },
  ml_20: {
    marginLeft: scale(20),
  },
  mb_15: {
    marginBottom: scale(15),
  },
  header: {
    flex: 1,
  },
  headerTitle: {
    color: Colors.bs4,
    fontSize: Fonts.H6,
    textAlign: 'center',
  },
  textHeader: {
    fontSize: Fonts.H6,
    color: Colors.bs4,
    marginBottom: scale(8),
    marginTop: scale(25),
  },
  blockUser: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: scale(48),
    height: scale(48),
  },
  nameUser: {
    fontSize: Fonts.H6,
    color: Colors.bs4,
  },
  flexBox: {
    flex: 4,
    marginVertical: scale(20),
  },
  inputBlock: {
    fontSize: Fonts.H6,
    marginTop: scale(6),
    backgroundColor: 'transparent',
    borderColor: Colors.g4,
  },
  textCurrent: {
    position: 'absolute',
    right: scale(10),
    top: scale(18),
    fontSize: Fonts.H6,
  },
  inputCurrent: {
    fontSize: Fonts.H6,
    marginTop: scale(6),
    backgroundColor: 'transparent',
    borderColor: Colors.g4,
  },
  iconRectangle: {
    height: scale(8),
    width: '100%',
    marginVertical: scale(15),
  },
  textH6: {
    fontSize: Fonts.H6,
  },
  emptyWallet: {
    width: scale(48),
    height: scale(48),
    backgroundColor: Colors.g2,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    marginTop: scale(16),
    marginLeft: scale(20),
    position: 'relative',
  },
  iconWallet: {
    width: scale(28),
    height: scale(28),
  },
  iconCheck: {
    width: scale(16),
    height: scale(16),
    position: 'absolute',
    top: 0,
    right: 0,
  },
  myWallet: {
    fontSize: Fonts.H6,
    marginLeft: scale(20),
    marginTop: scale(8),
  },
  sendBank: {
    fontSize: Fonts.H6,
    marginBottom: scale(16),
  },
  flexCenter: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bankBlock: {
    width: scale(48),
    height: scale(48),
    backgroundColor: Colors.g2,
    borderRadius: 200,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: scale(8),
  },
  bankImage: {
    width: scale(28),
    height: scale(28),
  },
  addBank: {
    borderWidth: 1,
    borderStyle: 'dotted',
    borderColor: Colors.g4,
    width: scale(108),
    height: scale(72),
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  fontSmall: {
    fontSize: Fonts.SM,
  },
});
