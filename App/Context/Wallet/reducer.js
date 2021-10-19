export default function userReducer(state, action) {
  switch (action.type) {
    case 'INIT_STATE':
      return action.data;
    case 'CHOISED_OPTION_VARIENT':
      return {
        ...state,
        choisedOptionVarient: action.data,
      };
    case 'UPDATE_NEW_VARIENT':
      return {
        ...state,
        choisedOptionVarient: action.data,
        price: action.newPrice,
        basePrice: action.newBasePrice,
        currentImage: action.newImage,
        currentVarient: action.currentProductId,
      };
    case 'LIST_CONNECT_BANK':
      return {
        ...state,
        listConnectBank: action?.data,
      };
    case 'LIST_DOMESTIC_BANK':
      return {
        ...state,
        listDomesticBank: action?.data,
      };
    case 'LIST_NAPAS_BANK':
      return {
        ...state,
        listNapasBank: action?.data,
      };
    case 'LIST_INTERNATIONAL_BANK':
      return {
        ...state,
        listInternationalBank: action?.data,
      };
    case 'SET_LIMIT':
      return {
        ...state,
        limit: action?.data,
      };
    case 'SET_IC_INFO':
      return {
        ...state,
        icInfo: action?.data,
      };
    case 'UPDATE_TRANSACTION_INFO':
      return {
        ...state,
        transaction: {...state.transaction, ...action?.data},
      };
    case 'SET_WALLET_INFO':
      return {
        ...state,
        wallet: action?.WalletInfo,
      };
    case 'SET_QR_TRANSACTION':
      return {
        ...state,
        qrTransaction: {...state.qrTransaction, ...action?.qrTransaction},
      };
    case 'SET_SOURCE_MONEY':
      return {
        ...state,
        sourceMoney: action?.sourceMoney,
      };
    default:
      return state;
  }
}
