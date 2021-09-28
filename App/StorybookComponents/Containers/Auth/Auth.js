import React, {useEffect, useState} from 'react';
import {
  View,
  Image,
  StyleSheet,
  Pressable,
  Text,
  useWindowDimensions,
} from 'react-native';
import Button from '../../Atoms/Button';
import TextInput from '../../Atoms/TextInput';
import {Colors, Images, Spacing, Fonts, base} from 'themes';
import {Formik} from 'formik';
import {phoneSchema} from '../../Utils/ValidationSchemas';
import {scale} from 'utils/Functions';
import _ from 'lodash';

import BlueHeader from '../../Atoms/BlueHeader';
import BigLogo from '../../Atoms/BigLogo';
import Content from '../../Atoms/Content';
import FooterContainer from '../../Atoms/FooterContainer';
import Wrapper from '../../Groups/Wrapper';
const Auth = () => {
  const phone = '0903899495';
  const translation = require('../../../Context/Language/vi.json');
  const {width, height} = useWindowDimensions();
  const [err, setErr] = useState(false);
  return (
    <Wrapper>
      <BlueHeader style={styles.wrap} heightBg={180}>
        <BigLogo style={{marginBottom: 18}} />
        <Content
          title="Nhập số điện thoại"
          text={translation.sign_insign_up_epay}
        />
        <Formik
          key={phone}
          initialValues={{
            phone: phone || '',
          }}
          validationSchema={phoneSchema}>
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
                  isDeleted={values.phone}
                />
                {_.isEmpty(errors) && values.phone
                  ? setErr(true)
                  : setErr(false)}
              </>
            );
          }}
        </Formik>
      </BlueHeader>
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
  //-----------------------
  absolute: {position: 'absolute'},
  botZero: {bottom: 0},
});
export default Auth;
