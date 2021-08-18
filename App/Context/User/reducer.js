export default function userReducer(state, action) {
  switch (action.type) {
    case 'INIT_USER':
      return {...state, ...action.data};

    case 'UPDATE_TOKEN':
      return {
        ...state,
        token: action.data,
      };

    default:
      return state;
  }
}
