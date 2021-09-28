import React, {useEffect, useState} from 'react';
import Text from '../../Atoms/Text';
import HeaderBg from '../../Atoms/HeaderBg';
import Icon from '../../Atoms/Icon';
import Header from '../../Atoms/Header';
import {
  ScrollView,
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
} from 'react-native';
import {Colors, Fonts, Images, Spacing, base} from 'themes';
import {scale, formatMoney} from 'utils/Functions';

import UserInfo from '../../Groups/UserInfo';
import DinhDanh from '../../Groups/DinhDanh';
import Account from '../../Groups/Account';
import Row from '../../Atoms/Row';
import Col from '../../Atoms/Col';
import Button from '../../Atoms/Button';
import FooterContainer from '../../Atoms/FooterContainer';
import Wrapper from '../../Groups/Wrapper';
const User = () => {
  const translation = require('../../../Context/Language/vi.json');
  const {width, height} = useWindowDimensions();
  // TODO: translate
  return (
    <Wrapper>
      <View>
        <HeaderBg>
          <Header
            back
            title={translation.bank_account}
            style={{marginTop: 25, marginBottom: -15}}
          />
        </HeaderBg>
        <ScrollView style={[base.wrap]}>
          <View style={[base.container]}>
            <UserInfo style={[{marginBottom: 20}]} />
            {/* <DinhDanh /> */}
            <Account />
          </View>
          <Row space={10} style={[{marginBottom: 30}]}>
            <Col space={10}>
              <TouchableOpacity style={styles.item}>
                <Image
                  style={[styles.icon]}
                  source={Images.Profile.MaThanhToan.default}
                />
                <Text bold>Mã thanh toán</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.item}>
                <Image
                  style={[styles.icon]}
                  source={Images.Profile.ThanhToan.default}
                />
                <Text bold>{`Cài đặt hạn mức\n thanh toán`}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.item}>
                <Image
                  style={[styles.icon]}
                  source={Images.Profile.BaoMat.default}
                />
                <Text bold>{translation.password_and_security} </Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.item}>
                <Image
                  style={[styles.icon]}
                  source={require('images/storybook/task.png').default}
                />
                <Text bold>{'Trình tự thanh toán'} </Text>
              </TouchableOpacity>
            </Col>
            <Col space={10}>
              <TouchableOpacity style={styles.item}>
                <Image
                  style={[styles.icon]}
                  source={require('images/profile/NapVI.png').default}
                />
                <Text bold>Nạp ví tự động</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.item}>
                <Image
                  style={[styles.icon]}
                  source={require('images/profile/OTP.png').default}
                />
                <Text bold>Cài đặt Smart OTP </Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.item}>
                <Image
                  style={[styles.icon]}
                  source={Images.Profile.Translate.default}
                />
                <Text bold>{translation.language_setting} </Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.item}>
                <Image
                  style={[styles.icon]}
                  source={require('images/profile/Noti.png').default}
                />
                <Text bold>Cài đặt thông báo</Text>
              </TouchableOpacity>
            </Col>
          </Row>
          <TouchableOpacity
            style={[base.row, styles.itemMenu]}
            onPress={() => {
              Navigator.navigate(SCREEN.NOTIFICATION);
            }}>
            <Image
              style={[styles.iconMenu]}
              source={require('images/profile/Support.png').default}
            />
            <Text fs="h6" bold ml={10}>
              Trung tâm trợ giúp
            </Text>
            <Icon
              style={[base.leftAuto]}
              size={24}
              icon={Images.ArrowRight}
              tintColor={Colors.g3}
            />
          </TouchableOpacity>
          <TouchableOpacity style={[base.row, styles.itemMenu]}>
            <Image
              style={[styles.iconMenu]}
              source={require('images/profile/Info.png').default}
            />
            <Text fs="h6" bold ml={10}>
              {'Thông tin ứng dụng'}
            </Text>

            <Icon
              style={[base.leftAuto]}
              size={24}
              icon={Images.ArrowRight}
              tintColor={Colors.g3}
            />
          </TouchableOpacity>
        </ScrollView>
      </View>
      <View style={{marginBottom: 35}}>
        <Image
          source={require('images/storybook/logout.png').default}
          style={base.buttonSB}
        />
      </View>
    </Wrapper>
  );
};
const styles = StyleSheet.create({
  item: {
    padding: 10,
    backgroundColor: Colors.white,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: Colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  icon: {
    marginBottom: 5,
    width: 32,
    height: 32,
  },

  itemMenu: {
    borderTopColor: Colors.g2,
    borderTopWidth: 1,
    paddingVertical: 10,
  },
  iconMenu: {
    width: 32,
    height: 32,
  },

  boxLogout: {
    marginTop: 30,
    paddingTop: scale(20),
    paddingHorizontal: scale(20),
    paddingBottom: scale(260),
    backgroundColor: Colors.white,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    shadowColor: Colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
export default User;
