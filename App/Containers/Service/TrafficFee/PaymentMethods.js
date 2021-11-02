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
import DashedLine from 'react-native-dashed-line';
import {Colors, Spacing, Images, Fonts} from 'themes';
import {scale} from 'utils/Functions';
import {useVerifyInfo, useSelectRegion} from 'context/User/utils';
import {useTranslation} from 'context/Language';
import {useUser} from 'context/User';

import {GENDER, SCREEN} from 'configs/Constants';
import Navigator from 'navigations/Navigator';

const ItemType1 = ({title, item, callback}) => (
  <TouchableOpacity
    style={[styles.boxItem1, styles.boxShadowGray]}
    onPress={() => {
      callback?.(item);
    }}
  >
    <Image
      source={Images.TrafficFee.Logo}
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
      <Text fs="h6" bold size={Fonts.SM} mb={4}>
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

const ItemType2 = ({title, item, callback}) => (
  <TouchableOpacity
    style={[styles.boxItem2, styles.boxShadowBlue]}
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
      <Text fs="h6" bold size={Fonts.SM} mb={4}>
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

const PaymentMethods = () => {
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
      <View style={[styles.flexRow, styles.mxy1]}>
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
        <Header back title="Phương thức thanh toán" />
      </HeaderBg>

      <ScrollView contentContainerStyle={[styles.wrap, styles.py1]}>
        <ItemType1
          // callback={onPress}
          // callback={() => Navigator.navigate(SCREEN.LINKED_BANK_DETAIL)}
          // bankInfo={bankInfo}
          // title={item.BankName}
          // icon={{uri: item.BankLogoUrl}}
          // item={item}
          title={'Ví EPAY 0909000999'}
          // item={item}
        />

        <ItemType2
          title={'Ví EPAY 0909000999'}
        />

        <View style={styles.pxy1}>
          <View style={styles.posCenter}>
            <Image
              source={Images.TransactionHistory.LogoBg}
              style={[styles.logoBg,styles.top1]}
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
          label={translation?.continue}
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
  // alignCenter: {alignItems: 'center'},
  //---------------
  widthHaft: {width: '50%'},
  //---------------
  bgWhite: {backgroundColor: Colors.bs4},
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
  boxShadowGray: {
    backgroundColor: Colors.bs4,
    shadowOpacity: 0.2,
    shadowOffset: {width: 0, height: 0},
    elevation: 24,
    shadowRadius: 8,
    borderRadius: 8,
  },
  //---------------
  boxItem1: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 14,
  },

  //layout confirmRegisterVerhicle
  top1: {top: 50},
  //---------------
  wPercent1: {width: '48%'},
  wPercent2: {width: '52%'},
  //---------------
  mxy1: {marginVertical: 8},
  //---------------
  pxy1: {
    paddingHorizontal: 12,
    paddingTop: 10,
    paddingBottom: 22,
  },
  //---------------
  posCenter: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    alignItems: 'center',
  },
  //---------------
  logoBg: {
    width: 109,
    height: 101,
  },
  //---------------
  boxShadowBlue: {
    backgroundColor: Colors.bg1,
    shadowOpacity: 0.2,
    shadowOffset: {width: 0, height: 0},
    elevation: 24,
    shadowRadius: 8,
    borderRadius: 8,
  },
  //---------------
  boxItem2: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
});

export default PaymentMethods;
