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
import {useTranslation} from 'context/Language';

import {GENDER, SCREEN} from 'configs/Constants';
import Navigator from 'navigations/Navigator';

const ItemType1 = ({title, item, callback}) => (
  <TouchableOpacity
    style={[styles.mb1,styles.boxItem1, styles.boxShadowGray]}
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
      </ScrollView>

      <FooterContainer>
        <Button
          label={translation?.continue}
          onPress={() => Navigator.navigate(SCREEN.CONFIRM_REGISTER_VEHICLE)}
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
  mb1: {marginBottom: 20},
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
});

export default PaymentMethods;
