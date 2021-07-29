import React, {useState} from 'react';
import {View, Image, StyleSheet, TouchableOpacity} from 'react-native';
import {Button, Icon,  Text} from 'components';
import {Colors, Fonts, Images, Spacing,  base} from 'themes';
import Navigator from 'navigations/Navigator';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Content from 'components/Home/Content';
import TopMenu from 'components/Home/TopMenu';
import ListItem from 'components/Home/ListItem';

import {SCREEN} from 'configs/Constants';


const dataMenu = [
  {icon: Images.QRCode, name: 'Nạp tiền', screen: SCREEN.TOP_UP},
  {icon: Images.QRCode, name: 'Rút tiền', screen: SCREEN.WITHDRAW},
  {icon: Images.QRCode, name: 'QR Pay', screen: SCREEN.QRPAY},
  {icon: Images.QRCode, name: 'Quét mã', screen: SCREEN.QRPAY},    
];

const dataBlock = [
  {icon: Images.QRCode, name: 'Nạp tiền giao thông', screen: SCREEN.TOP_UP},
  {icon: Images.QRCode, name: 'Rút tiền 2', screen: SCREEN.WITHDRAW},
  {icon: Images.QRCode, name: 'QR Pay 2', screen: SCREEN.QRPAY},
  {icon: Images.QRCode, name: 'Quét mã 2', screen: SCREEN.QRPAY},    
  {icon: Images.QRCode, name: 'Nạp tiền giao thông', screen: SCREEN.TOP_UP},
  {icon: Images.QRCode, name: 'Rút tiền 2', screen: SCREEN.WITHDRAW},
  {icon: Images.QRCode, name: 'QR Pay 2', screen: SCREEN.QRPAY},
  {icon: Images.QRCode, name: 'Quét mã 2', screen: SCREEN.QRPAY},     
];

const Home = () => {
  const {top} = useSafeAreaInsets();
  const [isMoney, setIsMoney] = useState(false);
  return (
    <>
    <View style={[base.container,{paddingTop:top+10, paddingBottom:10, marginBottom:20, backgroundColor:Colors.cl1}]}>
      <View  style={{ marginBottom:20,  position:'relative' }}>
        <TouchableOpacity
          onPress={() => {
            Navigator.navigate(SCREEN.USER);
          }}>

          <Text color="#fff" size={Fonts.FONT_SMALL}>Hello</Text>
          <Text color="#fff">Nguyen Van A </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{ marginBottom:20,position:'absolute',right:0  }}
          onPress={() => {
            Navigator.push(SCREEN.NOTIFICATION);
          }}>
          <Text>🔔</Text>
        </TouchableOpacity>
      </View>
      <View  style={{ marginBottom:20,  position:'relative' }}>
        <View  style={{  flexDirection:'row', alignItems:'center'}}>
          <Text color="#fff" size={Fonts.FONT_SMALL}>Ví của tôi</Text>
          <TouchableOpacity style={{ marginLeft:20}} onPress={() => setIsMoney(!isMoney)}>
            <Icon
              icon={isMoney ? Images.Eye : Images.EyeGray}
              tintColor={Colors.l4}
              size={15}
            />   
          </TouchableOpacity>
        </View>
        {!isMoney ? (
          <Text color="#fff" size={20} style={{height:20}}>****** </Text>
        ) : (
          <Text color="#fff"  style={{height:20}}>5555 đ </Text>
        )}

        <TouchableOpacity
          style={{ marginBottom:20,position:'absolute',right:-5, top:0  }}
          onPress={() => {
            Navigator.push(SCREEN.NOTIFICATION);
          }}>
          <Icon
            icon={Images.ArrowRight}
            tintColor={Colors.white}
            size={30}
          />   

        </TouchableOpacity>
      </View>
      <TopMenu data={dataMenu} />
    </View>     

    <View style={base.container}>
      <View style={{ marginBottom:20}}>
        <Text style ={{ fontWeight: 'bold'}} size={Fonts.FONT_MEDIUM_LARGE} mb={10}>Dịch vụ Ebay</Text>
        <ListItem layout="scroll"  data={dataBlock} />
      </View>
      <View style={{ marginBottom:20}}>
        <Text style ={{ fontWeight: 'bold'}} size={Fonts.FONT_MEDIUM_LARGE} mb={10}>Dịch vụ giao thông</Text>
        <Content  data={dataBlock} />
      </View>  
    </View>
    </>
  );
};

export default Home;
