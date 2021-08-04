import React, {useEffect, useState} from 'react';
import Login from 'components/User/Login';
import {Text, Button, Icon} from 'components';
import {
  ScrollView,
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {SCREEN} from 'configs/Constants';
import Navigator from 'navigations/Navigator';
import {Colors, Fonts, Images, Spacing, base} from 'themes';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {scale} from 'utils/Functions';

const User = () => {
  const {top} = useSafeAreaInsets();
  const data = [
    {name: 'Họ tên', val: 'Nguyen van an'},
    {name: 'Ngày sinh', val: '09/09/1999'},
    {name: 'Giới tính', val: 'Nam'},
    {name: 'CMND', val: 'sss'},
    {name: 'Nơi cấp', val: 'sss'},
    {name: 'Địa chỉ', val: 'sss'},
  ];
  return (
    <ScrollView>
      <View
        style={[
          base.container,
          {
            paddingTop: top + 10,
            paddingBottom: 30,
            backgroundColor: Colors.cl1,
          },
        ]}>
        <View style={{flexDirection: 'row'}}>
          <View
            style={{
              overflow: 'hidden',
              marginRight: 20,
              height: 48,
              with: 48,
              borderRadius: 99,
              backgroundColor: Colors.black,
            }}>
            <Image
              style={{width: 48, height: 48}}
              source={{
                uri: 'https://mangoads.vn/learn/wp-content/uploads/2020/08/7-huong-dan-phan-hoi-680x510.jpg',
              }}
            />
          </View>
          <View>
            <Text color="#fff" size={Fonts.FONT_MEDIUM_LARGE} mb={5}>
              Nguyễn Văn A
            </Text>
            <Text color="#fff" mb={10}>
              0908000000
            </Text>
            <Button
              bg={Colors.cl4}
              radius={30}
              color={Colors.black}
              label="Xác thực tài khoản"
              onPress={() => Navigator.push(SCREEN.VERIFY_USER_INFO)}
            />
          </View>
          <View style={{marginLeft: 'auto'}}>
            <TouchableOpacity
              onPress={() => {
                Navigator.push(SCREEN.USER_INFO);
              }}>
              <Icon
                icon={Images.ArrowRight}
                tintColor={Colors.white}
                size={30}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={[base.container, styles.heading]}>
        <View style={styles.item}>
          <Text style={styles.title}>Epay của tôi</Text>
        </View>
      </View>
      <View style={[base.container, styles.row]}>
        <View style={styles.item}>
          <TouchableOpacity
            style={{flexDirection: 'row'}}
            onPress={() => {
              Navigator.push(SCREEN.NOTIFICATION);
            }}>
            <Text>Số dư</Text>
            <Text style={{marginLeft: 10}} bold>
              12.000.000 vnd
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={[base.container, styles.row]}>
        <View style={styles.item}>
          <TouchableOpacity
            onPress={() => {
              Navigator.push(SCREEN.BANK_LIST);
            }}>
            <Text>Ngân hàng liên kết (2)</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={[base.container, styles.row]}>
        <View style={styles.item}>
          <TouchableOpacity
            onPress={() => {
              Navigator.push(SCREEN.NOTIFICATION);
            }}>
            <Text>Mã thanh toán của tôi</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={[base.container, styles.heading]}>
        <View style={styles.item}>
          <Text style={styles.title}>Cài Đặt</Text>
        </View>
      </View>
      <View style={[base.container, styles.row]}>
        <View style={styles.item}>
          <TouchableOpacity
            onPress={() => {
              Navigator.push(SCREEN.PAYMENT_SETTINGS);
            }}>
            <Text>Cài đặt thanh toán</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={[base.container, styles.row]}>
        <View style={styles.item}>
          <TouchableOpacity
            onPress={() => {
              Navigator.push(SCREEN.SECURITY);
            }}>
            <Text>Mật khẩu và bảo mật</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={[base.container, styles.row]}>
        <View style={styles.item}>
          <TouchableOpacity
            onPress={() => {
              Navigator.push(SCREEN.LANGUAGE_SETTING);
            }}>
            <Text>Cài đặt ngôn ngữ</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={[base.container, styles.heading]}>
        <View style={styles.item}>
          <Text style={styles.title}>Hỗ trợ</Text>
        </View>
      </View>
      <View style={[base.container, styles.row]}>
        <View style={styles.item}>
          <TouchableOpacity
            onPress={() => {
              Navigator.push(SCREEN.NOTIFICATION);
            }}>
            <Text>Trung tâm trợ giúp</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  heading: {
    marginTop: 20,
    borderBottomColor: Colors.l4,
    borderBottomWidth: 1,
  },
  title: {
    textTransform: 'uppercase',
  },
  link: {
    textDecorationLine: 'underline',
  },
  row: {
    backgroundColor: Colors.white,
    borderBottomColor: Colors.l4,
    borderBottomWidth: 1,
  },
  item: {
    flexDirection: 'row',
    paddingVertical: 12,
  },
  itemRight: {
    marginLeft: 'auto',
  },
});
export default User;
