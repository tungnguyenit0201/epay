import React, {useRef, useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  useWindowDimensions,
  Pressable,
  Image,
  FlatList,
} from 'react-native';
import {Text, Header, Button, HeaderBg, TextInput} from 'components';
import {Colors, Fonts, Images, Spacing, base} from 'themes';
import Navigator from 'navigations/Navigator';
import Password from 'components/Auth/Password';
import {SCREEN} from 'configs/Constants';
import {scale} from 'utils/Functions';
import Modal from 'react-native-modal';

import {useTranslation} from 'context/Language';
import {useConfirmation} from 'context/Wallet/utils';

import ModalBottom from 'components/Common/ModalBottom';
import Bank from 'components/QRPay/Bank';
import SelectBank from 'components/QRPay/SelectBank';

const Confirmation = () => {
  const translation = useTranslation();
  let [open, setOpen] = useState(false);
  const {transTypeText, data, onContinue, bank, getContinueButtonTitle } = useConfirmation();

  const [showModal, setShowModal] = React.useState(false);

  let forgotRef = useRef({
    phone: '',
  });
  const onChange = (key, val) => {
    forgotRef.current[key] = val;
  };

  const handleChange = e => {
    if (e === '1') {
      setOpen(false);
      Navigator.navigate(SCREEN.TRANSACTION_SUCCESS);
    }
    if (e === '0') {
      setOpen(!open);
      //Navigator.navigate(SCREEN.TRANSACTION_FAILURE);
    }
  };
  const toggleModal = () => {
    setOpen(!open);
  };

  return (
    <>
      <HeaderBg>
        <Header title={translation.topup.confirmTitle.replace("%",transTypeText)} back />
      </HeaderBg>
      <View style={base.wrap}>
        <View style={base.container}>
          <SelectBank onPress={() => setShowModal(!showModal)} bankInfo={bank}/>
          <Text bold fs="h6" mt={30} mb={20}>{translation.topup.detailTitle.replace("%",transTypeText)}</Text>

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
                    ]}>
                    <Text size={Fonts.H6} style={styles.textLeft}>{item.name}</Text>
                    <Text
                      bold={item.bold}
                      size={Fonts.H6}
                      style={styles.textRight}
                    >
                      {item.value}
                    </Text>
                  </View>
                </View>
              );
            })}
          </View>
        </View>
      </View>
      <View style={styles.confirmButtonContainer}>
        <Text size={Fonts.H4} mb={10}>
            {translation.acceptTerm.when}
          <Text underline>{translation.acceptTerm.contract}</Text>{translation.acceptTerm.and}<Text underline>{translation.acceptTerm.topup}</Text>{translation.acceptTerm.of}
        </Text>
      </View>
      <View style={base.boxBottom}>
        <Button label={getContinueButtonTitle()} onPress={onContinue} />
      </View>
      <Modal
        isVisible={open}
        animationIn="fadeIn"
        animationOut="fadeOut"
        //style={{flex: 1}}
        useNativeDriver
        hideModalContentWhileAnimating
        backdropTransitionOutTiming={0}
      >
        <View style={base.modal}>
          <Text style={base.modalTitle}>Nhập mật khẩu</Text>
          <TextInput
            placeholder="1 -> next , 0 -> error"
            password
            placeholderTextColor={Colors.l5}
            onChange={handleChange}
          />
          <Text style={styles.textUnderline}>Quên mật khẩu?</Text>
          <Pressable style={base.close} onPress={toggleModal}>
            <Text style={base.closeText}>x</Text>
          </Pressable>
        </View>
      </Modal>

      <ModalBottom visible={showModal} onClose={() => setShowModal(false)}>
        <Bank />
      </ModalBottom>
    </>
  );
};
const styles = StyleSheet.create({
  textUnderline: {
    textDecorationLine: 'underline',
    marginTop: scale(10),
    textAlign: 'center',
  },

  block: {
    marginBottom: 20,
    position: 'relative',
    minHeight: 128,
  },
  bgImg: {
    width: 128,
    height: 128,
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{translateX: scale(-64)}, {translateY: scale(-64)}],
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomColor: Colors.l3,
    borderBottomWidth: 1,
    paddingVertical: 15,
  },
  textLeft: {
    fontSize: Fonts.H6,
    color: Colors.cl3,
  },
  textRight: {
    fontSize: Fonts.H6,
    color: Colors.black,
  },
  confirmButtonContainer: {
    flex:1,
    justifyContent:'flex-end',
    paddingHorizontal: Spacing.PADDING,
}
});
export default Confirmation;
