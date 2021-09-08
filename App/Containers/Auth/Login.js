import React, {useRef, useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  Pressable,
  useWindowDimensions,
  TouchableOpacity,
  Image,
} from 'react-native';
import {
  Text,
  InputBlock,
  Header,
  Icon,
  Button,
  FWLoading,
  TextInput,
} from 'components';
import {Colors, Fonts, Spacing, Images} from 'themes';
import {useTranslation} from 'context/Language';
import {useAuth, useTouchID} from 'context/Auth/utils';
import _ from 'lodash';
import {scale} from 'utils/Functions';
import {Formik} from 'formik';
import BigLogo from 'components/Auth/BigLogo';
import Content from 'components/Auth/Content';

const Login = ({route}) => {
  const {onChangePhone, onForgetPassword, onLogin, onLoginByTouchID} =
    useAuth();
  const translation = useTranslation();

  const {biometryType, onTouchID} = useTouchID();

  const _onLoginByTouchID = async () => {
    try {
      const result = await onTouchID();
      if (result) {
        onLoginByTouchID({phone: _.get(route, 'params.phone', '')});
      }
    } catch (error) {
      alert(error);
    }
  };

  return (
    <>
      <View style={styles.blockHeader}>
        <View>
          <Header
            back
            blackIcon
            style={styles.header}
            renderRightComponent={() => (
              <TouchableOpacity style={styles.pRight}>
                <Icon
                  icon={Images.Register.Info}
                  style={styles.firstIcon}
                  tintColor={Colors.BLACK}
                />
              </TouchableOpacity>
            )}
          />
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
          onLogin({phone: _.get(route, 'params.phone', ''), password})
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
                {/* <InputBlock
                  password
                  placeholder="Nhập mật khẩu"
                  onChange={handleChange('password')}
                  onBlur={handleBlur('password')}
                  error={touched.password && errors.password}
                  value={values.password}
                /> */}
                <TextInput
                  password
                  required
                  onChange={handleChange('password')}
                  onBlur={handleBlur('password')}
                  placeholder={translation.enter_your_password}
                  error={touched.password && errors.password}
                  value={values.password}
                  leftIcon={Images.Transfer.Lock}
                />

                <View style={[styles.box, {marginTop: 5}]}>
                  <Pressable onPress={onForgetPassword}>
                    <Text style={[styles.link_text]}>
                      {translation.forgot_password}
                    </Text>
                  </Pressable>

                  <Pressable onPress={onChangePhone}>
                    <Text style={[styles.link_text]}>Đổi số điện thoại</Text>
                  </Pressable>
                </View>
              </View>

              <View style={[styles.wrap, styles.py_1]}>
                <View style={styles.flexRow}>
                  <Button
                    label="Đăng nhập"
                    onPress={handleSubmit}
                    style={styles.firstBtn}
                  />
                  <TouchableOpacity onPress={() => {}} style={styles.btn}>
                    <Icon
                      icon={Images.SignIn.Face}
                      style={styles.iconSize}
                      tintColor={Colors.white}
                    />
                  </TouchableOpacity>
                </View>

                {!!biometryType && (
                  <Button
                    label={_.startCase(biometryType)}
                    onPress={_onLoginByTouchID}
                  />
                )}
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
  pRight: {
    position: 'absolute',
    right: 15,
  },
  firstIcon: {
    width: scale(24),
    height: scale(24),
  },
  header: {
    paddingTop: 10,
    backgroundColor: Colors.white,
    color: Colors.BLACK,
  },
});
export default Login;
