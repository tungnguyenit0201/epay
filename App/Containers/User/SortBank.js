import React, {useEffect, useState} from 'react';
import {
  Text,
  HeaderBg,
  Icon,
  Header,
  Row,
  Col,
  Button,
  Modal,
  FooterContainer,
} from 'components';
import {
  ScrollView,
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {PERSONAL_IC, SCREEN} from 'configs/Constants';
import Navigator from 'navigations/Navigator';
import {Colors, Fonts, Images, Spacing} from 'themes';
import {scale, formatMoney} from 'utils/Functions';
import {useTranslation} from 'context/Language';

import {useUser} from 'context/User';
import {useAuth} from 'context/Auth/utils';
import {useError} from 'context/Common/utils';

const BankItem = ({title, icon, overBalance, item, callback}) => (
  <TouchableOpacity
    style={[styles.flexRowType1, styles.boxShadowGray]}
    onPress={() => {
      callback?.(item);
    }}
  >
    <Image
      source={icon}
      style={[
        {
          width: 32,
          aspectRatio: 1,
        },
        styles.mr1,
      ]}
      resizeMode={'contain'}
    />
    <View style={[styles.flex1, styles.pr1]}>
      <Text fs="h6" bold>
        {title}
      </Text>
      <Text color={Colors.tp3}>Số dư: {overBalance}</Text>
    </View>
    <Image
      source={Images.Profile.Menu}
      style={[
        {
          width: 24,
          aspectRatio: 1,
        },
      ]}
      resizeMode={'contain'}
    />
  </TouchableOpacity>
);

const SortBank = () => {
  const translation = useTranslation();
  const {userInfo} = useUser();
  const {setError} = useError();

  //test data
  const bankData = [
    {
      logo: Images.ConnectBank.logoVcb,
      BankName: 'Vietcombank',
      overBalance: '2.000.000đ',
    },
    {
      logo: Images.ConnectBank.logoAgribank,
      BankName: 'Agribank',
      overBalance: '2.000.000đ',
    },
    {
      logo: Images.ConnectBank.logoBidv,
      BankName: 'BIDV',
      overBalance: '2.000.000đ',
    },
  ];

  return (
    //TODO: TRANSLATE
    <View flex={1} backgroundColor={Colors.bs4}>
      <HeaderBg mb={0}>
        <Header back title={'Trình tự thanh toán'} />
      </HeaderBg>

      <ScrollView contentContainerStyle={styles.container}>
        <Text bold size={Fonts.LG} mb={16}>
          Di chuyển để sắp xếp thứ tự thanh toán theo mong muốn của bạn
        </Text>

        <Text fs="md" color={Colors.tp3} mb={24}>
          Áp dụng cho toàn bộ dịch vụ bao gồm thanh toán tự động
        </Text>

        <Row>
          {bankData.map((item, index) => {
            return (
              <Col width={'100%'} key={index} style={{marginBottom: 16}}>
                <BankItem
                  //   callback={onPress}
                  callback={() => Navigator.navigate(SCREEN.LINKED_BANK_DETAIL)}
                  // bankInfo={bankInfo}
                  title={item.BankName}
                  icon={item.logo}
                  item={item}
                />
              </Col>
            );
          })}
        </Row>
      </ScrollView>

      <FooterContainer>
        <Button size="lg" label={'Lưu'} />
      </FooterContainer>

      {/* notify success
      <FooterContainer style={[styles.boxNotify1,styles.pos1,{
        transform: [{translateY: '0'}],
      }]}>
        <View style={styles.flexRow}>
          <Image
            source={Images.TransactionHistory.Success}
            style={styles.iconAdd}
            resizeMode={'contain'}
          />
          <Text ml={16} fs="h6" style={styles.flex1} color={Colors.tp1}>
            Cài đặt mặc định thành công</Text>
        </View>
      </FooterContainer> */}
    </View>
  );
};
const styles = StyleSheet.create({
  flex1: {flex: 1},
  //----------------
  flexRow: {flexDirection: 'row'},
  //----------------
  mr1: {marginRight: 10},
  //----------------
  pr1: {paddingRight: 10},
  //----------------
  flexRowType1: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  //----------------
  container: {
    flex: 1,
    paddingHorizontal: Spacing.PADDING,
    paddingTop: 24,
    paddingBottom: 40,
  },
  //---------------
  pos1: {
    position: 'absolute',
    bottom: 0,
    left: 0,
  },
  //------------
  notify1: {
    width: 18,
    height: 18,
    paddingTop: 3,
    borderRadius: 100,
    backgroundColor: Colors.Highlight,
  },
  //---------------
  boxShadowGray: {
    backgroundColor: Colors.bs4,
    shadowOpacity: 0.2,
    shadowOffset: {width: 0, height: 0},
    elevation: 24,
    shadowRadius: 8,
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 14,
  },
});
export default SortBank;
