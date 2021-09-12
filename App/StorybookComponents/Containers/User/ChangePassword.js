import React, {useState} from 'react';
import {StyleSheet, View, ScrollView} from 'react-native';
import Button from '../../Atoms/Button';
import Header from '../../Atoms/Header';
import InputBlock from '../../Atoms/InputBlock';
import Text from '../../Atoms/Text';
import HeaderBg from '../../Atoms/HeaderBg';
import {base} from 'themes';
import {Formik} from 'formik';
const ChangePassword = ({route}) => {
  return (
    <>
      <ScrollView style={base.wrap}>
        <HeaderBg>
          <Header back title={route?.params?.headerLabel || 'Đổi mật khẩu'} />
        </HeaderBg>
        <View style={base.container}>
          <Formik
            initialValues={{
              password: '',
            }}
            onSubmit={({password}) => console.log(password)}>
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
                  <Button mb={10} label="Xác nhận" onPress={handleSubmit} />
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
