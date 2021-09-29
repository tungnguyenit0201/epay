import React, {useCallback, useState} from 'react';
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
  const [number, setNumber] = useState('');
  const [names, setName] = useState('');
  const [cmnd, setCMND] = useState('');
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
    <View style={[styles.bgWhite]}>
      <View style={[styles.wrap]}>
        <View
          style={[
            styles.itemBank,
            styles.itemBankActive,
            {paddingVertical: 12},
          ]}>
          <Image
            style={[styles.iconBank]}
            source={require('images/qrpay/VCB.png').default}
          />
          <View>
            <Text fs="h6" bold>
              Vietcombank
            </Text>
          </View>
          <TouchableOpacity>
            <Image
              source={require('images/storybook/edit.png').default}
              style={{
                height: 24,
                width: 24,
                position: 'relative',
                left: 150,
                cursor: 'pointer',
              }}
            />
          </TouchableOpacity>
        </View>
        <TextInput
          rightIconBgGray={Images.Right}
          error={touched?.Provincial && errors?.Provincial}
          isSelect
          required
          value={'1234567899098'}
          defaultValue={translation.provice}
          placeholder="Nhập số nhà, đường,..."
          placeholderTextColor={Colors.g4}
          onChange={e => setNumber(e)}
        />
        <TextInput
          rightIconBgGray={Images.Right}
          error={touched?.Provincial && errors?.Provincial}
          isSelect
          required
          value={'Nguyễn Văn A'}
          defaultValue={translation.provice}
          placeholder="Nhập số nhà, đường,..."
          placeholderTextColor={Colors.g4}
          onChange={e => setName(e)}
        />
        <DatePicker
          onChange={handleChange('Address')}
          error={touched.Address && errors.Address}
          onBlur={handleBlur('Address')}
          value={'CMND'}
          required
          rightIcon={require('images/Down.png').default}
          styleIcon={{width: 18, height: 18}}
          placeholder="Nhập số nhà, đường,..."
          placeholderTextColor={Colors.g4}
        />
        <TextInput
          rightIconBgGray={Images.Right}
          error={touched?.Provincial && errors?.Provincial}
          isSelect
          required
          value={'125416247'}
          defaultValue={translation.provice}
          placeholder="Nhập số nhà, đường,..."
          placeholderTextColor={Colors.g4}
          onChange={e => setCMND(e)}
        />
        <Text>
          Thông tin phải trùng khớp với thông tin đăng ký tại ngân hàng
        </Text>
        <Text bold style={{marginTop: 26, marginBottom: 15}}>
          Điều kiện liên kết
        </Text>
        <Text>
          <Text style={{marginRight: 6}}>{'\u2022'}</Text>Đã đăng ký dịch vụ SMS
          Banking tại ngân hàng
        </Text>
        <Text>
          <Text style={{marginRight: 6}}>{'\u2022'}</Text>Số điện thoại
          0987654321 đã đăng ký tại Vietcombank
        </Text>
        <Text>
          <Text style={{marginRight: 6}}>{'\u2022'}</Text>Số GTTT trùng khớp với
          thông tin đăng ký tại ngân hàng
        </Text>
      </View>
    </View>
  );
};

const LinkingInfo = ({route}) => {
  const translation = require('../../../../Context/Language/vi.json');

  return (
    <Wrapper>
      <SafeAreaProvider>
        <HeaderBg style={{zIndex: 1}}>
          <Header
            back
            title={'Liên kết ngân hàng'}
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
      <View style={base.bottom}>
        <Text style={{fontSize: 13}}>
          Khi nhấn Liên Kết, Quý khách đã xác nhận đồng ý với{' '}
          <Text style={{textDecorationLine: 'underline'}}>
            Thỏa thuận người sử dụng
          </Text>{' '}
          của EPAY và Vietcombank
        </Text>
      </View>
      <FooterContainer>
        {/* {names && number && cmnd ? (
          <Image
            source={require('images/gradient/B_connect.png').default}
            style={base.buttonSB}
          />
        ) : (
          <Image
            source={require('images/gradient/B_connect_disable.png').default}
            style={base.buttonSB}
          />
        )} */}
        <Image
          source={require('images/gradient/B_connect.png').default}
          style={base.buttonSB}
        />
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

  itemBank: {
    position: 'relative',
    marginBottom: 20,
    backgroundColor: Colors.white,
    borderRadius: 10,
    shadowColor: Colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,

    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  itemBankActive: {
    backgroundColor: Colors.cl5,
  },
  iconBank: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
});
export default LinkingInfo;
