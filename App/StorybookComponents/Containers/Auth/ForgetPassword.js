import React, {useRef, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import Header from '../../Atoms/Header';
import Button from '../../Atoms/Button';
import TextInput from '../../Atoms/TextInput';
import {Colors, Fonts, Spacing, Images} from 'themes';
import {Formik} from 'formik';
import {phoneSchema} from 'utils/ValidationSchemas';
import _ from 'lodash';
import BigLogo from '../../Atoms/BigLogo';
import Content from '../../Atoms/Content';

import BlueHeader from '../../Atoms/BlueHeader';
const ForgetPassword = () => {
  const phone = '0902345678';
  const translation = require('../../../Context/Language/vi.json');

  // TODO: translate
  return (
    <BlueHeader style={styles.container}>
      <BigLogo style={{marginBottom: 20}} />
      <Content
        title="Quên mật khẩu"
        text="Để lấy lại mật khẩu, bạn vui lòng nhập số điện thoại bên dưới"
        style={{paddingHorizontal: Spacing.PADDING}}
      />

      <Formik
        key={phone}
        initialValues={{
          phone: phone || '',
        }}
        validationSchema={phoneSchema}
        onSubmit={() => console.log('press')}>
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
              <View
                style={[
                  styles.wrap,
                  {
                    marginTop: 24,
                    flex: 1,
                  },
                ]}>
                <TextInput
                  numeric
                  autoFocus
                  placeholder={translation.enter_your_phone_number}
                  required
                  onChange={handleChange('phone')}
                  onBlur={handleBlur('phone')}
                  error={touched.phone && errors.phone}
                  value={values.phone}
                />
              </View>
              <View
                style={[
                  styles.wrap,
                  {
                    paddingVertical: Spacing.PADDING,
                  },
                ]}>
                <Button
                  label={translation.continue}
                  onPress={handleSubmit}
                  disabled={!_.isEmpty(errors)}
                  fs={Fonts.FONT_MEDIUM}
                />
              </View>
            </>
          );
        }}
      </Formik>
    </BlueHeader>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.BACKGROUNDCOLOR,
  },
  wrap: {
    paddingHorizontal: Spacing.PADDING,
  },
  header: {
    paddingTop: 10,
    backgroundColor: Colors.white,
    color: Colors.BLACK,
  },
});
export default ForgetPassword;
