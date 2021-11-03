import React, {useState} from 'react';
import {StyleSheet, View, ScrollView, Pressable} from 'react-native';
import {
  Button,
  Header,
  FooterContainer,
  Text,
  HeaderBg,
  TextInput,
  Icon,
} from 'components';
import {useTranslation} from 'context/Language';
import {base, Colors, Images, Spacing} from 'themes';
import {useUserInfo} from 'context/User/utils';
import {Formik} from 'formik';
import {passwordSchema} from 'utils/ValidationSchemas';
import * as LocalAuthentication from 'expo-local-authentication';
import {useAuth} from 'context/Auth/utils';
import {scale} from 'utils/Functions';

const ChangePassword = ({route}) => {
  const translation = useTranslation();
  const {onConfirmPassword} = useUserInfo(route?.params?.type);
  const {onForgetPassword} = useAuth();

  let biometryType = null;

  return (
    <>
      <HeaderBg>
        <Header back title={route?.params?.headerLabel || 'Đổi mật khẩu'} />
      </HeaderBg>
      <Formik
        initialValues={{
          password: '',
        }}
        onSubmit={({password}) => onConfirmPassword({password})}
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
                <View style={{paddingTop: 20}}>
                  <Text fs="h5" bold mb={10}>
                    {translation.enter_password}
                  </Text>
                  <Text mb={20}>
                    {
                      translation.password_for_account_security_and_transaction_confirmation_at_checkout
                    }
                  </Text>
                  <TextInput
                    password
                    disableSpace
                    placeholder={translation.enter_password}
                    placeholderTextColor={Colors.tp5}
                    onChange={handleChange('password')}
                    onBlur={handleBlur('password')}
                    error={touched.password && translation[errors.password]}
                    value={values.password}
                  />
                  <Pressable
                    onPress={() => {
                      setFieldValue('password', '');
                      onForgetPassword();
                    }}>
                    <Text style={[styles.linkText]}>
                      {translation.forgot_password}?
                    </Text>
                  </Pressable>
                </View>
              </View>
              <FooterContainer>
                <View style={[styles.flexRow]}>
                  <Button
                    label="Xác nhận"
                    onPress={handleSubmit}
                    disabled={!values.password || errors.password}
                    style={!biometryType ? styles.flex1 : styles.firstBtn}
                  />
                  {!!biometryType && (
                    <Pressable
                      onPress={() => {
                        // onSetMessage('');
                        // onTouchID();
                      }}
                      style={styles.btn}>
                      <Icon
                        icon={
                          biometryType ===
                          LocalAuthentication.AuthenticationType
                            .FACIAL_RECOGNITION
                            ? Images.SignIn.Face
                            : Images.SignIn.FingerPrint
                        }
                        style={styles.iconSize}
                        tintColor={Colors.bs4}
                      />
                    </Pressable>
                  )}
                </View>
              </FooterContainer>
            </View>
          );
        }}
      </Formik>
    </>
  );
};

export default ChangePassword;

const styles = StyleSheet.create({
  wrap: {paddingHorizontal: Spacing.PADDING},
  //-------------------
  flex1: {flex: 1, backgroundColor: Colors.bs4},
  linkText: {
    textDecorationStyle: 'solid',
    textDecorationColor: Colors.tp2,
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
    backgroundColor: Colors.brd2,
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
