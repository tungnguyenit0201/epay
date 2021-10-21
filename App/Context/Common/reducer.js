export default function commonReducer(state, action) {
  switch (action.type) {
    case 'INIT_STATE':
      return action.data;
    case 'SET_LOADING':
      return {
        ...state,
        loading: action?.loading,
      };
    case 'SET_ERROR':
      return {
        ...state,
        error: action?.error,
      };
    case 'SET_CONFIG':
      return {
        ...state,
        config: action?.config,
      };
    case 'SHOW_MODAL':
      return {
        ...state,
        showModal: {
          ...state.showModal,
          [action?.modal?.type]: action?.modal?.value,
          goBack: action?.goBack,
        },
      };
    case 'SET_BACK_TYPE':
      console.log('action :>> ', action);
      return {
        ...state,
        backType: action?.backType,
      };
    default:
      return state;
  }
}
