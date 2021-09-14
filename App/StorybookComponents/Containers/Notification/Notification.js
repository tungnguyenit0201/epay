import React, { useRef, useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  Pressable,
  Image,
  RefreshControl,
  FlatList,
} from 'react-native';
import Text from '../../Atoms/Text'
import Header from '../../Atoms/Header'
import HeaderBg from '../../Atoms/HeaderBg'

import { Colors, Fonts, base, Images } from 'themes';

import { scale } from 'utils/Functions';


// import FooterNotification from 'components/Home/FooterNotification';
// import {useNotify} from 'context/User/utils';

const NOTIFY = {
  ALL: 'Tất cả',
  CHARGES: 'Hệ thống',
  PROMOTION: 'Khuyến mãi',
  OTHER: 'Giao dịch',
};
const Notification = () => {
  const translation = require('../../../Context/Language/vi.json');
  const [type, setType] = useState(NOTIFY.ALL);
  const [refreshing, setRefreshing] = useState(false);
  // const {selectNotify, onGetAllNotify} = useNotify();
  const dataType = [
    { id: 0, title: NOTIFY.ALL },
    { id: 1, title: NOTIFY.CHARGES },
    { id: 2, title: NOTIFY.PROMOTION },
    { id: 3, title: NOTIFY.OTHER },
  ];
  const data = [
    {
      "Content": "Hãy thể hiện tình yêu của bạn với công nghệ bằng cách trải nghiệm thanh toán ăn vặt hiện đại trên EPAY ngay hôm nay. Bạn sẽ được thử cảm giác “ E-xèng rơi vỡ đầu “, thanh toán siêu tốc độ và ăn không giới hạn. Tầng 10 vào lúc 14H30 đến 15H30 EPAY rất vui lòng được phục vụ bạn.",
      "ContentImgUrl": "https://portal.epayservices.com.vn/images/promo/promo-11-08-2020.jpg",
      "Time": "10-08-2020 20:47:04",
      "Title": "Ăn vặt thời 4.0, bạn đã thử chưa",
    },
    {
      "Content": "Nhận ngay ưu đãi lên đến 498K khi thanh toán cùng chúng tôi: \n-Hội viên mới đăng ký 2 tháng: chỉ 699K (miễn phí Hội viên) \n-Hội viên cũ gia hạn 1 tháng: Chỉ 300K (COUPON CODE: EPAY99)",
      "ContentImgUrl": "https://portal.epayservices.com.vn/images/promo/TNG-17-09-2020.jpg",
      "Time": "16-09-2020 08:51:02",
      "Title": "Thanh toán EPAY - Giảm ngay 99K",
    }
  ]
  return (
    <>
      <HeaderBg>
        <Header title={translation.notification} back />
      </HeaderBg>
      <View style={[base.container, styles.row, styles.flexRow]}>
        <FlatList
          data={dataType}
          keyExtractor={item => item.title}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
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
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => {
              setRefreshing(true);
              console.log('hello');
              setRefreshing(false);
            }}
          />
        }>
        {data.length !== 0 ? (
          data.map((item, index) => {
            return (
              <View style={[base.container, styles.row]} key={index}>
                <View style={[styles.head]}>
                  <Image
                    source={require('images/favicon.png').default}
                    style={[styles.icon]}
                  />
                  <Text style={[styles.date]}>{item?.Time}</Text>
                </View>
                <Pressable
                  onPress={() => {
                    console.log('hello');
                  }}>
                  <Text style={[styles.title]}>{item?.Title}</Text>
                </Pressable>
                <Text style={[styles.content]}>{item?.Content}</Text>
                {item?.ContentImgUrl && (
                  <Image
                    source={{ uri: `${item?.ContentImgUrl}` }}
                    style={styles.imageNotify}
                  />
                )}
              </View>
            );
          })
        ) : (
          // TODO: translate
          <View style={styles.textCenter}>
            <Text>Không có thông báo nào</Text>
          </View>
        )}
      </ScrollView>
      {/* <FooterNotification /> */}
    </>
  );
};
const styles = StyleSheet.create({
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
  row: {
    borderBottomColor: Colors.l2,
    borderBottomWidth: 8,
    paddingVertical: 15,
  },
  flexRow: { flexDirection: 'row' },
  head: {
    borderBottomColor: Colors.l2,
    borderBottomWidth: 1,
    paddingBottom: 10,
    marginBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },

  date: {
    marginLeft: 'auto',
    fontSize: 12,
  },

  title: { fontWeight: 'bold', fontSize: Fonts.H6, marginBottom: 10 },
  textCenter: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: 20,
    height: 20,
  },
  imageNotify: {
    width: '100%',
    height: 400,
  },
  content: {
    marginBottom: 30,
  },
  textWhite: {
    color: Colors.white,
  },
});
export default Notification;
