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

const ForgetPassword = () => {
  const {phone} = usePhone();
  const {onSubmitPhone} = useForgetPassword();
  const translation = useTranslation();

  return (
    <View style={styles.container}>
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
        <Text bold fs="h5" centered>
          Quên mật khẩu
        </Text>
      </View>

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
                {/* <TextInput
                  numeric
                  onChange={handleChange('phone')}
                  onBlur={handleBlur('phone')}
                  error={touched.phone && errors.phone}
                  value={values.phone}
                  style={styles.inputBlock}
                  placeholderTextColor={Colors.BLACK}
                  placeholder="Nhập số điện thoại"
                /> */}
                <TextInput
                  placeholder={translation.enter_your_phone_number}
                  password
                  required
                  onChange={handleChange('password')}
                  onBlur={handleBlur('password')}
                  // error={touched.phone && errors.phone}
                  value={values.password}
                  leftIcon={Images.Transfer.Lock}
                />
                <Text style={styles.message}>
                  {translation.password_does_not_match}
                </Text>
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
  // header: {
  //   fontSize: Fonts.H2,
  //   fontWeight: 'bold',
  //   paddingBottom: Spacing.PADDING,
  // },
  message: {
    marginTop: 12,
    color: Colors.Highlight,
    textAlign: 'center',
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
