import React from 'react';
import {StyleSheet, View, ScrollView} from 'react-native';
import {
  Button,
  Header,
  InputBlock,
  Text,
  HeaderBg,
  FooterContainer,
  TextInput,
} from 'components';
import {useTranslation} from 'context/Language';
import {base, Colors, Spacing, Images} from 'themes';
import {scale} from 'utils/Functions';
import {Formik} from 'formik';
import {newPasswordSchema} from 'utils/ValidationSchemas';
import {useUserInfo} from 'context/User/utils';
import _ from 'lodash';

const ChangePassword = ({route}) => {
  const translation = useTranslation();
  const {onUpdatePassword} = useUserInfo();
  const onSubmit = (values, {resetForm}) => {
    onUpdatePassword({
      ...values,
      oldPassword: route?.params?.oldPassword,
      callbackScreen: route?.params?.callbackScreen,
    });
    resetForm();
  };

  return (
    <>
      <HeaderBg>
        <Header back title="Đặt mật khẩu mới" />
      </HeaderBg>
      <View style={base.container}>
        <Text mb={20}>
          {
            translation.every_6_months_epay_requires_a_new_password_change_to_ensure_account_security_the_new_password_cannot_be_the_same_as_the_current_password
          }
        </Text>
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
              <View>
                <ScrollView
                  showsVerticalScrollIndicator={false}
                  keyboardShouldPersistTaps="always"
                >
                  {/* <Content
                    title="Đặt lại mật khẩu"
                    text={
                      translation.password_for_account_security_and_transaction_confirmation_at_checkout
                    }
                  /> */}
                  <TextInput
                    password
                    required
                    disableSpace
                    onChange={handleChange('newPassword')}
                    onBlur={handleBlur('newPassword')}
                    placeholder={translation.enter_your_password}
                    error={
                      touched.newPassword && translation[errors.newPassword]
                    }
                    value={values.newPassword}
                    leftIcon={Images.Transfer.Lock}
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
                    leftIcon={Images.Transfer.Lock}
                  />
                  <Text style={styles.note}>
                    {
                      translation.note_password_must_have_at_least_8_characters_including_lowercase_uppercase_numbers_and_special_characters
                    }
                  </Text>
                </ScrollView>

                <View style={styles.bottom}>
                  <Button
                    label={translation.continue}
                    onPress={handleSubmit}
                    disabled={
                      !values.newPassword ||
                      !values.passwordConfirm ||
                      !_.isEmpty(errors)
                    }
                  />
                </View>
              </View>
            );
          }}
        </Formik>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  note: {
    fontSize: scale(12),
    paddingRight: 10,
  },
  bottom: {
    paddingHorizontal: Spacing.PADDING,
    paddingVertical: 14,
    position: 'relative',
    backgroundColor: Colors.bs4,
  },
});

export default ChangePassword;
