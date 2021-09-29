import React, {useCallback} from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
import HeaderBg from '../../../Atoms/HeaderBg';
import TextInput from '../../../Atoms/TextInput';
import Radio from '../../../Atoms/Radio';
import Header from '../../../Atoms/Header';
import Button from '../../../Atoms/Button';
import DatePicker from '../../../Atoms/DatePicker';
import Text from '../../../Atoms/Text';
import {Colors, Fonts, Spacing, Images, base} from 'themes';
import Wrapper from '../../../Groups/Wrapper';
// import {base} from 'themes';
import {Formik, useFormikContext, Form} from 'formik';
import {verifyUserSchema} from '../../../Utils/ValidationSchemas';
import FooterContainer from '../../../Atoms/FooterContainer';
import {SafeAreaProvider} from 'react-native-safe-area-context';
// import styles from 'themes/Style';

const FormikCustom = ({identifyCard}) => {
  const translation = require('../../../../Context/Language/vi.json');
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
    <View style={[styles.bgWhite, styles.pt1]}>
      <View style={[styles.wrap, styles.pt1]}>
        <Text bold style={{fontSize: 16, marginTop: -25, marginBottom: 25}}>
          Nhập địa chỉ khai báo tại ngân hàng
        </Text>
        <Text style={{marginBottom: 15}}>Địa chỉ</Text>
        <TextInput
          rightIconBgGray={Images.Right}
          error={touched?.Provincial && errors?.Provincial}
          isSelect
          required
          value={'123 Cách Mạng Tháng 8'}
          defaultValue={translation.provice}
          placeholder="Nhập số nhà, đường,..."
          placeholderTextColor={Colors.g4}
        />
        <DatePicker
          onChange={handleChange('Address')}
          error={touched.Address && errors.Address}
          onBlur={handleBlur('Address')}
          value={'Quận 3'}
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
          value={'Phường 7'}
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
          value={'Thành phố Hồ Chí Minh'}
          required
          rightIcon={require('images/right.png').default}
          styleIcon={{width: 18, height: 18}}
          placeholder="Nhập số nhà, đường,..."
          placeholderTextColor={Colors.g4}
        />
      </View>
    </View>
  );
};

const LinkingAddress = ({route}) => {
  const translation = require('../../../../Context/Language/vi.json');

  return (
    <Wrapper>
      <SafeAreaProvider>
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
            Provincial: '',
            County: '',
            Ward: '',
            Address: '',
          }}
          validationSchema={verifyUserSchema}>
          <FormikCustom identifyCard={route?.params?.identifyCard} />
        </Formik>
      </SafeAreaProvider>
      {/* </View> */}
      <FooterContainer>
        <Image source={Images.Gradient.B_Save.default} style={base.buttonSB} />
      </FooterContainer>
    </Wrapper>
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
export default LinkingAddress;
