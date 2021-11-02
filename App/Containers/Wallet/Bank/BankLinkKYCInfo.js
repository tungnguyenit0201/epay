import React, {useEffect, useRef} from 'react';
import {StyleSheet, View, ScrollView, Keyboard} from 'react-native';
import {Colors, Images, Spacing, base} from 'themes';
import {Button, Header, InputBlock, HeaderBg} from 'components';
import {SCREEN} from 'configs/Constants';
import {useRoute} from '@react-navigation/native';
import {Formik, useFormikContext} from 'formik';
import {addressSchema} from 'utils/ValidationSchemas';
import {useSelectRegion} from 'context/User/utils';
import {useUser} from 'context/User';
import {useTranslation} from 'context/Language';
import {useBankInfo} from 'context/Wallet/utils';
import {get} from 'lodash';
import {MapBankRoutes} from 'containers/Wallet/Bank/MapBankFlow';

const BankLinkKYCInfo = props => {
  const {params} = useRoute() || {};
  const translation = useTranslation();
  const {onChange, onContinue, onUpdate} = useBankInfo(params);
  const ICInfo = get(params, 'optionKyc.data', {});
  const {region} = useUser();
  const {goRegionSelect, onClearRegionData} = useSelectRegion({
    callbackScreen: SCREEN.MAP_BANK_FLOW,
  });

  useEffect(() => {
    return () => {
      Keyboard?.dismiss?.();
      onClearRegionData();
    };
  }, []);

  const onSubmit = values => {
    const {Provincial, County} = values || {};
    props?.navigation?.push?.(SCREEN.MAP_BANK_FLOW, {
      screen: MapBankRoutes.BankLinkConfirm,
      params: {
        ...params,
        ICAddress: {...values, Province: Provincial, District: County},
      },
    });
  };
  // console.log(ICInfo);
  return (
    <View flex={1} backgroundColor={Colors.bs4}>
      <HeaderBg>
        <Header title={translation.connect_bank} back />
      </HeaderBg>
      <Formik
        initialValues={{
          Address: ICInfo?.Address,
          Ward: ICInfo?.Ward,
          District: ICInfo?.District,
          Province: ICInfo?.Province,
        }}
        validationSchema={addressSchema}>
        <FormikContent
          region={region}
          goRegionSelect={goRegionSelect}
          onSubmit={onSubmit}
          // handleChangee={}
        />
      </Formik>
    </View>
  );
};

const FormikContent = ({region, goRegionSelect, onSubmit}) => {
  const {
    handleChange: _handleChange,
    handleBlur,
    setFieldValue,
    setFieldTouched,
    touched,
    errors,
    values,
    handleSubmit,
  } = useFormikContext();

  useEffect(() => {
    if (region) {
      for (const [key, value] of Object.entries(region)) {
        setFieldValue(key, value);
      }
    }
  }, [region]);

  return (
    <View flex={1}>
      <ScrollView
        style={{paddingHorizontal: Spacing.PADDING}}
        flex={1}
        keyboardShouldPersistTaps="handled">
        <InputBlock
          label="Tỉnh / Thành phố"
          error={touched.Province && errors.Province}
          value={values.Province || values.Provincial}
          isSelect
          rightIcon={Images.Down}
          onPress={() => goRegionSelect('cites')}
        />
        <InputBlock
          label="Quận"
          error={touched.District && errors.District}
          value={values.District || values.County}
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
          onChange={_handleChange('Address')}
          onBlur={handleBlur('Address')}
          error={touched.Address && errors.Address}
          value={values.Address}
          inputStyle={{borderColor: Colors.bs2}}
        />
      </ScrollView>

      <View style={styles.shadowButton}>
        <Button
          label={'Liên kết'}
          // size="lg"
          style={{
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onPress={() => onSubmit(values)}
        />
      </View>
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
    backgroundColor: Colors.bs4,
    shadowColor: 'rgba(0, 0, 0, 0.16)',
    shadowOpacity: 1,
    shadowOffset: {width: 1, height: 0},
    borderRadius: 8,
    paddingBottom: 24,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
});
