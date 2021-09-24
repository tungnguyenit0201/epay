import React, {useRef, useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  Pressable,
  Image,
  FlatList,
} from 'react-native';
import {Text, Header, Button, Row, Col, ListItem, HeaderBg} from 'components';
import {Colors, Fonts, Images, Spacing, base} from 'themes';
import _ from 'lodash';

import {SCREEN} from 'configs/Constants';
import {scale} from 'utils/Functions';

import {useTranslation} from 'context/Language';

const NotificationDetail = ({route}) => {
  const translation = useTranslation();
  const {Title, Content, ContentImgUrl} = _.get(route, 'params.data', {});

  return (
    <>
      <HeaderBg>
        <Header title={translation.notification} back />
      </HeaderBg>
      <ScrollView
        style={base.wrap}
        contentContainerStyle={{paddingBottom: scale(120)}}>
        <View style={base.container}>
          <View style={styles.success}>
            <Image
              source={require('images/noti/Noti.png')}
              style={styles.imgSuccess}
            />
            <Text bold fs="h5" mb={15}>
              {translation.epay_notification}
            </Text>
            <Text centered>{Title}</Text>
          </View>
          <View style={styles.block}>
            <Text>{Content}</Text>
          </View>
          {ContentImgUrl && (
            <Image
              source={{uri: `${ContentImgUrl}`}}
              style={styles.imageNotify}
            />
          )}
        </View>
      </ScrollView>
      <Image source={require('images/wave.png')} style={styles.bgImg} />
    </>
  );
};
const styles = StyleSheet.create({
  bgImg: {
    width: scale(375),
    height: scale(375),
    position: 'absolute',
    bottom: 0,
    right: 0,
  },
  block: {
    marginBottom: 20,
    marginTop: 20,
    position: 'relative',
    minHeight: 128,
  },
  success: {
    alignItems: 'center',
    marginBottom: 20,
  },
  imgSuccess: {
    width: 80,
    height: 80,
    marginBottom: 10,
  },
  imageNotify: {
    width: '100%',
    height: 400,
    marginTop: 30,
  },
});
export default NotificationDetail;
