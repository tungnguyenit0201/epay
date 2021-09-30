import React from 'react';

import {
  ScrollView,
  Pressable,
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {Colors, Fonts, Images, Spacing, base} from 'themes';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {scale} from 'utils/Functions';

import Button from '../../Atoms/Button';
import Text from '../../Atoms/Text';
import Icon from '../../Atoms/Icon';
import Header from '../../Atoms/Header';
import HeaderBg from '../../Atoms/HeaderBg';
import StatusUser from '../../Groups/StatusUser';
import DinhDanh from '../../Groups/DinhDanh';
import TextInput from '../../Atoms/TextInput';
import Row from '../../Atoms/Row';
import Col from '../../Atoms/Col';
import Radio from '../../Atoms/Radio';
import Bank from '../../Groups/Bank';
import Wrapper from '../../Groups/Wrapper';
import FooterContainer from '../../Atoms/FooterContainer';
const TransferPhone = () => {
  const translation = require('../../../Context/Language/vi.json');
  const data = [
    {
      name: 'Họ tên',
      val: 'Phước Lộc',
      icon: require('images/profile/User.png').default,
    },
    {
      name: 'Ngày sinh',
      val: '17/05/1998',
      icon: require('images/storybook/calendar.png').default,
    },
    {
      name: 'Giới tính',
      val: 'Nam',
      icon: require('images/storybook/sex.png').default,
    },
  ];

  return (
    <Wrapper>
      <HeaderBg mb={0}>
        <Header
          back
          title="Chuyển tiền đến"
          style={{marginTop: 25, marginBottom: -10}}
        />
      </HeaderBg>
      <ScrollView style={base.wrap}>
        <View style={[base.container]}>
          <View style={{alignItems: 'center', marginBottom: 20}}>
            <Pressable style={{marginBottom: 15}}>
              <View style={styles.avatar}>
                <Image
                  style={{width: 120, height: 120}}
                  source={Images.Kyc.Test.default}
                  resizeMode="cover"
                />
              </View>
            </Pressable>
            <Text fs="h5" bold mb={5}>
              Nguyễn Văn A
            </Text>
            <Text mb={10}>090****456</Text>
            <Text
              bold
              style={{
                fontSize: 30,
                color: '#141212',
                position: 'relative',
                marginTop: 20,
              }}>
              100.000
              <Text style={{position: 'absolute', bottom: 5}}>vnđ</Text>
            </Text>
          </View>
          <TextInput defaultValue={'Chuyen tien cho A'} />
          <Row justify="space-between">
            <Col
              width="40%"
              style={{
                flex: 1,
                flexDirection: 'row',
                alignItems: 'center',
                height: 35,
              }}>
              <Radio
                items={[{label: '', value: 1}]}
                selectedValue={1}
                style={{marginTop: 18}}
              />
              <Text>Người gửi chịu phí</Text>
            </Col>
            <Col
              width="40%"
              style={{
                flex: 1,
                flexDirection: 'row',
                alignItems: 'center',
                height: 35,
              }}>
              <Radio items={[{label: '', value: 1}]} style={{marginTop: 18}} />
              <Text>Người gửi chịu phí</Text>
            </Col>
          </Row>
        </View>
        <View
          style={{
            height: 8,
            backgroundColor: '#E7E7E7',
            marginTop: 25,
            marginBottom: 35,
          }}></View>
        <View style={base.container}>
          <Bank />
        </View>
      </ScrollView>
      <FooterContainer>
        <Image
          source={Images.Gradient.B_Continue.default}
          style={base.buttonSB}
        />
      </FooterContainer>
    </Wrapper>
  );
};
const styles = StyleSheet.create({
  avatar: {
    overflow: 'hidden',
    height: 120,
    width: 120,
    borderRadius: 99,
    backgroundColor: Colors.g4,
  },
  wedit: {
    overflow: 'hidden',
    borderRadius: 99,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    bottom: 0,
    right: -10,
    width: 35,
    height: 35,

    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.cl4,
  },
  heading: {
    flexDirection: 'row',
    marginBottom: 20,
  },

  editBox: {
    width: scale(46),
    height: scale(46),
    marginTop: -10,
    marginRight: -10,
  },

  rowItem: {
    flexDirection: 'row',
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: Colors.g2,
    marginHorizontal: -15,
    paddingHorizontal: 15,
    justifyContent: 'space-between',
  },
  rowFirst: {
    borderTopWidth: 0,
  },

  rowIcon: {
    width: 24,
    height: 24,
    marginRight: 5,
  },
  rowTitle: {
    fontSize: Fonts.H6,
    fontWeight: '500',
  },
  rowVal: {
    //color: Colors.g2,
  },
});
export default TransferPhone;
