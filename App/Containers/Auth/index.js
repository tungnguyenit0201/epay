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
import {Content, BigLogo} from 'components/Auth';
import BlueHeader from 'components/Auth/BlueHeader';
import FooterContainer from 'components/Auth/footerContainer';

const Auth = () => {
  const {onCheckPhoneExist} = useAuth();
  const {phone} = usePhone();
  const translation = useTranslation();
  const {width} = useWindowDimensions();
  return (
    //TODO: translate
    <BlueHeader style={styles.wrap}>
      {/* test layout
        onPress={() => Navigator.navigate(SCREEN.REGISTER_FAILURE, 
        {functionType:'', phone:'', password:''})} */}
      <BigLogo
        style={{marginBottom: 30}}
        onPress={() =>
          Navigator.navigate(SCREEN.REGISTER_FAILURE, {
            functionType: '',
            phone: '',
            password: '',
          })
        }
      />

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

              <FooterContainer
                style={[styles.absolute, styles.botZero, {width: width}]}>
                <Button
                  label={translation.continue}
                  onPress={handleSubmit}
                  disabled={!_.isEmpty(errors)}
                />
              </FooterContainer>
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
  absolute: {position: 'absolute'},
  botZero: {bottom: 0},
});
export default Auth;
