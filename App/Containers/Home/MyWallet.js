import React from 'react';
import {
  View, ScrollView, StyleSheet, Text, Image, TouchableOpacity
} from 'react-native';
import {Button, Header,} from 'components';
import {Colors, Fonts, Spacing, Images} from 'themes';
import Navigator from 'navigations/Navigator';
import {SCREEN, TEXT} from 'configs/Constants';
import {useTranslation} from 'context/Language';
import HeaderBg from 'components/Common/HeaderBg';
import Monney from 'components/Home/Monney';
import ListItem from 'components/Common/ListItem';
import { scale } from 'utils/Functions';

const MyWallet = () => {
  const translation = useTranslation();
  const dataMenu = [
    {
      icon: Images.Homes.NapTien,
      name: translation.top_up,
      screen: SCREEN.TOP_UP,
    },
    {
      icon: Images.Homes.RutTien,
      name: translation.withdraw,
      screen: SCREEN.WITHDRAW,
    },
  ];
  const dataBank = [
    {
      icon: Images.ConnectBank.logoAgribank,
      name: 'Agribank',
      screen: SCREEN.BANK_INFO,
    },
    {
      icon: Images.ConnectBank.logoBidv,
      name: 'BIDV',
      screen: SCREEN.BANK_INFO,
    },
    {
      icon: Images.ConnectBank.logoVcb,
      name: 'Vietcombank',
      screen: SCREEN.BANK_INFO,
    },
  ];
  const blue_color = "#437EC0";
  return (
    <>
      <ScrollView style={styles.container}>
        <HeaderBg>
          <Header back title="Ví của tôi" style={{marginBottom: 25}}/>
          <Monney
            style={[
              {
                position: 'absolute',
                bottom: -20,
                left: Spacing.PADDING,
                right: Spacing.PADDING,
                shadowColor: "black",
              },
            ]}
          />
        </HeaderBg>

        <View style={[styles.wrap,{marginTop: 40,marginBottom: 20}]}>
          <ListItem
            scroll
            space={1}
            col={4}
            data={dataMenu}
            styleText={[{fontSize: 14}]}
            styleWicon={[{backgroundColor: '#437EC0'}]}
            styleIcon={[{tintColor: '#fff'}]}
          />
        </View>
        <View style={{
          backgroundColor: Colors.BORDER,
          height: 8
        }}></View>

        <View style={[styles.wrap,styles.py_1]}>
          <Text style={{
            marginBottom: 10,
            fontSize: Fonts.H6,
            fontWeight: "bold"
          }}>{translation.connect_cardbank_account}</Text>
          <Text style={styles.text}>
            {translation.you_have_not_connected_your_cardbank_account_yet}
          </Text>
          <Text style={styles.text}>
            {translation.connect_now_to_use_epays_payment_services}
          </Text>

          <ListItem
            space={10}
            col={3}
            data={dataBank}
            styleText={[{fontSize: 14}]}
            styleWicon={{
              borderRadius: 100,
              backgroundColor: Colors.l2
            }}
          />
          <TouchableOpacity style={styles.itemAddBank}
            onPress={() => { Navigator.push(SCREEN.BANK_LIST); }}>
            <Image source={Images.Bank.Plus} style={[styles.iconAddBank]} />
            <Text style={{
              textAlign: 'center'
            }}>{translation.add_cardbank_account}</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <View style={[styles.wrap, {
        padding: Spacing.PADDING,
        backgroundColor: Colors.BACKGROUNDCOLOR,
      }]}>
        <Button bg={blue_color}
          color={Colors.white} 
          label={translation.add_bank}
          onPress={() => Navigator.navigate(SCREEN.BANK_LIST)}/>
      </View>
    </>
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
  py_1: { paddingVertical: Spacing.PADDING },
  text: {
    color: Colors.gray,
    lineHeight: 20
  },
  itemAddBank: {
    maxWidth: '33.333%',
    alignItems: 'center',
    borderColor: Colors.l5,
    borderWidth: 1,
    borderStyle: 'dashed',
    padding: 10,
    borderRadius: 8,
    marginTop: 6,
  },
  iconAddBank: {
    width: scale(20),
    height: scale(20),
    resizeMode: 'contain',
    marginBottom: 10,
  },
});

export default MyWallet;
