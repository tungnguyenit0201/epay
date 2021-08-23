import React, {useEffect} from 'react';
import {View, Image, StyleSheet, Pressable} from 'react-native';
import Button from '../../Atoms/Button';
import InputBlock from '../../Atoms/InputBlock';
import {Colors, Images, Spacing} from 'themes';
import {Formik} from 'formik';
import _ from 'lodash';

const Auth = () => {
  // const {onCheckPhoneExist} = useAuth();
  const phone = null;

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Pressable
          onPress={() => console.log('ffff')}
          style={{
            width: '100%',
            height: '50%',
            marginBottom: Spacing.PADDING,
          }}>
          <Image
            source={{
              uri: 'https://is4-ssl.mzstatic.com/image/thumb/Purple114/v4/6c/ee/02/6cee02e7-2fcc-9702-912b-1e9a8d251292/source/512x512bb.jpg',
            }}
            style={{
              flex: 1,
              minHeight: 200
            }}
            resizeMode="contain"
          />
        </Pressable>

        <Formik
          key={phone}
          initialValues={{
            phone: phone || '',
          }}
          // validationSchema={phoneSchema}
          >
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
              <View>
                <InputBlock
                  numeric
                  label={'Vui lòng nhập số điện thoại '}
                  onChange={handleChange('phone')}
                  onBlur={handleBlur('phone')}
                  error={touched.phone && errors.phone}
                  value={values.phone}
                />
                <Button
                  label={'Tiếp tục'}
                  onPress={handleSubmit}
                  disabled={!_.isEmpty(errors)}
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
    paddingVertical: Spacing.PADDING * 10,
    alignItems: 'center',
    flex: 1,
  },
});
export default Auth;
