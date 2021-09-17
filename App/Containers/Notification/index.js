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
import {Text, Header, Button, Row, Col, HeaderBg} from 'components';
import {Colors, Fonts, base, Images, Spacing} from 'themes';
import Navigator from 'navigations/Navigator';

import {SCREEN, NOTIFY} from 'configs/Constants';
import {scale} from 'utils/Functions';

import {useTranslation} from 'context/Language';

import FooterNotification from 'components/Home/FooterNotification';
import {useNotify} from 'context/User/utils';
const Notification = () => {
  const translation = useTranslation();
  const [type, setType] = useState(NOTIFY.ALL);
  const [refreshing, setRefreshing] = useState(false);
  const {selectNotify, onGetAllNotify} = useNotify();
  const dataType = [
    {id: 0, title: NOTIFY.ALL},
    {id: 1, title: NOTIFY.CHARGES},
    {id: 2, title: NOTIFY.PROMOTION},
    {id: 3, title: NOTIFY.OTHER},
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
      <View style={base.wrap}>
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
          }>
          <View style={[base.container]}>
            {selectNotify(type).length !== 0 ? (
              selectNotify(type).map((item, index) => {
                console.log(item);
                return (
                  <Pressable
                    style={[base.boxShadow, index % 2 ? styles.isRead : '']}
                    key={index}
                    onPress={() => {
                      Navigator.push(
                        index % 2
                          ? SCREEN.TRANSACTION_SUCCESS
                          : SCREEN.EPAY_SUCCESS,
                      );
                    }}>
                    <View style={styles.head}>
                      <Image
                        source={require('images/favicon.png')}
                        style={styles.icon}
                      />
                      <Text style={styles.date}>{item?.Time}</Text>
                    </View>

                    <Text style={styles.title}>{item?.Title}</Text>

                    <Text style={styles.content}>{item?.Content}</Text>
                    {item?.ContentImgUrl && (
                      <Image
                        source={{uri: `${item?.ContentImgUrl}`}}
                        style={styles.imageNotify}
                      />
                    )}
                  </Pressable>
                );
              })
            ) : (
              // TODO: translate
              <View style={styles.textCenter}>
                <Text>Không có thông báo nào</Text>
              </View>
            )}
          </View>
          <View style={{height: 120}}></View>
        </ScrollView>
      </View>

      {/* <FooterNotification /> */}
    </>
  );
};
const styles = StyleSheet.create({
  TickCircle: {
    width: 24,
    height: 24,
    position: 'absolute',
    right: Spacing.PADDING,
    bottom: 20,
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
    marginTop: 30,
  },

  textWhite: {
    color: Colors.white,
  },
});
export default Notification;
