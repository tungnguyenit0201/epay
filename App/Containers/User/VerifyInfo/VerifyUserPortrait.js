import React, {useRef, useState} from 'react';
import {ScrollView, StyleSheet, View, useWindowDimensions} from 'react-native';
import {Text, InputBlock, Radio, Header, Button, DatePicker} from 'components';

import {Colors, Fonts, Spacing, Images} from 'themes';
import Navigator from 'navigations/Navigator';
import {SCREEN, TEXT} from 'configs/Constants';
import {useVerifyInfo} from 'context/User/utils';
import Progress from 'components/User/VerifyInfo/Progress';
import {base} from 'themes';
import region from '../RegionSelect/region';
import {Formik} from 'formik';
import {useTranslation} from 'context/Language';
import {verifyUserSchema} from 'utils/ValidationSchemas';

const VerifyUserPortrait = ({route}) => {
  const {onChange, onUpdateAllInfo} = useVerifyInfo(route?.params);
  const translation = useTranslation();
  const {type} = route?.params;

  const pleaseChooseFirst = type => {
    // Alert.alert('Lỗi', `Vui lòng chọn ${type} trước`);
  };

  const goRegionSelect = _type => {
    switch (_type) {
      case 'cites':
        Navigator.navigate('RegionSelect', {
          items: region?.cites,
          type: _type,
          parentType: type,
        });
        break;
      case 'districts':
        if (!region?.city?.value) {
          pleaseChooseFirst('thành phố / tỉnh');
        } else {
          Navigator.navigate('RegionSelect', {
            items: region?.districts?.[region?.city?.value],
            type: _type,
            parentType: type,
          });
        }
        break;
      case 'wards':
        if (!region?.city?.value) {
          pleaseChooseFirst('huyện / xã');
        } else {
          Navigator.navigate('RegionSelect', {
            items: region?.wards?.[region?.district?.value],
            type: _type,
            parentType: type,
          });
        }
        break;
    }
  };

  return (
    <ScrollView style={{backgroundColor: '#fff'}}>
      <Header back title={translation?.account_verification} />
      <Formik
        initialValues={{
          ICFullName: '',
          DateOfBirth: '',
          ICNumber: '',
          ICIssuedDate: '',
          ICIssuedPlace: '',
          Provincial: '',
          County: '',
          Ward: '',
          Address: '',
          SexType: 1,
        }}
        validationSchema={verifyUserSchema}
        onSubmit={onUpdateAllInfo}>
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
            onChange(field, value);
          };
          console.log(' touched, :>> ', touched, errors);

          return (
            <View style={[base.container, {paddingTop: 20}]}>
              <Progress step={3} />
              <InputBlock
                label="Họ và Tên"
                style={{marginBottom: 10}}
                onChange={handleChange('ICFullName')}
                onBlur={handleBlur('ICFullName')}
                error={touched.ICFullName && errors.ICFullName}
                value={values.ICFullName}
                required
              />

              <DatePicker
                label={'Ngày sinh'}
                onChange={handleChange('DateOfBirth')}
                error={touched.DateOfBirth && errors.DateOfBirth}
                onBlur={handleBlur('DateOfBirth')}
                value={values.DateOfBirth}
                required
              />
              <Radio
                items={[
                  {label: 'Nam', value: 1},
                  {label: 'Nữ', value: 2},
                  {label: 'Khác', value: 3},
                ]}
                onChange={handleChange('SexType')}
              />

              <InputBlock
                label="CMND / CCCD"
                onChange={handleChange('ICNumber')}
                onBlur={handleBlur('ICNumber')}
                error={touched.ICNumber && errors.ICNumber}
                value={values.ICNumber}
                style={{marginBottom: 10}}
                required
              />

              <DatePicker
                label={'Ngày cấp'}
                onChange={handleChange('ICIssuedDate')}
                error={touched.ICIssuedDate && errors.ICIssuedDate}
                onBlur={handleBlur('ICIssuedDate')}
                value={values.ICIssuedDate}
                required
              />
              <InputBlock
                label="Nơi cấp"
                onChange={handleChange('ICIssuedPlace')}
                onBlur={handleBlur('ICIssuedPlace')}
                error={touched.ICIssuedPlace && errors.ICIssuedPlace}
                value={values.ICIssuedPlace}
                style={{marginBottom: 10}}
                required
              />
              <InputBlock
                label="Tỉnh / Thành phố"
                rightIcon={Images.Down}
                error={touched.Provincial && errors.Provincial}
                isSelect
                required
                onPress={() => goRegionSelect('cites')}
              />

              <InputBlock
                label="Quận / Huyện"
                rightIcon={Images.Down}
                error={touched.County && errors.County}
                isSelect
                required
                onPress={() => goRegionSelect('districts')}
              />
              <InputBlock
                label="Phường / Xã"
                rightIcon={Images.Down}
                error={touched.Ward && errors.Ward}
                isSelect
                required
                onPress={() => goRegionSelect('wards')}
              />
              <InputBlock
                label="Địa chỉ"
                onChange={handleChange('Address')}
                onBlur={handleBlur('Address')}
                error={touched.Address && errors.Address}
                value={values.Address}
                style={{marginBottom: 10}}
                required
              />

              <Button label={'Xong'} onPress={handleSubmit} />
            </View>
          );
        }}
      </Formik>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.BACKGROUNDCOLOR,
  },
});
export default VerifyUserPortrait;
