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
    case 'SET_BANK_LINK_INFO':
      return {
        ...state,
        bankLinkInfo: action?.data,
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
    default:
      return state;
  }
}
