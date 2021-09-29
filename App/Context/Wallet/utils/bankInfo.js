import {useState, useEffect, useRef} from 'react';
import Navigator from 'navigations/Navigator';
import {ERROR_CODE, SCREEN, FUNCTION_TYPE} from 'configs/Constants';
import {
  getDomesticBank,
  getInternationalBank,
  getConnectedBank,
  getConnectedBankDetail,
  changeLimit,
  getNapasBank,
} from 'services/wallet';
import {useAsyncStorage, useError, useLoading} from 'context/Common/utils';
import {useWallet} from 'context/Wallet';
import _, {isEmpty} from 'lodash';
import {MapBankRoutes} from 'containers/Wallet/Bank/MapBankFlow';

import {getIdentifyInfo} from 'services/user';
import {value} from 'lodash/seq';

const mockIc = {
  CheckICInfo: {
    Address: '83/9 Phú Hòa, Phường 8 Tân Bình, TP. Hồ Chí Minh',
    BankNumber: '',
    District: '',
    ImgBack: null,
    ImgFront: null,
    Name: 'NGUYEN NHAT PHUONG',
    Number: '079096012342',
    Province: '',
    Status: 5,
    Type: 'IC',
    Ward: '',
  },
  ErrorCode: 0,
  ErrorMessage: 'Thành công',
  ICInfo: {
    Address: '3123zzzz',
    BankNumber: '',
    District: 'Huyện Đất Đỏ',
    ImgBack: null,
    ImgFront: null,
    Name: 'NGUYEN THANH TAM',
    Number: '301382190',
    Province: 'Bà Rịa - Vũng Tàu',
    Status: 3,
    Type: 'IC',
    Ward: 'Xã Lộc An',
  },
  IdentityCardInfor: {
    Address: 'Khu phố 9 Phường 1, TX. Kiến Tường, Long An',
    BirthDay: '',
    CardID: -1,
    CardNumber: '301382190',
    District: '',
    Extracted: 0,
    FullName: 'NGUYEN THANH TAM',
    Gender: null,
    ICType: 1,
    IssueDate: '',
    IssuePlace: '',
    Province: '',
    ValidDate: '',
    Verified: null,
    Ward: '',
  },
  MsgID: 'E5E54209-D64B-431F-BA0A-BEF33C4E45A424-09-2021 22:59:59.730',
  MsgType: 'get_ic_info_response',
  ResponseTime: '24-09-2021 22:59:59',
  ServerUtcTimeEpoch: 1632499199896,
  TransactionID: 'TR1632499066377237',
};
export const BANK_TYPE = {
  LIST_BANK_CONNECT: 'LIST_BANK_CONNECT',
  LIST_DOMESTIC_BANK: 'LIST_DOMESTIC_BANK',
  LIST_NAPAS_BANK: 'LIST_NAPAS_BANK',
  LIST_INTERNATIONAL_BANK: 'LIST_INTERNATIONAL_BANK',
};

export const getFullAddress = params => {
  if (!params) {
    return '';
  }
  const {
    Address: addressName,
    Ward: wardName,
    District: districtName,
    Province: cityName,
  } = params || {};
  const comma = ', ';
  return (
    (addressName ? addressName + comma : '') +
    (wardName ? wardName + comma : '') +
    (districtName ? districtName + comma : '') +
    (cityName || '')
  );
};

export const censorCardNumber = (
  cardNumber,
  label = '*',
  countDigitsShow = 3,
) => {
  if (!cardNumber || cardNumber.length < 3) {
    return cardNumber;
  }
  // assume card number length > 3

  const string = String(cardNumber);
  const length = string?.length;
  let surfix = string.slice(length - countDigitsShow, length);
  let result = '';
  for (let index = 0; index < length - countDigitsShow; index++) {
    result += label || '*';
  }
  result = result + surfix;
  return result;
};

