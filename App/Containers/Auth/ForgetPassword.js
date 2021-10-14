import React, {useRef, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Button, TextInput} from 'components';
import {Colors, Fonts, Spacing, Images} from 'themes';
import {scale} from 'utils/Functions';
import {Formik} from 'formik';
import {phoneSchema} from 'utils/ValidationSchemas';
import _ from 'lodash';
import {useForgetPassword, usePhone} from 'context/Auth/utils';
import {useTranslation} from 'context/Language';
import BigLogo from 'components/Auth/BigLogo';
import BlueHeader from 'components/Auth/BlueHeader';
import Content from 'components/Auth/Content';
import FooterContainer from 'components/Auth/FooterContainer';

const ForgetPassword = () => {
  const {phone} = usePhone();
  const {onSubmitPhone} = useForgetPassword();
  const translation = useTranslation();
  return (
    <BlueHeader>
      {/* <Header back blackIcon avoidStatusBar /> */}
      <BigLogo style={{marginBottom: 30}} />
      <Content
        style={styles.wrap}
        title={translation.forgot_password}
        text={
          translation.to_reset_your_password_please_enter_your_phone_number_below
        }
      />

      <Formik
        key={phone}
        initialValues={{
          phone: phone || '',
        }}
        validationSchema={phoneSchema}
        onSubmit={onSubmitPhone}
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
            <>
              <View style={[styles.wrap, styles.flex1, styles.mt1]}>
                <TextInput
                  numeric
                  placeholder={translation.enter_your_phone_number}
                  required
                  onChange={handleChange('phone')}
                  onBlur={handleBlur('phone')}
                  error={touched.phone && translation[errors.phone]}
                  value={values.phone}
                  /* leftIcon={Images.Phone_1} */
                  isDeleted={values.phone}
                  maxLength={10}
                />
              </View>
              <FooterContainer>
                <Button
                  label={translation.continue}
                  onPress={handleSubmit}
                  disabled={!_.isEmpty(errors)}
                  // fs={Fonts.FONT_MEDIUM}
                />
              </FooterContainer>
            </>
          );
        }}
      </Formik>
    </BlueHeader>
  );
};
const styles = StyleSheet.create({
  wrap: {
    paddingHorizontal: Spacing.PADDING,
  },
  flex1: {flex: 1},
  //------------------
  mt1: {marginTop: 24},
});
export default ForgetPassword;
