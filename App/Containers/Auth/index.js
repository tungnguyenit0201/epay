import React, {useEffect} from 'react';
import {
  View,
  Image,
  StyleSheet,
  Pressable,
  Text,
  TouchableOpacity,
} from 'react-native';
import {Button, InputBlock, TextInput, Icon} from 'components';
import {Colors, Images, Spacing, Fonts} from 'themes';
import Navigator from 'navigations/Navigator';
import {SCREEN} from 'configs/Constants';
import {useTranslation} from 'context/Language';
import {useAuth, usePhone} from 'context/Auth/utils';
import {Formik} from 'formik';
import {phoneSchema} from 'utils/ValidationSchemas';
import _ from 'lodash';
import {scale} from 'utils/Functions';

const Auth = () => {
  const {onCheckPhoneExist} = useAuth();
  const {phone} = usePhone();
  const translation = useTranslation();

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Pressable
          onPress={() => Navigator.navigate(SCREEN.TAB_NAVIGATION)}
          style={{
            marginBottom: Spacing.PADDING + 28,
            alignItems: 'center',
          }}>
          <Image source={Images.logoEpay} resizeMode="contain" />
        </Pressable>

        <View style={styles.wrap}>
          <Text style={[styles.title, styles.text_center, {marginBottom: 10}]}>
            {translation.please_enter_your_phone_number}
          </Text>

          <Text style={[styles.text, styles.text_center, {marginBottom: 26}]}>
            {translation.sign_insign_up_epay}
          </Text>
        </View>

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
              <View
                style={{
                  width: '100%',
                  flex: 1,
                }}>
                <View>
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
                </View>

                <Button
                  label={translation.continue}
                  onPress={handleSubmit}
                  disabled={!_.isEmpty(errors)}
                  style={{
                    position: 'absolute',
                    bottom: 40,
                    width: '100%',
                  }}
                />
              </View>
            );
          }}
        </Formik>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.BACKGROUNDCOLOR,
  },
  content: {
    paddingHorizontal: Spacing.PADDING,
    paddingTop: Spacing.PADDING * 4 + 8,
    alignItems: 'center',
    flex: 1,
  },
  text_center: {textAlign: 'center'},
  title: {
    fontWeight: 'bold',
    fontSize: Fonts.H5,
  },
  text: {color: Colors.l6},
});
export default Auth;
