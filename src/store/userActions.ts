import { PropsUser } from "../interfaces/interfaces";

export const registerUser = (user: PropsUser) =>
  ({
    type: "REGISTER_USER",
    payload: user,
  }) as const;

export const loginUser = (user: PropsUser) =>
  ({
    type: "LOGIN_USER",
    payload: user,
  }) as const;

export const updateBalance = (balance: number) =>
  ({
    type: "UPDATE_BALANCE",
    payload: balance,
  }) as const;
