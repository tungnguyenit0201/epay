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

const RegisterPassword = ({route}) => {
  const {phone, functionType} = route?.params;
  const {
    active,
    setActive,
    showModal,
    setShowModal,
    openCallDialog,
    createAccount,
    onNavigate,
  } = useRegister();
  const translation = useTranslation();

  const onSubmit = values => {
    createAccount({...values, phone});
  };

  return (
    // TODO: translate
    <View style={styles.container}>
      <View>
        <Header
          back
          avoidStatusBar
          blackIcon
          // style={styles.header}
          renderRightComponent={() => (
            <TouchableOpacity
              style={styles.pRight}
              onPress={() => setShowModal(true)}>
              <Icon
                icon={Images.Register.Info}
                style={styles.firstIcon}
                tintColor={Colors.BLACK}
              />
            </TouchableOpacity>
          )}
        />
      </View>

      <Formik
        initialValues={{
          newPassword: '',
          passwordConfirm: '',
        }}
        validationSchema={newPasswordSchema}
        onSubmit={onSubmit}>
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
            <View style={styles.wrap}>
              <ScrollView
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="always"
                contentContainerStyle={{paddingVertical: scale(24)}}>
                <BigLogo />
                <Content
                  title="Tạo mật khẩu Epay"
                  text={
                    translation.password_for_account_security_and_transaction_confirmation_at_checkout
                  }
                  style={{paddingBottom: Spacing.PADDING}}
                />
                <TextInput
                  password
                  required
                  onChange={handleChange('newPassword')}
                  onBlur={handleBlur('newPassword')}
                  placeholder={translation.enter_your_password}
                  error={touched.newPassword && errors.newPassword}
                  value={values.newPassword}
                  leftIcon={Images.Transfer.Lock}
                />
                <TextInput
                  password
                  required
                  onChange={handleChange('passwordConfirm')}
                  onBlur={handleBlur('passwordConfirm')}
                  placeholder={translation.confirm_password}
                  error={touched.passwordConfirm && errors.passwordConfirm}
                  value={values.passwordConfirm}
                  leftIcon={Images.Transfer.Lock}
                />
                <Text style={styles.textNote}>
                  {
                    translation.note_password_needs_to_be_at_least_8_characters_including_lowercase_uppercase_and_number
                  }
                </Text>
              </ScrollView>

              <View style={{paddingBottom: 20}}>
                <View style={styles.flexRow}>
                  <Checkbox onPress={setActive} />
                  <Text>
                    {` Tôi đồng ý với các `}
                    <TouchableOpacity
                      style={{marginTop: -3}}
                      onPress={() => onNavigate(SCREEN.AGREEMENT)}>
                      <Text style={styles.firstLink}>
                        {'Thoả thuận người dùng '}
                      </Text>
                    </TouchableOpacity>
                    và
                    <TouchableOpacity
                      style={{marginTop: -3}}
                      onPress={() => onNavigate(SCREEN.POLICY)}>
                      <Text style={styles.firstLink}>
                        {'Chính sách quyền riêng tư '}
                      </Text>
                    </TouchableOpacity>
                    của Epay Services
                  </Text>
                </View>
                <Button
                  disabled={!active}
                  mt={10}
                  label={translation?.continue}
                  onPress={handleSubmit}
                />
              </View>
            </View>
          );
        }}
      </Formik>
      <HelpModal
        showModal={showModal}
        setShowModal={setShowModal}
        onPress={openCallDialog}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.BACKGROUNDCOLOR,
  },
  wrap: {
    flex: 1,
    paddingHorizontal: Spacing.PADDING,
  },
  pRight: {
    position: 'absolute',
    right: 15,
  },
  firstIcon: {
    width: scale(24),
    height: scale(24),
  },
  // header: {
  //   paddingTop: 10,
  //   backgroundColor: Colors.white,
  //   color: Colors.BLACK,
  // },
  firstLink: {
    textDecorationLine: 'underline',
    marginLeft: 3,
  },
  flexRow: {flexDirection: 'row'},
  textNote: {
    fontSize: 12,
    fontWeight: '500',
    paddingRight: 9,
  },
});
export default RegisterPassword;
