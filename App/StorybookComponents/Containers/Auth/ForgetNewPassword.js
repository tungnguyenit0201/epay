import React, {useRef, useState} from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
} from 'react-native';
import Text from '../../Atoms/Text';
import TextInput from '../../Atoms/TextInput';
import Header from '../../Atoms/Header';
import Button from '../../Atoms/Button';
import Icon from '../../Atoms/Icon';
import {Colors, Spacing, Images, Fonts} from 'themes';
import {scale} from 'utils/Functions';
import {Formik} from 'formik';
import {newPasswordSchema} from 'utils/ValidationSchemas';
import BigLogo from '../../Atoms/BigLogo';
import Content from '../../Atoms/Content';
import _ from 'lodash';

import BlueHeader from '../../Atoms/BlueHeader';
import FooterContainer from '../../Atoms/FooterContainer';
import Checkbox from '../../Atoms/Checkbox';
const ForgetNewPassword = ({route}) => {
  const phone = '0932122345';
  const scrollViewRef = useRef(null);
  const translation = require('../../../Context/Language/vi.json');

  const onSubmit = values => {
    console.log('hello');
  };

  return (
    <BlueHeader>
      <Header
        back
        renderRightComponent={() => (
          <TouchableOpacity style={styles.pr1}>
            <Icon
              icon={Images.Register.Info.default}
              style={styles.firstIcon}
              tintColor={Colors.white}
            />
          </TouchableOpacity>
        )}
        logo={Images.logoEpay.default}
      />

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
                  title="Đặt lại mật khẩu"
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
              {/* <View style={{paddingBottom: 20}}>
                <Button
                  disabled={!_.isEmpty(errors)}
                  mt={10}
                  label={translation?.continue}
                  onPress={handleSubmit}
                />
              </View> */}
            </View>
          );
        }}
      </Formik>
      <FooterContainer style={{marginTop: 100}}>
        <View style={styles.flexRow}>
          <Checkbox />
          <Text style={{marginLeft: 5, fontSize: Fonts.FONT_SMALL}}>
            {` Tôi đồng ý với các `}
            <TouchableOpacity style={styles.mtMinus1} onPress={() => {}}>
              <Text style={[styles.firstLink]}>{'Thoả thuận người dùng '}</Text>
            </TouchableOpacity>
            và
            <TouchableOpacity style={styles.mtMinus1} onPress={() => {}}>
              <Text style={[styles.firstLink]}>
                {'Chính sách quyền riêng tư '}
              </Text>
            </TouchableOpacity>
            của Epay Services
          </Text>
        </View>

        <Button mt={10} label={translation?.continue} />
      </FooterContainer>
    </BlueHeader>
  );
};
const styles = StyleSheet.create({
  wrap: {
    paddingHorizontal: Spacing.PADDING,
  },
  flex1: {flex: 1},
  flexRow: {flexDirection: 'row'},
  //-----------------------
  mtMinus1: {marginTop: -3},
  //------------------
  py1: {paddingVertical: scale(24)},
  pr1: {paddingRight: Spacing.PADDING},
  //------------------
  firstIcon: {
    width: scale(24),
    height: scale(24),
  },
  note: {
    paddingRight: 10,
    fontSize: 12,
  },
  firstLink: {
    textDecorationLine: 'underline',
    marginLeft: 3,
    fontSize: Fonts.FONT_SMALL,
  },
});
export default ForgetNewPassword;
