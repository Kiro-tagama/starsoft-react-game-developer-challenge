import { Reducer, UnknownAction } from "@reduxjs/toolkit";
import { State } from "../interfaces/interfaces";
import { UserAction } from "./userActions";

const initialState: State = {
  user: { name: "", password: "", balance: 0 },
  isLoggedIn: false,
};

export const userReducer: Reducer<State> = (
  state = initialState,
  action: UnknownAction
) => {
  // Verifica se a ação é do tipo UserAction
  if (!isUserAction(action)) {
    return state;
  }

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
        user: {
          ...state.user,
          balance: (state.user.balance || 0) + action.payload,
        },
      };
    default:
      return state;
  }
};

// Função auxiliar para verificar se a ação é do tipo UserAction
function isUserAction(action: UnknownAction): action is UserAction {
  return (
    action.type === "REGISTER_USER" ||
    action.type === "LOGIN_USER" ||
    action.type === "UPDATE_BALANCE"
  );
}
