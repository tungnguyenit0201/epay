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
import {
  Text,
  Header,
  Button,
  Row,
  Col,
  HeaderBg,
  ScreenBackground,
} from 'components';
import {Colors, Fonts, base, Images, Spacing} from 'themes';

import {SCREEN, NOTIFY, COMMON_ENUM} from 'configs/Constants';
import {scale} from 'utils/Functions';
import moment from 'moment';

import {useTranslation} from 'context/Language';

// import FooterNotification from 'components/Home/FooterNotification';
import {useNotify} from 'context/User/utils';

const Notification = () => {
  const translation = useTranslation();
  const [type, setType] = useState(NOTIFY.ALL.title);
  const [refreshing, setRefreshing] = useState(false);
  const {selectNotify, onGetAllNotify, onPressNotify} = useNotify();
  const dataType = [
    {id: 0, title: NOTIFY.ALL.title},
    {id: 1, title: NOTIFY.CHARGES.title},
    {id: 2, title: NOTIFY.PROMOTION.title},
    {id: 3, title: NOTIFY.OTHER.title},
  ];

  return (
    <>
      <HeaderBg>
        <Header title={translation.notification} back />
        <Image
          source={require('images/noti/TickCircle.png')}
          style={styles.TickCircle}
        />
      </HeaderBg>
      <View style={styles.wrap}>
        <ScreenBackground />
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
                }}
              >
                <Text style={[type === item.title && styles.textWhite]}>
                  {item.title} {`(${selectNotify(item.title).length})`}
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
                onGetAllNotify();
                setRefreshing(false);
              }}
            />
          }
        >
          <View style={[base.container]}>
            {selectNotify(type).length !== 0 ? (
              selectNotify(type).map((item, index) => {
                return (
                  <Pressable
                    style={[base.boxShadow, item?.IsRead ? styles.isRead : '']}
                    key={index}
                    onPress={() => onPressNotify(item)}
                  >
                    <View style={styles.head}>
                      <View
                        style={{flexDirection: 'row', alignItems: 'center'}}
                      >
                        <Image
                          source={require('images/favicon.png')}
                          style={styles.icon}
                        />

                        <Text bold fs="h6" ml={10} centered>
                          {item?.Title}
                        </Text>
                      </View>
                      <Text style={styles.date}>
                        {moment(item?.Time, COMMON_ENUM.DATETIME_FORMAT).format(
                          'hh:MMA | DD/MM/YYYY',
                        )}
                      </Text>
                    </View>
                    <Text>{item?.Content}</Text>
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
                  <Text>Chưa có thông báo mới</Text>
                </View>
              </>
            )}
          </View>
          <View style={{height: 120}}></View>
        </ScrollView>
      </View>
    </>
  );
};
const styles = StyleSheet.create({
  wrap: {
    paddingTop: 20,
    paddingBottom: 150,
    flex: 1,
    backgroundColor: Colors.white,
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
    bottom: 23,
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
    backgroundColor: Colors.blue,
    borderColor: Colors.blue,
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

  icon: {
    width: 20,
    height: 20,
  },

  textWhite: {
    color: Colors.white,
  },
});
export default Notification;
