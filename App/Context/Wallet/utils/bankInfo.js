import {useRef} from 'react';
import Navigator from 'navigations/Navigator';
import {
  ERROR_CODE,
  SCREEN,
  TRANS_FORM_TYPE,
  TRANS_TYPE,
} from 'configs/Constants';

import {useAsyncStorage, useError, useLoading} from 'context/Common/utils';
import {useWallet} from 'context/Wallet';
import _, {isEmpty} from 'lodash';
import {MapBankRoutes} from 'containers/Wallet/Bank/MapBankFlow';

import {
  activeCustomerOtp,
  activeUser,
  getConnectedBank,
  getConnectedBankDetail,
  getDomesticBank,
  getIdentifyInfo,
  getInternationalBank,
  getNapasBank,
  mapBankNapas,
} from 'services/bank';
import {useUser} from 'context/User';
import {IC_TYPE_CHAR} from 'configs/Enums/ICType';
import {useTranslation} from 'context/Language';
import {changeLimit} from 'services/wallet';

const mockIc = [
  {
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
      Number: '079096012342',
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
  },
  {
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
  },
];
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
  prefixDigitShow = 0,
) => {
  if (!cardNumber || cardNumber.length < 3) {
    return cardNumber;
  }
  // assume card number length > 3

  const string = String(cardNumber);
  const length = string?.length;
  const prefix = string.slice(0, prefixDigitShow);
  let surfix = string.slice(length - countDigitsShow, length);
  let result = '';
  for (
    let index = prefixDigitShow || 0;
    index < length - countDigitsShow;
    index++
  ) {
    result += label || '*';
  }
  result = prefix + result + surfix;
  return result;
};

const useBankInfo = (initialValue = {}) => {
  const mapBankInfo = useRef(initialValue);
  const {phone} = useUser();
  const {getPhone} = useAsyncStorage();
  const {setLoading} = useLoading();
  const {setError} = useError();
  const {dispatch} = useWallet();
  const translation = useTranslation();

  const onChange = (key, value) => {
    mapBankInfo.current[key] = value;
  };

  const onUpdate = (key, value) => {
    mapBankInfo.current[key] = {...mapBankInfo.current[key], ...value};
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

  const onBankTransaction = (result, params) => {
    const {bankConnectInfo} = params;
    console.log(bankConnectInfo);
    dispatch({
      type: 'UPDATE_TRANSACTION_INFO',
      data: {
        result,
        data: {
          transType: TRANS_TYPE.ActiveCustomer,
          bank: bankConnectInfo,
        },
      },
    });

    Navigator.replaceLast(SCREEN.MAP_BANK_FLOW, {
      screen: MapBankRoutes.BaseResultScreen,
      params,
    });
  };

  const getResultButton = () => {
    console.log(mapBankInfo);
  };

  const getICLabel = type => {
    const cardList = {
      [IC_TYPE_CHAR.CMND]: translation?.id_card,
      [IC_TYPE_CHAR.CMNDQD]: translation?.militaryID,
      [IC_TYPE_CHAR.PASSPORT]: translation?.passport,
    };
    return cardList?.[type] || '';
  };

  /* api uitils*/

  const onCheckNapasTransStatus = async ({transCode}) => {
    try {
      const param = {
        PhoneNumber: phone,
        TransCode: transCode,
        TransType: TRANS_TYPE.CashIn,
        TransFormType: TRANS_FORM_TYPE.NAPAS_CARD,
      };
      const result = await mapBankNapas(param);

      if (
        _.get(result, 'ErrorCode') === ERROR_CODE.SUCCESS &&
        result?.TransState === 0
      ) {
        const {TransState, TransErrorCode, TransErrorMesage} = result || {};
        return {
          tranStatus: TransState,
          errCode: TransErrorCode,
          errMessage: TransErrorMesage,
        };
      } else {
        setError(result);
      }
    } catch (error) {}
  };

  const onLinkCardNapas = async params => {
    const {
      CardNumber,
      CardHolder,
      BankId,
      CardIssueDate,
      Amount = 10000,
    } = params || {};

    try {
      const phone = await getPhone();

      const param = {
        PhoneNumber: phone,
        BankId,
        CardNumber,
        CardHolder,
        CardIssueDate,
        Amount,
        // , CardConnectId,
        // IsSaveCard: 1,
        // IsPayment: 0,
        // PaymentPartnerCode: 9,
        // BusinessType: 999,
      };
      const result = await mapBankNapas(param);

      if (_.get(result, 'ErrorCode') === ERROR_CODE.SUCCESS) {
        const {
          OrderId,
          OrderAmount,
          OrderReference,
          DataKey,
          NapasKey,
          TransCode,
          ApiOperation,
        } = result || {};
        return {
          result: OrderId,
          OrderAmount,
          OrderReference,
          DataKey,
          NapasKey,
          TransCode,
          ApiOperation,
        };
      } else {
        setError(result);
      }
    } catch (error) {
      setError(error);
    }
  };

  const onGetIcInfor = async BankId => {
    try {
      const phone = await getPhone();
      const result = await getIdentifyInfo({phone, BankId});
      let mockresult = mockIc;

      dispatch({type: 'SET_IC_INFO', data: mockIc});
      return {result: mockresult};
      // if (_.get(result, 'ErrorCode') === ERROR_CODE.SUCCESS) {
      //   dispatch({type: 'SET_IC_INFO', data: result?.data?.IdentityCardInfor});
      //   return {result: result?.data?.IdentityCardInfor};
      // } else {
      //   setError(result);
      // }
    } catch (error) {
      setError(error);
    }
  };

  const onActiveUser = async param => {
    setLoading(true);
    const {BankConnectInfo} = param || {};
    const result = await activeUser({phone, BankConnectInfo});
    setLoading(false);
    if (_.get(result, 'ErrorCode') == ERROR_CODE.SUCCESS) {
      const {TransState: transState, TransCode: transCode} = result || {};
      dispatch({
        type: 'SET_TRAN_STATE',
        data: result?.TransState,
      });
      dispatch({
        type: 'SET_BANK_LINK_INFO',
        data: BankConnectInfo,
      });
      return {transState, transCode};
    } else {
      //
      // setError(result);
    }
    return;
  };
  const onActiveUserOTP = async param => {
    setLoading(true);
    let phone = await getPhone();
    const result = await activeCustomerOtp({...param, phone});
    setLoading(false);
    if (_.get(result, 'ErrorCode') == ERROR_CODE.SUCCESS) {
      dispatch({
        type: 'SET_TRAN_STATE',
        data: result?.TransState,
      });
      return {result};
    } else {
      setError(result);
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

  const onUpdateAllInfo = async value => {};

  return {
    onBankTransaction,
    getICLabel,
    onLinkCardNapas,
    onActiveUser,
    onActiveUserOTP,
    onGetConnectedBank,
    onGetDomesticBanks,
    onGetInternationalBanks,
    onGetAllBank,
    onGetConnectedBankDetail,
    onChangeLimit,
    onGetNapasBanks,
    onUpdateUserAddress,
    onChange,
    onContinue,
    onUpdateAllInfo,
    onGetIcInfor,
    onUpdate,
    onCheckNapasTransStatus,
  };
};

export default useBankInfo;
