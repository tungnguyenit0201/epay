import React, {useRef, useState} from 'react';
import {StyleSheet, View, TouchableOpacity, Image} from 'react-native';
import {Text, Header, Button, Icon, TextInput} from 'components';
import {Colors, Fonts, Spacing, Images} from 'themes';
import {useTranslation} from 'context/Language';
import {useUserInfo} from 'context/User/utils';
import {scale} from 'utils/Functions';
import {HelpModal, Content, BigLogo} from 'components/Auth';
import {Formik} from 'formik';
import {useRegister} from 'context/Auth/utils';
import {nameSchema} from 'utils/ValidationSchemas';
import BlueHeader from 'components/Auth/BlueHeader';
import FooterContainer from 'components/Auth/FooterContainer';

const RegisterName = () => {
  let [disable, setDisable] = useState(true);
  const translation = useTranslation();
  const {personalInfo, onUpdatePersonalInfo, setPersonalInfo} = useUserInfo();
  const {showModal, setShowModal, openCallDialog} = useRegister();
  return (
    <Formik
      initialValues={{
        FullName: '',
      }}
      validationSchema={nameSchema}
      onSubmit={onUpdatePersonalInfo}>
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
          setPersonalInfo(field, value);
        };

        return (
          //TODO: translate
          <BlueHeader>
            <BigLogo style={{marginBottom: 30}} />
            <Content
              style={styles.wrap}
              title="Nhập tên"
              text="Nhập họ và tên để tạo tài khoản trên ví EPAY"
            />

            <View style={[styles.wrap, styles.flex1]}>
              <TextInput
                required
                onFocus={e => setDisable(false)}
                placeholder={translation.enter_your_name}
                onChange={handleChange('FullName')}
                onBlur={handleBlur('FullName')}
                error={touched.FullName && errors.FullName}
                value={values.FullName}
                isDeleted={values.FullName}
                maxLength={100}
              />
            </View>

            <FooterContainer>
              <Button
                disabled={disable}
                label={translation.done}
                style={styles.btn}
                onPress={handleSubmit}
              />
            </FooterContainer>

            <HelpModal
              showModal={showModal}
              setShowModal={setShowModal}
              onPress={openCallDialog}
            />
          </BlueHeader>
        );
      }}
    </Formik>
  );
};

const styles = StyleSheet.create({
  wrap: {paddingHorizontal: Spacing.PADDING},
  flex1: {flex: 1},
  //-----------------------
  btn: {
    paddingTop: 15,
    paddingBottom: 15,
  },
});

export default RegisterName;
