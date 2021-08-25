import React, {useRef, useState} from 'react';
import {ScrollView, StyleSheet, View, useWindowDimensions} from 'react-native';
import {Text, InputBlock, Radio, Header, Button, DatePicker} from 'components';
import {Colors, Fonts, Spacing, Images} from 'themes';
import {useVerifyInfo, useSelectRegion} from 'context/User/utils';
import Progress from 'components/User/VerifyInfo/Progress';
import {base} from 'themes';
import {Formik} from 'formik';
import {useTranslation} from 'context/Language';
import {verifyUserSchema} from 'utils/ValidationSchemas';
import {useUser} from 'context/User';

const VerifyUserPortrait = ({route}) => {
  const {onChange, onUpdateAllInfo} = useVerifyInfo(route?.params);
  const {goRegionSelect} = useSelectRegion({});
  const translation = useTranslation();
  const {region} = useUser();
  console.log('region :>> ', region);
  return (
    <ScrollView style={{backgroundColor: '#fff'}}>
      <Header back title={translation?.account_verification} />
      <Formik
        initialValues={{
          ICFullName: '',
          DateOfBirth: '',
          ICNumber: '',
          ICIssuedDate: '',
          ICIssuedPlace: '',
          Provincial: region?.Provincial ? region?.Provincial : '',
          County: region?.County ? region?.County : '',
          Ward: region?.Ward ? region?.Ward : '',
          Address: '',
          SexType: 1,
        }}
        validationSchema={verifyUserSchema}
        onSubmit={onUpdateAllInfo}>
        {({
          handleChange: _handleChange,
          handleBlur,
          handleSubmit,
          setFieldValue,
          setFieldTouched,
          touched,
          errors,
          values,
        }) => {
          const handleChange = field => value => {
            setFieldValue(field, value);
            setFieldTouched(field, true, false);
            onChange(field, value);
          };

          return (
            <View style={[base.container, {paddingTop: 20}]}>
              <Progress step={3} />
              <InputBlock
                label={translation.enter_your_full_name}
                style={{marginBottom: 10}}
                onChange={handleChange('ICFullName')}
                onBlur={handleBlur('ICFullName')}
                error={touched.ICFullName && errors.ICFullName}
                value={values.ICFullName}
                required
              />

              <DatePicker
                label={translation.date_of_birth_ddmmyyyy}
                onChange={handleChange('DateOfBirth')}
                error={touched.DateOfBirth && errors.DateOfBirth}
                onBlur={handleBlur('DateOfBirth')}
                value={values.DateOfBirth}
                required
              />
              <Radio
                items={[
                  {label: translation.male, value: 1},
                  {label: translation.female, value: 2},
                  {label: translation.others, value: 3},
                ]}
                onChange={handleChange('SexType')}
              />

              <InputBlock
                label={translation.enter_id_code}
                onChange={handleChange('ICNumber')}
                onBlur={handleBlur('ICNumber')}
                error={touched.ICNumber && errors.ICNumber}
                value={values.ICNumber}
                style={{marginBottom: 10}}
                required
              />

              <DatePicker
                label={translation.valid_date}
                onChange={handleChange('ICIssuedDate')}
                error={touched.ICIssuedDate && errors.ICIssuedDate}
                onBlur={handleBlur('ICIssuedDate')}
                value={values.ICIssuedDate}
                required
              />
              <InputBlock
                label="Nơi cấp" //translate
                onChange={handleChange('ICIssuedPlace')}
                onBlur={handleBlur('ICIssuedPlace')}
                error={touched.ICIssuedPlace && errors.ICIssuedPlace}
                value={values.ICIssuedPlace}
                style={{marginBottom: 10}}
                required
              />
              <InputBlock
                label={translation.provice}
                rightIcon={Images.Down}
                error={touched.Provincial && errors.Provincial}
                isSelect
                required
                value={values.Provincial}
                onPress={() => goRegionSelect('cites')}
              />

              <InputBlock
                label={translation.district}
                rightIcon={Images.Down}
                error={touched.County && errors.County}
                isSelect
                required
                value={values.County}
                onPress={() => goRegionSelect('districts')}
              />
              <InputBlock
                label={translation.town}
                rightIcon={Images.Down}
                error={touched.Ward && errors.Ward}
                isSelect
                required
                value={values.Ward}
                onPress={() => goRegionSelect('wards')}
              />
              <InputBlock
                label={translation.address}
                onChange={handleChange('Address')}
                onBlur={handleBlur('Address')}
                error={touched.Address && errors.Address}
                value={values.Address}
                style={{marginBottom: 10}}
                required
              />

              <Button label={translation.done} onPress={handleSubmit} />
            </View>
          );
        }}
      </Formik>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.BACKGROUNDCOLOR,
  },
});
export default VerifyUserPortrait;
