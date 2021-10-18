import React, {useEffect, useRef} from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  useWindowDimensions,
  Image,
} from 'react-native';
import {Colors, Fonts, Images, Spacing, base} from 'themes';
import {Button, Header, InputBlock, Radio, HeaderBg, Text} from 'components';
import {GENDER, SCREEN, TEXT} from 'configs/Constants';
import Navigator from 'navigations/Navigator';
import {use} from '@react-navigation/native';
import {Formik, useFormikContext} from 'formik';
import {addressSchema} from 'utils/ValidationSchemas';
import {useTranslation} from 'context/Language';
import {hideCMND, scale} from 'utils/Functions';
import {useSelectRegion, useUserInfo} from 'context/User/utils';
import {useUser} from 'context/User';
import _ from 'lodash';
import FooterContainer from 'components/Auth/FooterContainer';
const EditInfo = () => {
  // TODO : translation
  const {onUpdateUserInfo} = useUserInfo();
  const {userInfo, region} = useUser();
  const {personalInfo, personalAddress, personalIC} = userInfo;
  const {goRegionSelect, onClearRegionData} = useSelectRegion({
    callbackScreen: SCREEN.EDIT_INFO,
  });

  useEffect(() => {
    return () => onClearRegionData();
  }, []); // eslint-disable-line
  return (
    <>
      <HeaderBg>
        <Header title="Thông tin cá nhân" back />
      </HeaderBg>

      <Formik
        initialValues={{
          Address: personalAddress?.Address,
          Ward: personalAddress?.Ward,
          County: personalAddress?.County,
          Provincial: personalAddress?.Provincial,
          SexType: personalInfo?.SexType,
        }}
        validationSchema={addressSchema}
        onSubmit={onUpdateUserInfo}
      >
        <FormikContent
          region={region}
          goRegionSelect={goRegionSelect}
          personalInfo={personalInfo}
          personalIC={personalIC}
        />
      </Formik>
    </>
  );
};

const FormikContent = ({region, goRegionSelect, personalInfo, personalIC}) => {
  const {
    handleChange: _handleChange,
    handleBlur,
    handleSubmit,
    setFieldValue,
    setFieldTouched,
    touched,
    errors,
    values,
  } = useFormikContext();
  const translation = useTranslation();
  useEffect(() => {
    if (region?.Provincial && region?.County)
      for (const [key, value] of Object.entries(region)) {
        setFieldValue(key, value);
      }
  }, [region]); // eslint-disable-line

  const handleChange = field => value => {
    setFieldValue(field, value);
    setFieldTouched(field, true, false);
  };

  const GENDERS = {
    1: translation.male,
    2: translation.female,
    3: translation.others,
  };

  return (
    <>
      <ScrollView style={{backgroundColor: Colors.bs4}}>
        <View style={[base.container, styles.pt1]}>
          <View pointerEvents="none" style={styles.mb1}>
            <InputBlock
              label="Họ tên"
              value={personalInfo?.FullName}
              style={{
                backgroundColor: Colors.bg1,
                textTransform: 'uppercase',
              }}
            />
          </View>
          <View pointerEvents="none" style={styles.mb1}>
            <InputBlock
              label="Ngày sinh"
              value={personalInfo?.DateOfBirth?.replaceAll?.('-', '/')}
              style={{
                backgroundColor: Colors.bg1,
                textTransform: 'uppercase',
              }}
            />
            <View style={[styles.blockIcon1, {backgroundColor: Colors.bs1}]}>
              <Image
                source={Images.Kyc.Calendar}
                style={styles.iconCalendar}
                resizeMode={'contain'}
              />
            </View>
          </View>
          <View>
            <Text mb={10}>Giới tính</Text>
            <Radio
              items={Object.entries(GENDERS)
                .sort((a, b) => b[0] - a[0])
                .filter(x => x[0] !== '3')
                .map(([key, value]) => ({
                  label: value,
                  value: parseInt(key),
                }))}
              onChange={handleChange('SexType')}
              selectedValue={values.SexType}
            />
          </View>
          <View pointerEvents="none" style={styles.mb2}>
            <InputBlock
              label="CMND / CCCD"
              value={
                personalIC?.ICNumber
                  ? hideCMND(personalIC?.ICNumber)
                  : 'Chưa có'
              }
              style={{
                backgroundColor: Colors.bg1,
                textTransform: 'uppercase',
              }}
            />
          </View>

          {/* <View pointerEvents="none">
            <InputBlock
              label="Nơi cấp"
              value={
                personalIC?.ICIssuedPlace
                  ? personalIC?.ICIssuedPlace
                  : 'Chưa có'
              }
              style={{backgroundColor: Colors.bg1, textTransform: 'uppercase'}}
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
          </View> */}
        </View>
        <View style={styles.line1}></View>
        <View style={[base.container, styles.ptb1]}>
          <InputBlock
            label="Địa chỉ"
            // required
            onChange={handleChange('Address')}
            onBlur={handleBlur('Address')}
            error={touched.Address && errors.Address}
            value={values.Address}
            placeholder="Nhập số nhà, đường, ..."
          />
          <InputBlock
            // label="Tỉnh / Thành phố"
            error={touched.Provincial && errors.Provincial}
            value={values.Provincial}
            isSelect
            // rightIcon={Images.Down}
            rightIconBgGray={Images.Right}
            onPress={() => goRegionSelect('cites')}
            placeholder="Tỉnh/Thành"
            inputStyle={styles.noLabel}
          />
          <InputBlock
            // label="Quận"
            error={touched.County && errors.County}
            value={values.County}
            isSelect
            rightIconBgGray={Images.Right}
            onPress={() => goRegionSelect('districts')}
            placeholder="Quận"
            inputStyle={styles.noLabel}
          />
          <InputBlock
            // label="Phường / Xã"
            email
            // required
            error={touched.Ward && errors.Ward}
            value={values.Ward}
            isSelect
            rightIconBgGray={Images.Right}
            onPress={() => goRegionSelect('wards')}
            placeholder="Phường/Xã"
            inputStyle={styles.noLabel}
          />
        </View>
      </ScrollView>
      <FooterContainer>
        <Button onPress={handleSubmit} label="Lưu" />
      </FooterContainer>
    </>
  );
};

export default EditInfo;

const styles = StyleSheet.create({
  flexRow: {
    flex: 1,
    flexDirection: 'row',
    paddingVertical: scale(10),
  },
  noLabel: {
    marginTop: scale(100),
  },
  //---------------
  mb1: {marginBottom: 7},
  mb2: {marginBottom: 15},
  //---------------
  ptb1: {
    paddingTop: 20,
    paddingBottom: 20,
  },
  //---------------
  pt1: {paddingTop: 20},
  //---------------
  iconCalendar: {
    width: 24,
    height: 24,
    tintColor: Colors.tp3,
  },
  //---------------
  line1: {
    height: 12,
    backgroundColor: Colors.bs2,
  },
  //---------------
  blockIcon1: {
    position: 'absolute',
    right: 0,
    bottom: 12,
    justifyContent: 'center',
    alignItems: 'center',
    width: 48,
    height: 47,
    padding: 7,
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
  },
});
