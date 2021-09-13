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
import Text from '../../Atoms/Text';
import Header from '../../Atoms/Header';
import Button from '../../Atoms/Button';
import HeaderBg from '../../Atoms/HeaderBg';
import TextInput from '../../Atoms/TextInput';
import {Colors, Fonts, Images, Spacing, base} from 'themes';

import {scale, formatMoney} from 'utils/Functions';
import Modal from 'react-native-modal';

const data = [
  {
    name: 'Nguồn tiền',
    value: 'VietComBank',
  },
  {
    name: 'Số tiền',
    value: formatMoney('100000', true),
  },
  {
    name: 'Phí giao dịch',
    value: formatMoney('100000', true),
  },
  {
    name: 'Tổng số tiền',
    value: formatMoney('100000', true),
    bold: true,
  },
];

const Confirmation = () => {
  let {height} = useWindowDimensions();
  let [loading, setLoading] = useState(false);
  let [open, setOpen] = useState(false);
  const transTypeText = 'nạp tiền';
  let forgotRef = useRef({
    phone: '',
  });
  const onChange = (key, val) => {
    forgotRef.current[key] = val;
  };

  const handleChange = e => {
    if (e === '1') {
      setOpen(false);
      console.log('hello')
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
      <ScrollView style={base.wrap}>
        <HeaderBg style={{marginBottom: 50}}>
          <Header title={'Xác nhận ' + transTypeText} back />
        </HeaderBg>
        <View style={base.container}>
          <Text bold size={Fonts.H5} mb={20}>
            Thông tin {transTypeText}
          </Text>
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
                    <Text style={styles.textLeft}>{item.name}</Text>
                    <Text
                      bold={item.bold}
                      size={Fonts.H6}
                      style={styles.textRight}>
                      {item.value}
                    </Text>
                  </View>
                </View>
              );
            })}
          </View>
        </View>
      </ScrollView>
      <View style={base.bottom}>
        <Button label="Tiếp tục" onPress={console.log('hello')} />
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
});
export default Confirmation;
