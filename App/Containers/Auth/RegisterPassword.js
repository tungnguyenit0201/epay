import React, {useRef, useState} from 'react';
import {ScrollView, StyleSheet, View, TouchableOpacity} from 'react-native';
import {Text, Checkbox, Header, Button, TextInput, Icon} from 'components';
import {Colors, Fonts, Spacing, Images} from 'themes';
import {useRegister} from 'context/Auth/utils';
import {scale} from 'utils/Functions';
import {Formik} from 'formik';
import {newPasswordSchema} from 'utils/ValidationSchemas';
import {useTranslation} from 'context/Language';
import {FUNCTION_TYPE, SCREEN} from 'configs/Constants';
import {HelpModal, Content, BigLogo} from 'components/Auth';
import BlueHeader from 'components/Auth/BlueHeader';
import FooterContainer from 'components/Auth/FooterContainer';
import _ from 'lodash';
const RegisterPassword = ({route}) => {
  const {phone, functionType} = route?.params;
  const {
    active,
    setActive,
    showModal,
    setShowModal,
    openCallDialog,
    createAccount,
    onGoTerm,
  } = useRegister();
  const translation = useTranslation();

  const onSubmit = values => {
    createAccount({...values, phone});
  };

  return (
    // TODO: translate
    <BlueHeader>
      <Header
        style={styles.mt}
        back
        renderRightComponent={() => (
          <TouchableOpacity
            style={{paddingRight: Spacing.PADDING}}
            onPress={() => setShowModal(true)}
          >
            <Icon
              icon={Images.Register.Info}
              style={styles.iconSize}
              tintColor={Colors.white}
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
            <View style={[styles.flex1]}>
              <ScrollView
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="always"
                contentContainerStyle={[
                  {paddingVertical: scale(24)},
                  styles.wrap,
                ]}
              >
                <Content
                  title={translation.create_a_password}
                  text={
                    translation.password_for_account_security_and_transaction_confirmation_at_checkout
                  }
                />
                <TextInput
                  password
                  required
                  onChange={handleChange('newPassword')}
                  onBlur={handleBlur('newPassword')}
                  placeholder={translation.enter_your_password}
                  error={touched.newPassword && translation[errors.newPassword]}
                  value={values.newPassword}
                  //leftIcon={Images.Transfer.Lock}
                />
                <TextInput
                  password
                  required
                  onChange={handleChange('passwordConfirm')}
                  onBlur={handleBlur('passwordConfirm')}
                  placeholder={translation.confirm_password}
                  error={
                    touched.passwordConfirm &&
                    translation[errors.passwordConfirm]
                  }
                  value={values.passwordConfirm}
                  //leftIcon={Images.Transfer.Lock}
                />
                <Text style={styles.textNote}>
                  {
                    translation.note_password_needs_to_be_at_least_8_characters_including_lowercase_uppercase_and_number
                  }
                </Text>
              </ScrollView>

              <FooterContainer>
                <View style={styles.flexRow}>
                  <Checkbox onPress={setActive} />
                  <Text style={{marginLeft: 5}}>
                    {` Tôi đồng ý với các `}
                    <Text
                      onPress={() => onGoTerm(SCREEN.AGREEMENT)}
                      style={styles.firstLink}
                    >
                      {'Thoả thuận người dùng'}
                    </Text>{' '}
                    và{' '}
                    <Text
                      onPress={() => onGoTerm(SCREEN.POLICY)}
                      style={styles.firstLink}
                    >
                      {'Chính sách quyền riêng tư '}
                    </Text>
                    của Epay Services
                  </Text>
                </View>

                <Button
                  disabled={
                    !active || !_.isEmpty(errors) || !values.passwordConfirm
                  }
                  mt={10}
                  label={translation?.sign_up}
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
  wrap: {paddingHorizontal: Spacing.PADDING},
  flex1: {flex: 1},
  flexRow: {flexDirection: 'row'},
  //-----------------------
  mtMinus1: {marginTop: -2.5},
  mt: {marginTop: -10},
  //-----------------------
  iconSize: {
    width: scale(20),
    height: scale(20),
  },
  firstLink: {
    textDecorationLine: 'underline',
    marginLeft: 3,
  },
  textNote: {
    fontSize: 12,
    fontWeight: '500',
    paddingRight: 9,
  },
});
export default RegisterPassword;
