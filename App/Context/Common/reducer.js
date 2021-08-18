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
    default:
      return state;
  }
}
