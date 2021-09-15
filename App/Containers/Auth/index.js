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
        onPress={() => Navigator.navigate(SCREEN.TAB_NAVIGATION)}
        style={[styles.alignCenter, styles.mb1]}>
        <Image
          source={Images.logoEpay}
          resizeMode="contain"
          style={styles.logo}
        />
      </Pressable>

      <Text fs="h3" bold style={[styles.textWhite, styles.mb2]}>
        {/* {translation.please_enter_your_phone_number} */}
        Nhập số điện thoại
      </Text>

      <Text fs="h6" style={[styles.textGray, styles.mb3]}>
        {translation.sign_insign_up_epay}
      </Text>

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
            <View style={[styles.widthFull, styles.flex1]}>
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

              <Button
                label={translation.continue}
                onPress={handleSubmit}
                disabled={!_.isEmpty(errors)}
                style={[styles.absolute, styles.bot1, styles.widthFull]}
              />
            </View>
          );
        }}
      </Formik>
    </BlueHeader>
  );
};
const styles = StyleSheet.create({
  wrap: {paddingHorizontal: Spacing.PADDING},
  //-----------------------
  flex1: {flex: 1},
  alignCenter: {alignItems: 'center'},
  //-----------------------
  absolute: {position: 'absolute'},
  bot1: {bottom: 20},
  //-----------------------
  widthFull: {width: '100%'},
  //-----------------------
  mb1: {marginBottom: 30},
  mb2: {marginBottom: 14},
  mb3: {marginBottom: 26},
  //-----------------------
  // textCenter: {textAlign: 'center'},
  textWhite: {color: Colors.white},
  textGray: {color: Colors.gray},
  //-----------------------
  logo: {
    width: 110,
    height: 40,
  },
});
export default Auth;
