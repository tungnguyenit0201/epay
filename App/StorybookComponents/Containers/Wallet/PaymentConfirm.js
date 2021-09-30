import React, {useRef, useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  useWindowDimensions,
  Pressable,
  Image,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Text from '../../Atoms/Text';
import Header from '../../Atoms/Header';
import Button from '../../Atoms/Button';
import HeaderBg from '../../Atoms/HeaderBg';
import TextInput from '../../Atoms/TextInput';
import Icon from '../../Atoms/Icon';
import Wrapper from '../../Groups/Wrapper';
import FooterContainer from '../../Atoms/FooterContainer';
import {Colors, Fonts, Images, Spacing, base} from 'themes';

import {scale, formatMoney} from '../../Utils/Functions';
import ModalBottom from '../../Groups/ModalBottom';
import Bank from '../../Groups/BankQR';
import DashedLine from 'react-native-dashed-line';
const data = [
  {
    name: 'Nhà cung cấp',
    value: 'The Coffee House',
  },
  {
    name: 'Đại lý',
    value: 'The Coffee House',
  },
  {
    name: 'Nội dung ',
    value: 'Thanh toán 1 ly Cold Brew',
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
      console.log('hello');
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
    <Wrapper>
      <SafeAreaProvider>
        <ScrollView style={{backgroundColor: Colors.white, paddingBottom: 20}}>
          <HeaderBg style={{marginBottom: 50}}>
            <Header
              title={'Xác nhận ' + transTypeText}
              back
              style={{marginTop: 25, marginBottom: -15}}
            />
          </HeaderBg>
          <View style={base.container}>
            <Text
              bold
              fs={Fonts.H4}
              mb={20}
              style={{marginTop: -15, fontSize: 16}}>
              Nguồn tiền
            </Text>
            <View style={[styles.itemBank, styles.itemBankActive]}>
              <Image
                style={[styles.iconBank]}
                source={require('images/storybook/wallet_epay.png').default}
              />
              <View>
                <Text fs="h6" bold>
                  Ví EPAY
                </Text>
                <Text style={{fontSize: 12}}>Số dư: 5.000.000 VNĐ</Text>
              </View>
              <TouchableOpacity onPress={() => setOpen(true)}>
                <Image
                  source={require('images/storybook/edit.png').default}
                  style={{
                    height: 24,
                    width: 24,
                    position: 'relative',
                    left: 130,
                    cursor: 'pointer',
                  }}
                />
              </TouchableOpacity>
            </View>
            <Text bold mb={12} style={{fontSize: 16, marginTop: 10}}>
              Chi tiết giao dịch
            </Text>
            <View style={styles.block}>
              <Image
                source={require('images/bgXacNhan.png').default}
                style={styles.bgImg}
              />

              {data.map((item, index) => {
                return (
                  <View key={index}>
                    <View style={[styles.row]}>
                      <Text style={[styles.textLeft]}>{item.name}</Text>
                      <Text
                        bold={item.bold}
                        size={Fonts.H6}
                        style={styles.textRight}>
                        {item.value}
                      </Text>
                    </View>
                    <DashedLine
                      dashLength={4}
                      dashThickness={1}
                      dashColor={Colors.l3}
                    />
                  </View>
                );
              })}
            </View>
          </View>
          <View
            style={{
              backgroundColor: '#EEEEEE',
              height: 9,
              marginTop: 8,
            }}></View>
          <View style={[base.container, {marginTop: 15}]}>
            <View>
              <View style={[styles.row]}>
                <Text style={[styles.textLeft]}>Số tiền</Text>
                <Text size={Fonts.H6} style={styles.textRight}>
                  50.000đ
                </Text>
              </View>
              <DashedLine
                dashLength={4}
                dashThickness={1}
                dashColor={Colors.l3}
              />
            </View>
            <View>
              <View style={[styles.row]}>
                <Text style={[styles.textLeft]}>Phí giao dịch</Text>
                <Text size={Fonts.H6} style={styles.textRight}>
                  Miễn phí
                </Text>
              </View>
              <DashedLine
                dashLength={4}
                dashThickness={1}
                dashColor={Colors.l3}
              />
            </View>
            <View>
              <View style={{paddingVertical: 15}}>
                <View
                  style={{
                    flex: 1,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Text style={[styles.textLeft]}>Khuyến mãi</Text>
                  <Text size={Fonts.H6} style={styles.textRight}>
                    -30.000đ
                  </Text>
                </View>
                <View style={{position: 'relative'}}>
                  <View
                    style={{
                      borderWidth: 1,
                      borderColor: '#CCCCCB',
                      flex: 1,
                      justifyContent: 'center',
                      alignItems: 'center',
                      paddingVertical: 9,
                      paddingHorizontal: 12,
                      width: 160,
                      borderRadius: 8,
                      marginTop: 10,
                    }}>
                    <Text style={{fontSize: 13}}>Thêm mã khuyến mãi</Text>
                  </View>
                  <Text style={{position: 'absolute', right: 0, top: 20}}>
                    Happyday
                  </Text>
                </View>
              </View>
              <DashedLine
                dashLength={4}
                dashThickness={1}
                dashColor={Colors.l3}
              />
            </View>
            <View>
              <View style={[styles.row]}>
                <Text style={[styles.textLeft]}>Phí giao dịch</Text>
                <Text bold size={Fonts.H6} style={styles.textRight}>
                  50.000đ
                </Text>
              </View>
            </View>
          </View>
        </ScrollView>
        <ModalBottom visible={open} onClose={() => setOpen(false)}>
          <Bank wallet={false} />
        </ModalBottom>
      </SafeAreaProvider>
      {/* <View style={base.bottom}>
        <Text>
          Khi nhấn rút tiền, bạn đã xác nhận rằng Bạn đồng ý với{' '}
          <Text style={{textDecorationLine: 'underline'}}>
            Thoả thuận Người sử dụng, Chính sách quyền riêng tư
          </Text>{' '}
          và{' '}
          <Text style={{textDecorationLine: 'underline'}}>
            Chính sách rút tiền
          </Text>{' '}
          của Epay
        </Text>
      </View> */}
      <FooterContainer>
        <Image
          source={require('images/gradient/B_payment.png').default}
          style={base.buttonSB}
        />
      </FooterContainer>
    </Wrapper>
  );
};
const styles = StyleSheet.create({
  itemBank: {
    position: 'relative',
    marginBottom: 20,
    backgroundColor: Colors.white,
    borderRadius: 10,
    shadowColor: Colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,

    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: scale(15),
    paddingHorizontal: scale(10),
  },
  itemBankActive: {
    backgroundColor: Colors.cl5,
  },
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
    paddingVertical: 15,
  },
  textLeft: {
    fontSize: Fonts.H6,
    color: '#969696',
  },
  textRight: {
    fontSize: Fonts.H6,
    color: Colors.black,
  },
  iconBank: {
    width: scale(24),
    height: scale(24),
    marginRight: 10,
  },
});
export default Confirmation;
