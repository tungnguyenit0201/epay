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
    default:
      return state;
  }
}
