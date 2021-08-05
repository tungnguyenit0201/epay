import React from 'react';
import {
  ImageBackground, View, ScrollView, StyleSheet, Text,
  Image, TouchableOpacity,
} from 'react-native';
import {Button, Header, 
  Icon, InputBlock, Row, Col} from 'components';
import {Colors, Fonts, Spacing, Images} from 'themes';
import Navigator from 'navigations/Navigator';
import {SCREEN} from 'configs/Constants';
import {useTranslation} from 'context/Language';
import ListItem from 'components/Home/ListItem';

const BankList = () => {
  const translation = useTranslation();
  const dataBlock = [
    {icon: Images.QRCode, name: 'Agribank', screen: SCREEN.TRANSFER},
    {icon: Images.QRCode, name: 'Rút tiền 2', screen: SCREEN.WITHDRAW},
    {icon: Images.QRCode, name: 'QR Pay 2', screen: SCREEN.QRPAY},
    {icon: Images.QRCode, name: 'Quét mã 3', screen: SCREEN.QRPAY},
    {icon: Images.QRCode, name: 'Nạp tiền giao thông 5', screen: SCREEN.TOP_UP},
    {icon: Images.QRCode, name: 'Rút tiền 6', screen: SCREEN.WITHDRAW},
    {icon: Images.QRCode, name: 'QR Pay 7', screen: SCREEN.QRPAY},
    {icon: Images.QRCode, name: 'Quét mã 8', screen: SCREEN.QRPAY},
  ];

  const Item = ({ title,icon,screen }) => (
    <TouchableOpacity
      style={styles.item}
      onPress={() => { Navigator.push(screen); }}>
      <Icon
        icon={icon}
        size={Spacing.PADDING * 2.5}
      />
      <Text centered style={{marginTop: 6}}>{title}</Text>
    </TouchableOpacity> 
  );

  return (
    <ScrollView style={styles.container}>
      <Header back title="Liên kết Ngân hàng"/>
      <View>
        <View style={styles.p_1}>
          <View>
            <View style={styles.icon}>
              <Image 
                source={Images.TabBar.Search}
                style={styles.image}/>
            </View>

            <InputBlock placeholder={translation.which_back_are_you_looking_for}
              style={styles.input_text}/>
          </View>
        </View>

        <View style={{
          width: '100%',
          height: 7,
          backgroundColor: Colors.l4
        }}></View>

        <View style={[styles.px_1,styles.py_1]}>
          <Text size={Fonts.h6} mb={20}
            style={{fontWeight: 'bold'}}>Nhập số điện thoại</Text>
          
          <Row space={10}>
          {
            dataBlock.map((item,index) => {
              return (
                <Col width={`33.333%`} space={10} key={index}
                style={{marginBottom:10}}>
                  <Item title={item.name} icon={item.icon} screen={item.screen} /> 
                </Col>
              );
          })}
          </Row>
        </View>

        {/* <Button
          onPress={() => Navigator.push(SCREEN.BANK_INFO)}
          label="Vietcombank"
        /> */}
      </View>
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
    // paddingTop: Spacing.PADDING * 6,
  },
  p_1: {
    paddingHorizontal: 16,
    paddingBottom: 25,
  },
  px_1: {
    paddingHorizontal: 16,
  },
  py_1: {
    paddingVertical: 25,
  },
  image: {
    width: 20,
    height: 20,
  },
  icon: {
    position: "absolute",
    top: 45,
    left: 10,
    paddingRight: 10,
    borderRightWidth: 1,
    borderStyle: "solid",
    borderColor: Colors.GRAY,
    zIndex: 1
  },
  input_text: {
    paddingLeft: 50,
    borderRightWidth: 1,
    borderStyle: "solid",
    borderColor: Colors.l4,
    backgroundColor: Colors.white
  },
  item: {
    alignItems: 'center',
    //height:'100%'
  },
});

export default BankList;
