import {API} from 'configs';
import {request} from 'utils/Request';
import {useRequest} from 'context/Common/utils';
const useServiceWallet = () => {
  const {doRequest} = useRequest();
  const mapBankNapas = async param => {
    const {phone, BankConnectInfo} = param || {};
    let response = null;
    await doRequest({
      url: API.WALLET.ACTIVE_USER,
      method: 'post',
      params: {
        BankConnectInfo: BankConnectInfo || {},
        PhoneNumber: phone,
      },
      success: res => {
        response = res;
      },
    });
    return response;
  };

  const activeUser = async param => {
    const {phone, BankConnectInfo} = param || {};
    let response = null;
    await doRequest({
      url: API.WALLET.ACTIVE_USER,
      method: 'post',
      params: {
        MsgType: 'active_customer',
        BankConnectInfo: BankConnectInfo || {},
        PhoneNumber: phone,
      },
      success: res => {
        response = res;
      },
    });
    return response;
  };

  const activeCustomerOtp = async param => {
    const {phone, TransState, otp} = param || {};
    let response = null;
    await doRequest({
      url: API.WALLET.ACTIVE_USER_OTP,
      method: 'post',
      params: {
        PhoneNumber: phone,
        MsgType: 'link_card',
        ...param,
      },
      success: res => {
        response = res;
      },
    });
    return response;
  };

  const getConnectedBank = async ({phone}) => {
    let response = null;
    await doRequest({
      url: API.USER.GET_CONNECTED_BANK,
      method: 'post',
      params: {PhoneNumber: phone},
      success: res => {
        response = res;
      },
    });
    return response;
  };

  const getDomesticBank = async ({phone}) => {
    let response = null;
    await doRequest({
      url: API.WALLET.GET_DOMESTIC_BANKS,
      method: 'post',
      params: {PhoneNumber: phone},
      success: res => {
        response = res;
      },
    });
    return response;
  };

  const getNapasBank = async ({phone}) => {
    let response = null;
    await doRequest({
      url: API.WALLET.GET_NAPAS_BANKS,
      method: 'post',
      params: {PhoneNumber: phone},
      success: res => {
        response = res;
      },
    });
    return response;
  };

  const getInternationalBank = async ({phone}) => {
    let response = null;
    await doRequest({
      url: API.WALLET.GET_INTERNATIONAL_BANKS,
      method: 'post',
      params: {PhoneNumber: phone},
      success: res => {
        response = res;
      },
    });
    return response;
  };

  const getConnectedBankDetail = async ({phone, bankID}) => {
    let response = null;
    await doRequest({
      url: API.WALLET.GET_CONNECTED_BANK_DETAIL,
      method: 'post',
      params: {PhoneNumber: phone, BankConnectId: bankID},
      success: res => {
        response = res;
      },
    });
    return response;
  };

  const changeLimit = async ({phone, amountLimit}) => {
    let response = null;
    await doRequest({
      url: API.WALLET.CHANGE_LIMIT,
      method: 'post',
      params: {PhoneNumber: phone, AmountLimit: amountLimit},
      success: res => {
        response = res;
      },
    });
    return response;
  };

  const getBankFee = async ({phone, bankID, transType, transFormType}) => {
    let response = null;
    await doRequest({
      url: API.WALLET.FEE_CALCULATOR,
      method: 'post',
      params: {
        PhoneNumber: phone,
        BankId: bankID,
        TransType: transType,
        TransFormType: transFormType,
      },
      success: res => {
        response = res;
      },
    });
    return response;
  };

  const payinConnectedBank = async ({
    phone,
    bankID,
    amount,
    fixedFee,
    bankFee,
  }) => {
    let response = null;
    await doRequest({
      url: API.WALLET.PAYIN_CONNECTED_BANK,
      method: 'post',
      params: {
        PhoneNumber: phone,
        BankId: bankID,
        Amount: amount,
        FixedFee: fixedFee,
        BankFee: bankFee,
      },
      success: res => {
        response = res;
      },
    });
    return response;
  };

  const getWalletInfo = async ({phone}) => {
    let response = null;
    await doRequest({
      url: API.WALLET.GET_WALLET_INFO,
      method: 'post',
      params: {PhoneNumber: phone},
      success: res => {
        response = res;
      },
    });
    return response;
  };

  const getHistory = async ({
    phone,
    ServiceId = 0,
    StateId = 0,
    StartDate,
    EndDate,
    CodeFilter = '',
    DatetimeFilter = 0,
  }) => {
    let response = null;
    await doRequest({
      url: API.WALLET.GET_HISTORY,
      method: 'post',
      params: {
        PhoneNumber: phone,
        ServiceId,
        StateId,
        StartDate,
        EndDate,
        CodeFilter,
        DatetimeFilter,
      },
      success: res => {
        response = res;
      },
    });
    return response;
  };

  const getHistoryDetail = async ({phone, TransCode}) => {
    let response = null;
    await doRequest({
      url: API.WALLET.GET_HISTORY_DETAIL,
      method: 'post',
      params: {
        PhoneNumber: phone,
        TransCode,
      },
      success: res => {
        response = res;
      },
    });
    return response;
  };

  const cashOut = async ({phone, BankConnectId, BankId, amount}) => {
    let response = null;
    await doRequest({
      url: API.WALLET.CASH_OUT,
      method: 'post',
      params: {
        PhoneNumber: phone,
        CashOutInfo: {
          BankConnectId: BankConnectId,
          BankID: BankId,
          Amount: amount,
        },
      },
      success: res => {
        response = res;
      },
    });
    return response;
  };

  const cashOutConfirm = async ({
    phone,
    BankConnectId,
    BankId,
    ConfirmValue,
    ConfirmMethod,
    TransCode,
  }) => {
    let response = null;
    await doRequest({
      url: API.WALLET.CASH_OUT_CONFIRM,
      method: 'post',
      params: {
        PhoneNumber: phone,
        BankConnectId,
        BankID: BankId,
        ConfirmMethod,
        ConfirmValue,
        TransCode,
      },
      success: res => {
        response = res;
      },
    });
    return response;
  };

  const checkAmountLimit = async ({
    phone,
    amount,
    transType,
    transFormType,
  }) => {
    let response = null;
    await doRequest({
      url: API.WALLET.CHECK_AMOUNT_LIMIT,
      method: 'post',
      params: {
        PhoneNumber: phone,
        Amount: amount,
        TransType: transType,
        TransFormType: transFormType,
      },
      success: res => {
        response = res;
      },
    });
    return response;
  };

  const getQRCodeInfo = async ({phone, QRCode}) => {
    let response = null;
    await doRequest({
      url: API.WALLET.GET_QRCODE_INFO,
      method: 'post',
      params: {
        PhoneNumber: phone,
        QRCode,
      },
      success: res => {
        response = res;
      },
    });
    return response;
  };

  const getTransferUser = async ({phone, SearchPhoneNumber, AccountId}) => {
    let response = null;
    await doRequest({
      url: API.WALLET.GET_TRANSFER_USER,
      method: 'post',
      params: {
        PhoneNumber: phone,
        SearchPhoneNumber,
        AccountId,
      },
      success: res => {
        response = res;
      },
    });
    return response;
  };

  const cashIn = async ({phone, BankConnectId, BankId, amount}) => {
    let response = null;
    await doRequest({
      url: API.WALLET.CASH_IN,
      method: 'post',
      params: {
        PhoneNumber: phone,
        CashInInfo: {
          BankConnectId: BankConnectId,
          BankID: BankId,
          Amount: amount,
        },
      },
      success: res => {
        response = res;
      },
    });
    return response;
  };

  const cashInConfirm = async ({
    phone,
    BankConnectId,
    BankId,
    ConfirmValue,
    ConfirmMethod,
    TransCode,
  }) => {
    let response = null;
    await doRequest({
      url: API.WALLET.CASH_IN_CONFIRM,
      method: 'post',
      params: {
        PhoneNumber: phone,
        BankConnectId,
        BankID: BankId,
        ConfirmMethod,
        ConfirmValue,
        TransCode,
      },
      success: res => {
        response = res;
      },
    });
    return response;
  };

  const cashInNapas = async ({
    phone,
    Amount,
    BankId,
    CardNumber,
    CardHolder,
    CardIssueDate,
    CardConnectId,
    IsSaveCard,
    IsPayment,
    PaymentPartnerCode,
    BusinessType,
  }) => {
    let response = null;
    await doRequest({
      url: API.WALLET.CASH_IN_NAPAS,
      method: 'post',
      params: {
        PhoneNumber: phone,
        Amount,
        BankId,
        CardNumber,
        CardHolder,
        CardIssueDate,
        CardConnectId,
        IsSaveCard,
        IsPayment,
        PaymentPartnerCode,
        BusinessType,
      },
      success: res => {
        response = res;
      },
    });
    return response;
  };

  const setDefaultBank = async ({BankConnectId, BankId, ConnectionType}) => {
    let response = null;
    await doRequest({
      url: API.WALLET.DEFAULT_BANK_CONNECT,
      method: 'post',
      params: {
        BankConnectId,
        BankId,
        ConnectionType,
      },
      success: res => {
        response = res;
      },
    });
    return response;
  };

  const moneyTransfer = async ({
    phone,
    Amount,
    DesAccountId,
    Payoneer,
    Content,
    TransFormType,
    BankId,
    CardNumber,
    CardHolder,
    CardIssueDate,
    CardConnectId,
    BankConnectId,
  }) => {
    let response = null;
    await doRequest({
      url: API.WALLET.MONEY_TRANSFER,
      method: 'post',
      params: {
        PhoneNumber: phone,
        Amount,
        DesAccountId,
        Payoneer,
        Content,
        TransFormType,
        BankId,
        CardNumber,
        CardHolder,
        CardIssueDate,
        CardConnectId,
        BankConnectId,
      },
      success: res => {
        response = res;
      },
    });
    return response;
  };

  const getPromotion = async ({
    phone,
    MerchantCode,
    AgencyCode,
    PromoCode,
    Amount,
  }) => {
    let response = null;
    await doRequest({
      url: API.WALLET.GET_PROMOTION,
      method: 'post',
      params: {
        PhoneNumber: phone,
        MerchantCode,
        AgencyCode,
        PromoCode,
        Amount,
      },
      success: res => {
        response = res;
      },
    });
    return response;
  };

  const applyPromo = async ({phone, MerchantCode, AgencyCode, PromoCode}) => {
    let response = null;
    await doRequest({
      url: API.WALLET.PROMO_APPLY,
      method: 'post',
      params: {
        PhoneNumber: phone,
        MerchantCode,
        AgencyCode,
        PromoCode,
      },
      success: res => {
        response = res;
      },
    });
    return response;
  };

  const payment = async ({
    phone,
    BankId,
    TransFormType,
    CardNumber,
    CardHolder,
    CardIssueDate,
    CardConnectId,
    BankConnectId,
    PromoCode,
    AgencyCode,
    MerchantCode,
    OrderId,
    Amount,
  }) => {
    let response = null;

    await doRequest({
      url: API.WALLET.PAYMENT,
      method: 'post',
      params: {
        PhoneNumber: phone,
        BankId,
        TransFormType,
        CardNumber,
        CardHolder,
        CardIssueDate,
        CardConnectId,
        BankConnectId,
        PromoCode,
        AgencyCode,
        MerchantCode,
        OrderId,
        Amount,
      },
      success: res => {
        response = res;
      },
    });
    return response;
  };

  const paymentComfrim = async ({
    phone,
    TransCode,
    ConfirmMethod,
    ConfirmValue,
    BankId,
  }) => {
    let response = null;
    await doRequest({
      url: API.WALLET.PAYMENT_COMFRIM,
      method: 'post',
      params: {
        PhoneNumber: phone,
        TransCode,
        ConfirmMethod,
        ConfirmValue,
        BankId,
      },
      success: res => {
        response = res;
      },
    });
    return response;
  };

  const getSourceMoney = async ({phone, TransType}) => {
    let response = null;
    await doRequest({
      url: API.WALLET.GET_SOURCE_MONEY,
      method: 'post',
      params: {
        PhoneNumber: phone,
        TransType,
      },
      success: res => {
        response = res;
      },
    });
    return response;
  };
  return {
    mapBankNapas,
    activeUser,
    activeCustomerOtp,
    getConnectedBank,
    getDomesticBank,
    getNapasBank,
    getInternationalBank,
    getConnectedBankDetail,
    changeLimit,
    getBankFee,
    payinConnectedBank,
    getWalletInfo,
    getHistory,
    getHistoryDetail,
    cashOut,
    cashOutConfirm,
    checkAmountLimit,
    getQRCodeInfo,
    getTransferUser,
    cashIn,
    cashInConfirm,
    cashInNapas,
    setDefaultBank,
    moneyTransfer,
    getPromotion,
    applyPromo,
    payment,
    paymentComfrim,
    getSourceMoney,
  };
};
export default useServiceWallet;