const useBankInfo = (initialValue = {}) => {
  const mapBankInfo = useRef(initialValue);
  console.log('initialValue', initialValue);
  const {getPhone} = useAsyncStorage();
  const {setLoading} = useLoading();
  const {setError} = useError();
  const {dispatch} = useWallet();

  const onChange = (key, value) => {
    mapBankInfo.current[key] = value;
  };

  const onUpdate = (key, value) => {
    mapBankInfo.current[key] = {...mapBankInfo.current[key], ...value};
  };

  const goToBankLinked = () => {
    Navigator.navigate(SCREEN.MAP_BANK_FLOW, {
      screen: MapBankRoutes.BankLinked,
    });
  };

  const mapBank = () => {
    Navigator.navigate(SCREEN.MAP_BANK_FLOW, {
      screen: MapBankRoutes.BankPickerScreen,
    });
  };

  const onContinue = (screen, params) => {
    if (!isEmpty(params)) {
      //is nested navigator
      const {screen: childScreen, params: childParams} = params || {};
      Navigator.navigate(screen, {
        screen: childScreen,
        params: {...mapBankInfo.current, ...childParams},
      });
    } else {
      Navigator.navigate(screen, mapBankInfo.current);
    }
  };

  const onGetIcInfor = async () => {
    try {
      setLoading(true);
      let phone = await getPhone();
      setLoading(false);
      let result = await getIdentifyInfo({phone});
      result = mockIc;
      if (_.get(result, 'ErrorCode') == ERROR_CODE.SUCCESS) {
        const {ICInfo, CheckICInfo, IdentityCardInfor} = result || {};
        dispatch({
          type: 'SET_IC_INFO',
          ICInfor: result?.ICInfo,
        });
        dispatch({type: 'SET_PHONE', phone});
        return {result};
      } else {
        setError(result);
      }
    } catch (error) {
      setLoading(false);
    }
  };

  const onGetConnectedBank = async () => {
    setLoading(true);
    let phone = await getPhone();
    const result = await getConnectedBank({phone});
    setLoading(false);
    if (_.get(result, 'ErrorCode') == ERROR_CODE.SUCCESS) {
      dispatch({
        type: 'LIST_CONNECT_BANK',
        data: result?.ListBankConnect,
      });
      return {result: result?.ListBankConnect};
    } else {
      setError(result);
    }
  };

  const onGetDomesticBanks = async () => {
    setLoading(true);
    let phone = await getPhone();
    const result = await getDomesticBank({phone});
    setLoading(false);
    if (_.get(result, 'ErrorCode') == ERROR_CODE.SUCCESS) {
      dispatch({type: 'LIST_DOMESTIC_BANK', data: result?.DomesticBank});
      return {result: result?.DomesticBank};
    } else {
      setError(result);
    }
  };
  const onGetNapasBanks = async () => {
    setLoading(true);
    let phone = await getPhone();
    const result = await getNapasBank({phone});
    setLoading(false);
    if (_.get(result, 'ErrorCode') == ERROR_CODE.SUCCESS) {
      dispatch({type: 'LIST_NAPAS_BANK', data: result?.DomesticBank});
      return {result: result?.DomesticBank};
    } else {
      setError(result);
    }
  };

  const onGetInternationalBanks = async () => {
    setLoading(true);
    let phone = await getPhone();
    const result = await getInternationalBank({phone});
    setLoading(false);
    if (_.get(result, 'ErrorCode') == ERROR_CODE.SUCCESS) {
      dispatch({
        type: 'LIST_INTERNATIONAL_BANK',
        data: result?.InternationalBank,
      });
      return {result: result?.InternationalBank};
    } else {
      setError(result);
    }
  };

  const onGetAllBank = async () => {
    const listConnectBank = await onGetConnectedBank();
    const listDomesticBanks = await onGetDomesticBanks();
    const listNapasBank = await onGetNapasBanks();
    const listInternationalBanks = await onGetInternationalBanks();
    if (
      _.get(listDomesticBanks.result, 'ErrorCode') == ERROR_CODE.SUCCESS &&
      _.get(listNapasBank.result, 'ErrorCode') == ERROR_CODE.SUCCESS
    ) {
      // Navigator.navigate(SCREEN.MAP_BANK_FLOW, {
      //   screen: SCREEN.BANK_PICKER_SCREEN,
      //   params: {
      //     listDomesticBanks,
      //     listNapasBank,
      //   },
      // });
    } else {
      setError({ErrorCode: -1, ErrorMessage: 'Something went wrong'});
    }
  };

  const onGetConnectedBankDetail = async ({bankID}) => {
    setLoading(true);
    let phone = await getPhone();
    const result = await getConnectedBankDetail({bankID});
    setLoading(false);
    if (_.get(result, 'ErrorCode') == ERROR_CODE.SUCCESS) {
      return {result};
    } else {
      setError(result);
    }
  };

  const onChangeLimit = async ({limit}) => {
    try {
      dispatch({type: 'SET_LIMIT', data: limit});
      setLoading(true);
      let phone = await getPhone();
      let result = await changeLimit({phone, amountLimit: limit});
      setLoading(false);
      if (_.get(result, 'ErrorCode') == ERROR_CODE.LOGIN_PASSWORD_INCORRECT) {
        Navigator.navigate(SCREEN.CHANGE_PASSWORD, {
          type: 'change_limit_response',
        });
      } else {
        setError('result', result);
      }
    } catch (error) {
      setLoading(false);
    }
  };

  const onUpdateUserAddress = async ({Address, Ward, District, Province}) => {
    onChange('ICAddress', {Address, Ward, District, Province});
  };

  const onUpdateAllInfo = async value => {
    // console.log('data :>> ', {...contentRef.current, ...value});
    // await onUpdateIdentify({...contentRef.current, ...value});
    // await onUpdatePersonalInfo({...contentRef.current, ...value});
    // await onUpdateUserAddress({...contentRef.current, ...value});
    // await onGetAllInfo();
    // onClearRegionData();
  };

  return {
    onGetConnectedBank,
    onGetDomesticBanks,
    onGetInternationalBanks,
    onGetAllBank,
    onGetConnectedBankDetail,
    onChangeLimit,
    onGetNapasBanks,
    mapBank,
    goToBankLinked,
    onUpdateUserAddress,
    onChange,
    onContinue,
    onUpdateAllInfo,
    onGetIcInfor,
    onUpdate,
  };
};
export default useBankInfo;
