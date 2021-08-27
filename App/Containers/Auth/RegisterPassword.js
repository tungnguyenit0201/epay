import React, {useRef, useState} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {Text, InputBlock, Header, Button} from 'components';
import {Colors, Fonts, Spacing} from 'themes';
import {useForgetPassword, useRegister} from 'context/Auth/utils';
import {scale} from 'utils/Functions';
import {Formik} from 'formik';
import {passwordSchema} from 'utils/ValidationSchemas';
import {useTranslation} from 'context/Language';
import {FUNCTION_TYPE} from 'configs/Constants';

const RegisterPassword = ({route}) => {
  const {phone, functionType} = route?.params;
  const {createAccount} = useRegister();
  const {onNewPassword} = useForgetPassword();
  const scrollViewRef = useRef(null);
  const translation = useTranslation();

  const onSubmit = values => {
    switch (functionType) {
      case FUNCTION_TYPE.REGISTER_ACCOUNT:
        return createAccount({...values, phone});
      case FUNCTION_TYPE.FORGOT_PASS:
        return onNewPassword({...values, phone});
    }
  };

  return (
    <View style={styles.container}>
      <Header back shadow={false} title={translation.sign_up} />

      <Formik
        initialValues={{
          newPassword: '',
          passwordConfirm: '',
        }}
        validationSchema={passwordSchema}
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
          //translate
          return (
            <View style={{flex: 1}}>
              <Text bold size={35} mb={15} style={styles.title}>
                Đặt mật khẩu
              </Text>
              <Text mb={30}>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry.
              </Text>

              <ScrollView
                showsVerticalScrollIndicator={false}
                style={{
                  flex: 1,
                }}
                keyboardShouldPersistTaps="always"
                contentContainerStyle={{paddingVertical: scale(35)}}
                ref={scrollViewRef}>
                <InputBlock
                  label="Mật khẩu"
                  password
                  required
                  onChange={handleChange('newPassword')}
                  onBlur={handleBlur('newPassword')}
                  error={touched.newPassword && errors.newPassword}
                  value={values.newPassword}
                  scrollViewRef={scrollViewRef}
                />
                <InputBlock
                  label="Xác nhận mật khẩu"
                  password
                  required
                  onChange={handleChange('passwordConfirm')}
                  onBlur={handleBlur('passwordConfirm')}
                  error={touched.passwordConfirm && errors.passwordConfirm}
                  value={values.passwordConfirm}
                  scrollViewRef={scrollViewRef}
                />
                <Button
                  mt={50}
                  label={translation?.continue}
                  onPress={handleSubmit}
                />
              </ScrollView>
            </View>
          );
        }}
      </Formik>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.BACKGROUNDCOLOR,
    paddingHorizontal: Spacing.PADDING,
  },
  title: {
    textTransform: 'uppercase',
  },
});
export default RegisterPassword;
