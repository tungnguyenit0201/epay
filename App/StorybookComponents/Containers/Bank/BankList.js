import React from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';
import {Button, Header, Icon, InputBlock, Row, Col} from 'components';
import {Colors, Fonts, Spacing, Images} from 'themes';
import HeaderBg from 'components/Common/HeaderBg';
import {scale} from 'utils/Functions';

const BankList = () => {
  const translation = require('../../../Context/Language/vi.json');
  const dataBlock = [
    {
      icon: Images.ConnectBank.logoAgribank,
      name: 'Agribank',
      screen: 'bank_info',
    },
    {icon: Images.ConnectBank.logoBidv, name: 'BIDV', screen: 'bank_info'},
    {
      icon: Images.ConnectBank.logoVcb,
      name: 'Vietcombank',
      screen: 'bank_info',
    },
    {
      icon: Images.ConnectBank.logoVtb,
      name: 'Vietinbank',
      screen: 'bank_info',
    },
    {
      icon: Images.ConnectBank.logoExb,
      name: 'Eximbank',
      screen: 'bank_info',
    },
    {
      icon: Images.ConnectBank.logoHdb,
      name: 'HDbank',
      screen: 'bank_info',
    },
    {
      icon: Images.ConnectBank.logoMbb,
      name: 'MBbank',
      screen: 'bank_info',
      iconHeight: 13,
    },
    {
      icon: Images.ConnectBank.logoScob,
      name: 'Sacombank',
      screen: 'bank_info',
    },
    {icon: Images.ConnectBank.logoScb, name: 'SCB', screen: 'bank_info'},
    {
      icon: Images.ConnectBank.logoVbb,
      name: 'VPbank',
      screen: 'bank_info',
    },
    {icon: Images.ConnectBank.logoShb, name: 'SHB', screen: 'bank_info'},
    {
      icon: Images.ConnectBank.logoTpb,
      name: 'TPbank',
      screen: 'bank_info',
    },
  ];

  const Item = ({title, icon, screen, iconHeight, iconWidth}) => (
    <TouchableOpacity
      style={styles.item}
      onPress={() => {
        console.log('press');
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
          source={icon}
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
        <Header back title={translation.connect_bank} />
      </HeaderBg>

      <View style={[styles.wrap, styles.mb_1, {marginTop: -16}]}>
        <View>
          <View style={styles.icon}>
            <Image source={Images.TabBar.Search} style={styles.image} />
          </View>

          <InputBlock
            placeholder={translation.which_back_are_you_looking_for}
            style={styles.input_text}
          />
        </View>
      </View>

      <View
        style={{
          width: '100%',
          height: 7,
          backgroundColor: Colors.l4,
        }}></View>

      <View style={[styles.wrap, styles.py_1]}>
        <Text size={Fonts.h6} style={{fontWeight: 'bold', marginBottom: 16}}>
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
    top: 48,
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
