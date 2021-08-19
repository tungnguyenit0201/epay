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
    default:
      return state;
  }
}
