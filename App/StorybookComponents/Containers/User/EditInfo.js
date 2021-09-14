import React, {useRef} from 'react';
import {StyleSheet, View, ScrollView, useWindowDimensions} from 'react-native';
import {Colors, Fonts, Images, Spacing, base} from 'themes';
import Button from '../../Atoms/Button';
import Header from '../../Atoms/Header';
import InputBlock from '../../Atoms/InputBlock';
import HeaderBg from '../../Atoms/HeaderBg';
import Text from '../../Atoms/Text';

// my import
import {Formik} from 'formik';
import {addressSchema} from 'utils/ValidationSchemas';
import {scale} from 'utils/Functions';

import _ from 'lodash';
const EditInfo = () => {
  // TODO : translation
  const SexType = {1: 'Nam', 2: 'Nữ', 3: 'Khác'};

  return (
    <ScrollView style={{backgroundColor: Colors.white}}>
      <HeaderBg>
        <Header title="Thông tin cá nhân" back />
      </HeaderBg>
      <View style={[base.container, {paddingTop: 20}]}>
        <View pointerEvents="none">
          <InputBlock
            label="Họ và Tên"
            value={'Phạm Như Huy Hùng'}
            style={{backgroundColor: Colors.g2, textTransform: 'uppercase'}}
          />
        </View>
        <View pointerEvents="none">
          <InputBlock
            label="Ngày sinh"
            value={'10/12/1994'}
            style={{backgroundColor: Colors.g2, textTransform: 'uppercase'}}
          />
        </View>
        <View style={styles.flexRow}>
          <Text>Giới tính: </Text>
          <Text>{'Nam'}</Text>
        </View>
        <View pointerEvents="none">
          <InputBlock
            label="CMND / CCCD"
            value={'Chưa có'}
            style={{backgroundColor: Colors.g2, textTransform: 'uppercase'}}
          />
        </View>
        <View pointerEvents="none">
          <InputBlock
            label="Nơi cấp"
            value={'Chưa có'}
            style={{backgroundColor: Colors.g2, textTransform: 'uppercase'}}
          />
        </View>
        <View pointerEvents="none">
          <InputBlock
            label="Ngày cấp"
            value={'Chưa có'}
            style={{backgroundColor: Colors.g2, textTransform: 'uppercase'}}
          />
        </View>
        <Formik
          initialValues={{
            Address: '12 Lý Chính Thắng',
            Ward: 'Phường Tân an',
            County: 'Việt Nam',
            Provincial: 'Buôn Ma thuột',
          }}
          validationSchema={addressSchema}
          onSubmit={value => {
            console.log(value);
          }}>
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
                <ScrollView
                  showsVerticalScrollIndicator={false}
                  keyboardShouldPersistTaps="always"
                  contentContainerStyle={{paddingVertical: scale(35)}}>
                  <InputBlock
                    label="Tỉnh / Thành phố"
                    onChange={handleChange('Provincial')}
                    onBlur={handleBlur('Provincial')}
                    error={touched.Provincial && errors.Provincial}
                    value={values.Provincial}
                    rightIcon={Images.Down}
                  />
                  <InputBlock
                    label="Quận"
                    onChange={handleChange('County')}
                    onBlur={handleBlur('County')}
                    error={touched.County && errors.County}
                    value={values.County}
                    rightIcon={Images.Down}
                  />
                  <InputBlock
                    label="Phường / Xã"
                    email
                    required
                    onChange={handleChange('Ward')}
                    onBlur={handleBlur('Ward')}
                    error={touched.Ward && errors.Ward}
                    value={values.Ward}
                    rightIcon={Images.Down}
                  />
                  <InputBlock
                    label="Địa chỉ"
                    required
                    onChange={handleChange('Address')}
                    onBlur={handleBlur('Address')}
                    error={touched.Address && errors.Address}
                    value={values.Address}
                  />
                </ScrollView>
                <View style={{paddingBottom: Spacing.PADDING}}>
                  <Button onPress={handleSubmit} label="Đăng ký" />
                </View>
              </View>
            );
          }}
        </Formik>
      </View>
    </ScrollView>
  );
};

export default EditInfo;

const styles = StyleSheet.create({
  flexRow: {
    flex: 1,
    flexDirection: 'row',
    paddingVertical: 10,
  },
});
