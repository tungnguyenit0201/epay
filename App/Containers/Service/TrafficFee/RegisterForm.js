import React, {useEffect, useState, useMemo} from 'react';
import {StyleSheet, View, TouchableOpacity, ScrollView} from 'react-native';
import {
  Header,
  HeaderBg,
  InputBlock,
  FooterContainer,
  Text,
  Checkbox,
  Button,
} from 'components';
import {Colors, Spacing, Images} from 'themes';
import {useVerifyInfo, useSelectRegion} from 'context/User/utils';
import {useTranslation} from 'context/Language';
import {useUser} from 'context/User';

import {GENDER, SCREEN} from 'configs/Constants';
import Navigator from 'navigations/Navigator';

const RegisterForm = () => {
  const translation = useTranslation() || {};
  return (
    //TODO: TRANSLATE
    <View flex={1} style={styles.bgWhite}>
      <HeaderBg>
        <Header back title="Dịch vụ giao thông" />
      </HeaderBg>

      <ScrollView contentContainerStyle={[styles.wrap, styles.ptb1]}>
        <InputBlock
          label={'Chủ phương tiện'}
          style={styles.mb1}
          // onChange={value => handleChange('ICFullName', value)}
          // value={info.ICFullName}
          // error={error.ICFullName}
          // required
          placeholder={'Nhập họ & tên chủ phương tiện'}
          // alphanumeric
          // trimOnBlur
          // multiline
        />
        <InputBlock
          label={'Biển số xe'}
          style={styles.mb1}
          placeholder={'51G-6789'}
        />
        <InputBlock
          label={'Loại dịch vụ'}
          rightIconBgGray={Images.Right}
          isSelect
          style={styles.mb1}
          // required={!wardEmpty}
          // value={info?.Ward}
          // error={error.Ward}
          // onPress={() => !wardEmpty && goRegionSelect('wards')}
          defaultValue={'Vé lượt'}
        />
        <InputBlock
          label={'Số thẻ RFID'}
          style={styles.mb1}
          placeholder={'123456789123456789123456789'}
        />
        <InputBlock
          label={'Loại biển'}
          rightIconBgGray={Images.Right}
          isSelect
          style={styles.mb1}
          defaultValue={'Biển trắng'}
        />
        <InputBlock
          label={'Mã đăng kiểm'}
          // rightIconBgGray={Images.Right}
          // isSelect
          style={styles.mb1}
          defaultValue={''}
        />
        <InputBlock
          label={'Số thẻ RFID'}
          style={styles.mb1}
          placeholder={'123456789123456789123456789'}
        />

        <View style={[styles.flexRow, styles.pt1]}>
          <Checkbox />
          <Text fs="md" ml={10} style={styles.flex1}>
            {translation?.iAgreeWith}{' '}
            <Text style={styles.link1} onPress={() => {}}>
              {translation?.userAgreement}
            </Text>{' '}
            {translation?.and}{' '}
            <Text onPress={() => {}} style={styles.link1}>
              {translation?.privacyPolicy}
            </Text>{' '}
            {translation?.ofEPAY}
          </Text>
        </View>
      </ScrollView>

      <View style={styles.bgWhite}>
        <FooterContainer>
          <Button
            label={translation?.continue}
            // onPress={() => Navigator.navigate(SCREEN.TRAFFIC_RFID)}
            onPress={() => Navigator.navigate(SCREEN.PAYMENT_METHODS)}
          />
        </FooterContainer>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrap: {paddingHorizontal: Spacing.PADDING},
  //---------------
  flex1: {flex: 1},
  flexRow: {flexDirection: 'row'},
  //---------------
  bgWhite: {backgroundColor: Colors.bs4},
  //---------------
  mb1: {marginBottom: 10},
  //---------------
  ptb1: {
    paddingTop: 20,
    paddingBottom: 30,
  },
  //---------------
  pt1: {paddingTop: 10},
  //---------------
  link1: {
    textDecorationLine: 'underline',
    marginLeft: 3,
  },
});

export default RegisterForm;
