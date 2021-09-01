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
    case 'LIST_INTERNATIONAL_BANK':
      return {
        ...state,
        listInternationalBank: action?.data,
      };
    case 'UPDATE_TRANSACTION_INFO':
      return {
        ...state,
        transaction: action?.data,
      };
    default:
      return state;
  }
}
