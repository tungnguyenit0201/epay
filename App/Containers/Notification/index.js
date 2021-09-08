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
import {Colors, Fonts, base, Images} from 'themes';
import Navigator from 'navigations/Navigator';

import {SCREEN} from 'configs/Constants';
import {scale} from 'utils/Functions';

import {useTranslation} from 'context/Language';

import FooterNotification from 'components/Home/FooterNotification';
import {useUser} from 'context/User';
import {useNotify} from 'context/User/utils';
const Notification = () => {
  const translation = useTranslation();
  let [type, setType] = useState(0);
  const [refreshing, setRefreshing] = useState(false);
  const {userInfo} = useUser();
  const {selectNotify} = useNotify();
  const dataType = [
    {id: 0, title: 'Tất cả'},
    {id: 1, title: 'Nhắc cước'},
    {id: 2, title: 'Khuyến mãi'},
    {id: 3, title: 'Khác'},
  ];
  return (
    <>
      <HeaderBg>
        <Header title={translation.notification} back />
      </HeaderBg>
      <View style={[base.container, styles.row, {flexDirection: 'row'}]}>
        <FlatList
          data={dataType}
          keyExtractor={item => item.id}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          renderItem={({item}) => (
            <Pressable
              style={[styles.tag, type === item.id && styles.tagActive]}
              onPress={() => {
                setType(item.id);
                selectNotify(item.id);
              }}>
              <Text style={[type === item.id && {color: Colors.white}]}>
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
              selectNotify();
              setRefreshing(false);
            }}
          />
        }>
        {userInfo?.listNotify.length !== 0 ? (
          userInfo?.listNotify.map((item, index) => {
            return (
              <View style={[base.container, styles.row]} key={index}>
                <View style={styles.head}>
                  <Image
                    source={require('images/favicon.png')}
                    style={styles.icon}
                  />
                  <Text style={styles.type}>{item.labelType}</Text>
                  <Text style={styles.date}>{item?.Time}</Text>
                </View>
                <Pressable
                  onPress={() => {
                    Navigator.push(SCREEN.EPAY_SUCCESS);
                  }}>
                  <Text style={styles.title}>{item?.Title}</Text>
                </Pressable>
                <Text>{item?.Content}</Text>
                {item?.ContentImgUrl && (
                  <Image
                    source={{uri: `${item?.ContentImgUrl}`}}
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
      <FooterNotification />
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
    backgroundColor: '#fff',
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

  circle: {
    width: 24,
    height: 24,
    borderRadius: 99,
    overflow: 'hidden',
    marginRight: 10,
    backgroundColor: Colors.l2,
  },
  type: {fontWeight: '500'},
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
  },
});
export default Notification;
