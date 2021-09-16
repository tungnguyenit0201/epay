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
              text="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
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
              />
            </View>

            <View
              style={[
                styles.wrap,
                styles.py1,
                styles.bgWhite,
                styles.blockBtn,
              ]}>
              <Button
                disabled={disable}
                label={translation.done}
                style={styles.btn}
                onPress={handleSubmit}
              />
            </View>
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
  py1: {paddingVertical: Spacing.PADDING},
  //-----------------------
  bgWhite: {backgroundColor: Colors.white},
  //-----------------------
  btn: {
    paddingTop: 15,
    paddingBottom: 15,
  },
  blockBtn: {
    borderTopLeftRadius: Spacing.PADDING,
    borderTopRightRadius: Spacing.PADDING,
    shadowColor: Colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.16,
    shadowRadius: 8,
    elevation: 24,
  },
});

export default RegisterName;
