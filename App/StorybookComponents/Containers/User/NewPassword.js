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
import HeaderBg from '../../Atoms/HeaderBg';
import BlueHeader from '../../Atoms/BlueHeader';
import FooterContainer from '../../Atoms/FooterContainer';
import Checkbox from '../../Atoms/Checkbox';
import Wrapper from '../../Groups/Wrapper';
const NewPassword = ({route, create}) => {
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
      <ScrollView>
        <HeaderBg>
          <Header
            back
            title={'Xác thực'}
            style={{marginTop: 25, marginBottom: -15}}
          />
        </HeaderBg>

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
                    title={'Đặt mật khẩu mới'}
                    text={
                      'Lưu ý: Mật khẩu cần có ít nhất 8 kí tự gồm chữ thường, chữ hoa & số'
                    }
                    colorTitle={Colors.black}
                  />

                  <TextInput
                    password
                    required
                    onChange={handleChange('newPassword')}
                    onBlur={handleBlur('newPassword')}
                    placeholder={translation.enter_your_password}
                    error={touched.newPassword && errors.newPassword}
                    value={values.newPassword}
                    scrollViewRef={scrollViewRef}
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
                  />
                </ScrollView>
                {_.isEmpty(errors) && active === true
                  ? setErr(true)
                  : setErr(false)}
              </View>
            );
          }}
        </Formik>
      </ScrollView>

      <FooterContainer>
        {err ? (
          <Image
            source={Images.Gradient.B_Continue.default}
            style={base.buttonSB}
          />
        ) : (
          <Image
            source={Images.Gradient.B_continueDisable.default}
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
export default NewPassword;
