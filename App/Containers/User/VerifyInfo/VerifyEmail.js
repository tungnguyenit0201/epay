import React, {useRef, useState} from 'react';
import {ScrollView, StyleSheet, View, useWindowDimensions} from 'react-native';
import {Text, Header, Button, TextInput, HeaderBg} from 'components';
import {base, Colors} from 'themes';
import {SCREEN, TEXT} from 'configs/Constants';
import {useEmail} from 'context/User/utils';
import {Formik} from 'formik';
import {emailSchema} from 'utils/ValidationSchemas';

const VerifyEmail = () => {
  const {onEmailAuth} = useEmail();

  return (
    <>
      <ScrollView style={base.wrap}>
        <HeaderBg>
          <Header back title="Xác thực Email" />
        </HeaderBg>

        <Formik
          initialValues={{
            email: '',
          }}
          validationSchema={emailSchema}
          onSubmit={onEmailAuth}>
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
                  <Text fs="h5" bold mb={10}>
                    Nhập email
                  </Text>
                  <Text mb={20}>
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry.
                  </Text>

                  <TextInput
                    placeholder="Nhập email "
                    placeholderTextColor={Colors.l5}
                    onChange={handleChange('email')}
                    onBlur={handleBlur('email')}
                    error={touched.email && errors.email}
                  />
                </View>

                <View style={base.bottom}>
                  <Button label={TEXT.CONTINUE} onPress={handleSubmit} />
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
