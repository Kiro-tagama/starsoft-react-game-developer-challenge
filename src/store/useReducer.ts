import { PropsUser } from "../interfaces/interfaces";

const initialState:{user:PropsUser,isLoggedIn:boolean} = {
  user: {
    name: '',
    password: '',
    balance: 0
  },
  isLoggedIn: false
};

export function userReducer (state = initialState, action) {
  switch (action.type) {
    case 'REGISTER_USER':
      return {
        ...state,
        user: action.payload,
        isLoggedIn: false
      };
    case 'LOGIN_USER':
      if (state.user.name === action.payload.name && state.user.password === action.payload.password) {
        return {
          ...state,
          isLoggedIn: true
        };
      }
      return state;
    case 'UPDATE_BALANCE':
      if (state.isLoggedIn) {
        return {
          ...state,
          user: { ...state.user, balance: state.user.balance + action.payload }
        };
      }
      return state;
    default:
      return state;
  }
};