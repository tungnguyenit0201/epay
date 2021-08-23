import React, {useRef, useState} from 'react';
import {ScrollView, StyleSheet, View, useWindowDimensions} from 'react-native';
import {
  Text,
  InputBlock,
  Header,
  Button,
  FWLoading,
  TextInput,
} from 'components';
import Text from '../../Atoms/Text';
import InputBlock from 'App/StorybookComponents/Atoms/InputBlock';
import Header from 'App/StorybookComponents/Atoms/Header';
import {Colors, Fonts, Spacing} from 'themes';
import Navigator from 'navigations/Navigator';
import {SCREEN} from 'configs/Constants';
import {scale} from 'utils/Functions';
import {Formik} from 'formik';
import {phoneSchema} from 'utils/ValidationSchemas';
import _ from 'lodash';
import {useForgetPassword, usePhone} from 'context/Auth/utils';
import {useTranslation} from 'context/Language';

const ForgetPassword = () => {
  const {phone} = usePhone();
  const {onSubmitPhone} = useForgetPassword();
  const translation = useTranslation();

  return (
    <ScrollView style={styles.container}>
      <Header back title="Quên mật khẩu" />
      <View style={styles.content}>
        <Text style={styles.header}>Quên mật khẩu</Text>
        <Text style={styles.textDescription}>
          {`Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print`}
        </Text>
        <Formik
          key={phone}
          initialValues={{
            phone: phone || '',
          }}
          validationSchema={phoneSchema}
          onSubmit={onSubmitPhone}>
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
                <TextInput
                  numeric
                  onChange={handleChange('phone')}
                  onBlur={handleBlur('phone')}
                  error={touched.phone && errors.phone}
                  value={values.phone}
                  style={styles.inputBlock}
                  placeholderTextColor={Colors.BLACK}
                  placeholder="Nhập số điện thoại"
                />
                <Button
                  label={translation.continue}
                  style={styles.buttonBlock}
                  onPress={handleSubmit}
                  disabled={!_.isEmpty(errors)}
                  fs={Fonts.FONT_MEDIUM}
                />
              </View>
            );
          }}
        </Formik>
        <Text style={styles.textUnderline}>Hoặc vui lòng gọi 1900-0000</Text>
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.BACKGROUNDCOLOR,
  },
  wrap: {
    paddingHorizontal: Spacing.PADDING,
    paddingTop: Spacing.PADDING * 3,
  },
  header: {
    fontSize: Fonts.H2,
    fontWeight: 'bold',
    paddingBottom: Spacing.PADDING,
  },
  loading: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  /////////////////////////////
  content: {
    paddingHorizontal: Spacing.PADDING,
    paddingVertical: scale(30),
  },
  inputBlock: {
    backgroundColor: 'transparent',
    borderColor: Colors.BLACK,
    fontSize: Fonts.FONT_MEDIUM,
    marginTop: Spacing.PADDING,
  },
  textDescription: {
    color: Colors.GRAY,
    fontSize: Fonts.FONT_MEDIUM,
  },
  buttonBlock: {
    marginTop: Spacing.PADDING,
    paddingVertical: Fonts.H6,
    backgroundColor: Colors.g9,
  },
  textLable: {
    fontSize: Fonts.FONT_MEDIUM,
  },
  textUnderline: {
    textAlign: 'center',
    fontSize: Fonts.FONT_MEDIUM,
    marginTop: Spacing.PADDING + 20,
    textDecorationLine: 'underline',
  },
});
export default ForgetPassword;
