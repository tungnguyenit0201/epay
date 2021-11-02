import React, {useRef, useState} from 'react';
import {StyleSheet, View, TouchableOpacity, Image} from 'react-native';
import {Text, FooterContainer, Button, Icon, TextInput} from 'components';
import {Colors, Fonts, Spacing, Images} from 'themes';
import {useTranslation} from 'context/Language';
import {useUserInfo} from 'context/User/utils';
import {scale} from 'utils/Functions';
import {HelpModal, Content, BigLogo} from 'components/Auth';
import {Formik} from 'formik';
import {useRegister} from 'context/Auth/utils';
import {nameSchema} from 'utils/ValidationSchemas';
import BlueHeader from 'components/Auth/BlueHeader';
import _ from 'lodash';

const RegisterName = () => {
  const translation = useTranslation();
  const {personalInfo, onUpdatePersonalInfo, setPersonalInfo} = useUserInfo();
  const {showModal, setShowModal, openCallDialog} = useRegister();
  return (
    <Formik
      initialValues={{
        FullName: '',
      }}
      validationSchema={nameSchema}
      onSubmit={onUpdatePersonalInfo}
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
        isSubmitting,
      }) => {
        const handleChange = field => value => {
          let valueConvert = value?.replace(/[0-9]/g, '');
          setFieldValue(field, valueConvert);
          setFieldTouched(field, true, false);
          setPersonalInfo(field, valueConvert);
        };

        return (
          <BlueHeader>
            <BigLogo style={{marginBottom: 30}} />
            <Content
              style={styles.wrap}
              title={translation.enter_full_name}
              text={
                translation.enter_your_first_and_last_name_to_create_an_account_on_epay
              }
            />

            <View style={[styles.wrap, styles.flex1]}>
              <TextInput
                required
                placeholder={translation.enter_full_name}
                onChange={handleChange('FullName')}
                onBlur={handleBlur('FullName')}
                error={touched.FullName && translation[errors.FullName]}
                value={values?.FullName}
                isDeleted={values.FullName}
                maxLength={100}
                name
              />
            </View>

            <FooterContainer>
              <Button
                disabled={!values?.FullName || errors?.FullName || isSubmitting}
                label={translation.completed}
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
});

export default RegisterName;
