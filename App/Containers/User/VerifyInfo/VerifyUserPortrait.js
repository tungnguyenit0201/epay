import React, { useCallback } from 'react';
import { ScrollView, StyleSheet, View, Image } from 'react-native';
import {
  HeaderBg,
  InputBlock,
  Radio,
  Header,
  Button,
  DatePicker,
  Text,
} from 'components';
import { Colors, Fonts, Spacing, Images } from 'themes';
import { useVerifyInfo, useSelectRegion } from 'context/User/utils';
import Progress from 'components/User/VerifyInfo/Progress';
import { base } from 'themes';
import { Formik, useFormikContext, Form } from 'formik';
import { useTranslation } from 'context/Language';
import { verifyUserSchema } from 'utils/ValidationSchemas';
import { useUser } from 'context/User';
import { useFocusEffect } from '@react-navigation/native';
import { SCREEN } from 'configs/Constants';

const FormikCustom = ({ identifyCard, onContinue }) => {
  const { goRegionSelect } = useSelectRegion({
    callbackScreen: SCREEN.VERIFY_USER_PORTRAIT,
  });
  const translation = useTranslation();
  const { region } = useUser();
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
  useFocusEffect(
    useCallback(() => {
      if (region?.Provincial && region?.County)
        for (const [key, value] of Object.entries(region)) {
          setFieldValue(key, value);
        }
    }, [region]), // eslint-disable-line
  );

  const GENDERS = [
    { label: translation.male, value: 1 },
    { label: translation.female, value: 2 },
    { label: translation.others, value: 3 },
  ];

  return (
    <View style={[base.container, { paddingTop: 20 }]}>
      <InputBlock
        label={translation.enter_your_full_name}
        style={{ marginBottom: 10 }}
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
        items={GENDERS}
        onChange={handleChange('SexType')}
        selectedValue={values.SexType}
      />

      <InputBlock
        label={identifyCard?.label || translation.enter_id_code}
        onChange={handleChange('ICNumber')}
        onBlur={handleBlur('ICNumber')}
        error={touched.ICNumber && errors.ICNumber}
        value={values.ICNumber}
        style={{ marginBottom: 10 }}
        required
        numeric
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
        label="Nơi cấp" // TODO: translate
        onChange={handleChange('ICIssuedPlace')}
        onBlur={handleBlur('ICIssuedPlace')}
        error={touched.ICIssuedPlace && errors.ICIssuedPlace}
        value={values.ICIssuedPlace}
        style={{ marginBottom: 10 }}
        required
      />
      <InputBlock
        label={translation.provice}
        rightIcon={Images.Down}
        error={touched?.Provincial && errors?.Provincial}
        isSelect
        required
        value={values?.Provincial}
        onPress={() => goRegionSelect('cites')}
      />

      <InputBlock
        label={translation.district}
        rightIcon={Images.Down}
        error={touched?.County && errors?.County}
        isSelect
        required
        value={values?.County}
        onPress={() => goRegionSelect('districts')}
      />
      <InputBlock
        label={translation.town}
        rightIcon={Images.Down}
        error={touched?.Ward && errors?.Ward}
        isSelect
        required
        value={values?.Ward}
        onPress={() => goRegionSelect('wards')}
      />
      <InputBlock
        label={translation.address}
        onChange={handleChange('Address')}
        onBlur={handleBlur('Address')}
        error={touched.Address && errors.Address}
        value={values.Address}
        style={{ marginBottom: 10 }}
        required
      />
      <Text onPress={() => onContinue(SCREEN.CHOOSE_IDENTITY_CARD)}>
        Xác thực lại
      </Text>
      <Button style={styles.button} label={translation.done} onPress={handleSubmit} />
    </View>
  );
};

const VerifyUserPortrait = ({ route }) => {
  const { onUpdateAllInfo, onContinue, verifyInfo } = useVerifyInfo(route?.params);
  const { extractCardInfo = {} } = verifyInfo || {};
  const translation = useTranslation();
  const initialValues = {
    ICFullName: extractCardInfo.FullName,
    DateOfBirth: extractCardInfo.BirthDay,
    ICNumber: extractCardInfo.CardNumber,
    ICIssuedDate: extractCardInfo.IssueDate,
    ICIssuedPlace: extractCardInfo.IssuePlace,
    Provincial: extractCardInfo.Province,
    County: extractCardInfo.District,
    Ward: extractCardInfo.Ward,
    Address: extractCardInfo.Address,
    SexType: extractCardInfo.Gender ?? 1,
  };

  return (
    <>
      <HeaderBg>
        <Header back title={translation?.account_verification} />
        <Progress step={3} />
        <Image
          source={Images.VerifyUserInfo.iconDown}
          style={[styles.triangleDown]}
          resizeMode="contain"
        />
      </HeaderBg>
      <ScrollView style={styles.container}>
        <Formik
          initialValues={initialValues}
          validationSchema={verifyUserSchema}
          onSubmit={onUpdateAllInfo}>
          <FormikCustom
            identifyCard={route?.params?.identifyCard}
            onContinue={onContinue}
          />
        </Formik>
      </ScrollView>
    </>
  );
};
const styles = StyleSheet.create({
  container: { backgroundColor: Colors.white },
  triangleDown: {
    position: 'absolute',
    right: Spacing.PADDING * 2 + 10 / 2,
    bottom: -9,
    width: 20,
    height: 10,
  },
  button: {
    marginVertical: 16,
  },
});
export default VerifyUserPortrait;
