import React, {useRef, useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  Pressable,
  Image,
  RefreshControl,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {Colors, Fonts, base, Images, Spacing} from 'themes';
import Text from '../../Atoms/Text';
import Header from '../../Atoms/Header';
import HeaderBg from '../../Atoms/HeaderBg';
import TextInput from '../../Atoms/TextInput';
import Icon from '../../Atoms/Icon';
import Wrapper from '../../Groups/Wrapper';
import FooterContainer from '../../Atoms/FooterContainer';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {scale} from '../../Utils/Functions';

const NOTIFY = {
  ALL: 'Tất cả',
  CHARGES: 'Hệ thống',
  PROMOTION: 'Khuyến mãi',
  OTHER: 'Giao dịch',
};
const dataType = [
  {id: 0, title: NOTIFY.ALL},
  {id: 1, title: NOTIFY.CHARGES},
  {id: 2, title: NOTIFY.PROMOTION},
  {id: 3, title: NOTIFY.OTHER},
];
const data = [
  {
    Title: 'Happyday',
    Content: 'Áp sụng cho hóa đơn trên 50k',
    Promo: 'Giảm 30k',
    Expiry: '30/09/2021',
  },
  {
    Title: 'Happyday',
    Content: 'Áp sụng cho hóa đơn trên 50k',
    Promo: 'Giảm 30k',
    Expiry: '30/09/2021',
  },
];
const Notification = () => {
  const translation = require('../../../Context/Language/vi.json');
  const [type, setType] = useState(NOTIFY.ALL);
  const [value, setValue] = useState('');
  const dataType = [
    {id: 0, title: NOTIFY.ALL},
    {id: 1, title: NOTIFY.CHARGES},
    {id: 2, title: NOTIFY.PROMOTION},
    {id: 3, title: NOTIFY.OTHER},
  ];
  const handleChange = e => {
    setValue(e);
  };
  return (
    <Wrapper>
      <SafeAreaProvider>
        <HeaderBg>
          <Header
            title={'Thêm mã khuyến mãi'}
            back
            style={{marginTop: 24, marginBottom: -15}}
          />
          <Image
            source={require('images/noti/TickCircle.png')}
            style={styles.TickCircle}
          />
        </HeaderBg>
        <View style={styles.wrap}>
          <View style={[base.container, styles.flexRow]}>
            <View style={{flex: 1, flexDirection: 'row'}}>
              <View stye={{position: 'relative'}}>
                <TextInput
                  style={{
                    width: 240,
                    marginRight: 8,
                    borderRadius: 8,
                    outline: 'none',
                  }}
                  value={value}
                  onChange={handleChange}
                />
                {value && (
                  <Icon
                    icon={require('images/Close.png')}
                    style={{
                      width: 10,
                      height: 10,
                      position: 'absolute',
                      right: 22,
                      top: 18,
                    }}
                  />
                )}
              </View>

              <View
                style={{
                  width: 80,
                  height: 48,
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: '#1F5CAB',
                  borderRadius: 8,
                  cursor: 'pointer',
                }}>
                <Text style={{color: '#FFFFFF'}}>Áp dụng</Text>
              </View>
            </View>
          </View>
          <View>
            <View style={[base.container]}>
              <Text style={{fontSize: 14, color: 'red', marginBottom: 15}}>
                Mã không hợp lệ
              </Text>
              {data.length !== 0 ? (
                data.map((item, index) => {
                  console.log(item);
                  return (
                    <Pressable
                      style={[base.boxShadow, index % 2 ? styles.isRead : '']}
                      key={index}>
                      <View
                        style={{
                          flex: 1,
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                        }}>
                        <Text style={[styles.title]}>{item?.Title}</Text>
                        <Text style={[styles.title, {fontSize: 14}]}>
                          {item?.Promo}
                        </Text>
                      </View>

                      <View
                        style={{
                          flex: 1,
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                        }}>
                        <Text style={[styles.content]}>{item?.Content}</Text>
                        <Text style={[styles.content, {color: '#1F5CAB'}]}>
                          Điều kiện
                        </Text>
                      </View>
                      <Text style={{marginTop: 8, fontSize: 13}}>
                        HSD: {item.Expiry}
                      </Text>
                    </Pressable>
                  );
                })
              ) : (
                // TODO: translate
                <>
                  <View style={styles.emtyNoti}>
                    <Image
                      source={require('images/noti/Noti.png')}
                      style={styles.imgSuccess}
                    />
                    <Text>Không có thông báo nào</Text>
                  </View>
                </>
              )}
            </View>
            <View style={{height: 120}}></View>
          </View>
        </View>
      </SafeAreaProvider>
      <FooterContainer>
        <Image
          source={require('images/gradient/B_use.png').default}
          style={{height: 48, borderRadius: 8, cursor: 'pointer'}}
        />
      </FooterContainer>
    </Wrapper>
  );
};
const styles = StyleSheet.create({
  wrap: {
    paddingTop: 20,
    paddingBottom: 150,
  },

  emtyNoti: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 100,
  },

  imgSuccess: {
    width: 80,
    height: 80,
    marginBottom: 10,
  },

  TickCircle: {
    width: 24,
    height: 24,
    position: 'absolute',
    right: Spacing.PADDING,
    bottom: 20,
  },
  bgImg: {
    width: scale(375),
    height: scale(375),
    position: 'absolute',
    bottom: 0,
    right: 0,
  },
  isRead: {
    backgroundColor: '#EEF6FF',
  },
  tag: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: scale(5),
    paddingHorizontal: scale(10),
    borderRadius: 99,
    backgroundColor: Colors.white,
    height: 32,
    borderColor: Colors.l2,
    borderWidth: 1,
    marginRight: scale(5),
  },
  tagActive: {
    backgroundColor: Colors.cl1,
    borderColor: Colors.cl1,
  },

  flexRow: {flexDirection: 'row', paddingBottom: 15},
  head: {
    paddingBottom: 10,
    //marginBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },

  date: {
    marginLeft: 'auto',
    fontSize: 12,
  },

  title: {fontWeight: 'bold', fontSize: 15, marginBottom: 10},

  icon: {
    width: 20,
    height: 20,
  },
  imageNotify: {
    width: '100%',
    height: 400,
    marginTop: 30,
  },

  textWhite: {
    color: Colors.white,
  },
  content: {
    fontSize: 13,
  },
});
export default Notification;
