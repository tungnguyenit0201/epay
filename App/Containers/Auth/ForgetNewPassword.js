import React, {useRef, useState} from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
} from 'react-native';
import {Text, Checkbox, Header, Button, TextInput, Icon} from 'components';
import {Colors, Spacing, Images} from 'themes';
import {useForgetPassword} from 'context/Auth/utils';
import {scale} from 'utils/Functions';
import {Formik} from 'formik';
import {newPasswordSchema} from 'utils/ValidationSchemas';
import {useTranslation} from 'context/Language';
import BigLogo from 'components/Auth/BigLogo';
import Content from 'components/Auth/Content';
import _ from 'lodash';

const ForgetNewPassword = ({route}) => {
  const {phone} = route?.params;
  const {onNewPassword} = useForgetPassword();
  const scrollViewRef = useRef(null);
  const translation = useTranslation();
  const onSubmit = values => {
    onNewPassword({...values, phone});
  };

  return (
    <View style={styles.container}>
      <View>
        <Header
          back
          blackIcon
          avoidStatusBar
          title={translation.reset_your_password}
          // titleStyle={styles.headerTitle}
          renderRightComponent={() => (
            <TouchableOpacity style={styles.pRight}>
              <Icon
                icon={Images.Register.Info}
                style={styles.firstIcon}
                tintColor={Colors.BLACK}
              />
            </TouchableOpacity>
          )}
        />
      </View>

      <Formik
        initialValues={{
          newPassword: '',
          passwordConfirm: '',
        }}
        validationSchema={newPasswordSchema}
        onSubmit={onSubmit}>
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
          // TODO: translate
          return (
            <View style={styles.wrap}>
              <ScrollView
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="always"
                contentContainerStyle={{paddingVertical: scale(24)}}
                ref={scrollViewRef}>
                {/* <BigLogo /> */}
                <Content
                  // title="Tạo mật khẩu Epay"
                  text={
                    translation.password_for_account_security_and_transaction_confirmation_at_checkout
                  }
                />
                <View style={{height: scale(24)}} />
                <TextInput
                  password
                  required
                  onChange={handleChange('newPassword')}
                  onBlur={handleBlur('newPassword')}
                  placeholder={translation.enter_your_password}
                  error={touched.newPassword && errors.newPassword}
                  value={values.newPassword}
                  scrollViewRef={scrollViewRef}
                  leftIcon={Images.Transfer.Lock}
                />
                <TextInput
                  password
                  required
                  onChange={handleChange('passwordConfirm')}
                  onBlur={handleBlur('passwordConfirm')}
                  placeholder={translation.confirm_password}
                  error={touched.passwordConfirm && errors.passwordConfirm}
                  value={values.passwordConfirm}
                  scrollViewRef={scrollViewRef}
                  leftIcon={Images.Transfer.Lock}
                />
                <Text style={styles.textNote}>
                  {
                    translation.note_password_needs_to_be_at_least_8_characters_including_lowercase_uppercase_and_number
                  }
                </Text>
              </ScrollView>

              <View style={{paddingBottom: 20}}>
                <Button
                  disabled={!_.isEmpty(errors)}
                  mt={10}
                  label={translation?.continue}
                  onPress={handleSubmit}
                />
              </View>
            </View>
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
    flex: 1,
    paddingHorizontal: Spacing.PADDING,
  },
  pRight: {
    position: 'absolute',
    right: 15,
  },
  firstIcon: {
    width: scale(24),
    height: scale(24),
  },

  // headerTitle: {
  //   color: Colors.BLACKTEXT,
  // },
});
export default ForgetNewPassword;
