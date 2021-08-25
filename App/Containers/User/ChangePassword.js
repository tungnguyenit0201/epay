import React, {useState} from 'react';
import {StyleSheet, View, ScrollView} from 'react-native';
import {Button, Header, InputBlock, Text, HeaderBg} from 'components';
import {SCREEN, TEXT} from 'configs/Constants';
import Navigator from 'navigations/Navigator';
import {useTranslation} from 'context/Language';
import {base} from 'themes';
import {useUserInfo} from 'context/User/utils';
import {Formik} from 'formik';
const ChangePassword = () => {
  const translation = useTranslation();
  const {onConfirmPassword} = useUserInfo();
  return (
    <>
      <ScrollView style={base.wrap}>
        <HeaderBg>
          <Header back title="Đổi mật khẩu" back />
        </HeaderBg>
        <View style={base.container}>
          <Formik
            initialValues={{
              password: '',
            }}
            onSubmit={({password}) => onConfirmPassword({password})}>
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
                <View style={styles.wrap}>
                  <Text style={[styles.title]} mb={20}>
                    Nhập mật khẩu
                  </Text>
                  <Text mb={10}>
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry.
                  </Text>
                  <InputBlock
                    password
                    placeholder="Nhập mật khẩu"
                    onChange={handleChange('password')}
                    onBlur={handleBlur('password')}
                    error={touched.password && errors.password}
                    value={values.password}
                  />
                  <Button mb={10} label="Đăng nhập" onPress={handleSubmit} />
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
