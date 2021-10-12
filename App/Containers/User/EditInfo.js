import React, {useEffect, useRef} from 'react';
import {StyleSheet, View, ScrollView, useWindowDimensions} from 'react-native';
import {Colors, Fonts, Images, Spacing, base} from 'themes';
import {Button, Header, InputBlock, Radio, HeaderBg, Text} from 'components';
import {GENDER, SCREEN, TEXT} from 'configs/Constants';
import Navigator from 'navigations/Navigator';
import {use} from '@react-navigation/native';
import {Formik, useFormikContext} from 'formik';
import {addressSchema} from 'utils/ValidationSchemas';
import {scale} from 'utils/Functions';
import {useSelectRegion, useUserInfo} from 'context/User/utils';
import {useUser} from 'context/User';
import _ from 'lodash';
import FooterContainer from 'components/Auth/FooterContainer';
const EditInfo = () => {
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
    <>
      <HeaderBg>
        <Header title="Thông tin cá nhân" back />
      </HeaderBg>

      <Formik
        initialValues={{
          Address: personalAddress?.Address,
          Ward: personalAddress?.Ward,
          County: personalAddress?.County,
          Provincial: personalAddress?.Provincial,
          SexType: personalInfo?.SexType,
        }}
        validationSchema={addressSchema}
        onSubmit={onUpdateUserInfo}
      >
        <FormikContent
          region={region}
          goRegionSelect={goRegionSelect}
          personalInfo={personalInfo}
          personalIC={personalIC}
        />
      </Formik>
    </>
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
    if (region?.Provincial && region?.County)
      for (const [key, value] of Object.entries(region)) {
        setFieldValue(key, value);
      }
  }, [region]); // eslint-disable-line

  const handleChange = field => value => {
    setFieldValue(field, value);
    setFieldTouched(field, true, false);
  };

  return (
    <>
      <ScrollView style={{backgroundColor: Colors.white}}>
        <View style={[base.container, {paddingTop: 20}]}>
          <View pointerEvents="none">
            <InputBlock
              label="Họ và Tên"
              value={personalInfo?.FullName}
              style={{backgroundColor: Colors.g2, textTransform: 'uppercase'}}
            />
          </View>
          <View pointerEvents="none">
            <InputBlock
              label="Ngày sinh"
              value={personalInfo?.DateOfBirth}
              style={{backgroundColor: Colors.g2, textTransform: 'uppercase'}}
            />
          </View>
          <View style={styles.flexRow}>
            <Text>Giới tính: </Text>
            <Radio
              items={Object.entries(GENDER)
                .filter(x => x[0] !== '3')
                .map(([key, value]) => ({
                  label: value,
                  value: parseInt(key),
                }))}
              onChange={handleChange('SexType')}
              selectedValue={values.SexType}
            />
          </View>
          <View pointerEvents="none">
            <InputBlock
              label="CMND / CCCD"
              value={personalIC?.ICNumber ? personalIC?.ICNumber : 'Chưa có'}
              style={{backgroundColor: Colors.g2, textTransform: 'uppercase'}}
            />
          </View>
          <View pointerEvents="none">
            <InputBlock
              label="Nơi cấp"
              value={
                personalIC?.ICIssuedPlace
                  ? personalIC?.ICIssuedPlace
                  : 'Chưa có'
              }
              style={{backgroundColor: Colors.g2, textTransform: 'uppercase'}}
            />
          </View>
          <View pointerEvents="none">
            <InputBlock
              label="Ngày cấp"
              value={
                personalIC?.ICIssuedDate ? personalIC?.ICIssuedDate : 'Chưa có'
              }
              style={{backgroundColor: Colors.g2, textTransform: 'uppercase'}}
            />
          </View>

          <InputBlock
            label="Tỉnh / Thành phố"
            error={touched.Provincial && errors.Provincial}
            value={values.Provincial}
            isSelect
            rightIcon={Images.Down}
            onPress={() => goRegionSelect('cites')}
          />
          <InputBlock
            label="Quận"
            error={touched.County && errors.County}
            value={values.County}
            isSelect
            rightIcon={Images.Down}
            onPress={() => goRegionSelect('districts')}
          />
          <InputBlock
            label="Phường / Xã"
            email
            required
            error={touched.Ward && errors.Ward}
            value={values.Ward}
            isSelect
            rightIcon={Images.Down}
            onPress={() => goRegionSelect('wards')}
          />
          <InputBlock
            label="Địa chỉ"
            required
            onChange={handleChange('Address')}
            onBlur={handleBlur('Address')}
            error={touched.Address && errors.Address}
            value={values.Address}
          />
        </View>
      </ScrollView>
      <FooterContainer>
        <Button onPress={handleSubmit} label="Lưu" />
      </FooterContainer>
    </>
  );
};

export default EditInfo;

const styles = StyleSheet.create({
  flexRow: {
    flex: 1,
    flexDirection: 'row',
    paddingVertical: 10,
  },
});
