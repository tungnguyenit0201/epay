import React from 'react';
import {ScrollView, StyleSheet, View, Pressable} from 'react-native';
import {Text, Header, Icon, Button, TextInput} from 'components';
import {Colors, Spacing, Images} from 'themes';
import {useTranslation} from 'context/Language';
import {useAuth, useTouchID} from 'context/Auth/utils';
import _ from 'lodash';
import {scale} from 'utils/Functions';
import {Formik} from 'formik';
import BigLogo from 'components/Auth/BigLogo';
import Content from 'components/Auth/Content';
import {passwordSchema} from 'utils/ValidationSchemas';
import {useError} from 'context/Common/utils';
import BlueHeader from 'components/Auth/BlueHeader';
import FooterContainer from 'components/Auth/FooterContainer';

const Login = ({route}) => {
  const {onChangePhone, onForgetPassword, onLogin, onLoginByTouchID} =
    useAuth();
  const translation = useTranslation();

  const {biometryType, onTouchID} = useTouchID({
    onSuccess: () =>
      onLoginByTouchID({phone: _.get(route, 'params.phone', '')}),
  });

  return (
    //TODO: translate
    <BlueHeader>
      <View style={styles.pb1}>
        <BigLogo style={{marginBottom: 30}} />
        <Content
          style={styles.wrap}
          title={translation.enter_your_password}
          text={
            //translation.password_for_account_security_and_transaction_confirmation_at_checkout
            _.get(route, 'params.phone', '')
          }
        />
      </View>

      <Formik
        initialValues={{
          password: '',
        }}
        onSubmit={({password}) =>
          onLogin({phone: _.get(route, 'params.phone', ''), password})
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
            <View style={styles.flex1}>
              <View style={[styles.wrap, styles.flex1]}>
                <TextInput
                  password
                  required
                  onChange={handleChange('password')}
                  onBlur={handleBlur('password')}
                  placeholder={translation.enter_your_password}
                  error={touched.password && errors.password}
                  value={values.password}
                  //leftIcon={Images.Transfer.Lock}
                  autoFocus
                  style={styles.wrap}
                />

                <View style={[styles.box, {marginTop: 5}]}>
                  <Pressable onPress={onForgetPassword}>
                    <Text style={[styles.linkText]}>
                      {translation.forgot_password}
                    </Text>
                  </Pressable>

                  <Pressable onPress={onChangePhone}>
                    <Text style={[styles.linkText]}>Đổi SĐT</Text>
                  </Pressable>
                </View>
              </View>

              <FooterContainer>
                <View style={[styles.flexRow]}>
                  <Button
                    label="Đăng nhập"
                    onPress={handleSubmit}
                    style={!biometryType ? styles.flex1 : styles.firstBtn}
                    disabled={!values.password || !_.isEmpty(errors)}
                  />

                  {!!biometryType && (
                    <Pressable onPress={onTouchID} style={styles.btn}>
                      <Icon
                        icon={
                          biometryType === 'FaceID'
                            ? Images.SignIn.Face
                            : Images.SignIn.FingerPrint
                        }
                        style={styles.iconSize}
                        tintColor={Colors.white}
                      />
                    </Pressable>
                  )}
                </View>
              </FooterContainer>
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
});
export default Login;
