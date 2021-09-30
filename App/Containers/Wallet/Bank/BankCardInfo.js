import React, {useEffect, useRef, useState} from 'react';
import {StyleSheet, View, ScrollView, useWindowDimensions} from 'react-native';
import {Colors, Fonts, Images, Spacing, base} from 'themes';
import {
  Button,
  Header,
  InputBlock,
  Radio,
  HeaderBg,
  Text,
  DatePicker,
} from 'components';
import {GENDER, SCREEN, TEXT} from 'configs/Constants';
import Navigator from 'navigations/Navigator';
import {use} from '@react-navigation/native';
import {Formik, useFormikContext} from 'formik';
import {addressSchema} from 'utils/ValidationSchemas';
import {scale} from 'utils/Functions';
import {useSelectRegion, useUserInfo} from 'context/User/utils';
import {useUser} from 'context/User';
import _ from 'lodash';

const BankCardInfo = () => {
  // TODO : translation
  const {onUpdateUserInfo} = useUserInfo();
  const {userInfo, region} = useUser();

  const {personalInfo, personalAddress, personalIC} = userInfo;
const [cardNumber, setCardNumber] = useState();
const [issueDate, setissueDate] = useState();
const [cardNumberErr, setCardNumberErr] = useState();
const [name, setName] = useState(personalInfo?.FullName);

  useEffect(() => {
    return () => {};
  }, []); // eslint-disable-line

  const onChangeCard = (number)=>{
    const _number = number?.trim();
    if (!1){
      //validate card
      setCardNumberErr('Invalid card number');

    }
    setCardNumber(_number);

  };

  const onChangeDate = (date)=>{
    setissueDate(date);
  };

  const onBlur = (input)=>{
    switch (input){
      case 'cardNumber':{
        //check validate
        break;
      }
      case 'name':{
        //check validate
        break;
      }
      case 'date':{
        //check validate
        break;
      }
    }
  };
const onSubmit = ()=>{};
  return (
    <ScrollView
      style={{backgroundColor: Colors.white}}
      contentContainerStyle={{flex: 1}}>
      <HeaderBg>
        <Header title="Thông tin cá nhân" back />
      </HeaderBg>
      <View style={[base.container, {paddingTop: 20, flex: 1}]}>
        <View flex={1}>
          <View flex={1} style={{justifyContent: 'flex-start'}}>
            <InputBlock
                value={cardNumber}
                placeholder="Nhập số tài khoản/Số thẻ"
                inputStyle={{marginTop: -40}}
                onChange={onChangeCard}
                error={cardNumberErr}
            />
            <InputBlock
                placeholder="Họ và Tên"
                value={name}
                inputStyle={{marginTop: -40}}
            />
            <DatePicker
                // onChange={handleChange('DateOfBirth')}
                // error={touched.DateOfBirth && errors.DateOfBirth}
                onChange={onChangeDate}
                value={issueDate}
                style={{borderColor: Colors.BORDER}}
                placeholder="Issue date mm/yyyy"
            />
          </View>
          <View style={{paddingBottom: Spacing.PADDING}}>
            <Button onPress={onSubmit} label="Lưu" />
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default BankCardInfo;

const styles = StyleSheet.create({
  flexRow: {
    flex: 1,
    flexDirection: 'row',
    paddingVertical: 10,
  },
});
