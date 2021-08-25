import React, {useRef} from 'react';
import {StyleSheet, View, ScrollView, useWindowDimensions} from 'react-native';
import {Colors, Fonts, Images, Spacing, base} from 'themes';
import {Button, Header, InputBlock, Radio, HeaderBg, Text} from 'components';
import {SCREEN, TEXT} from 'configs/Constants';
import Navigator from 'navigations/Navigator';

// my import
import {Formik} from 'formik';
import {addressSchema} from 'utils/ValidationSchemas';
import {scale} from 'utils/Functions';

import {useUserInfo} from 'context/User/utils';
import {useUser} from 'context/User';
import _ from 'lodash';
const EditInfo = () => {
  const {onUpdateUserAddress} = useUserInfo();
  const scrollViewRef = useRef(null);
  const {userInfo} = useUser();
  const SexType = {1: 'Nam', 2: 'Nữ', 3: 'Khác'};
  const {personalInfo, personalAddress, personalIC} = userInfo;

  return (
    <ScrollView style={{backgroundColor: '#fff'}}>
      <HeaderBg>
        <Header title="Thông tin cá nhân" back />
      </HeaderBg>
      <View style={[base.container, {paddingTop: 20}]}>
        <View pointerEvents="none">
          <InputBlock
            label="Họ và Tên"
            value={personalInfo?.FullName}
            style={{backgroundColor: Colors.g2, textTransform: 'uppercase'}}
          />
        </View>
        <View pointerEvents="none">
          <InputBlock
            label="Ngày sinh"
            value={personalInfo?.DateOfBirth}
            style={{backgroundColor: Colors.g2, textTransform: 'uppercase'}}
          />
        </View>
        <View style={styles.flexRow}>
          <Text>Giới tính: </Text>
          <Text>
            {SexType[personalInfo?.SexType]
              ? SexType[personalInfo?.SexType]
              : 'Chưa có'}
          </Text>
        </View>
        <View pointerEvents="none">
          <InputBlock
            label="CMND / CCCD"
            value={personalIC?.ICNumber ? personalIC?.ICNumber : 'Chưa có'}
            style={{backgroundColor: Colors.g2, textTransform: 'uppercase'}}
          />
        </View>
        <View pointerEvents="none">
          <InputBlock
            label="Nơi cấp"
            value={
              personalIC?.ICIssuedPlace ? personalIC?.ICIssuedPlace : 'Chưa có'
            }
            style={{backgroundColor: Colors.g2, textTransform: 'uppercase'}}
          />
        </View>
        <View pointerEvents="none">
          <InputBlock
            label="Ngày cấp"
            value={
              personalIC?.ICIssuedDate ? personalIC?.ICIssuedDate : 'Chưa có'
            }
            style={{backgroundColor: Colors.g2, textTransform: 'uppercase'}}
          />
        </View>
        <Formik
          initialValues={{
            Address: personalAddress?.Address,
            Ward: personalAddress?.Ward,
            County: personalAddress?.County,
            Provincial: personalAddress?.Provincial,
          }}
          validationSchema={addressSchema}
          onSubmit={value => {
            onUpdateUserAddress(value);
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
                  contentContainerStyle={{paddingVertical: scale(35)}}
                  ref={scrollViewRef}>
                  <InputBlock
                    label="Tỉnh / Thành phố"
                    numeric
                    onChange={handleChange('Provincial')}
                    onBlur={handleBlur('Provincial')}
                    error={touched.Provincial && errors.Provincial}
                    value={values.Provincial}
                    scrollViewRef={scrollViewRef}
                  />
                  <InputBlock
                    label="Quận"
                    onChange={handleChange('County')}
                    onBlur={handleBlur('County')}
                    error={touched.County && errors.County}
                    value={values.County}
                    scrollViewRef={scrollViewRef}
                  />
                  <InputBlock
                    label="Phường / Xã"
                    email
                    required
                    onChange={handleChange('Ward')}
                    onBlur={handleBlur('Ward')}
                    error={touched.Ward && errors.Ward}
                    value={values.Ward}
                    scrollViewRef={scrollViewRef}
                  />
                  <InputBlock
                    label="Địa chỉ"
                    required
                    onChange={handleChange('Address')}
                    onBlur={handleBlur('Address')}
                    error={touched.Address && errors.Address}
                    value={values.Address}
                    scrollViewRef={scrollViewRef}
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
