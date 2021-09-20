import React, { useCallback } from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
import {
  HeaderBg,
  InputBlock,
  Radio,
  Header,
  Button,
  DatePicker,
  Text,
  Checkbox,
} from 'components';
import { Colors, Fonts, Spacing, Images } from 'themes';
import { useVerifyInfo, useSelectRegion } from 'context/User/utils';
import Progress from 'components/User/VerifyInfo/Progress';
// import {base} from 'themes';
import { Formik, useFormikContext, Form } from 'formik';
import { useTranslation } from 'context/Language';
import { verifyUserSchema } from 'utils/ValidationSchemas';
import { useUser } from 'context/User';
import { useFocusEffect } from '@react-navigation/native';
import { SCREEN } from 'configs/Constants';
import FooterContainer from 'components/Auth/FooterContainer';
// import styles from 'themes/Style';

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
    <>
      <ScrollView style={[styles.bgWhite, styles.pt1]}>
        <View style={styles.wrap}>
          <InputBlock
            label={translation.enter_your_full_name}
            style={styles.mb1}
            onChange={handleChange('ICFullName')}
            onBlur={handleBlur('ICFullName')}
            error={touched.ICFullName && errors.ICFullName}
            value={values.ICFullName}
            required
            placeholder="Nhập họ & tên"
          />

          <DatePicker
            label={translation.date_of_birth_ddmmyyyy}
            onChange={handleChange('DateOfBirth')}
            error={touched.DateOfBirth && errors.DateOfBirth}
            onBlur={handleBlur('DateOfBirth')}
            value={values.DateOfBirth}
            required
            placeholder="dd/mm/yyyy"
          />

          <View>
            <Text medium mb={10}>
              {translation.gender}
            </Text>
            <Radio
              items={[
                { label: translation.male, value: 1 },
                { label: translation.female, value: 2 },
                { label: translation.others, value: 3 },
              ]}
              onChange={handleChange('SexType')}
            />
          </View>

          <InputBlock
            label={identifyCard?.label || translation.enter_id_code}
            onChange={handleChange('ICNumber')}
            onBlur={handleBlur('ICNumber')}
            error={touched.ICNumber && errors.ICNumber}
            value={values.ICNumber}
            style={styles.mb1}
            required
            numeric
            placeholder="Nhập số GTTT"
          />

          <DatePicker
            label={translation.valid_date}
            onChange={handleChange('ICIssuedDate')}
            error={touched.ICIssuedDate && errors.ICIssuedDate}
            onBlur={handleBlur('ICIssuedDate')}
            value={values.ICIssuedDate}
            required
            placeholder="dd/mm/yyyy"
          />
          <InputBlock
            label="Nơi cấp" // TODO: translate
            onChange={handleChange('ICIssuedPlace')}
            onBlur={handleBlur('ICIssuedPlace')}
            error={touched.ICIssuedPlace && errors.ICIssuedPlace}
            value={values.ICIssuedPlace}
            style={styles.mb1}
            required
            placeholder="Nhập nơi cấp"
          />
        </View>
        <View style={[styles.bgGray, styles.h1]}></View>
        <View style={[styles.wrap, styles.pt1]}>
          <InputBlock
            label={translation.address}
            onChange={handleChange('Address')}
            onBlur={handleBlur('Address')}
            error={touched.Address && errors.Address}
            value={values.Address}
            style={{ marginBottom: 0 }}
            required
            placeholder="Nhập số nhà, đường,..."
          />
          <InputBlock
            label={translation.provice}
            rightIconBgGray={Images.Right}
            error={touched?.Provincial && errors?.Provincial}
            isSelect
            required
            value={values?.Provincial}
            onPress={() => goRegionSelect('cites')}
            defaultValue={translation.provice}
          />

          <InputBlock
            label={translation.district}
            rightIconBgGray={Images.Right}
            error={touched?.County && errors?.County}
            isSelect
            required
            value={values?.County}
            onPress={() => goRegionSelect('districts')}
            defaultValue={translation.district}
          />
          <InputBlock
            label={translation.town}
            rightIconBgGray={Images.Right}
            error={touched?.Ward && errors?.Ward}
            isSelect
            required
            value={values?.Ward}
            onPress={() => goRegionSelect('wards')}
            defaultValue={translation.town}
          />

          <View style={[styles.flexRow, styles.pt2, styles.pb1]}>
            <Checkbox
            // onPress={setActive}
            />
            <Text style={{ marginLeft: 5 }} fs="md">
              {` Tôi đồng ý với các `}
              <TouchableOpacity
                style={styles.mtMinus1}
              // onPress={() => onNavigate(SCREEN.AGREEMENT)}
              >
                <Text style={styles.firstLink}>{'Thoả thuận người dùng '}</Text>
              </TouchableOpacity>
              và
              <TouchableOpacity
                style={styles.mtMinus1}
              // onPress={() => onNavigate(SCREEN.POLICY)}
              >
                <Text style={styles.firstLink}>
                  {'Chính sách quyền riêng tư '}
                </Text>
              </TouchableOpacity>
              của Epay Services
            </Text>
          </View>

          <Text
            onPress={() => onContinue(SCREEN.CHOOSE_IDENTITY_CARD)}
            style={styles.underline}
            centered
            color={Colors.Highlight}
            bold
            mb={48}
            fs="h6">
            Xác thực lại từ đầu
          </Text>
        </View>
      </ScrollView>
      <View style={[styles.bgWhite]}>
        <FooterContainer>
          <Button type={1} label={translation.done} onPress={handleSubmit} />
        </FooterContainer>
      </View>
    </>
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
      <HeaderBg style={{ zIndex: 1 }}>
        <Header back title={translation?.account_verification} />
        <Progress step={3} />
        <Image
          source={Images.VerifyUserInfo.iconDown}
          style={[styles.triangleDown]}
          resizeMode="contain"
        />
      </HeaderBg>
      {/* <View> */}
      <Formik
        initialValues={initialValues}
        validationSchema={verifyUserSchema}
        onSubmit={onUpdateAllInfo}>
        <FormikCustom
          identifyCard={route?.params?.identifyCard}
          onContinue={onContinue}
        />
      </Formik>
      {/* </View> */}
    </>
  );
};
const styles = StyleSheet.create({
  wrap: { paddingHorizontal: Spacing.PADDING },
  //---------------
  flexRow: { flexDirection: 'row' },
  //---------------
  h1: { height: 8 },
  //---------------
  mtMinus1: { marginTop: -3 },
  //---------------
  mb1: { marginBottom: 10 },
  //---------------
  pt1: { paddingTop: 20 },
  pt2: { paddingTop: 10 },
  //---------------
  pb1: { paddingBottom: 24 },
  //---------------
  underline: { textDecorationLine: 'underline' },
  //---------------
  bgWhite: { backgroundColor: Colors.white },
  bgGray: { backgroundColor: Colors.l4 },
  //---------------
  firstLink: {
    textDecorationLine: 'underline',
    marginLeft: 3,
  },
  //---------------
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
