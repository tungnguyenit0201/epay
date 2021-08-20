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
    default:
      return state;
  }
}
