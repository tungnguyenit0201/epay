export default function userReducer(state, action) {
  switch (action.type) {
    case 'UPDATE_TOKEN':
      return {
        ...state,
        token: action.data,
      };
    case 'SET_FIRST_LOGIN':
      return {
        ...state,
        firstLogin: action?.firstLogin,
      };
    case 'SET_PERSONAL_INFO':
      return {
        ...state,
        personalInfo: action?.personalInfo,
      };
    case 'SET_PHONE':
      return {
        ...state,
        phone: action?.phone,
      };
    case 'UPDATE_WALLET':
      return {
        ...state,
        myWallet: action?.data,
      };
    case 'SET_PERSONAL_ADDRESS':
      return {
        ...state,
        personalAddress: action?.data,
      };
    case 'SET_PERSONAL_IC':
      return {
        ...state,
        personalIC: action?.data,
      };
    case 'SET_IC_INFO':
      return {
        ...state,
        icInfo: action?.data,
      };
    case 'SET_IDENTITY_CARD_INFO':
      return {
        ...state,
        identityCardInfor: action?.data,
      };
    case 'SET_BANK_LINK_INFO':
      return {
        ...state,
        bankConnectInfo: action?.data,
      };
    case 'SET_REGION':
      return {
        ...state,
        region: action?.data,
      };
    case 'SET_QRCODE':
      return {
        ...state,
        qrCode: action?.data,
      };
    case 'SET_NOTIFY':
      return {
        ...state,
        listNotify: action?.data,
      };
    case 'SET_KYC_TYPE':
      return {
        ...state,
        kycType: action?.data,
      };
    case 'SET_ROUTE':
      return {
        ...state,
        route: action?.route,
      };
    default:
      return state;
  }
}
