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
import {HelpModal} from 'components/Auth';

const ForgetNewPassword = ({route}) => {
  const {phone} = route?.params;
  const {onNewPassword, active, onSetActive} = useForgetPassword();
  const translation = useTranslation();
  const {showModal, setShowModal, openCallDialog, onGoTerm} = useRegister();

  const onSubmit = (values, {resetForm}) => {
    onNewPassword({...values, phone});
    resetForm();
  };

  return (
    <BlueHeader>
      <Header
        back
        // blackIcon
        // avoidStatusBar
        renderRightComponent={() => (
          <TouchableOpacity
            style={styles.pr1}
            onPress={() => setShowModal(true)}
          >
            <Icon
              icon={Images.Register.Info}
              style={styles.firstIcon}
              tintColor={Colors.bs4}
            />
          </TouchableOpacity>
        )}
        logo={Images.logoEpay}
      />

      <Formik
        initialValues={{
          newPassword: '',
          passwordConfirm: '',
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
                  title={translation.reset_your_password}
                  text={
                    translation.password_for_account_security_and_transaction_confirmation_at_checkout
                  }
                />
                <TextInput
                  password
                  required
                  disableSpace
                  onChange={handleChange('newPassword')}
                  onBlur={handleBlur('newPassword')}
                  placeholder={translation.enter_your_password}
                  error={touched.newPassword && translation[errors.newPassword]}
                  value={values.newPassword}
                  maxLength={20}
                  /* leftIcon={Images.Transfer.Lock} */
                />
                <TextInput
                  password
                  required
                  disableSpace
                  onChange={handleChange('passwordConfirm')}
                  onBlur={handleBlur('passwordConfirm')}
                  placeholder={translation.confirm_password}
                  error={
                    touched.passwordConfirm &&
                    translation[errors.passwordConfirm]
                  }
                  value={values.passwordConfirm}
                  maxLength={20}
                  /* leftIcon={Images.Transfer.Lock} */
                />
                <Text style={styles.note}>
                  {
                    translation.note_password_must_have_at_least_8_characters_including_lowercase_uppercase_numbers_and_special_characters
                  }
                </Text>
              </ScrollView>

              <FooterContainer>
                <Button
                  mt={10}
                  disabled={!_.isEmpty(errors) || !values.passwordConfirm}
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
    fontSize: scale(12),
  },
  firstLink: {
    textDecorationLine: 'underline',
    marginLeft: 3,
  },
});
export default ForgetNewPassword;
