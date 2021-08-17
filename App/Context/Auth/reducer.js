export default function authReducer(state, action) {
  switch (action.type) {
    case 'INIT_STATE':
      return action.data;
    case 'SET_AUTH_CONFIG':
      return action.data;
    default:
      return state;
  }
}
