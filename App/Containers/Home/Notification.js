import React, {useRef, useState} from 'react';
import {ScrollView, StyleSheet, View, Pressable, Image} from 'react-native';
import {Text, Header, Button, Row, Col} from 'components';
import {Colors, Fonts, base} from 'themes';
import Navigator from 'navigations/Navigator';

import {SCREEN} from 'configs/Constants';
import {scale} from 'utils/Functions';

import HeaderBg from 'components/Common/HeaderBg';
import {useTranslation} from 'context/Language';

import FooterNotification from 'components/Home/FooterNotification';

const Notification = () => {
  const translation = useTranslation();
  let [type, setType] = useState(0);
  const dataType = [
    {id: 0, title: 'Tất cả'},
    {id: 1, title: 'Nhắc cước'},
    {id: 2, title: 'Khuyến mãi'},
    {id: 3, title: 'Khác'},
  ];
  const data = [
    {type: 1, labelType: 'Nhắc cước'},
    {type: 2, labelType: 'Khuyến mãi'},
    {type: 3, labelType: 'Nạp tiền'},
    {type: 1, labelType: 'Nhắc cước 2 '},
    {type: 2, labelType: 'Khuyến mãi 2'},
    {type: 3, labelType: 'Nạp tiền 2'},
    {type: 1, labelType: 'Nhắc cước 3'},
    {type: 2, labelType: 'Khuyến mãi 3'},
    {type: 3, labelType: 'Nạp tiền 3'},
    {type: 1, labelType: 'Nhắc cước 4'},
    {type: 2, labelType: 'Khuyến mãi 4'},
    {type: 3, labelType: 'Nạp tiền 4'},
    {type: 1, labelType: 'Nhắc cước 5'},
    {type: 2, labelType: 'Khuyến mãi 5'},
    {type: 3, labelType: 'Nạp tiền 5'},
  ];

  return (
    <>
      <ScrollView style={base.wrap}>
        <HeaderBg style={{marginBottom: 0}}>
          <Header title={translation.notification} back />
        </HeaderBg>
        <View style={[base.container, styles.row, {flexDirection: 'row'}]}>
          {dataType.map((item, index) => {
            return (
              <Pressable
                style={[styles.tag, type === item.id && styles.tagActive]}
                onPress={() => setType(item.id)}>
                <Text style={[type === item.id && {color: '#fff'}]}>
                  {item.title}
                </Text>
              </Pressable>
            );
          })}
        </View>

        {data.map((item, index) => {
          return (
            <>
              {(type === 0 || type === item.type) && (
                <View style={[base.container, styles.row]} key={index}>
                  <View style={styles.head}>
                    <View style={styles.circle}></View>
                    <Text style={styles.type}>{item.labelType}</Text>
                    <Text style={styles.date}>03:30 23/07/2021</Text>
                  </View>
                  <Text style={styles.title}>Lorem ipsum {index}</Text>
                  <Text style={styles.desc}>
                    Lorem ipsum Lorem ipsum dolor sit amet, consectetur
                    adipiscing elit, sed do eiusmod tempor
                  </Text>
                </View>
              )}
            </>
          );
        })}
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
});
export default Notification;
