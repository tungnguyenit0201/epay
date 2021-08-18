export default function userReducer(state, action) {
  switch (action.type) {
    case 'UPDATE_TOKEN':
      return {
        ...state,
        token: action.data,
      };
    default:
      return state;
  }
}
