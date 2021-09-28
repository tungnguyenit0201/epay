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

import BlueHeader from '../../Atoms/BlueHeader';
import FooterContainer from '../../Atoms/FooterContainer';
import Wrapper from '../../Groups/Wrapper';
const RegisterName = () => {
  let [disable, setDisable] = useState(true);
  const translation = require('../../../Context/Language/vi.json');
  const [showModal, setShowModal] = useState(false);
  const [active, setActive] = useState(false);
  return (
    <Wrapper>
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
              console.log('setpersonalinfo');
            };

            return (
              <>
                <BlueHeader style={styles.container} heightBg={180}>
                  <BigLogo style={{marginBottom: 20}} />
                  <Content
                    style={styles.wrap}
                    title="Nhập tên"
                    text="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
                  />

                  <View style={[styles.wrap, {marginTop: 20}]}>
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
                  {values?.FullName.length >= 3
                    ? setActive(true)
                    : setActive(false)}
                </BlueHeader>
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
      <FooterContainer>
        {active ? (
          <>
            <Image
              source={Images.Gradient.B_Done.default}
              style={{height: 48, borderRadius: 8, cursor: 'pointer'}}
            />
          </>
        ) : (
          <Image
            source={Images.Gradient.B_doneDisable.default}
            style={{height: 48, borderRadius: 8, cursor: 'pointer'}}
          />
        )}
      </FooterContainer>
    </Wrapper>
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
