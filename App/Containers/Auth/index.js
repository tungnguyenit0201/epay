import React, {useEffect} from 'react';
import {
  View,
  Image,
  StyleSheet,
  Pressable,
  useWindowDimensions,
} from 'react-native';
import {Button, Text, TextInput, Icon} from 'components';
import {Colors, Images, Spacing, Fonts} from 'themes';
import Navigator from 'navigations/Navigator';
import {SCREEN} from 'configs/Constants';
import {useTranslation} from 'context/Language';
import {useAuth, usePhone} from 'context/Auth/utils';
import {Formik} from 'formik';
import {phoneSchema} from 'utils/ValidationSchemas';
import _ from 'lodash';
// import {scale} from 'utils/Functions';
import {Content} from 'components/Auth';
import BlueHeader from 'components/Auth/BlueHeader';

const Auth = () => {
  const {onCheckPhoneExist} = useAuth();
  const {phone} = usePhone();
  const translation = useTranslation();
  const {width} = useWindowDimensions();
  return (
    //TODO: translate
    <BlueHeader style={styles.wrap}>
      <Pressable
        onPress={() => Navigator.navigate(SCREEN.REGISTER_NAME)}
        style={[styles.alignCenter, styles.mb1]}>
        <Image
          source={Images.logoEpay}
          resizeMode="contain"
          style={styles.logo}
        />
      </Pressable>

      {/* <Text fs="h3" bold style={[styles.textWhite, styles.mb2]}>
        Nhập số điện thoại
      </Text>

      <Text fs="h6" style={[styles.textGray, styles.mb3]}>
        {translation.sign_insign_up_epay}
      </Text> */}

      <Content
        title="Nhập số điện thoại"
        text={translation.sign_insign_up_epay}
      />

      <Formik
        key={phone}
        initialValues={{
          phone: phone || '',
        }}
        validationSchema={phoneSchema}
        onSubmit={onCheckPhoneExist}>
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
              <TextInput
                placeholder={translation.enter_your_phone_number}
                numeric
                onChange={handleChange('phone')}
                onBlur={handleBlur('phone')}
                error={touched.phone && errors.phone}
                value={values.phone}
                leftIcon={Images.Phone_1}
                isDeleted={values.phone}
              />

              <View
                style={[
                  styles.wrap,
                  styles.py1,
                  styles.absolute,
                  styles.botZero,
                  styles.blockBtn,
                  styles.bgWhite,
                  {width: width},
                ]}>
                <Button
                  label={translation.continue}
                  onPress={handleSubmit}
                  disabled={!_.isEmpty(errors)}
                />
              </View>
            </>
          );
        }}
      </Formik>
    </BlueHeader>
  );
};
const styles = StyleSheet.create({
  wrap: {paddingHorizontal: Spacing.PADDING},
  //-----------------------
  alignCenter: {alignItems: 'center'},
  //-----------------------
  absolute: {position: 'absolute'},
  botZero: {bottom: 0},
  //-----------------------
  mb1: {marginBottom: 30},
  //-----------------------
  py1: {paddingVertical: Spacing.PADDING},
  //-----------------------
  bgWhite: {backgroundColor: Colors.white},
  //-----------------------
  logo: {
    width: 110,
    height: 40,
  },
  blockBtn: {
    borderTopLeftRadius: Spacing.PADDING,
    borderTopRightRadius: Spacing.PADDING,
    shadowColor: Colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.16,
    shadowRadius: 8,
    elevation: 24,
  },
});
export default Auth;
