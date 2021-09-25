import React, {useEffect, useRef} from 'react';
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
  const {goRegionSelect, onClearRegionData} = useSelectRegion({
    callbackScreen: SCREEN.EDIT_INFO,
  });

  useEffect(() => {
    return () => onClearRegionData();
  }, []); // eslint-disable-line

  return (
    <ScrollView
      style={{backgroundColor: Colors.white}}
      contentContainerStyle={{flex: 1}}>
      <HeaderBg>
        <Header title="Thông tin cá nhân" back />
      </HeaderBg>
      <View style={[base.container, {paddingTop: 20, flex: 1}]}>
        <Formik
          initialValues={{
            Address: personalAddress?.Address,
            Ward: personalAddress?.Ward,
            County: personalAddress?.County,
            Provincial: personalAddress?.Provincial,
            SexType: personalInfo?.SexType,
          }}
          validationSchema={addressSchema}
          onSubmit={onUpdateUserInfo}>
          <FormikContent
            region={region}
            goRegionSelect={goRegionSelect}
            personalInfo={personalInfo}
            personalIC={personalIC}
          />
        </Formik>
      </View>
    </ScrollView>
  );
};

const FormikContent = ({region, goRegionSelect, personalInfo, personalIC}) => {
  const {
    handleChange: _handleChange,
    handleBlur,
    handleSubmit,
    setFieldValue,
    setFieldTouched,
    touched,
    errors,
    values,
  } = useFormikContext();

  useEffect(() => {
    if (region?.Provincial && region?.County) {
      for (const [key, value] of Object.entries(region)) {
        setFieldValue(key, value);
      }
    }
  }, [region]); // eslint-disable-line

  const handleChange = field => value => {
    setFieldValue(field, value);
    setFieldTouched(field, true, false);
  };

  return (
    <View flex={1}>
      <View flex={1} style={{justifyContent: 'flex-start'}}>
        <InputBlock
          onChange={handleChange('Address')}
          onBlur={handleBlur('Address')}
          error={touched.Address && errors.Address}
          value={values.Address}
          placeholder="Nhập số tài khoản/Số thẻ"
          inputStyle={{marginTop: -40}}
        />
        <InputBlock
          placeholder="Họ và Tên"
          value={personalInfo?.FullName}
          inputStyle={{marginTop: -40}}
        />
        <DatePicker
          // onChange={handleChange('DateOfBirth')}
          // error={touched.DateOfBirth && errors.DateOfBirth}
          // onBlur={handleBlur('DateOfBirth')}
          // value={values.DateOfBirth}
          style={{borderColor: Colors.BORDER}}
          placeholder="Issue date mm/yyyy"
        />
      </View>
      <View style={{paddingBottom: Spacing.PADDING}}>
        <Button onPress={handleSubmit} label="Lưu" />
      </View>
    </View>
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
