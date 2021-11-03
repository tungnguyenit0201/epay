import React from 'react';
import {StyleSheet, View, ScrollView} from 'react-native';
import {
  Button,
  Header,
  Text,
  HeaderBg,
  TextInput,
  FooterContainer
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
            <View  style={[base.bgWhite]} flex={1}>
              <ScrollView
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="always"
                contentContainerStyle={[base.container,{paddingTop: 20}]}
              >
                <Text mb={20} fs={'lg'} style={[{color:Colors.tp3}]}>
                {translation.every_6_months_epay_requires_a_new_password_change_to_ensure_account_security_the_new_password_cannot_be_the_same_as_the_current_password}
                </Text>
                <TextInput
                  password
                  required
                  onChange={handleChange('newPassword')}
                  onBlur={handleBlur('newPassword')}
                  placeholder={translation.enter_password}
                  error={
                    touched.newPassword && translation[errors.newPassword]
                  }
                  value={values.newPassword}
                />
                <TextInput
                  password
                  required
                  onChange={handleChange('passwordConfirm')}
                  onBlur={handleBlur('passwordConfirm')}
                  placeholder={translation.enter_the_password_again}
                  error={
                    touched.passwordConfirm &&
                    translation[errors.passwordConfirm]
                  }
                  value={values.passwordConfirm}
                />
                <Text fs={'sm'} style={styles.note}>
                  {
                    translation.note_password_must_have_at_least_8_characters_including_lowercase_uppercase_numbers_and_special_characters
                  }
                </Text>
              </ScrollView>
              
              <FooterContainer>
                <Button
                  label={translation.continue}
                  onPress={handleSubmit}
                  disabled={
                    !values.newPassword ||
                    !values.passwordConfirm ||
                    !_.isEmpty(errors)
                  }
                />
              </FooterContainer>
            </View>
          );
        }}
      </Formik>
    </>
  );
};

const styles = StyleSheet.create({
  note: {
    fontSize: scale(12),
    paddingRight: 10,
    color: Colors.tp3
  },
  boxBottom: {
    padding: 20,
    paddingBottom: 30,
    backgroundColor: Colors.bs4,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    shadowColor: Colors.tp2,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  }
});

export default ChangePassword;
