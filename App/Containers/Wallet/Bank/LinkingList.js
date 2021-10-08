import React from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import {HeaderBg, Header, Icon, Text, Row, Col, TextInput} from 'components';
import {Colors, Fonts, Spacing, Images} from 'themes';
import Navigator from 'navigations/Navigator';
import {SCREEN} from 'configs/Constants';
import {useTranslation} from 'context/Language';
import {scale} from 'utils/Functions';

import ListBank from 'components/Wallet/Bank/ListBank';

const BankList = () => {
  const translation = useTranslation();
  const dataBlock = [
    {
      icon: Images.ConnectBank.logoAgribank,
      name: 'Agribank',
      screen: SCREEN.BANK_INFO,
    },
    {icon: Images.ConnectBank.logoBidv, name: 'BIDV', screen: SCREEN.BANK_INFO},
    {
      icon: Images.ConnectBank.logoVcb,
      name: 'Vietcombank',
      screen: SCREEN.BANK_INFO,
    },
    {
      icon: Images.ConnectBank.logoVtb,
      name: 'Vietinbank',
      screen: SCREEN.TRANSFER_BANK,
    },
    {
      icon: Images.ConnectBank.logoExb,
      name: 'Eximbank',
      screen: SCREEN.BANK_INFO,
    },
    {
      icon: Images.ConnectBank.logoHdb,
      name: 'HDbank',
      screen: SCREEN.BANK_INFO,
    },
    {
      icon: Images.ConnectBank.logoMbb,
      name: 'MBbank',
      screen: SCREEN.BANK_INFO,
      iconHeight: 13,
    },
    {
      icon: Images.ConnectBank.logoScob,
      name: 'Sacombank',
      screen: SCREEN.BANK_INFO,
    },
    {icon: Images.ConnectBank.logoScb, name: 'SCB', screen: SCREEN.BANK_INFO},
    {
      icon: Images.ConnectBank.logoVbb,
      name: 'VPbank',
      screen: SCREEN.BANK_INFO,
    },
    {icon: Images.ConnectBank.logoShb, name: 'SHB', screen: SCREEN.BANK_INFO},
    {
      icon: Images.ConnectBank.logoTpb,
      name: 'TPbank',
      screen: SCREEN.BANK_INFO,
    },
  ];

  return (
    <>
      <HeaderBg>
        <Header back title={translation.connect_bank} />
        <View style={styles.mt1}>
          <TextInput
            placeholder="Nhập tên Ngân hàng cần tìm "
            placeholderTextColor={Colors.l5}
            leftIcon={Images.ConnectBank.Search}
            // value={value}
            // onChange={_onChange}
            // showErrorLabel={error}
            // error={'*Số tiền nạp tối thiểu là 10.000đ'}
          />
        </View>
      </HeaderBg>

      <ScrollView style={styles.container}>
        <View style={[styles.wrap, styles.py1]}>
          <View style={[styles.blockShadow, styles.ptb1, styles.mb1]}>
            <Text color={Colors.black} bold mb={16} style={styles.textSize1}>
              {translation.bank_linking}
            </Text>
            {/* {renderListBank} */}

            {/* use component ListBank to test layout,
              delete when no use 
              * component ListBank will not be use in future,
              remember to delete it*/}
            <ListBank listBank={dataBlock} />
          </View>

          <View style={[styles.blockShadow, styles.ptb1, styles.mb1]}>
            <Text color={Colors.black} bold mb={16} style={styles.textSize1}>
              {translation.bank_linking}
            </Text>
            <ListBank listBank={dataBlock} />
          </View>

          <View style={[styles.blockShadow, styles.ptb1, styles.mb1]}>
            <Text color={Colors.black} bold mb={16} style={styles.textSize1}>
              {translation.bank_linking}
            </Text>
            <ListBank listBank={dataBlock} />
          </View>
        </View>
      </ScrollView>
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
  //--------------
  mt1: {marginTop: 20},
  //--------------
  mb1: {marginBottom: Spacing.PADDING},
  //--------------
  py1: {
    paddingTop: 25,
    paddingBottom: Spacing.PADDING,
  },
  //---------------
  ptb1: {
    paddingHorizontal: 16,
    paddingVertical: 24,
  },
  //---------------
  textSize1: {fontSize: 18},
  //--------------
  blockShadow: {
    backgroundColor: Colors.BACKGROUNDCOLOR,
    borderRadius: 8,
    shadowColor: Colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.16,
    shadowRadius: 8,
    elevation: 24,
  },
});

export default BankList;
