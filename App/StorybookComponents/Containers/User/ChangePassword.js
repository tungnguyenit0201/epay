import React, {useState} from 'react';
import {StyleSheet, View, ScrollView, Image} from 'react-native';
import Button from '../../Atoms/Button';
import Header from '../../Atoms/Header';
import InputBlock from '../../Atoms/InputBlock';
import TextInput from '../../Atoms/TextInput';
import Text from '../../Atoms/Text';
import HeaderBg from '../../Atoms/HeaderBg';
import Content from '../../Atoms/Content';
import Wrapper from '../../Groups/Wrapper';
import FooterContainer from '../../Atoms/FooterContainer';
import {base, Colors, Spacing, Images} from 'themes';
import {Formik} from 'formik';
import {passwordSchema} from '../../Utils/ValidationSchemas';
const ChangePassword = ({route}) => {
  const translation = require('../../../Context/Language/vi.json');
  const [err, setErr] = useState(false);
  return (
    <Wrapper>
      <ScrollView style={base.wrap}>
        <HeaderBg>
          <Header
            back
            title={route?.params?.headerLabel || 'Đổi mật khẩu'}
            style={{marginTop: 30, marginBottom: -15}}
          />
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
                  <Content
                    title={'Mật khẩu hiện tại'}
                    text="Lorem Ipsum is simply dummy text of the printing and typesetting industry."
                    styleText={{color: Colors.black, fontSize: 14}}
                    style={[styles.wrap, styles.flex1, {marginBottom: 15}]}
                    colorTitle={Colors.black}
                  />
                  <Formik
                    initialValues={{
                      password: '',
                    }}
                    onSubmit={({password}) =>
                      () =>
                        console.log('password')}
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
                        <View
                          style={{
                            flex: 1,
                            backgroundColor: Colors.BACKGROUNDCOLOR,
                          }}>
                          <View
                            style={[
                              styles.wrap,
                              {
                                flex: 1,
                                marginBottom: 25,
                              },
                            ]}>
                            <TextInput
                              password
                              required
                              onChange={handleChange('password')}
                              onBlur={handleBlur('password')}
                              placeholder={translation.enter_your_password}
                              error={touched.password && errors.password}
                              value={values.password}
                              autoFocus
                              style={{outline: 'none'}}
                            />
                          </View>
                          <View style={[styles.wrap]}>
                            {_.isEmpty(errors) && values.password
                              ? setErr(true)
                              : setErr(false)}
                          </View>
                        </View>
                      );
                    }}
                  </Formik>
                </View>
              );
            }}
          </Formik>
        </View>
      </ScrollView>
      <FooterContainer>
        {err ? (
          <Image
            source={Images.Gradient.B_Continue.default}
            style={base.buttonSB}
          />
        ) : (
          <Image
            source={Images.Gradient.B_continueDisable.default}
            style={base.buttonSB}
          />
        )}
      </FooterContainer>
    </Wrapper>
  );
};

export default ChangePassword;

const styles = StyleSheet.create({
  flex1: {flex: 1},
  mt1: {marginTop: 56},
  wrap: {marginTop: 6, marginBottom: -20},
});
