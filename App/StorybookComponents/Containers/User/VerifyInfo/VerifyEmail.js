import React, {useRef, useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  useWindowDimensions,
  Image,
} from 'react-native';
import Text from '../../../Atoms/Text';
import Header from '../../../Atoms/Header';
import Button from '../../../Atoms/Button';
import TextInput from '../../../Atoms/TextInput';
import HeaderBg from '../../../Atoms/HeaderBg';
import {base, Colors, Images} from 'themes';
import {Formik} from 'formik';
import {emailSchema} from 'utils/ValidationSchemas';

const VerifyEmail = () => {
  return (
    <>
      <ScrollView style={base.wrap}>
        <HeaderBg>
          <Header
            back
            title="Xác thực"
            style={{marginTop: 40, marginBottom: -15}}
          />
        </HeaderBg>

        <Formik
          initialValues={{
            email: '',
          }}
          validationSchema={emailSchema}
          onSubmit={() => console.log('email')}>
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
                <View style={[base.container, {paddingTop: 20}]}>
                  <Text fs="h4" bold mb={10}>
                    Nhập email
                  </Text>
                  <Text mb={40}>
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry.
                  </Text>

                  <TextInput
                    placeholder="Nhập email "
                    placeholderTextColor={Colors.l5}
                    onChange={handleChange('email')}
                    onBlur={handleBlur('email')}
                    error={touched.email && errors.email}
                    defaultValue={'epay123@gmail.com'}
                  />
                </View>

                <View style={base.bottom}>
                  {_.isEmpty(errors) ? (
                    <>
                      <Image
                        source={Images.Gradient.B_Continue.default}
                        style={{height: 48, borderRadius: 8, cursor: 'pointer'}}
                      />
                    </>
                  ) : (
                    <Image
                      source={Images.Gradient.B_continueDisable.default}
                      style={{height: 48, borderRadius: 8, cursor: 'pointer'}}
                    />
                  )}
                </View>
              </View>
            );
          }}
        </Formik>
      </ScrollView>
    </>
  );
};

export default VerifyEmail;
