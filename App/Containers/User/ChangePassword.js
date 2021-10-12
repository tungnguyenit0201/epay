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
import {base, Colors} from 'themes';
import {useUserInfo} from 'context/User/utils';
import {Formik} from 'formik';
import {passwordSchema} from 'utils/ValidationSchemas';

const ChangePassword = ({route}) => {
  const translation = useTranslation();
  const {onConfirmPassword} = useUserInfo(route?.params?.type);
  return (
    <>
      <HeaderBg>
        {console.log('route?.params', route?.params)}
        <Header back title={route?.params?.headerLabel || 'Đổi mật khẩu'} />
      </HeaderBg>
      <ScrollView style={base.wrap}>
        <View style={base.container}>
          <Formik
            initialValues={{
              password: '',
            }}
            onSubmit={({password}) => onConfirmPassword({password})}
            validationSchema={passwordSchema}>
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
                <View>
                  <View style={{paddingTop: 20}}>
                    <Text fs="h5" bold mb={10}>
                      Nhập mật khẩu
                    </Text>
                    <Text mb={20}>
                      {
                        translation.password_for_account_security_and_transaction_confirmation_at_checkout
                      }
                    </Text>
                    <TextInput
                      password
                      placeholder="Nhập mật khẩu"
                      placeholderTextColor={Colors.l5}
                      onChange={handleChange('password')}
                      onBlur={handleBlur('password')}
                      error={touched.password && errors.password}
                      value={values.password}
                    />
                    <Button
                      mb={10}
                      label="Xác nhận"
                      onPress={handleSubmit}
                      disabled={!values.password || errors.password}
                    />
                  </View>
                </View>
              );
            }}
          </Formik>
        </View>
      </ScrollView>
    </>
  );
};

export default ChangePassword;

const styles = StyleSheet.create({});
