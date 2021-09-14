import React, {useRef, useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
} from 'react-native';
import Header from '../../Atoms/Header';
import Button from '../../Atoms/Button';
import Icon from '../../Atoms/Icon';
import TextInput from '../../Atoms/TextInput';
import {Colors, Fonts, Spacing, Images} from 'themes';
import {scale} from 'utils/Functions';
import HelpModal from '../../Groups/HelpModal';
import Content from '../../Atoms/Content';
import BigLogo from '../../Atoms/BigLogo';
import {Formik} from 'formik';
import {SafeAreaProvider} from 'react-native-safe-area-context';

const RegisterName = () => {
  let [disable, setDisable] = useState(true);
  const translation = require('../../../Context/Language/vi.json');
  const [showModal, setShowModal] = useState(false);
  return (
    <SafeAreaProvider>
      <Formik
        initialValues={{
          FullName: '',
        }}
        // validationSchema={phoneSchema}
        onSubmit={() => console.log('press')}>
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
            console.log('setpersonalinfo')
          };

          return (
            <>
              <View style={styles.container}>
                <View>
                  <Header
                    back
                    blackIcon
                    style={styles.header}
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
                onPress={() => console.log('press')}
              />
            </>
          );
        }}
      </Formik>
    </SafeAreaProvider>
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
  header: {
    paddingTop: 10,
    backgroundColor: Colors.white,
    color: Colors.BLACK,
  },
});

export default RegisterName;
