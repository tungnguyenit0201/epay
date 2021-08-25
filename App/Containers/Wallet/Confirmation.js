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
  const data = [
    {
      name: 'Nguồn tiền',
      val: 'Vietcombank',
    },
    {
      name: 'Số tiền',
      val: '550.000 vnđ',
    },
    {
      name: 'Phí giao dịch',
      val: '0 vnđ',
    },
    {
      name: 'Tổng số tiền',
      val: '550.000 vnđ',
    },
  ];

  const handleChange = e => {
    if (e === '1') {
      setOpen(false);
      Navigator.navigate(SCREEN.CHECKOUT_SUCCESS);
    }
    if (e === '0') {
      setOpen(!open);
      //Navigator.navigate(SCREEN.CHECKOUT_FAILURE);
    }
  };
  const toggleModal = () => {
    setOpen(!open);
  };

  return (
    <>
      <ScrollView style={base.wrap}>
        <HeaderBg style={{marginBottom: 50}}>
          <Header title={translation.confirm_withdraw} back />
        </HeaderBg>
        <View style={base.container}>
          <Text bold size={Fonts.H5} mb={20}>
            Thông tin nạp tiền
          </Text>
          <View style={styles.block}>
            <Image
              source={require('images/bgXacNhan.png')}
              style={styles.bgImg}
            />

            {data.map((item, index) => {
              console.log(item);
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

                    {index + 1 === data.length ? (
                      <Text bold size={Fonts.H6} style={styles.textRight}>
                        {item.val}
                      </Text>
                    ) : (
                      <Text size={Fonts.H6} style={styles.textRight}>
                        {item.val}
                      </Text>
                    )}
                  </View>
                </View>
              );
            })}
          </View>
        </View>
      </ScrollView>
      <View style={base.bottom}>
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
            placeholder="1 -> next , 0 -> error"
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
