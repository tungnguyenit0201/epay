import React, {useRef, useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  Pressable,
  useWindowDimensions,
} from 'react-native';
import Text from '../../Atoms/Text';
import InputBlock from '../../Atoms/InputBlock';
import Button from '../../Atoms/Button';
import {Colors, Fonts, Spacing} from 'themes';
// import Navigator from 'navigations/Navigator';
// import {SCREEN} from 'configs/Constants';
// import {useTranslation} from 'context/Language';
// import {useAuth, useTouchID} from 'context/Auth/utils';
import _ from 'lodash';
import {Formik} from 'formik';

const Login = ({route}) => {
  // const {onChangePhone, onForgetPassword, onLogin, onLoginByTouchID} =
  //   useAuth();
  const translation = require('../../../Context/Language/vi.json');

  // const {biometryType, onTouchID} = useTouchID();
  const biometryType = null;

  const _onLoginByTouchID = async () => {
    console.log('_onLoginByTouchID')
  };

  return (
    <ScrollView style={styles.container}>
      <Formik
        initialValues={{
          password: '',
        }}
        onSubmit={({password}) =>
          console.log(password)
        }>
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
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry.
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

              {!!biometryType && (
                <Button
                  label={_.startCase(biometryType)}
                  onPress={_onLoginByTouchID}
                />
              )}

              <View style={[styles.box_1, {marginTop: 40}]}>
                <Pressable >
                  <Text style={[styles.link_text]}>
                    {translation.forgot_password}
                  </Text>
                </Pressable>

                <Pressable >
                  <Text style={[styles.link_text]}>Đổi số điện thoại</Text>
                </Pressable>
              </View>
            </View>
          );
        }}
      </Formik>
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
    paddingTop: Spacing.PADDING * 6,
  },
  header: {
    fontSize: Fonts.FONT_LARGE,
    fontWeight: 'bold',
    paddingBottom: Spacing.PADDING,
  },
  loading: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  link_text: {
    textDecorationStyle: 'solid',
    textDecorationColor: Colors.BLACK,
    textDecorationLine: 'underline',
  },
  box_1: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
});
export default Login;
