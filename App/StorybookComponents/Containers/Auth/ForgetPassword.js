import React, {useRef, useState} from 'react';
import {StyleSheet, View, Image, Pressable} from 'react-native';
import Header from '../../Atoms/Header';
import Button from '../../Atoms/Button';
import TextInput from '../../Atoms/TextInput';
import {Colors, Fonts, Spacing, Images, base} from 'themes';
import {Formik} from 'formik';
import _ from 'lodash';
import BigLogo from '../../Atoms/BigLogo';
import Content from '../../Atoms/Content';
import Text from '../../Atoms/Text';
import BlueHeader from '../../Atoms/BlueHeader';
import Wrapper from '../../Groups/Wrapper';
import FooterContainer from '../../Atoms/FooterContainer';
import {passwordSchema} from '../../Utils/ValidationSchemas';
const ForgetPassword = () => {
  const phone = '0902345678';
  const translation = require('../../../Context/Language/vi.json');
  const [err, setErr] = useState(false);
  // TODO: translate
  return (
    <Wrapper>
      <BlueHeader style={styles.container} heightBg={180}>
        <BigLogo style={{marginBottom: 20}} />
        <Content
          title="Quên mật khẩu"
          text="Để lấy lại mật khẩu, bạn vui lòng nhập số điện thoại bên dưới"
          style={{paddingHorizontal: Spacing.PADDING}}
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
      </BlueHeader>
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
