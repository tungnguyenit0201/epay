import React, {useEffect, useState, useMemo} from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import {InputBlock, Radio, DatePicker, Text, Checkbox} from 'components';
import {Colors, Spacing, Images} from 'themes';
import {useVerifyInfo, useSelectRegion} from 'context/User/utils';
import {useTranslation} from 'context/Language';
import {useUser} from 'context/User';
import {SCREEN} from 'configs/Constants';
import BaseVerifyInfo from './BaseVerifyInfo';

const VerifyUserPortrait = ({route}) => {
  const {onUpdateAllInfo, onContinue, verifyInfo} = useVerifyInfo(
    route?.params,
  );
  const {extractCardInfo = {}} = verifyInfo || {};
  const translation = useTranslation() || {};
  const [acceptPolicy, setAcceptPolicy] = useState();
  const [error, setError] = useState({});
  const {goRegionSelect} = useSelectRegion({
    callbackScreen: SCREEN.VERIFY_USER_PORTRAIT,
  });
  const {region} = useUser();
  const {wardEmpty} = region || {};
  const {identifyCard} = route?.params || {};
  const {ICType, label} = identifyCard || {};
  const [info, setInfo] = useState({
    ICFullName: extractCardInfo.FullName,
    DateOfBirth: extractCardInfo.BirthDay,
    ICNumber: extractCardInfo.CardNumber,
    ICIssuedDate: extractCardInfo.IssueDate,
    ICIssuedPlace: extractCardInfo.IssuePlace,
    Provincial: extractCardInfo.Province,
    County: extractCardInfo.District,
    Ward: wardEmpty ? '' : extractCardInfo.Ward,
    Address: extractCardInfo.Address,
    SexType: extractCardInfo.Gender,
  });

  const GENDERS = [
    {label: translation.male, value: 1},
    {label: translation.female, value: 2},
    {label: translation.others, value: 3},
  ];

  const CARD_RULE = useMemo(() => {
    return {
      1: {
        title: translation.IDCardNumber,
        maxLength: 12,
        minLength: 9,
        fixedLength: true,
        regex: '^[0-9]*$',
        keyboardType: 'numeric',
      },
      2: {
        title: translation.passportNumber,
        regex: '^([a-zA-Z][0-9]+)$',
        minLength: 8,
        maxLength: 15,
        keyboardType: 'default',
      },
      3: {
        title: translation.militaryIDNumber,
        regex: '^[0-9]*$',
        minLength: 8,
        maxLength: 8,
        keyboardType: 'numeric',
      },
    };
  }, [translation]);

  useEffect(() => {
    const {Provincial, County, Ward} = region;
    setInfo({
      ...info,
      Provincial,
      County,
      Ward,
    });
  }, [region]);

  useEffect(() => {
    onBlurCardNumber();
  }, [info.ICNumber]);

  const cardRule = useMemo(() => {
    return CARD_RULE[ICType] || {};
  }, [ICType, CARD_RULE]);

  const validateID = value => {
    const {regex, title, fixedLength, minLength, maxLength} = cardRule || {};
    const cardNumber = value || info.ICNumber || '';
    const regexValid = new RegExp(regex).test(cardNumber);
    if (cardNumber.length === 0) {
      return {valid: true, error: ''};
    }
    if (!regexValid) {
      return {
        valid: false,
        error: translation.inputRegexError?.replace?.('$type', title),
      };
    } else {
      if (fixedLength) {
        if (
          cardNumber.length !== minLength &&
          cardNumber.length !== maxLength
        ) {
          return {
            valid: false,
            error: translation.inputRegexError?.replace?.('$type', title),
          };
        }
      } else if (cardNumber.length < minLength) {
        return {
          valid: false,
          error: translation.inputRegexError?.replace?.('$type', title),
        };
      }
    }
    return {valid: true, error: ''};
  };

  const onBlurCardNumber = () => {
    const {error: _error} = validateID();
    setError({...error, ICNumber: _error});
  };

  const handleChange = (key, value) => {
    setInfo({...info, [key]: value});
  };

  const buttonEnabled = useMemo(() => {
    return (
      info.ICFullName &&
      !error.ICNumber &&
      info.ICNumber &&
      info.DateOfBirth &&
      GENDERS.find(gender => gender.value === info.SexType) &&
      info.ICIssuedDate &&
      info.ICIssuedPlace &&
      // && (originalInfo?.ValidDate ? info.ValidDate : true)
      info.Provincial &&
      info.County &&
      (wardEmpty ? true : info.Ward) &&
      info.Address &&
      acceptPolicy
    );
  }, [info, acceptPolicy, error]);

  return (
    <BaseVerifyInfo
      style={styles.base}
      step={3}
      showInstruction={false}
      onPressButton={onUpdateAllInfo}
      disableButton={!buttonEnabled}
      buttonTitle={translation.updateInfo}>
      <View style={styles.container}>
        <InputBlock
          label={translation.enter_your_full_name}
          style={styles.mb1}
          onChange={value => handleChange('ICFullName', value)}
          value={info.ICFullName}
          error={error.ICFullName}
          required
          placeholder={translation?.inputFullName}
          alphanumeric
          trimOnBlur
          multiline
        />
        <DatePicker
          onChange={value => handleChange('DateOfBirth', value)}
          label={translation.date_of_birth_ddmmyyyy}
          value={info.DateOfBirth}
          required
          placeholder="dd/mm/yyyy"
        /> 
        <View>
          <Text medium mb={10}>
            {translation.gender}
          </Text>
          <Radio
            items={GENDERS}
            onChange={value => handleChange('SexType', value)}
            selectedValue={info.SexType}
          />
        </View>
        <InputBlock
          label={label || translation.enter_id_code}
          onChange={value => handleChange('ICNumber', value)}
          value={info.ICNumber}
          error={error.ICNumber}
          style={styles.mb1}
          required
          numeric
          placeholder={translation.inputNumberType?.replace?.('$type', label)}
          alphanumeric
          trimOnBlur
        />
        <DatePicker
          label={translation.valid_date}
          onChange={value => handleChange('ICIssuedDate', value)}
          value={info.ICIssuedDate}
          required
          placeholder="dd/mm/yyyy"
        />
        <InputBlock
          label={translation?.issuedPlace}
          onChange={value => handleChange('ICIssuedPlace', value)}
          value={info.ICIssuedPlace}
          error={error.ICIssuedPlace}
          style={styles.mb1}
          required
          placeholder={translation?.inputIssuedPlace}
          trimOnBlur
          multiline
          maxLength={200}
        />
      </View>
      <View style={[styles.bgGray, styles.h1]} />
      <View style={[styles.wrap, styles.pt1]}>
        <InputBlock
          label={translation.address}
          onChange={value => handleChange('Address', value)}
          value={info.Address}
          error={error.Address}
          style={styles.address}
          required
          placeholder={translation?.inputAddress}
          trimOnBlur
          multiline
          maxLength={200}
        />
        <InputBlock
          label={translation.provice}
          rightIconBgGray={Images.Right}
          isSelect
          required
          value={info?.Provincial}
          error={error.Provincial}
          onPress={() => goRegionSelect('cites')}
          defaultValue={translation.provice}
        />
        <InputBlock
          label={translation.district}
          rightIconBgGray={Images.Right}
          isSelect
          required
          value={info?.County}
          error={error.County}
          onPress={() => goRegionSelect('districts')}
          defaultValue={translation.district}
        />
        <InputBlock
          label={translation.town}
          rightIconBgGray={Images.Right}
          isSelect
          required={!wardEmpty}
          value={info?.Ward}
          error={error.Ward}
          onPress={() => !wardEmpty && goRegionSelect('wards')}
          defaultValue={translation.town}
        />
        <View style={[styles.flexRow, styles.pt2, styles.pb1]}>
          <Checkbox onPress={setAcceptPolicy} />
          <Text style={styles.policy} fs="md">
            {translation?.iAgreeWith}
            <TouchableOpacity style={styles.mtMinus1}>
              <Text style={styles.firstLink}>{translation?.userAgreement}</Text>
            </TouchableOpacity>{' '}
            {translation?.and}
            <TouchableOpacity style={styles.mtMinus1}>
              <Text style={styles.firstLink}>{translation?.privacyPolicy}</Text>
            </TouchableOpacity>{' '}
            {translation?.ofEPAY}
          </Text>
        </View>
        <Text
          onPress={() => onContinue(SCREEN.CHOOSE_IDENTITY_CARD)}
          style={styles.underline}
          centered
          color={Colors.Highlight}
          bold
          mb={48}
          fs="h6">
          {translation?.verifyAgainFromBeginning}
        </Text>
      </View>
    </BaseVerifyInfo>
  );
};
const styles = StyleSheet.create({
  base: {
    backgroundColor: Colors.white,
  },
  container: {
    paddingHorizontal: Spacing.PADDING,
    marginTop: Spacing.PADDING,
  },
  wrap: {paddingHorizontal: Spacing.PADDING},
  //---------------
  flexRow: {flexDirection: 'row'},
  //---------------
  h1: {height: 8},
  //---------------
  mtMinus1: {marginTop: -3},
  //---------------
  mb1: {marginBottom: 10},
  //---------------
  pt1: {paddingTop: 20},
  pt2: {paddingTop: 10},
  //---------------
  pb1: {paddingBottom: 24},
  //---------------
  underline: {textDecorationLine: 'underline'},
  bgGray: {backgroundColor: Colors.l4},
  //---------------
  firstLink: {
    textDecorationLine: 'underline',
    marginLeft: 3,
  },
  address: {
    marginBottom: 0,
  },
  policy: {
    marginLeft: 5,
  },
});
export default VerifyUserPortrait;
