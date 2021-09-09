import React, {useRef, useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  useWindowDimensions,
  TouchableOpacity,
  Image,
} from 'react-native';
import {
  Text,
  InputBlock,
  Header,
  Button,
  FWLoading,
  TextInput,
  Icon,
} from 'components';
import {Colors, Fonts, Spacing, Images} from 'themes';
import Navigator from 'navigations/Navigator';
import {SCREEN} from 'configs/Constants';
import {scale} from 'utils/Functions';
import {Formik} from 'formik';
import {phoneSchema} from 'utils/ValidationSchemas';
import _ from 'lodash';
import {useForgetPassword, usePhone} from 'context/Auth/utils';
import {useTranslation} from 'context/Language';
import BigLogo from 'components/Auth/BigLogo';
import Content from 'components/Auth/Content';

const ForgetPassword = () => {
  const {phone} = usePhone();
  const {onSubmitPhone} = useForgetPassword();
  const translation = useTranslation();

  // TODO: translate
  return (
    <View style={styles.container}>
      <View>
        <Header back blackIcon style={styles.header} />
      </View>
      <BigLogo />
      <Content
        title="Quên mật khẩu"
        text="Để lấy lại mật khẩu, bạn vui lòng nhập số điện thoại bên dưới"
      />

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
                  leftIcon={Images.Phone_1}
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
    </View>
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
  /////////////////////////////
  // content: {
  //   paddingHorizontal: Spacing.PADDING,
  //   paddingVertical: scale(30),
  // },
  // inputBlock: {
  //   backgroundColor: 'transparent',
  //   borderColor: Colors.BLACK,
  //   fontSize: Fonts.FONT_MEDIUM,
  //   marginTop: Spacing.PADDING,
  // },
  // textDescription: {
  //   color: Colors.GRAY,
  //   fontSize: Fonts.FONT_MEDIUM,
  // },
  // buttonBlock: {
  //   marginTop: Spacing.PADDING,
  //   paddingVertical: Fonts.H6,
  //   backgroundColor: Colors.g9,
  // },
});
export default ForgetPassword;
