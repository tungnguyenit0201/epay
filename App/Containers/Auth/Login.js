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
import Navigator from 'navigations/Navigator';
import {SCREEN} from 'configs/Constants';
import {useTranslation} from 'context/Language';
import {useAuth, useTouchID} from 'context/Auth/utils';
import _, {camelCase} from 'lodash';
import {scale} from 'utils/Functions';
import {Formik} from 'formik';

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
      <View
        style={{
          backgroundColor: Colors.white,
          paddingBottom: 24,
        }}>
        <View>
          <Header
            back
            blackIcon
            style={{
              paddingTop: 10,
              backgroundColor: Colors.white,
              color: Colors.BLACK,
            }}
          />
          <TouchableOpacity
            style={{
              position: 'absolute',
              bottom: scale(10),
              right: 15,
            }}>
            <Icon
              icon={Images.Register.Info}
              style={{
                width: scale(24),
                height: scale(24),
              }}
              tintColor={Colors.BLACK}
            />
          </TouchableOpacity>
        </View>

        <View
          style={{
            marginBottom: Spacing.PADDING + 40,
            alignItems: 'center',
          }}>
          <Image source={Images.logoEpay} resizeMode="contain" />
        </View>

        <View style={{paddingHorizontal: Spacing.PADDING}}>
          <Text bold fs="h5" mb={15} centered>
            {translation.enter_your_password}
          </Text>
          <Text centered fs="md" color={Colors.l6}>
            {
              translation.password_for_account_security_and_transaction_confirmation_at_checkout
            }
          </Text>
        </View>
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

                <View style={[styles.box_1, {marginTop: 5}]}>
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
                <View
                  style={{
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                  }}>
                  <Button
                    label="Đăng nhập"
                    onPress={handleSubmit}
                    style={{
                      flex: 1,
                      marginRight: 50,
                      borderTopRightRadius: 0,
                      borderBottomRightRadius: 0,
                    }}
                  />
                  <TouchableOpacity
                    onPress={() => {}}
                    style={{
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
                    }}>
                    {/* <Icon
                      icon={Images.SignIn.FingerPrint}
                      style={{
                        width: scale(17),
                        height: scale(17),
                      }}
                      tintColor={Colors.white}
                    /> */}
                    <Icon
                      icon={Images.SignIn.Face}
                      style={{
                        width: scale(17),
                        height: scale(17),
                      }}
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
  box_1: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
});
export default Login;
