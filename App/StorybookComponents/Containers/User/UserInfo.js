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
const UserInfo = () => {
  const translation = require('../../../Context/Language/vi.json');
  const data = [
    {
      name: 'Họ tên',
      val: 'Ca si lát',
    },
    {
      name: 'Ngày sinh',
      val: '20/05/1981',
    },
    {
      name: 'Giới tính',
      val: 'Nam',
    },
    {name: 'CMND', val: '3016852365'},
    {
      name: 'Nơi cấp',
      val: 'Tây Ninh',
    },
    {name: 'Địa chỉ', val: 'Tây Ninh'},
  ];

  return (
    <>
      <ScrollView style={{backgroundColor: Colors.g2}}>
        <View
          style={[
            base.container,
            {
              paddingTop: 10,
              paddingBottom: 20,
              backgroundColor: Colors.cl1,
            },
          ]}>
          <Pressable onPress={() => console.log('onPress')}>
            <Icon icon={Images.ArrowLeft} tintColor={Colors.white} size={30} />
          </Pressable>
          <View style={{alignItems: 'center'}}>
            <Pressable style={{marginBottom: 15}}>
              <View
                style={{
                  overflow: 'hidden',
                  height: 94,
                  with: 94,
                  borderRadius: 99,
                  backgroundColor: Colors.g4,
                }}>
                <Image
                  style={{width: 94, height: 94}}
                  source={Images.DefaultUser.default}
                  resizeMode="cover"
                />
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
                <Image
                  style={{width: 16, height: 16}}
                  source={Images.Edit.default}
                />
              </View>
            </Pressable>

            <Text
              color={Colors.white}
              style={{textTransform: 'uppercase'}}
              mb={5}>
              Ca si lát
            </Text>
            <Text color={Colors.white} mb={10}>
              0907856256
            </Text>
            <Button
              disabled={true}
              bg={Colors.cl4}
              radius={30}
              color={Colors.black}
              label={'Đã xác thực'}
              style={{minWidth: 150}}
            />
          </View>
        </View>
        <View style={[base.container, styles.heading]}>
          <View style={styles.item}>
            <Text style={styles.title}>Thông tin cá nhân</Text>
            <TouchableOpacity
              style={styles.itemRight}
              onPress={() => {
                Navigator.push(SCREEN.EDIT_INFO);
              }}>
              <Text style={[styles.link]}>Chỉnh sửa</Text>
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
          <View style={[styles.item]}>
            <Text style={[styles.title]}>Thông tin tài khoản</Text>
          </View>
        </View>
        <View style={[base.container, styles.row]}>
          <View style={styles.item}>
            <Text>Đã xác thực</Text>
            <TouchableOpacity style={styles.itemRight}>
              <Text style={[styles.link]}>Đổi giấy tờ tùy thân</Text>
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
            <Text>epay123@gmail.com</Text>
            <TouchableOpacity style={styles.itemRight}>
              <Text style={[styles.link]}>Chỉnh sửa</Text>
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
    justifyContent: 'space-between',
  },
  itemRight: {
    marginLeft: 'auto',
  },
  textRight: {
    marginLeft: 'auto',
    width: scale(180),
    textAlign: 'right',
  },
});
export default UserInfo;
