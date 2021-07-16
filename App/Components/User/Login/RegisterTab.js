import React, {useRef} from 'react';
import {View, ScrollView, Alert, useWindowDimensions} from 'react-native';
import {Button, Text, Checkbox} from 'components';
import {scale} from 'utils/Functions';
import {InputBlock} from 'components';
import {Spacing, Colors} from 'themes';
import {Formik} from 'formik';
import {registerSchema} from 'utils/ValidationSchemas';
import {User} from 'services';
import _ from 'lodash';

const RegisterTab = ({onLoading, onDoneRegister}) => {
  const {width} = useWindowDimensions();
  const scrollViewRef = useRef(null);

  const onRegister = async (values, {resetForm}) => {
    const {username, password, email, address, phone} = values;

    onLoading && onLoading(true);
    const params = _.pickBy(
      {username, password, email, address, phone},
      x => !!x,
    );
    try {
      let user = await User.register(params);
      user?.code == 200 && resetForm({});
      onDoneRegister && onDoneRegister();
    } catch (error) {
      if (!error.code) {
        return;
      }
      switch (error.code) {
        case 406:
          Alert.alert(
            'Đăng ký thất bại',
            `Email đã tồn tại. hãy thử "Quên mật khẩu"`,
          );
      }
    } finally {
      onLoading(false);
    }
  };

  return (
    <View>
      <Formik
        initialValues={{
          username: '',
          password: '',
          email: '',
          address: '',
          phone: '',
          agreement: false,
        }}
        validationSchema={registerSchema}
        onSubmit={onRegister}>
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
            <View style={{width: width, flex: 1}}>
              <ScrollView
                showsVerticalScrollIndicator={false}
                style={{
                  paddingHorizontal: scale(15),
                  flex: 1,
                }}
                keyboardShouldPersistTaps="always"
                contentContainerStyle={{paddingVertical: scale(35)}}
                ref={scrollViewRef}>
                <InputBlock
                  label="Tên đăng nhập"
                  required
                  onChange={handleChange('username')}
                  onBlur={handleBlur('username')}
                  error={touched.username && errors.username}
                  value={values.username}
                  scrollViewRef={scrollViewRef}
                />
                <InputBlock
                  label="Mật khẩu"
                  password
                  required
                  onChange={handleChange('password')}
                  onBlur={handleBlur('password')}
                  error={touched.password && errors.password}
                  value={values.password}
                  scrollViewRef={scrollViewRef}
                />
                <InputBlock
                  label="Xác nhận mật khẩu"
                  password
                  required
                  onChange={handleChange('passwordConfirmation')}
                  onBlur={handleBlur('passwordConfirmation')}
                  error={
                    touched.passwordConfirmation && errors.passwordConfirmation
                  }
                  value={values.passwordConfirmation}
                  scrollViewRef={scrollViewRef}
                />
                <InputBlock
                  label="Email"
                  email
                  required
                  onChange={handleChange('email')}
                  onBlur={handleBlur('email')}
                  error={touched.email && errors.email}
                  value={values.email}
                  scrollViewRef={scrollViewRef}
                />
                <InputBlock
                  label="Địa chỉ"
                  onChange={handleChange('address')}
                  onBlur={handleBlur('address')}
                  error={touched.address && errors.address}
                  value={values.address}
                  scrollViewRef={scrollViewRef}
                />
                <InputBlock
                  label="Số điện thoại"
                  numeric
                  onChange={handleChange('phone')}
                  onBlur={handleBlur('phone')}
                  error={touched.phone && errors.phone}
                  value={values.phone}
                  scrollViewRef={scrollViewRef}
                />
              </ScrollView>
              <View
                style={{
                  padding: Spacing.PADDING,
                  backgroundColor: '#FAFAFA',
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                  }}>
                  <Checkbox onPress={handleChange('agreement')}></Checkbox>
                  <Text
                    style={{
                      color: Colors.GRAY,
                      marginLeft: scale(10),
                    }}>
                    Tôi đồng ý với các{' '}
                    <Text
                      style={{
                        color: Colors.PRIMARY,
                        textDecorationLine: 'underline',
                      }}>
                      điều kiện và điều khoản
                    </Text>{' '}
                    từ MangoAds
                  </Text>
                </View>
                {touched.agreement && errors.agreement && (
                  <Text color={Colors.ALERT} mt={3} size={12}>
                    {errors.agreement}
                  </Text>
                )}
                <Button
                  onPress={handleSubmit}
                  label="Đăng ký"
                  style={{marginTop: Spacing.PADDING}}
                />
              </View>
            </View>
          );
        }}
      </Formik>
    </View>
  );
};

export default React.memo(RegisterTab);
