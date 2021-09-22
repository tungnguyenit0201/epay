import React, {useCallback} from 'react';
import {ScrollView, StyleSheet, View, useWindowDimensions} from 'react-native';
import HeaderBg from '../../../Atoms/HeaderBg';
import InputBlock from '../../../Atoms/InputBlock';
import Radio from '../../../Atoms/Radio';
import Header from '../../../Atoms/Header';
import DatePicker from '../../../Atoms/DatePicker';
import Button from '../../../Atoms/Button';
import {Colors, Fonts, Spacing, Images} from 'themes';
// import {useVerifyInfo, useSelectRegion} from 'context/User/utils';
import Progress from '../../../Groups/Progress';
import {base} from 'themes';
import {Formik, useFormikContext, Form} from 'formik';
import {verifyUserSchema} from 'utils/ValidationSchemas';
// import {useFocusEffect} from '@react-navigation/native';

const translation = require('../../../../Context/Language/vi.json');

const FormikCustom = () => {
  // const {goRegionSelect} = useSelectRegion({});
  const region = null;
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
  const handleChange = field => value => {
    setFieldValue(field, value);
    setFieldTouched(field, true, false);
  };
  // useFocusEffect(
  //   useCallback(() => {
  //     if (region?.Provincial && region?.County)
  //       for (const [key, value] of Object.entries(region)) {
  //         setFieldValue(key, value);
  //       }
  //   }, [region]), // eslint-disable-line
  // );
  return (
    <View style={[base.container, {paddingTop: 20}]}>
      <Progress step={3} />
      <InputBlock
        label={translation.enter_your_full_name}
        style={{marginBottom: 10}}
        onChange={console.log('heello')}
        onBlur={console.log('heello')}
        error={touched.ICFullName && errors.ICFullName}
        value={values.ICFullName}
        required
      />

      <DatePicker
        label={translation.date_of_birth_ddmmyyyy}
        onChange={console.log('heello')}
        error={touched.DateOfBirth && errors.DateOfBirth}
        onBlur={console.log('heello')}
        value={values.DateOfBirth}
        required
      />
      <Radio
        items={[
          {label: translation.male, value: 1},
          {label: translation.female, value: 2},
          {label: translation.others, value: 3},
        ]}
        onChange={console.log('heello')}
      />

      <InputBlock
        label={translation.enter_id_code}
        onChange={console.log('heello')}
        onBlur={console.log('heello')}
        error={touched.ICNumber && errors.ICNumber}
        value={values.ICNumber}
        style={{marginBottom: 10}}
        required
        numeric
      />

      <DatePicker
        label={translation.valid_date}
        onChange={console.log('heello')}
        error={touched.ICIssuedDate && errors.ICIssuedDate}
        onBlur={handleBlur('ICIssuedDate')}
        value={values.ICIssuedDate}
        required
      />
      <InputBlock
        label="Nơi cấp" // TODO: translate
        onChange={console.log('heello')}
        onBlur={console.log('heello')}
        error={touched.ICIssuedPlace && errors.ICIssuedPlace}
        value={values.ICIssuedPlace}
        style={{marginBottom: 10}}
        required
      />
      <InputBlock
        label={translation.provice}
        rightIcon={Images.Down}
        error={touched?.Provincial && errors?.Provincial}
        isSelect
        required
        value={values?.Provincial}
        onPress={() => console.log('cites')}
      />

      <InputBlock
        label={translation.district}
        rightIcon={Images.Down}
        error={touched?.County && errors?.County}
        isSelect
        required
        value={values?.County}
        onPress={() => console.log('districts')}
      />
      <InputBlock
        label={translation.town}
        rightIcon={Images.Down}
        error={touched?.Ward && errors?.Ward}
        isSelect
        required
        value={values?.Ward}
        onPress={() => console.log('wards')}
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
};

const VerifyUserPortrait = ({route}) => {
  return (
    <>
      <HeaderBg>
        <Header back title={translation?.account_verification} />
      </HeaderBg>
      <ScrollView style={styles.container}>
        <Formik
          initialValues={{
            ICFullName: '',
            DateOfBirth: '',
            ICNumber: '',
            ICIssuedDate: '',
            ICIssuedPlace: '',
            Provincial: '',
            County: '',
            Ward: '',
            Address: '',
            SexType: 1,
          }}
          validationSchema={verifyUserSchema}
          onSubmit={console.log('hello')}>
          <FormikCustom />
        </Formik>
      </ScrollView>
    </>
  );
};
const styles = StyleSheet.create({
  container: {backgroundColor: Colors.white},
});
export default VerifyUserPortrait;
