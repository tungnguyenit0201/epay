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
  Checkbox,
  Header,
  Button,
  TextInput,
  Icon,
  DatePicker,
} from 'components';
import {Colors, Spacing, Images} from 'themes';
import {useForgetPassword, useRegister} from 'context/Auth/utils';
import {scale} from 'utils/Functions';
import {Formik} from 'formik';
import {newPasswordSchema} from 'utils/ValidationSchemas';
import {useTranslation} from 'context/Language';
import Content from 'components/Auth/Content';
import _ from 'lodash';
import {SCREEN} from 'configs/Constants';
import BlueHeader from 'components/Auth/BlueHeader';
import FooterContainer from 'components/Auth/FooterContainer';
import {HelpModal} from 'components/Auth';

const ForgetPasswordKYC = ({route}) => {
  const {phone} = route?.params;
  const {onNewPassword, active, onSetActive} = useForgetPassword();
  const translation = useTranslation();
  const {showModal, setShowModal, openCallDialog, onGoTerm} = useRegister();

  const onSubmit = values => {
    onNewPassword({...values, phone});
  };

  // TODO: Translate
  return (
    <BlueHeader>
      <Header back logo={Images.logoEpay} />

      <Formik
        initialValues={{
          idCode: '',
          validDate: '',
          lastBankNumber: '',
        }}
        validationSchema={newPasswordSchema}
        onSubmit={onSubmit}
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
                  onChange={handleChange('idCode')}
                  onBlur={handleBlur('idCode')}
                  placeholder={translation.enter_id_code}
                  error={touched.idCode && translation[errors.idCode]}
                  value={values.idCode}
                  maxLength={20}
                  /* leftIcon={Images.Transfer.Lock} */
                  marginBottom={Spacing.PADDING}
                />
                <DatePicker
                  onChange={value => handleChange('validDate', value)}
                  value={values.validDate}
                  required
                  placeholder="dd/mm/yyyy"
                />
                <TextInput
                  required
                  onChange={handleChange('lastBankNumber')}
                  onBlur={handleBlur('lastBankNumber')}
                  placeholder={translation.valid_date}
                  error={
                    touched.lastBankNumber && translation[errors.lastBankNumber]
                  }
                  value={values.lastBankNumber}
                  maxLength={20}
                  /* leftIcon={Images.Transfer.Lock} */
                />
              </ScrollView>

              <FooterContainer>
                <Button
                  mt={10}
                  disabled={!_.isEmpty(errors) || !values.idCode}
                  label={translation?.continue}
                  onPress={handleSubmit}
                />
              </FooterContainer>
            </View>
          );
        }}
      </Formik>
      <HelpModal
        showModal={showModal}
        setShowModal={setShowModal}
        onPress={openCallDialog}
      />
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
});
export default ForgetPasswordKYC;
