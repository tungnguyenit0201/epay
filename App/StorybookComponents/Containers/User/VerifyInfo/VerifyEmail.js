import React, {useRef, useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  useWindowDimensions,
  Image,
} from 'react-native';
import Text from '../../../Atoms/Text';
import Header from '../../../Atoms/Header';
import Button from '../../../Atoms/Button';
import TextInput from '../../../Atoms/TextInput';
import HeaderBg from '../../../Atoms/HeaderBg';
import FooterContainer from '../../../Atoms/FooterContainer';
import Wrapper from '../../../Groups/Wrapper';
import {base, Colors, Images} from 'themes';
import {Formik} from 'formik';
import {emailSchema} from '../../../Utils/ValidationSchemas';

const VerifyEmail = () => {
  const translation = require('../../../../Context/Language/vi.json');
  const [err, setErr] = useState(false);
  return (
    <Wrapper>
      <View style={{backgroundColor: Colors.white}}>
        <HeaderBg>
          <Header
            back
            title={translation?.verify_your_account}
            style={{marginTop: 40, marginBottom: -15}}
          />
        </HeaderBg>
      </View>
      <ScrollView style={{backgroundColor: Colors.white, paddingTop: 20}}>
        <Formik
          initialValues={{
            email: '',
          }}
          validationSchema={emailSchema}
          onSubmit={() => console.log('email')}>
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
                <View style={[base.container]}>
                  <Text fs="h4" bold mb={10}>
                    Nhập email
                  </Text>
                  <Text mb={40}>
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry.
                  </Text>

                  <TextInput
                    placeholder="Nhập email "
                    placeholderTextColor={Colors.l5}
                    onChange={handleChange('email')}
                    onBlur={handleBlur('email')}
                    error={touched.email && errors.email}
                    value={values.email}
                    style={{marginTop: -10}}
                  />
                </View>

                <View style={base.bottom}>
                  {_.isEmpty(errors) && values.email
                    ? setErr(true)
                    : setErr(false)}
                </View>
              </View>
            );
          }}
        </Formik>
      </ScrollView>
      <FooterContainer>
        {err ? (
          <Image
            source={Images.Gradient.B_Continue.default}
            style={{
              height: 48,
              borderRadius: 8,
              cursor: 'pointer',
            }}
          />
        ) : (
          <Image
            source={Images.Gradient.B_continueDisable.default}
            style={{height: 48, borderRadius: 8, cursor: 'pointer'}}
          />
        )}
      </FooterContainer>
    </Wrapper>
  );
};

export default VerifyEmail;
