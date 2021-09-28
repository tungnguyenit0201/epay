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
import {Colors, Spacing, Images, Fonts, base} from 'themes';
import {scale} from 'utils/Functions';
import {Formik} from 'formik';
import {newPasswordSchema} from '../../Utils/ValidationSchemas';
import BigLogo from '../../Atoms/BigLogo';
import Content from '../../Atoms/Content';
import _ from 'lodash';

import BlueHeader from '../../Atoms/BlueHeader';
import FooterContainer from '../../Atoms/FooterContainer';
import Checkbox from '../../Atoms/Checkbox';
import Wrapper from '../../Groups/Wrapper';
const ForgetNewPassword = ({route, create}) => {
  const phone = '0932122345';
  const scrollViewRef = useRef(null);
  const translation = require('../../../Context/Language/vi.json');
  const [err, setErr] = useState(false);
  const onSubmit = values => {
    console.log('hello');
  };
  const [active, setActive] = useState(false);
  return (
    <Wrapper>
      <BlueHeader heightBg={180}>
        <Header
          back
          renderRightComponent={() => (
            <TouchableOpacity style={styles.pr1}>
              <Icon
                icon={Images.Register.Info}
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
                    title={create ? 'Tạo mật khẩu' : 'Đặt lại mật khẩu'}
                    text={
                      'Lưu ý: Mật khẩu cần có ít nhất 8 kí tự gồm chữ thường, chữ hoa và số'
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
                    defaultValue={'Epay123@'}
                    scrollViewRef={scrollViewRef}
                  />
                  <TextInput
                    password
                    required
                    onChange={handleChange('passwordConfirm')}
                    onBlur={handleBlur('passwordConfirm')}
                    placeholder={translation.confirm_password}
                    error={touched.passwordConfirm && errors.passwordConfirm}
                    defaultValue={'Epay123@'}
                    scrollViewRef={scrollViewRef}
                  />
                  <Text style={styles.textNote}>
                    {
                      translation.note_password_needs_to_be_at_least_8_characters_including_lowercase_uppercase_and_number
                    }
                  </Text>
                </ScrollView>
                {_.isEmpty(errors) && active === true
                  ? setErr(true)
                  : setErr(false)}
              </View>
            );
          }}
        </Formik>
      </BlueHeader>

      <FooterContainer>
        <View style={styles.flexRow}>
          <Checkbox onPress={() => setActive(!active)} />
          <Text style={{marginLeft: 5, fontSize: Fonts.FONT_SMALL}}>
            {` Tôi đồng ý với `}
            <TouchableOpacity style={styles.mtMinus1} onPress={() => {}}>
              <Text style={[styles.firstLink]}>
                {'điều kiện & điều khoản '}
              </Text>
            </TouchableOpacity>
            của Epay
          </Text>
        </View>
        {err ? (
          <Image
            source={Images.Gradient.B_Register.default}
            style={base.buttonSB}
          />
        ) : (
          <Image
            source={Images.Gradient.B_registerDisable.default}
            style={base.buttonSB}
          />
        )}
      </FooterContainer>
    </Wrapper>
  );
};
const styles = StyleSheet.create({
  wrap: {
    paddingHorizontal: Spacing.PADDING,
  },
  flex1: {flex: 1},
  flexRow: {flexDirection: 'row', marginBottom: 16},
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
