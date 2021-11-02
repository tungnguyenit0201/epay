import React, {useEffect, useState, useMemo} from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import {
  Header,
  HeaderBg,
  InputBlock,
  FooterContainer,
  Text,
  Checkbox,
  Button,
} from 'components';
import { Title } from 'components/Service';
import DashedLine from 'react-native-dashed-line';
import {Colors, Spacing, Images, Fonts} from 'themes';
import {scale} from 'utils/Functions';
import {useVerifyInfo, useSelectRegion} from 'context/User/utils';
import {useTranslation} from 'context/Language';
import {useUser} from 'context/User';

import {GENDER, SCREEN} from 'configs/Constants';
import Navigator from 'navigations/Navigator';

const ItemType1 = ({title, item, callback, mb=10}) => (
  <TouchableOpacity
    style={[styles.boxItem1, styles.boxShadowBlue,
      {marginBottom: mb}]}
    onPress={() => {
      callback?.(item);
    }}
  >
    <Image
      source={Images.TrafficFee.LogoType1}
      style={[
        styles.mr1,
        {
          width: scale(24),
          aspectRatio: 1,
        },
      ]}
      resizeMode={'contain'}
    />
    <View style={styles.flex1}>
      <Text fs="h6" bold mb={4}>
        {title}
      </Text>

      <View style={styles.flexRow}>
        <View style={[styles.widthHaft, styles.pr1]}>
          <Text size={Fonts.SM} color={Colors.tp3}>
            Số dư: 5.000.000đ
          </Text>
        </View>

        <View style={styles.widthHaft}>
          <Text size={Fonts.SM} right color={Colors.tp3}>
            X% phí giao dịch
          </Text>
        </View>
      </View>
    </View>
  </TouchableOpacity>
);

const ConfirmRegister = () => {
  const translation = useTranslation() || {};
  const dataTest1 = [
    {
      name: 'Chủ phương tiện',
      data: 'NGUYEN VAN B ',
    },
    {
      name: 'Biển số xe',
      data: '51G-7890',
    },
    {
      name: 'Loại dịch vụ',
      data: 'Vé lượt',
    },
    {
      name: 'Số thẻ RFID',
      data: '1234567900987654321',
    },
    {
      name: 'Loại biển',
      data: 'Biển trắng',
    },
    {
      name: 'Mã đăng kiểm',
      data: '1234567890',
    },
  ];

  const renderInfoType1 = (name, data, lastChild) => (
    <View>
      <View style={[styles.flexRow, styles.my1]}>
        <View style={styles.wPercent1}>
          <Text fs="h6" mr={10} color={Colors.cl3}>
            {name}
          </Text>
        </View>

        <View style={styles.wPercent2}>
          <Text fs="h6" right>
            {data}
          </Text>
        </View>
      </View>
      {!lastChild && (
        <DashedLine dashLength={4} dashThickness={1} dashColor={Colors.bs1} />
      )}
    </View>
  );

  return (
    //TODO: TRANSLATE
    <View flex={1} style={styles.bgWhite}>
      <HeaderBg>
        <Header back title="Xác nhận đăng ký xe" />
      </HeaderBg>

      <ScrollView contentContainerStyle={[styles.wrap, styles.py1]}>
        <Title>{'Phương thức thanh toán'}</Title>
        <ItemType1 title={'Ví EPAY 0909000999'} mb={30}/>
        <Title mb={2}>{'Chi tiết đăng ký'}</Title>
        
        <View>
          <View style={[styles.posCenter,styles.top1]}>
            <Image
              source={Images.TransactionHistory.LogoBg}
              style={styles.logoBg}
              resizeMode="contain"
            />
          </View>

          {dataTest1.map((e, index) => {
            if (index === dataTest1.length - 1) {
              return renderInfoType1(e.name, e.data, true);
            } else {
              return renderInfoType1(e.name, e.data);
            }
          })}
        </View>
      </ScrollView>

      <FooterContainer>
        <Button
          label={translation?.sign_up}
          onPress={() => Navigator.navigate(SCREEN.TRAFFIC_REGISTER_RESULT)}
        />
      </FooterContainer>
    </View>
  );
};

const styles = StyleSheet.create({
  wrap: {paddingHorizontal: Spacing.PADDING},
  //---------------
  flex1: {flex: 1},
  flexRow: {flexDirection: 'row'},
  //---------------
  posCenter: {
    position: 'absolute',
    right: 0,
    left: 0,
    alignItems: 'center',
  },
  //---------------
  top1: {top: 50},
  //---------------
  widthHaft: {width: '50%'},
  wPercent1: {width: '48%'},
  wPercent2: {width: '52%'},
  //---------------
  bgWhite: {backgroundColor: Colors.bs4},
  //---------------
  my1: {marginVertical: 12},
  //---------------
  mr1: {marginRight: 10},
  //---------------
  py1: {
    paddingTop: 20,
    paddingBottom: 30,
  },
  //---------------
  pr1: {paddingRight: 8},
  //---------------
  pb1: {paddingBottom: 22},
  //---------------
  logoBg: {
    width: 109,
    height: 101,
  },
  //---------------
  boxItem1: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  boxShadowBlue: {
    backgroundColor: Colors.bg1,
    shadowOpacity: 0.2,
    shadowOffset: {width: 0, height: 0},
    elevation: 24,
    shadowRadius: 8,
    borderRadius: 8,
  },
});

export default ConfirmRegister;
