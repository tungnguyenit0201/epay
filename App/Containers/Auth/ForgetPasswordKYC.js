import React, {useRef, useState} from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
} from 'react-native';
import {
  Text,
  FooterContainer,
  Header,
  Button,
  TextInput,
  Icon,
  DatePicker,
} from 'components';
import {Colors, Spacing, Images, Fonts} from 'themes';
import {useForgetPassword} from 'context/Auth/utils';
import {scale} from 'utils/Functions';
import {Formik} from 'formik';
import {
  forgetPasswordKYCSchema,
  forgetPasswordKYCBankSchema,
} from 'utils/ValidationSchemas';
import {useTranslation} from 'context/Language';
import Content from 'components/Auth/Content';
import _ from 'lodash';
import BlueHeader from 'components/Auth/BlueHeader';
import {PHONE_CENTER} from 'configs/Constants';
const ForgetPasswordKYC = ({route}) => {
  const {phone, isNeedCheckIC, isNeedCheckBankAccount} = route?.params;
  const {onSubmitKYC, message, onCustomerSupport} = useForgetPassword();
  const translation = useTranslation();

  // TODO: Translate
  return (
    <BlueHeader>
      <Header back logo={Images.logoEpay} />

      <Formik
        initialValues={{
          icNumber: '',
          validDate: '',
          lastBankNumber: '',
        }}
        validationSchema={
          isNeedCheckBankAccount
            ? forgetPasswordKYCBankSchema
            : forgetPasswordKYCSchema
        }
        onSubmit={values => onSubmitKYC({...values, phone})}
      >
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
          };
          // TODO: translate
          return (
            <View style={styles.flex1}>
              <ScrollView
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="always"
                contentContainerStyle={[styles.wrap, styles.py1]}
              >
                <Content
                  title={'Xác nhận thông tin cá nhân'}
                  titleMb={Spacing.PADDING * 2}
                  //   text={
                  //     translation.password_for_account_security_and_transaction_confirmation_at_checkout
                  //   }
                />
                <TextInput
                  required
                  onChange={handleChange('icNumber')}
                  onBlur={handleBlur('icNumber')}
                  placeholder={translation.enter_id_code}
                  error={
                    touched.icNumber &&
                    (translation[errors.icNumber] || errors.icNumber)
                  }
                  value={values.icNumber}
                  maxLength={12}
                  /* leftIcon={Images.Transfer.Lock} */
                  marginBottom={Spacing.PADDING}
                />
                <DatePicker
                  onChange={handleChange('validDate')}
                  value={values.validDate}
                  required
                  placeholder={`${translation.valid_date} (dd/mm/yyyy)`}
                  error={
                    touched.validDate &&
                    (translation[errors.validDate] || errors.validDate)
                  }
                />
                {!!isNeedCheckBankAccount && (
                  <TextInput
                    numeric
                    required
                    onChange={handleChange('lastBankNumber')}
                    onBlur={handleBlur('lastBankNumber')}
                    placeholder={'Nhập 4 số cuối ngân hàng đã liên kiết'}
                    error={
                      touched.lastBankNumber &&
                      (translation[errors.lastBankNumber] ||
                        errors.lastBankNumber)
                    }
                    value={values.lastBankNumber}
                    maxLength={4}
                    /* leftIcon={Images.Transfer.Lock} */
                    marginBottom={Spacing.PADDING}
                  />
                )}
                <Text style={styles.message}>{message}</Text>
              </ScrollView>

              <FooterContainer>
                <Button
                  mt={10}
                  mb={Spacing.PADDING}
                  disabled={!_.isEmpty(errors) || !values.icNumber}
                  label={translation?.continue}
                  onPress={handleSubmit}
                />
                <Pressable
                  style={styles.outline}
                  onPress={() => onCustomerSupport({phone})}
                >
                  <Text style={styles.customerCare1}>Hỗ trợ khách hàng</Text>
                  <Text bold style={styles.customerCare2}>
                    {translation.call + ' ' + PHONE_CENTER}
                  </Text>
                </Pressable>
              </FooterContainer>
            </View>
          );
        }}
      </Formik>
    </BlueHeader>
  );
};
const styles = StyleSheet.create({
  wrap: {
    paddingHorizontal: Spacing.PADDING,
  },
  flex1: {flex: 1},
  flexRow: {flexDirection: 'row'},
  //-----------------------
  mtMinus1: {marginTop: -3},
  //------------------
  py1: {paddingVertical: scale(24)},
  pr1: {paddingRight: Spacing.PADDING},
  //------------------
  firstIcon: {
    width: scale(24),
    height: scale(24),
  },
  note: {
    paddingRight: 10,
    fontSize: 12,
  },
  firstLink: {
    textDecorationLine: 'underline',
    marginLeft: 3,
  },
  message: {
    color: Colors.hl1,
    textAlign: 'center',
  },
  outline: {
    borderWidth: 1.5,
    borderColor: Colors.tp1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: scale(8),
    height: scale(48),
    width: '100%',
    paddingHorizontal: Spacing.PADDING,
  },
  customerCare1: {
    fontSize: Fonts.SM,
    color: Colors.tp3,
  },
  customerCare2: {
    fontSize: Fonts.H6,
    color: Colors.tp1,
  },
});
export default ForgetPasswordKYC;
