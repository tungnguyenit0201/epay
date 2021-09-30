import React, {useRef, useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  Pressable,
  Image,
  RefreshControl,
  FlatList,
} from 'react-native';
import {Colors, Fonts, base, Images, Spacing} from 'themes';
import Text from '../../Atoms/Text';
import Header from '../../Atoms/Header';
import HeaderBg from '../../Atoms/HeaderBg';

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
    Content:
      'Hãy thể hiện tình yêu của bạn với công nghệ bằng cách trải nghiệm thanh toán ăn vặt hiện đại trên EPAY ngay hôm nay.',
    ContentImgUrl:
      'https://portal.epayservices.com.vn/images/promo/promo-11-08-2020.jpg',
    Time: '10-08-2020 20:47:04',
    Title: 'Ăn vặt thời 4.0, bạn đã thử chưa',
  },
  {
    Content:
      'Nhận ngay ưu đãi lên đến 498K khi thanh toán cùng chúng tôi: \n-Hội viên mới đăng ký 2 tháng: chỉ 699K (miễn phí Hội viên)',
    ContentImgUrl:
      'https://portal.epayservices.com.vn/images/promo/TNG-17-09-2020.jpg',
    Time: '16-09-2020 08:51:02',
    Title: 'Thanh toán EPAY - Giảm ngay 99K',
  },
];
const Notification = () => {
  const translation = require('../../../Context/Language/vi.json');
  const [type, setType] = useState(NOTIFY.ALL);
  const dataType = [
    {id: 0, title: NOTIFY.ALL},
    {id: 1, title: NOTIFY.CHARGES},
    {id: 2, title: NOTIFY.PROMOTION},
    {id: 3, title: NOTIFY.OTHER},
  ];

  return (
    <>
      <HeaderBg>
        <Header
          title={translation.notification}
          back
          style={{marginTop: 25, marginBottom: -15}}
        />
        <Image
          source={require('images/noti/TickCircle.png')}
          style={styles.TickCircle}
        />
      </HeaderBg>
      <View style={styles.wrap}>
        <View style={[base.container, styles.flexRow]}>
          <FlatList
            data={dataType}
            keyExtractor={item => item.title}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            renderItem={({item}) => (
              <Pressable
                style={[styles.tag, type === item.title && styles.tagActive]}
                onPress={() => {
                  setType(item.title);
                }}>
                <Text style={[type === item.title && styles.textWhite]}>
                  {item.title}
                </Text>
              </Pressable>
            )}
          />
        </View>
        <ScrollView>
          <View style={[base.container]}>
            {data.length !== 0 ? (
              data.map((item, index) => {
                console.log(item);
                return (
                  <Pressable
                    style={[base.boxShadow, index % 2 ? styles.isRead : '']}
                    key={index}>
                    <View style={styles.head}>
                      <Image
                        source={require('images/favicon.png').default}
                        style={styles.icon}
                      />
                      <Text style={[styles.date]}>{item?.Time}</Text>
                    </View>

                    <Text style={[styles.title]}>{item?.Title}</Text>

                    <Text style={styles.content}>{item?.Content}</Text>
                    {/* {item?.ContentImgUrl && (
                      <Image
                        source={{uri: `${item?.ContentImgUrl}`}}
                        style={styles.imageNotify}
                      />
                    )} */}
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
        </ScrollView>
      </View>
      {data.length !== 0 ? (
        data.map((item, index) => {})
      ) : (
        <Image source={require('images/wave.png')} style={styles.bgImg} />
      )}
      {/* <FooterNotification /> */}
    </>
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
    backgroundColor: Colors.l2,
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

  title: {fontWeight: 'bold', fontSize: Fonts.H6, marginBottom: 10},

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
});
export default Notification;
