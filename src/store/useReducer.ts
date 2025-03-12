import { State } from "../interfaces/interfaces";

const initialState: State = {
  user: { name: "", password: "", balance: 0 },
  isLoggedIn: false,
};

export const userReducer = (
  state = initialState,
  action: UserAction
): State => {
  switch (action.type) {
    case "REGISTER_USER":
      return {
        ...state,
        user: { ...action.payload },
        isLoggedIn: true,
      };
    case "LOGIN_USER":
      return {
        ...state,
        user: { ...state.user, ...action.payload },
        isLoggedIn: true,
      };
    case "UPDATE_BALANCE":
      return {
        ...state,
        user: { ...state.user, balance: state.user.balance + action.payload },
      };
    default:
      return state;
  }
};
