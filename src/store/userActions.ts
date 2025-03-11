export function registerUser (name:string, password:string, balance:number)  {
  return {
    type: 'REGISTER_USER',
    payload: { name, password, balance }
  };
};

export function loginUser (name:string, password:string)  {
  return {
    type: 'LOGIN_USER',
    payload: { name, password }
  };
};

export function updateBalance (balance:number)  {
  return {
    type: 'UPDATE_BALANCE',
    payload: balance
  };
};
