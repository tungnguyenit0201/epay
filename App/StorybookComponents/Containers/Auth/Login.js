import React from 'react';
import {ScrollView, StyleSheet, View, Pressable} from 'react-native';
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
import {passwordSchema} from 'utils/ValidationSchemas';

const Login = ({route}) => {
    const translation = require('../../../Context/Language/vi.json');

  const biometryType = false;


  return (
    <>
      <View style={styles.blockHeader}>
        <View>
          <Header back blackIcon style={styles.header} />
        </View>
        <BigLogo />
        <Content
          title={translation.enter_your_password}
          text={
            translation.password_for_account_security_and_transaction_confirmation_at_checkout
          }
        />
      </View>

      <Formik
        initialValues={{
          password: '',
        }}
        onSubmit={({password}) =>
        () => console.log('password')
        }
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
                  leftIcon={Images.Transfer.Lock}
                  autoFocus
                />

                <View style={[styles.box, {marginTop: 5}]}>
                  <Pressable onPress={() => console.log('press')}>
                    <Text style={[styles.link_text]}>
                      {translation.forgot_password}
                    </Text>
                  </Pressable>

                  <Pressable onPress={() => console.log('press')}>
                    <Text style={[styles.link_text]}>Đổi số điện thoại</Text>
                  </Pressable>
                </View>
              </View>

              <View style={[styles.wrap, styles.py_1]}>
                <View style={styles.flexRow}>
                  <Button
                    label="Đăng nhập"
                    onPress={handleSubmit}
                    style={!biometryType ? styles.fullBtn : styles.firstBtn}
                    disabled={!values.password || !_.isEmpty(errors)}
                  />

                  {!!biometryType && (
                    <Pressable onPress={() => console.log('press')} style={styles.btn}>
                      <Icon
                        icon={Images.SignIn.Face}
                        style={styles.iconSize}
                        tintColor={Colors.white}
                      />
                    </Pressable>
                  )}
                </View>
              </View>
            </View>
          );
        }}
      </Formik>
    </>
  );
};
const styles = StyleSheet.create({
  // container: {
  //   flex: 1,
  //   backgroundColor: Colors.BACKGROUNDCOLOR,
  // },
  wrap: {
    paddingHorizontal: Spacing.PADDING,
  },
  py_1: {
    paddingVertical: Spacing.PADDING,
  },
  link_text: {
    textDecorationStyle: 'solid',
    textDecorationColor: Colors.BLACK,
    // textDecorationLine: 'underline',
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
  blockHeader: {
    backgroundColor: Colors.white,
    paddingBottom: 24,
  },
  header: {
    paddingTop: 10,
    backgroundColor: Colors.white,
    color: Colors.BLACK,
  },
  fullBtn: {
    flex: 1,
  },
});
export default Login;
