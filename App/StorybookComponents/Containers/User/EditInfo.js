import React, {useCallback} from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
import HeaderBg from '../../Atoms/HeaderBg';
import TextInput from '../../Atoms/TextInput';
import Radio from '../../Atoms/Radio';
import Header from '../../Atoms/Header';
import Button from '../../Atoms/Button';
import DatePicker from '../../Atoms/DatePicker';
import Text from '../../Atoms/Text';
import Checkbox from '../../Atoms/Checkbox';
import {Colors, Fonts, Spacing, Images, base} from 'themes';
import Progress from '../../Groups/Progress';
import Wrapper from '../../Groups/Wrapper';
// import {base} from 'themes';
import {Formik, useFormikContext, Form} from 'formik';
import {verifyUserSchema} from '../../Utils/ValidationSchemas';
import FooterContainer from '../../Atoms/FooterContainer';
// import styles from 'themes/Style';

const FormikCustom = ({identifyCard}) => {
  const translation = require('../../../Context/Language/vi.json');
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
  return (
    <Wrapper>
      <ScrollView style={[styles.bgWhite, styles.pt1]}>
        <View style={styles.wrap}>
          <TextInput
            label={'Họ tên'}
            style={styles.mb1}
            onChange={handleChange('ICFullName')}
            onBlur={handleBlur('ICFullName')}
            error={touched.ICFullName && errors.ICFullName}
            value={'Nguyễn Văn A'}
            placeholder="Nguyễn Văn A"
            placeholderTextColor={Colors.g4}
          />

          <DatePicker
            label={'Ngày sinh'}
            onChange={handleChange('DateOfBirth')}
            error={touched.DateOfBirth && errors.DateOfBirth}
            onBlur={handleBlur('DateOfBirth')}
            value={'11/06/1998'}
            required
            placeholder="dd/mm/yyyy"
            placeholderTextColor={Colors.g4}
          />

          <View>
            <Text medium mb={10}>
              {translation.gender}
            </Text>
            <Radio
              items={[
                {label: translation.female, value: 1},
                {label: translation.male, value: 2},
              ]}
              onChange={handleChange('SexType')}
              selectedValue={2}
            />
          </View>

          <TextInput
            label={'CMND/CCCD/Hộ chiếu'}
            onChange={handleChange('ICNumber')}
            onBlur={handleBlur('ICNumber')}
            error={touched.ICNumber && errors.ICNumber}
            value={'01*********99'}
            style={styles.mb1}
            required
            numeric
            placeholder="Nhập số GTTT"
            placeholderTextColor={Colors.g4}
          />

          {/* <DatePicker
            label={translation.valid_date}
            onChange={handleChange('ICIssuedDate')}
            error={touched.ICIssuedDate && errors.ICIssuedDate}
            onBlur={handleBlur('ICIssuedDate')}
            value={values.ICIssuedDate || 'dd/mm/yyyy'}
            required
            placeholder="dd/mm/yyyy"
          /> */}
          {/* <TextInput
            label="Nơi cấp"
            onChange={handleChange('ICIssuedPlace')}
            onBlur={handleBlur('ICIssuedPlace')}
            error={touched.ICIssuedPlace && errors.ICIssuedPlace}
            value={values.ICIssuedPlace}
            style={styles.mb1}
            required
            placeholder="Nhập nơi cấp"
            placeholderTextColor={Colors.g4}
          /> */}
        </View>
        <View style={[styles.bgGray, styles.h1]}></View>

        <View style={[styles.wrap, styles.pt1]}>
          <TextInput
            rightIconBgGray={Images.Right}
            error={touched?.Provincial && errors?.Provincial}
            isSelect
            required
            value={'01 Công xã Paris'}
            defaultValue={translation.provice}
            placeholder="Nhập số nhà, đường,..."
            placeholderTextColor={Colors.g4}
          />
          <DatePicker
            onChange={handleChange('Address')}
            error={touched.Address && errors.Address}
            onBlur={handleBlur('Address')}
            value={'Thành phố Hồ Chí Minh'}
            required
            rightIcon={require('images/right.png').default}
            styleIcon={{width: 18, height: 18}}
            placeholder="Nhập số nhà, đường,..."
            placeholderTextColor={Colors.g4}
          />
          <DatePicker
            onChange={handleChange('Address')}
            error={touched.Address && errors.Address}
            onBlur={handleBlur('Address')}
            value={'Quận 1'}
            required
            rightIcon={require('images/right.png').default}
            styleIcon={{width: 18, height: 18}}
            placeholder="Nhập số nhà, đường,..."
            placeholderTextColor={Colors.g4}
          />
          <DatePicker
            onChange={handleChange('Address')}
            error={touched.Address && errors.Address}
            onBlur={handleBlur('Address')}
            value={'Bến Nghé'}
            required
            rightIcon={require('images/right.png').default}
            styleIcon={{width: 18, height: 18}}
            placeholder="Nhập số nhà, đường,..."
            placeholderTextColor={Colors.g4}
          />
        </View>
      </ScrollView>
      <FooterContainer>
        <Image source={Images.Gradient.B_Save.default} style={base.buttonSB} />
      </FooterContainer>
    </Wrapper>
  );
};

const EditInfo = ({route}) => {
  const translation = require('../../../Context/Language/vi.json');

  return (
    <>
      <HeaderBg style={{zIndex: 1}}>
        <Header
          back
          title={translation?.account_verification}
          style={{marginTop: 25, marginBottom: -18}}
        />
      </HeaderBg>
      {/* <View> */}
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
        validationSchema={verifyUserSchema}>
        <FormikCustom identifyCard={route?.params?.identifyCard} />
      </Formik>
      {/* </View> */}
    </>
  );
};
const styles = StyleSheet.create({
  wrap: {paddingHorizontal: Spacing.PADDING},
  //---------------
  flexRow: {flexDirection: 'row'},
  //---------------
  h1: {height: 8},
  //---------------
  mtMinus1: {marginTop: -3},
  //---------------
  mb1: {marginBottom: 5},
  //---------------
  pt1: {paddingTop: 20},
  pt2: {paddingTop: 10},
  //---------------
  pb1: {paddingBottom: 24},
  //---------------
  underline: {textDecorationLine: 'underline'},
  //---------------
  bgWhite: {backgroundColor: Colors.white},
  bgGray: {backgroundColor: Colors.l4},
  //---------------
  firstLink: {
    textDecorationLine: 'underline',
    marginLeft: 3,
    fontSize: Fonts.FONT_SMALL,
  },
  //---------------
  triangleDown: {
    position: 'absolute',
    right: Spacing.PADDING * 2 + 10 / 2,
    bottom: -9,
    width: 20,
    height: 10,
  },
  textMedium: {
    fontSize: 12,
    textAlign: 'center',
    color: 'white',
  },
});
export default EditInfo;
