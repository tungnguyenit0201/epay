import React, {useRef, useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  useWindowDimensions,
  Pressable,
  Image,
} from 'react-native';
import {
  Text,
  InputBlock,
  Header,
  Button,
  FWLoading,
  TextInput,
} from 'components';
import {Colors, Fonts, Images, Spacing, base} from 'themes';
import Navigator from 'navigations/Navigator';
import Password from 'components/Auth/Password';
import {SCREEN} from 'configs/Constants';
import {scale} from 'utils/Functions';
import Modal from 'react-native-modal';

import HeaderBg from 'components/Common/HeaderBg';
import {useTranslation} from 'context/Language';
const Confirmation = () => {
  const translation = useTranslation();
  let {height} = useWindowDimensions();
  let [loading, setLoading] = useState(false);
  let [open, setOpen] = useState(false);
  let forgotRef = useRef({
    phone: '',
  });
  const onChange = (key, val) => {
    forgotRef.current[key] = val;
  };
  const renderItem = (key, val) => {
    return (
      <View style={styles.row}>
        <Text style={styles.textLeft}>{key}</Text>
        <Text style={styles.textRight}>{val}</Text>
      </View>
    );
  };

  const handleChange = e => {
    if (e === 'thanhcong') {
      setOpen(false);
      Navigator.navigate(SCREEN.CHECKOUT_SUCCESS);
    }
    if (e === 'thatbai') {
      setOpen(false);
      Navigator.navigate(SCREEN.CHECKOUT_FAILURE);
    }
  };
  const toggleModal = () => {
    setOpen(!open);
  };
  return (
    <ScrollView style={base.wrap}>
      <HeaderBg style={{marginBottom: 50}}>
        <Header title={translation.confirm_withdraw} back />
      </HeaderBg>
      <View style={base.container}>
        <View style={styles.block}>
          <Image
            source={require('images/bgXacNhan.png')}
            style={styles.bgImg}
          />
          {renderItem('Ngân hàng nhận tiền', 'Vietcombank')}
          {renderItem('Số tiền', '550.000 vnđ')}
          {renderItem('Phí giao dịch', '0 vnđ')}
          {renderItem(
            'Tổng số tiền',
            <Text size={Fonts.H6} bold>
              550.000 vnđ
            </Text>,
          )}
        </View>
        <Button label="Tiếp tục" onPress={toggleModal} />
      </View>
      <Modal
        isVisible={open}
        animationIn="fadeIn"
        animationOut="fadeOut"
        //style={{flex: 1}}
        useNativeDriver
        hideModalContentWhileAnimating
        backdropTransitionOutTiming={0}>
        <View style={base.modal}>
          <Text style={base.modalTitle}>Nhập mật khẩu</Text>
          <TextInput
            placeholder="Nhập mật khẩu"
            password
            placeholderTextColor="black"
            placeholderTextColor={Colors.l5}
            onChange={handleChange}
          />
          <Text style={styles.textUnderline}>Quên mật khẩu?</Text>
          <Pressable style={base.close} onPress={toggleModal}>
            <Text style={base.closeText}>x</Text>
          </Pressable>
        </View>
      </Modal>
    </ScrollView>
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
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomColor: Colors.l3,
    borderBottomWidth: 1,
    paddingVertical: 15,
  },
  title: {
    fontSize: scale(50),
  },

  textLeft: {
    fontSize: Fonts.H6,
    color: '#969696',
  },
  textRight: {
    fontSize: Fonts.H6,
    color: '#222222',
  },
});
export default Confirmation;
