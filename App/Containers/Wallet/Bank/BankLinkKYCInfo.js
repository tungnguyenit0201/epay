import React, {useEffect, useRef} from 'react';
import {StyleSheet, View, ScrollView, useWindowDimensions} from 'react-native';
import {Colors, Fonts, Images, Spacing, base} from 'themes';
import {Button, Header, InputBlock, Radio, HeaderBg, Text} from 'components';
import {GENDER, SCREEN, TEXT} from 'configs/Constants';
import Navigator from 'navigations/Navigator';
import {use} from '@react-navigation/native';
import {Formik, useFormikContext} from 'formik';
import {addressSchema} from 'utils/ValidationSchemas';
import {scale} from 'utils/Functions';
import {useSelectRegion, useUserInfo} from 'context/User/utils';
import {useUser} from 'context/User';
import _ from 'lodash';
import {useTranslation} from 'context/Language';
import {useBankInfo} from 'context/Wallet/utils';

const BankLinkKYCInfo = () => {
  // TODO : translation
  const {onUpdateUserAddress} = useBankInfo();
  const translation = useTranslation();

  const {userInfo, region} = useUser();
  const {personalAddress} = userInfo; //todo: from param

  const {goRegionSelect, onClearRegionData} = useSelectRegion({
    callbackScreen: SCREEN.MAP_BANK_FLOW,
  });

  useEffect(() => {
    return () => onClearRegionData();
  }, []);
  const onSubmit = () => {
    onUpdateUserAddress?.(region)?.then();
  };

  return (
    <View flex={1}>
      <HeaderBg>
        <Header title={translation.connect_bank} back />
      </HeaderBg>
      <ScrollView style={{backgroundColor: Colors.white, flex: 1}}>
        <View style={[base.container, {paddingTop: 20}]}>
          <Formik
            initialValues={{
              Address: personalAddress?.Address,
              Ward: personalAddress?.Ward,
              County: personalAddress?.County,
              Provincial: personalAddress?.Provincial,
            }}
            validationSchema={addressSchema}
            onSubmit={region => onUpdateUserAddress(region)}>
            <FormikContent region={region} goRegionSelect={goRegionSelect} />
          </Formik>
        </View>
      </ScrollView>

      <View style={styles.shadowButton}>
        <Button
          label={'Liên kết'}
          bold
          size="lg"
          style={{
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onPress={onSubmit}
        />
      </View>
    </View>
  );
};

const FormikContent = ({region, goRegionSelect}) => {
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

  useEffect(() => {
    if (region?.Provincial && region?.County) {
      for (const [key, value] of Object.entries(region)) {
        setFieldValue(key, value);
      }
    }
  }, [region]); // eslint-disable-line

  const handleChange = field => value => {
    setFieldValue(field, value);
    setFieldTouched(field, true, false);
  };

  return (
    <View>
      <InputBlock
        label="Tỉnh / Thành phố"
        error={touched.Provincial && errors.Provincial}
        value={values.Provincial}
        isSelect
        rightIcon={Images.Down}
        onPress={() => goRegionSelect('cites')}
      />
      <InputBlock
        label="Quận"
        error={touched.County && errors.County}
        value={values.County}
        isSelect
        rightIcon={Images.Down}
        onPress={() => goRegionSelect('districts')}
      />
      <InputBlock
        label="Phường / Xã"
        email
        required
        error={touched.Ward && errors.Ward}
        value={values.Ward}
        isSelect
        rightIcon={Images.Down}
        onPress={() => goRegionSelect('wards')}
      />
      <InputBlock
        label="Địa chỉ"
        required
        onChange={handleChange('Address')}
        onBlur={handleBlur('Address')}
        error={touched.Address && errors.Address}
        value={values.Address}
      />
    </View>
  );
};

export default BankLinkKYCInfo;

const styles = StyleSheet.create({
  flexRow: {
    flex: 1,
    flexDirection: 'row',
    paddingVertical: 10,
  },
  shadowButton: {
    paddingHorizontal: 12,
    paddingVertical: 16,
    backgroundColor: Colors.white,
    shadowColor: 'rgba(0, 0, 0, 0.16)',
    shadowOpacity: 1,
    shadowOffset: {width: 1, height: 0},
    borderRadius: 8,
    paddingBottom: 24,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
});
