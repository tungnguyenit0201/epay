import React, { useRef } from 'react';
import { StyleSheet, View, ScrollView, useWindowDimensions } from 'react-native';
import { Colors, Fonts, Images, Spacing, base } from 'themes';
import { Button, Header, InputBlock, Radio, Checkbox, Text } from 'components';
import { SCREEN, TEXT } from 'configs/Constants';
import Navigator from 'navigations/Navigator';

// my import
import { Formik } from 'formik';
import { addressSchema } from 'utils/ValidationSchemas';
import { scale } from 'utils/Functions';
import HeaderBg from 'components/Common/HeaderBg';

import {useUserInfo} from 'context/User/utils';
import { useUser } from 'context/User';
const EditInfo = () => {
  const {onUpdateUserAddress} = useUserInfo();
  const scrollViewRef = useRef(null);
  const { userInfo } = useUser();
  const {personalInfo, personalAddress, personalIC} = userInfo;

  const onUpdateAddress = async ( values) => {
    const {address, ward, county, provincial} = values;
    await onUpdateUserAddress({
      Address: address,
      Ward: ward,
      County: county,
      Provincial: provincial
    })
  }
  return (
    <ScrollView style={{ backgroundColor: '#fff' }}>
      <HeaderBg><Header title="Thông tin cá nhân" back /></HeaderBg>
      <View style={[base.container, { paddingTop: 20 }]}>
        <View pointerEvents="none">
          <InputBlock
            label="Họ và Tên"
            value={personalInfo?.FullName}
            style={{ backgroundColor: Colors.g2, textTransform: 'uppercase' }}
          />
        </View>
        <View pointerEvents="none">
          <InputBlock
            label="Ngày sinh"
            value={personalInfo?.DateOfBirth}
            style={{ backgroundColor: Colors.g2, textTransform: 'uppercase' }}
          />
        </View>
        <Radio
          items={[
            { label: 'Nữ', value: 1 },
            { label: 'Nam', value: 2 },
          ]}
        />
        <View pointerEvents="none">
          <InputBlock
            label="CMND / CCCD"
            value={personalIC?.ICNumber ? personalIC?.ICNumber : 'Chưa có'}
            style={{ backgroundColor: Colors.g2, textTransform: 'uppercase' }}
          />
        </View>
        <View pointerEvents="none">
          <InputBlock
            label="Nơi cấp"
            value={personalIC?.ICIssuedPlace ? personalIC?.ICIssuedPlace : 'Chưa có'}
            style={{ backgroundColor: Colors.g2, textTransform: 'uppercase' }}
          />
        </View>
        <View pointerEvents="none">
          <InputBlock
            label="Ngày cấp"
            value={personalIC?.ICIssuedDate ? personalIC?.ICIssuedDate : 'Chưa có'}
            style={{ backgroundColor: Colors.g2, textTransform: 'uppercase' }}
          />
        </View>
        <Formik
          initialValues={{
            address: personalAddress?.Address,
            ward: personalAddress?.Ward,
            county: personalAddress?.County,
            provincial: personalAddress?.Provincial,
          }}
          validationSchema={addressSchema}
          onSubmit={onUpdateAddress}>
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
                  contentContainerStyle={{ paddingVertical: scale(35) }}
                  ref={scrollViewRef}>
                  <InputBlock
                    label="Tỉnh / Thành phố"
                    numeric
                    onChange={handleChange('provincial')}
                    onBlur={handleBlur('provincial')}
                    error={touched.provincial && errors.provincial}
                    value={values.provincial}
                    scrollViewRef={scrollViewRef}
                  />
                  <InputBlock
                    label="Quận"
                    onChange={handleChange('county')}
                    onBlur={handleBlur('county')}
                    error={touched.county && errors.county}
                    value={values.county}
                    scrollViewRef={scrollViewRef}
                  />
                  <InputBlock
                    label="Phường / Xã"
                    email
                    required
                    onChange={handleChange('ward')}
                    onBlur={handleBlur('ward')}
                    error={touched.ward && errors.ward}
                    value={values.ward}
                    scrollViewRef={scrollViewRef}
                  />
                  <InputBlock
                    label="Địa chỉ"
                    required
                    onChange={handleChange('address')}
                    onBlur={handleBlur('address')}
                    error={touched.address && errors.address}
                    value={values.address}
                    scrollViewRef={scrollViewRef}
                  />

                </ScrollView>
                <View style={{ paddingBottom: Spacing.PADDING }}>
                  <Button
                    onPress={handleSubmit}
                    label="Đăng ký"
                  />
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

const styles = StyleSheet.create({});
