import React, {useEffect} from 'react';
import {
  View,
  Image,
  StyleSheet,
  Pressable,
  Text,
} from 'react-native';
import Button from '../../Atoms/Button';
import TextInput from '../../Atoms/TextInput';
import {Colors, Images, Spacing, Fonts} from 'themes';
import {Formik} from 'formik';
import {phoneSchema} from 'utils/ValidationSchemas';
import _ from 'lodash';

const Auth = () => {
  const phone = '0903899495';
  const translation = require('../../../Context/Language/vi.json');
  console.log(Images.logoEpay)
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Pressable
          onPress={() => console.log('press')}
          style={{
            marginBottom: Spacing.PADDING + 28,
            alignItems: 'center',
          }}>
          <Image style={{ width: 120, height: 72 }} source={Images.logoEpay.default} resizeMode="contain" />
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
          onSubmit={()=> console.log('submit')}>
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
                    top: 400,
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
