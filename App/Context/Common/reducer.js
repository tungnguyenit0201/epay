export default function commonReducer(state, action) {
  switch (action.type) {
    case 'INIT_STATE':
      return action.data;
    case 'SET_LOADING':
      return {
        ...state,
        loading: action?.loading,
      };

    default:
      return state;
  }
}
