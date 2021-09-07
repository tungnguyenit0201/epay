import React, {useRef, useState} from 'react';
import {ScrollView, StyleSheet, View, useWindowDimensions} from 'react-native';
import {Text, Header, Button, InputBlock, HeaderBg} from 'components';
import {base, Colors, Fonts, Spacing} from 'themes';
import {SCREEN, TEXT, FUNCTION_TYPE} from 'configs/Constants';
import Progress from 'components/User/VerifyInfo/Progress';
import {useVerifyInfo, useUserInfo} from 'context/User/utils';
import SelectImage from 'components/User/VerifyInfo/SelectImage';
import {Formik} from 'formik';
const VerifyUserInfo = () => {
  const {onChange, onContinue} = useVerifyInfo();
  let [domain, setDomain] = useState(0);
  const {onVerifyEmail} = useUserInfo();
  return (
    // TODO: translate
    <ScrollView style={base.wrap}>
      <HeaderBg>
        <Header back title="Xác thực Email" />
      </HeaderBg>

      <View style={[base.container, {paddingTop: 20}]}>
        <Text fs="h5" bold mb={10}>
          Nhập email
        </Text>
        <Text mb={20}>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry.
        </Text>
        <Formik
          initialValues={{
            email: '',
          }}
          onSubmit={({email}) => onVerifyEmail({email})}>
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
                  email
                  placeholder="Nhập email"
                  onChange={handleChange('email')}
                  onBlur={handleBlur('email')}
                  error={touched.email && errors.email}
                  value={values.email}
                />
                <Button mb={10} label="Tiếp tục" onPress={handleSubmit} />
              </View>
            );
          }}
        </Formik>
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({});
export default VerifyUserInfo;
