import React from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';
// import {HeaderBg, Header, Icon, InputBlock, Row, Col} from 'components';
import InputBlock from '../../../Atoms/InputBlock';
import Header from '../../../Atoms/Header';
import HeaderBg from '../../../Atoms/HeaderBg';
import Row from '../../../Atoms/Row';
import Col from '../../../Atoms/Col';

import {Colors, Fonts, Spacing, Images, base} from 'themes';
import {scale} from 'utils/Functions';

const BankList = ({type}) => {
  const translation = require('../../../../Context/Language/vi.json');
  const dataBlock = [
    {
      icon: Images.ConnectBank.logoVcb,
      name: 'Vietcombank',
      screen: 'SCREEN.BANK_INFO',
    },
    {
      icon: Images.ConnectBank.logoAgribank,
      name: 'Agribank',
      screen: 'SCREEN.BANK_INFO',
    },
    {
      icon: Images.ConnectBank.logoBidv,
      name: 'BIDV',
      screen: 'SCREEN.BANK_INFO',
    },
  ];
  const dataBank = [
    {
      icon: Images.ConnectBank.logoVcb,
      name: 'Vietcombank',
      screen: 'SCREEN.BANK_INFO',
    },
    {
      icon: Images.ConnectBank.logoAgribank,
      name: 'Agribank',
      screen: 'SCREEN.BANK_INFO',
    },
    {
      icon: Images.ConnectBank.logoBidv,
      name: 'BIDV',
      screen: 'SCREEN.BANK_INFO',
    },
    {
      icon: Images.ConnectBank.logoVtb,
      name: 'Vietinbank',
      screen: 'SCREEN.TRANSFER_BANK',
    },
    {
      icon: Images.ConnectBank.logoExb,
      name: 'Eximbank',
      screen: 'SCREEN.BANK_INFO',
    },
    {
      icon: Images.ConnectBank.logoHdb,
      name: 'HDbank',
      screen: 'SCREEN.BANK_INFO',
    },
  ];
  const bankType2 = [
    {
      icon: Images.ConnectBank.logoAgribank,
      name: 'Agribank',
      screen: 'SCREEN.BANK_INFO',
    },
    {
      icon: Images.ConnectBank.logoBidv,
      name: 'BIDV',
      screen: 'SCREEN.BANK_INFO',
    },
    {
      icon: Images.ConnectBank.logoVcb,
      name: 'Vietcombank',
      screen: 'SCREEN.BANK_INFO',
    },
    {
      icon: Images.ConnectBank.logoVtb,
      name: 'Vietinbank',
      screen: 'SCREEN.TRANSFER_BANK',
    },
    {
      icon: Images.ConnectBank.logoExb,
      name: 'Eximbank',
      screen: 'SCREEN.BANK_INFO',
    },
    {
      icon: Images.ConnectBank.logoHdb,
      name: 'HDbank',
      screen: 'SCREEN.BANK_INFO',
    },
    {
      icon: Images.ConnectBank.logoMbb,
      name: 'MBbank',
      screen: 'SCREEN.BANK_INFO',
      iconHeight: 13,
    },
    {
      icon: Images.ConnectBank.logoScob,
      name: 'Sacombank',
      screen: 'SCREEN.BANK_INFO',
    },
    {icon: Images.ConnectBank.logoScb, name: 'SCB', screen: 'SCREEN.BANK_INFO'},
    {
      icon: Images.ConnectBank.logoVbb,
      name: 'VPbank',
      screen: 'SCREEN.BANK_INFO',
    },
    {icon: Images.ConnectBank.logoShb, name: 'SHB', screen: 'SCREEN.BANK_INFO'},
    {
      icon: Images.ConnectBank.logoTpb,
      name: 'TPbank',
      screen: 'SCREEN.BANK_INFO',
    },
  ];
  const Item = ({title, icon, screen, iconHeight, iconWidth}) => (
    <TouchableOpacity
      style={styles.item}
      onPress={() => {
        console.log('hello');
      }}>
      <View
        style={{
          width: 48,
          height: 48,
          borderRadius: 100,
          backgroundColor: Colors.BORDER,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Image
          source={icon.default}
          style={{
            width: iconWidth ? iconWidth : scale(26),
            height: iconHeight ? scale(iconHeight) : scale(26),
          }}
        />
      </View>
      <Text centered style={{marginTop: 10}}>
        {title}
      </Text>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container}>
      <HeaderBg>
        <Header
          back
          title={'Chọn ngân hàng'}
          style={{marginTop: 25, marginBottom: -15}}
        />
      </HeaderBg>

      <View style={[styles.wrap, {marginTop: -16}]}>
        <View>
          <View style={[styles.icon]}>
            <Image source={Images.TabBar.Search.default} style={styles.image} />
          </View>

          <InputBlock
            placeholder={translation.which_back_are_you_looking_for}
            style={styles.input_text}
            placeholderTextColor={Colors.l5}
          />
        </View>
      </View>
      <View style={[styles.py_1, {paddingHorizontal: 10}]}>
        {type === 2 ? (
          <View style={base.boxShadow}>
            <Text style={{fontWeight: 'bold', marginBottom: 16, fontSize: 16}}>
              {translation.bank_linking}
            </Text>
            <Row space={10}>
              {bankType2.map((item, index) => {
                return (
                  <Col
                    width={`33.333%`}
                    space={10}
                    key={index}
                    style={{marginBottom: 16}}>
                    <Item
                      title={item.name}
                      icon={item.icon}
                      screen={item.screen}
                      iconHeight={item.iconHeight}
                    />
                  </Col>
                );
              })}
            </Row>
          </View>
        ) : (
          <>
            <View style={base.boxShadow}>
              <Text
                style={{fontWeight: 'bold', marginBottom: 16, fontSize: 16}}>
                {translation.bank_linking}
              </Text>
              <Row space={10}>
                {dataBlock.map((item, index) => {
                  return (
                    <Col
                      width={`33.333%`}
                      space={10}
                      key={index}
                      style={{marginBottom: 16}}>
                      <Item
                        title={item.name}
                        icon={item.icon}
                        screen={item.screen}
                        iconHeight={item.iconHeight}
                      />
                    </Col>
                  );
                })}
              </Row>
            </View>

            <View style={base.boxShadow}>
              <Text
                style={{fontWeight: 'bold', marginBottom: 16, fontSize: 16}}>
                Ngân hàng thanh toán Quốc tế
              </Text>
              <Row space={10}>
                {dataBlock.map((item, index) => {
                  return (
                    <Col
                      width={`33.333%`}
                      space={10}
                      key={index}
                      style={{marginBottom: 16}}>
                      <Item
                        title={item.name}
                        icon={item.icon}
                        screen={item.screen}
                        iconHeight={item.iconHeight}
                      />
                    </Col>
                  );
                })}
              </Row>
            </View>

            <View style={base.boxShadow}>
              <Text
                style={{fontWeight: 'bold', marginBottom: 16, fontSize: 16}}>
                Ngân hàng nội địa
              </Text>
              <Row space={10}>
                {dataBank.map((item, index) => {
                  return (
                    <Col
                      width={`33.333%`}
                      space={10}
                      key={index}
                      style={{marginBottom: 16}}>
                      <Item
                        title={item.name}
                        icon={item.icon}
                        screen={item.screen}
                        iconHeight={item.iconHeight}
                      />
                    </Col>
                  );
                })}
              </Row>
            </View>
          </>
        )}
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
  },
  mb_1: {marginBottom: 24},
  py_1: {paddingVertical: 25},
  image: {
    width: 20,
    height: 20,
  },
  icon: {
    position: 'absolute',
    top: 56,
    left: 10,
    paddingRight: 10,
    borderRightWidth: 1,
    borderStyle: 'solid',
    borderColor: Colors.GRAY,
    zIndex: 1,
  },
  input_text: {
    paddingLeft: 50,
    borderRightWidth: 1,
    borderStyle: 'solid',
    borderColor: Colors.l4,
    backgroundColor: Colors.white,
  },
  item: {alignItems: 'center'},
});

export default BankList;
