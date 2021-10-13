import React, {useState} from 'react';
import {StyleSheet, View, ScrollView} from 'react-native';
import {
  Button,
  Header,
  InputBlock,
  Text,
  HeaderBg,
  TextInput,
} from 'components';
import {SCREEN, TEXT} from 'configs/Constants';
import Navigator from 'navigations/Navigator';
import {useTranslation} from 'context/Language';
import {base, Colors, Spacing} from 'themes';
import {useUserInfo} from 'context/User/utils';
import {Formik} from 'formik';
import {passwordSchema} from 'utils/ValidationSchemas';
import FooterContainer from 'components/Auth/FooterContainer';
const ChangePassword = ({route}) => {
  const translation = useTranslation();
  const {onConfirmPassword} = useUserInfo(route?.params?.type);
  return (
    <>
      <HeaderBg>
        {console.log('route?.params', route?.params)}
        <Header back title={route?.params?.headerLabel || 'Đổi mật khẩu'} />
      </HeaderBg>
      <Formik
        initialValues={{
          password: '',
        }}
        onSubmit={({password}) => onConfirmPassword({password})}
        validationSchema={passwordSchema}
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

          return (
            <View style={styles.flex1}>
              <View style={[styles.wrap, styles.flex1]}>
                <View style={{paddingTop: 20}}>
                  <Text fs="h5" bold mb={10}>
                    {translation.enter_password}
                  </Text>
                  <Text mb={20}>
                    {
                      translation.password_for_account_security_and_transaction_confirmation_at_checkout
                    }
                  </Text>
                  <TextInput
                    password
                    placeholder={translation.enter_password}
                    placeholderTextColor={Colors.l5}
                    onChange={handleChange('password')}
                    onBlur={handleBlur('password')}
                    error={touched.password && errors.password}
                    value={values.password}
                  />
                </View>
              </View>
              <FooterContainer>
                <Button
                  mb={10}
                  label="Xác nhận"
                  onPress={handleSubmit}
                  disabled={!values.password || errors.password}
                />
              </FooterContainer>
            </View>
          );
        }}
      </Formik>
    </>
  );
};

export default ChangePassword;

const styles = StyleSheet.create({
  wrap: {paddingHorizontal: Spacing.PADDING},
  //-------------------
  flex1: {flex: 1, backgroundColor: Colors.white},
});
