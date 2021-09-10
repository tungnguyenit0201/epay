import React, {useRef, useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
} from 'react-native';
import {Text, InputBlock, Header, Button, Icon, TextInput} from 'components';
import {Colors, Fonts, Spacing, Images} from 'themes';
import {useTranslation} from 'context/Language';
import {useUserInfo} from 'context/User/utils';
import {scale} from 'utils/Functions';
import {HelpModal, Content, BigLogo} from 'components/Auth';
import {Formik} from 'formik';
import {useRegister} from 'context/Auth/utils';

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
      // validationSchema={phoneSchema}
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
          <>
            <View style={styles.container}>
              <View>
                <Header
                  back
                  blackIcon
                  avoidStatusBar
                  // style={styles.header}
                  renderRightComponent={() => (
                    <TouchableOpacity
                      style={styles.pRight}
                      onPress={() => setShowModal(true)}>
                      <Icon
                        icon={Images.Register.Info}
                        style={styles.firstIcon}
                        tintColor={Colors.BLACK}
                      />
                    </TouchableOpacity>
                  )}
                />
              </View>
              <BigLogo />
              <Content
                title="Nhập tên"
                text={
                  translation.password_for_account_security_and_transaction_confirmation_at_checkout
                }
              />

              <View style={[styles.wrap, {marginTop: Spacing.PADDING * 3}]}>
                <TextInput
                  required
                  onFocus={e => setDisable(false)}
                  placeholder={translation.enter_your_name}
                  onChange={handleChange('FullName')}
                  onBlur={handleBlur('FullName')}
                  // error={touched.FullName && errors.FullName}
                  value={values.FullName}
                  isDeleted={values.FullName}
                />
              </View>
            </View>

            <View
              style={[
                styles.wrap,
                {
                  paddingVertical: Spacing.PADDING,
                  backgroundColor: Colors.BACKGROUNDCOLOR,
                },
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
          </>
        );
      }}
    </Formik>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.BACKGROUNDCOLOR,
  },
  wrap: {
    paddingHorizontal: Spacing.PADDING,
  },
  btn: {
    paddingTop: 15,
    paddingBottom: 15,
  },
  pRight: {
    position: 'absolute',
    right: 15,
  },
  firstIcon: {
    width: scale(24),
    height: scale(24),
  },
  // header: {
  //   paddingTop: 10,
  //   backgroundColor: Colors.white,
  //   color: Colors.BLACK,
  // },
});

export default RegisterName;
