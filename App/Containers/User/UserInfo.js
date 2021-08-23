import React from 'react';

import {
  ScrollView,
  Pressable,
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {Button, Text, Icon, Header} from 'components';
import {SCREEN, TEXT} from 'configs/Constants';
import Navigator from 'navigations/Navigator';
import {Colors, Fonts, Images, Spacing, base} from 'themes';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {scale} from 'utils/Functions';

import { useUser } from 'context/User';
import { usePhone } from 'context/Auth/utils';
const UserInfo = () => {
  const {top} = useSafeAreaInsets();
  const { phone } = usePhone();
  const { userInfo } = useUser();
  const PersonalInfo = userInfo.personalInfo;
  const AddressInfo = userInfo.personalAddress;
  const ICInfor = userInfo.personalIC;

  const SexType= {1: 'Nam', 2: 'Nữ', 3: 'Khác'};
  const address = AddressInfo?.Address+", "+AddressInfo?.Ward+", "+AddressInfo?.County+", "+AddressInfo?.Provincial;
  const data = [
    {name: 'Họ tên', val: PersonalInfo?.FullName ? PersonalInfo?.FullName : 'Chưa có'},
    {name: 'Ngày sinh', val: PersonalInfo?.DateOfBirth ? PersonalInfo?.DateOfBirth : 'Chưa có'},
    {name: 'Giới tính', val: SexType[PersonalInfo?.SexType] ? SexType[PersonalInfo?.SexType] : 'Chưa có'},
    {name: 'CMND', val: ICInfor?.ICNumber ? ICInfor?.ICNumber : 'Chưa có'},
    {name: 'Nơi cấp', val: ICInfor?.ICIssuedPlace ? ICInfor?.ICIssuedPlace : 'Chưa có'},
    {name: 'Địa chỉ', val: AddressInfo?.Provincial ? address : 'Chưa có'},
  ];
  return (
    <>
      <ScrollView>
        <View
          style={[
            base.container,
            {
              paddingTop: top + 10,
              paddingBottom: 20,
              backgroundColor: Colors.cl1,
            },
          ]}>
          <Pressable style={styles.left} onPress={() => Navigator.goBack()}>
            <Icon icon={Images.ArrowLeft} tintColor={Colors.white} size={30} />
          </Pressable>

          <View style={{alignItems: 'center'}}>
            <View style={{position: 'relative', marginBottom: 15}}>
              <View
                style={{
                  overflow: 'hidden',
                  height: 94,
                  with: 94,
                  borderRadius: 99,
                  backgroundColor: Colors.g4,
                }}>
                <Image style={{width: 94, height: 94}} source={Images.DefaultUser} />
              </View>
              <View
                style={{
                  overflow: 'hidden',
                  borderRadius: 99,
                  position: 'absolute',
                  alignItems: 'center',
                  justifyContent: 'center',
                  bottom: 0,
                  right: -10,
                  width: 40,
                  height: 40,
                  backgroundColor: Colors.cl4,
                }}>
                <Image style={{width: 16, height: 16}} source={Images.Edit} />
              </View>
            </View>

            <Text color="#fff" size={Fonts.FONT_MEDIUM_LARGE} mb={5}>
              {PersonalInfo?.FullName}
            </Text>
            <Text color="#fff" mb={10}>
              {phone}
            </Text>
            <Button
              bg={Colors.cl4}
              radius={30}
              color={Colors.black}
              label={ICInfor?.Active == 1 ? 'Đã xác thực': 'Chưa xác thực'}
              style={{minWidth: 150}}
              onPress={() => Navigator.push(SCREEN.VERIFY_IDENTITY_CARD)}
            />
          </View>
        </View>
        <View style={[base.container, styles.heading]}>
          <View style={styles.item}>
            <Text style={styles.title}>Thông tin cá nhân</Text>
            <TouchableOpacity
              style={styles.itemRight}
              onPress={() => {
                Navigator.navigate(SCREEN.EDIT_INFO);
              }}>
              <Text style={styles.link}>Chỉnh sửa</Text>
            </TouchableOpacity>
          </View>
        </View>
        {data.map((item, index) => {
          return (
            <View style={[base.container, styles.row]} key={index}>
              <View style={styles.item}>
                <Text>{item.name}</Text>
                <Text style={styles.textRight}>{item.val}</Text>
              </View>
            </View>
          );
        })}

        <View style={[base.container, styles.heading]}>
          <View style={styles.item}>
            <Text style={styles.title}>Thông tin tài khoản</Text>
          </View>
        </View>
        <View style={[base.container, styles.row]}>
          <View style={styles.item}>
            <Text>{ICInfor?.Active == 1 ? 'Đã xác thực': 'Chưa xác thực'}</Text>
            <TouchableOpacity
              style={styles.itemRight}
              onPress={() => {
                Navigator.push(SCREEN.NOTIFICATION);
              }}>
              <Text style={styles.link}>{ICInfor?.Active == 1 ? '': 'Xác thực tài khoản'}</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={[base.container, styles.heading]}>
          <View style={styles.item}>
            <Text style={styles.title}>Thông tin Email</Text>
          </View>
        </View>
        <View style={[base.container, styles.row]}>
          <View style={styles.item}>
            <Text>Chưa có</Text>
            <TouchableOpacity
              style={styles.itemRight}
              onPress={() => {
                Navigator.push(SCREEN.VERIFY_EMAIL);
              }}>
              <Text style={styles.link}>Thêm email</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </>
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
  textRight: {
    marginLeft: 'auto',
    width: scale(180),
    textAlign: 'right',
  }
});
export default UserInfo;
