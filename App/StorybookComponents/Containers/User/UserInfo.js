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
      <HeaderBg mb={0}>
        <Header back title="Trang cá nhân" />
      </HeaderBg>
      <ScrollView style={base.wrap}>
        <View style={[base.container]}>
          <View style={{alignItems: 'center', marginBottom: 20}}>
            <Pressable style={{marginBottom: 15}}>
              <View style={styles.avatar}>
                <Image
                  style={{width: 94, height: 94}}
                  source={Images.Kyc.Test.default}
                  resizeMode="cover"
                />
              </View>
              <View style={styles.wedit}>
                <Image
                  style={{width: 16, height: 16, tintColor: Colors.g5}}
                  source={Images.Edit.default}
                />
              </View>
            </Pressable>

            <Text fs="h5" bold mb={5}>
              Phước Lộc
            </Text>
            <Text mb={10}>0907999999</Text>

            <StatusUser />
          </View>

          <DinhDanh />

          <View style={[base.boxShadow]}>
            <View style={styles.heading}>
              <View>
                <Text bold fs="h5" mb={5}>
                  Thông tin cá nhân
                </Text>
                <Text style={styles.headingDesc}>
                  TLorem Ipsum is simply dummy...
                </Text>
              </View>
              <TouchableOpacity style={base.leftAuto}>
                <Image
                  style={[styles.editBox]}
                  source={require('images/profile/Edit2.png').default}
                />
              </TouchableOpacity>
            </View>
            {data.map((item, index) => {
              return (
                <View
                  style={[
                    styles.rowItem,
                    base.row,
                    index == 0 && styles.rowFirst,
                  ]}
                  key={index}>
                  {/* <Image source={item.icon} /> */}
                  <Text style={styles.rowTitle}>{item.name}</Text>
                  <Text style={base.leftAuto}>{item.val}</Text>
                </View>
              );
            })}
            <View style={[styles.rowItem]}>
              {/* <Image
                style={[styles.rowIcon]}
                source={require('images/profile/CMND.png').default}
              /> */}
              <View>
                <Text mt={3} mb={5} style={styles.rowTitle}>
                  CMND/CCCD/Hộ chiếu
                </Text>
                <Text style={[styles.rowVal]}>3016859236</Text>
              </View>
            </View>
            <View style={[styles.rowItem]}>
              {/* <Image
                style={[styles.rowIcon]}
                source={require('images/profile/Location.png').default}
              /> */}
              <View>
                <Text mt={3} mb={5} style={styles.rowTitle}>
                  Địa chỉ
                </Text>
                <Text style={[styles.rowVal]}>
                  123, Phường 4, Quận 5, TP.HCM
                </Text>
              </View>
            </View>
          </View>

          <View style={[base.boxShadow]}>
            <View style={styles.heading}>
              <View>
                <Text bold fs="h5" mb={5}>
                  Thông tin tài khoản
                </Text>
                <Text style={styles.headingDesc}>
                  TLorem Ipsum is simply dummy...
                </Text>
              </View>

              <TouchableOpacity style={base.leftAuto}>
                <Image
                  style={[styles.editBox]}
                  source={require('images/profile/Edit2.png').default}
                />
              </TouchableOpacity>
            </View>

            <View style={[base.row]}>
              <Image
                style={[styles.rowIcon]}
                source={require('images/profile/Wating.png').default}
              />
              <View>
                <Text style={styles.rowVal}>Đã xác thực tài khoản</Text>
                <TouchableOpacity style={styles.itemRight}>
                  <Text style={styles.link}>Đổi giấy tờ tùy thân</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <View style={[base.boxShadow]}>
            <View style={styles.heading}>
              <View>
                <Text bold fs="h5" mb={5}>
                  Thông tin Email
                </Text>
                <Text style={styles.headingDesc}>
                  TLorem Ipsum is simply dummy...
                </Text>
              </View>

              <TouchableOpacity style={base.leftAuto}>
                <Image
                  style={[styles.editBox]}
                  source={require('images/profile/Edit2.png').default}
                />
              </TouchableOpacity>
            </View>

            <View style={[base.row]}>
              <Image
                style={[styles.rowIcon]}
                source={require('images/profile/Email.png')}
              />
              <Text style={styles.rowTitle}>epay@gmail.com</Text>
            </View>
          </View>
          <View style={{height: 40}}></View>
        </View>
      </ScrollView>
    </>
  );
};
const styles = StyleSheet.create({
  avatar: {
    overflow: 'hidden',
    height: 94,
    width: 94,
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
    width: 40,
    height: 40,

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
export default UserInfo;
