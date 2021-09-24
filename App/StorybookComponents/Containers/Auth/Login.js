import React, {useState} from 'react';
import {ScrollView, StyleSheet, View, Pressable, Image} from 'react-native';
import Text from '../../Atoms/Text';
import Header from '../../Atoms/Header';
import Icon from '../../Atoms/Icon';
import Button from '../../Atoms/Button';
import TextInput from '../../Atoms/TextInput';
import {Colors, Spacing, Images} from 'themes';
import _ from 'lodash';
import {scale} from 'utils/Functions';
import {Formik} from 'formik';
import BigLogo from '../../Atoms/BigLogo';
import Content from '../../Atoms/Content';
import {passwordSchema} from '../../Utils/ValidationSchemas';
import BlueHeader from '../../Atoms/BlueHeader';
const Login = ({route}) => {
  const translation = require('../../../Context/Language/vi.json');
  return (
    <BlueHeader heightBg={180}>
      <View style={styles.pb1}>
        <BigLogo style={{marginBottom: 18}} />
        <Content
          style={styles.wrap}
          title={'Xin chào Vân'}
          text={'0907999999'}
        />
      </View>

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
                  /* value={values.password} */
                  defaultValue={'Epay123@'}
                  autoFocus
                  style={{outline: 'none'}}
                />

                <View style={[styles.box, {marginTop: 5}]}>
                  <Pressable onPress={() => console.log('press')}>
                    <Text style={[styles.link_text]}>Quên mật khẩu?</Text>
                  </Pressable>

                  <Pressable onPress={() => console.log('press')}>
                    <Text style={[styles.link_text]}>Đổi số điện thoại</Text>
                  </Pressable>
                </View>
              </View>
              <View style={[styles.wrap]}>
                {_.isEmpty(errors) ? (
                  <Image
                    source={Images.Gradient.B_Login.default}
                    style={{height: 48, borderRadius: 8, cursor: 'pointer'}}
                  />
                ) : (
                  <Image
                    source={Images.Gradient.B_loginDisabled.default}
                    style={{height: 48, borderRadius: 8, cursor: 'pointer'}}
                  />
                )}
              </View>
            </View>
          );
        }}
      </Formik>
    </BlueHeader>
  );
};
const styles = StyleSheet.create({
  wrap: {paddingHorizontal: Spacing.PADDING},
  //-------------------
  flex1: {flex: 1},
  pb1: {paddingBottom: 24},
  //-------------------
  linkText: {
    textDecorationStyle: 'solid',
    textDecorationColor: Colors.BLACK,
  },
  box: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  flexRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  btn: {
    position: 'absolute',
    right: 0,
    top: 0,
    width: 48,
    height: '100%',
    backgroundColor: Colors.cl2,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
  },
  firstBtn: {
    flex: 1,
    marginRight: 50,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
  },
  iconSize: {
    width: scale(17),
    height: scale(17),
  },
  mt_1: {marginTop: 24},
});
export default Login;
