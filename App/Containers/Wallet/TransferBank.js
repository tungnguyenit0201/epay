import React, {useState, useEffect, useCallback} from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import {Button, Header, TextInput, Row, Col, HeaderBg} from 'components';
import {Colors, Fonts, Spacing, Images} from 'themes';
import {SCREEN} from 'configs/Constants';
import {scale} from 'utils/Functions';
import {useTranslation} from 'context/Language';
import Modal from 'react-native-modal';
import {Checkbox} from 'react-native-ui-lib';

const BankTransferInfo = () => {
  const translation = useTranslation();
  const [checkedBank, setChecked] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const dataBank = [
    {
      id: 1,
      icon: Images.Transfer.EmptyWallet,
      name: 'Ví của tôi',
      screen: SCREEN.TOP_UP,
    },
    {
      id: 2,
      icon: Images.Bank.Eximbank,
      name: 'Eximbank',
      screen: SCREEN.TOP_UP,
    },
    {
      id: 3,
      icon: Images.Bank.Vietcombank,
      name: 'Vietcombank',
      screen: SCREEN.TOP_UP,
    },
  ];

  const onShowModal = () => {
    setShowModal(true);
  };

  const onHideModal = () => {
    setShowModal(false);
  };

  return (
    <ScrollView style={styles.container}>
      <HeaderBg>
        <Header back title={translation.connect_bank} />
        <Text
          style={[
            styles.title,
            styles.text_white,
            {
              marginTop: 28,
              marginBottom: 10,
            },
          ]}>
          {translation.transfer_to}
        </Text>

        <TouchableOpacity
          style={[
            styles.flex_row,
            {
              alignItems: 'center',
            },
          ]}>
          <View
            style={{
              width: 48,
              height: 48,
              marginRight: 16,
              borderRadius: 100,
              backgroundColor: Colors.BORDER,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Image
              source={Images.ConnectBank.logoVtb}
              style={{
                width: scale(26),
                height: scale(26),
              }}
            />
          </View>

          <View>
            <Text
              style={[
                styles.text_white,
                {
                  marginBottom: 4,
                  fontWeight: '500',
                  fontSize: Fonts.H6,
                },
              ]}>
              Vietinbank
            </Text>
            <Text style={styles.text_white}>{translation.free}</Text>
          </View>
        </TouchableOpacity>
      </HeaderBg>

      <View style={[styles.wrap, {paddingVertical: 10}]}>
        <View style={styles.mb_1}>
          <TextInput
            placeholder={translation.enter_the_recipients_account_number}
          />
          <Text style={{color: 'red'}}>
            *{translation.incorrect_card_number}
          </Text>
        </View>

        <View style={styles.mb_1}>
          <TextInput placeholder={translation.recipients_name} />
        </View>

        <View style={styles.mb_1}>
          <TextInput
            placeholder={translation.enter_the_amount}
            style={{paddingRight: 60}}
          />
          <Text
            style={{
              position: 'absolute',
              right: 15,
              top: 10,
              fontWeight: 'bold',
              fontSize: 18,
            }}>
            vnđ
          </Text>
        </View>

        <View style={styles.mb_1}>
          <TextInput placeholder={translation.enter_message} />
        </View>

        <View style={[styles.mb_1, styles.flex_row]}>
          <Checkbox onPress label={translation.save_transfer_information} />
        </View>
      </View>

      <View style={styles.line_gray}></View>

      <View style={[styles.wrap, {paddingVertical: 20}]}>
        <Text
          style={[
            styles.title,
            {
              marginBottom: 20,
            },
          ]}>
          {translation.transfer_by_epay_wallet}
        </Text>

        <Row space="10" style={{marginBottom: 4}}>
          {dataBank.map((item, index) => (
            <Col width="33.33%" space="10" key={index}>
              <Pressable
                style={[styles.item]}
                onPress={() => setChecked(index)}>
                <View style={[styles.wicon]}>
                  <Image source={item.icon} style={[styles.icon]} />
                  {checkedBank === index && (
                    <View style={styles.active}>
                      <Image source={Images.Down} style={styles.activeImg} />
                    </View>
                  )}
                </View>
                <Text size={12} mt={5}>
                  {item.name}
                </Text>
              </Pressable>
            </Col>
          ))}
        </Row>

        <Text style={[styles.title, {marginBottom: 12}]}>
          {translation.transfer_by_bank_account}
        </Text>

        {/* <Button
          onPress={() => Navigator.push(SCREEN.TRANSACTION_SUCCESS)}
          label={translation.continue}/> */}

        {/*button show modal*/}
        <Button onPress={onShowModal} label={translation.continue} />
      </View>

      <Modal
        isVisible={showModal}
        animationIn="slideInUp"
        animationOut="slideOutDown"
        style={{flex: 1}}
        useNativeDriver
        hideModalContentWhileAnimating
        backdropTransitionOutTiming={0}
        onBackdropPress={onHideModal}>
        <View
          style={{
            paddingVertical: 24,
            paddingHorizontal: 16,
            backgroundColor: Colors.BACKGROUNDCOLOR,
          }}>
          <Text
            style={{
              textAlign: 'center',
              fontWeight: 'bold',
              fontSize: 20,
              marginBottom: 22,
            }}>
            {translation.password}
          </Text>

          <View>
            <View style={styles.icon_lock}>
              <Image
                source={Images.Transfer.Lock}
                style={styles.icon_lock_img}
              />
            </View>
            <TextInput
              password
              placeholder={translation.enter_message}
              style={styles.input_text}
            />
          </View>

          <TouchableOpacity>
            <Text
              style={{
                textAlign: 'center',
                fontSize: 14,
              }}>
              {translation.forgot_password}?
            </Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.BACKGROUNDCOLOR,
  },
  wrap: {
    paddingHorizontal: Spacing.PADDING,
  },
  title: {
    fontWeight: 'bold',
    fontSize: Fonts.H6,
  },
  flex_row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  text_white: {color: Colors.white},
  mb_1: {marginBottom: 8},
  line_gray: {
    backgroundColor: Colors.BORDER,
    height: 8,
  },
  item: {
    alignItems: 'center',
    marginBottom: 20,
  },
  wicon: {
    width: scale(48),
    height: scale(48),
    backgroundColor: Colors.l2,
    borderRadius: 100,
    marginBottom: 7,
  },
  icon: {
    width: scale(28),
    height: scale(28),
    resizeMode: 'contain',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{translateX: scale(-14)}, {translateY: scale(-14)}],
  },
  active: {
    backgroundColor: '#5786F7',
    width: 15,
    height: 15,
    borderRadius: 99,
    overflow: 'hidden',
    padding: 2,
    position: 'absolute',
    top: -4,
    right: -2,
  },
  activeImg: {
    width: 12,
    height: 12,
    tintColor: '#fff',
  },
  icon_lock: {
    position: 'absolute',
    top: 14,
    left: 14,
    paddingRight: 10,
    borderRightWidth: 0.5,
    borderStyle: 'solid',
    borderColor: Colors.GRAY,
    zIndex: 1,
  },
  icon_lock_img: {
    width: 17,
    height: 17,
  },
  input_text: {paddingLeft: 53},
});

export default BankTransferInfo;
