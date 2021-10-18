import React, {useCallback, useState} from 'react';
import {
  ScrollView,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {Header, HeaderBg, Text, Button} from 'components';
import {useTranslation} from 'context/Language';
import {scale} from 'utils/Functions';
import {SCREEN} from 'configs/Constants';
import {Images, Colors, Spacing, Fonts, base} from 'themes';
import Navigator from 'navigations/Navigator';
import FooterContainer from 'components/Auth/FooterContainer';

const RegisterResult = () => {
  const translation = useTranslation();
  return (
    //TODO: TRANGSLATE
    <>
      <HeaderBg>
        <Header title="Dịch vụ giao thông" style={styles.pbZero} />
      </HeaderBg>

      <View style={[base.bgWhite, styles.flex1, styles.pt1]}>
        <Image
          source={Images.TrafficFee.Wave}
          style={styles.bgImg}
          resizeMode="stretch"
        />

        <ScrollView style={base.container}>
          <View style={[styles.alignCenter, styles.mb1]}>
            <View style={[styles.w1, styles.pxy1]}>
              <View style={styles.blockBlueCircle}>
                <Image
                  source={Images.TrafficFee.BigCar}
                  style={styles.iconBigCar}
                  resizeMode="contain"
                />
              </View>
              <Image
                source={Images.Kyc.BigCircle}
                style={[
                  styles.absolute,
                  styles.topZero,
                  styles.leftZero,
                  styles.iconBigCircle,
                ]}
              />
              <Image
                source={Images.Kyc.SpecialArrow}
                style={[
                  styles.absolute,
                  styles.bot1,
                  styles.right1,
                  styles.iconArrow,
                ]}
              />
            </View>
          </View>

          <View style={styles.alignCenter}>
            <View style={styles.maxWidth1}>
              <Text bold fs="h5" mb={16} centered>
                Thông tin của bạn đã được gửi đi và đang chờ duyệt
              </Text>
              <Text centered fs="md" color={Colors.tp3}>
                Đăng ký xe ngay để sử dụng dịch vụ thu phí giao thông và tham
                gia vào nhiều tiện ích khác từ ví.
              </Text>
            </View>
          </View>
        </ScrollView>

        <FooterContainer>
          <Button label={translation.homePage} />
        </FooterContainer>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  flex1: {flex: 1},
  flexRow: {flexDirection: 'row'},
  //------------------
  alignCenter: {alignItems: 'center'},
  //---------------
  absolute: {position: 'absolute'},
  topZero: {top: 0},
  leftZero: {left: 0},
  //---------------
  bot1: {bottom: 8},
  //---------------
  right1: {right: 6},
  //---------------
  w1: {width: 130},
  //---------------
  maxWidth1: {maxWidth: 300},
  //---------------
  mb1: {marginBottom: 32},
  //---------------
  pxy1: {padding: 10},
  //---------------
  pbZero: {paddingBottom: 0},
  //---------------
  pt1: {paddingTop: 72},
  //---------------
  bgWhite: {backgroundColor: Colors.bs4},
  //---------------
  iconOption1: {
    width: 20,
    height: 20,
  },
  iconRight1: {
    width: 15,
    height: 20,
  },
  iconBigCar: {
    width: 64,
    height: 53,
  },
  iconBigCircle: {
    width: 130,
    height: 130,
  },
  iconArrow: {
    width: 25,
    height: 30,
  },
  //------------
  bgImg: {
    width: '100%',
    height: scale(375),
    position: 'absolute',
    bottom: 0,
    right: 0,
  },
  //------------
  blockCardTick: {
    width: 40,
    height: 40,
    alignItems: 'center',
    paddingTop: 10,
    backgroundColor: Colors.bs2,
    borderRadius: 100,
  },
  blockTransaction: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 17,
    paddingHorizontal: 13,
    borderBottomWidth: 1,
    borderColor: Colors.bs2,
  },
  blockShadow: {
    borderRadius: 8,
    shadowColor: Colors.tp2,
    shadowOffset: {
      width: 0,
      height: 1.8,
    },
    shadowOpacity: 0.16,
    shadowRadius: 8,
    elevation: 24,
    backgroundColor: Colors.bs4,
  },
  blockBlueCircle: {
    width: 110,
    height: 110,
    backgroundColor: Colors.bg1,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default RegisterResult;
