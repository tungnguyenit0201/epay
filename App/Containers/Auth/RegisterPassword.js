import React, {useRef, useState} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {Text, InputBlock, Header, Button} from 'components';
import {Colors, Fonts, Spacing} from 'themes';
import {useRegister} from 'context/Auth/utils';
import {scale} from 'utils/Functions';
import {Formik} from 'formik';
import {passwordSchema} from 'utils/ValidationSchemas';
import {useTranslation} from 'context/Language';
const ForgotPassword = ({route}) => {
  const {phone} = route?.params;
  const {createAccount} = useRegister();
  const scrollViewRef = useRef(null);
  const translation = useTranslation();

  return (
    <View style={styles.container}>
      <Header back shadow={false} />

      <Formik
        initialValues={{
          newPassword: '',
          passwordConfirm: '',
        }}
        validationSchema={passwordSchema}
        onSubmit={values => createAccount({...values, phone})}>
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
  header: {
    fontSize: Fonts.FONT_LARGE,
    fontWeight: 'bold',
    paddingBottom: Spacing.PADDING,
  },
  loading: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    textTransform: 'uppercase',
  },
});
export default ForgotPassword;
