export interface PropsGameControls {
  key: string;
  img: string;
}

export interface PropsGameInfo {
  icon: string;
  value: number;
}

// redux
export interface PropsUser {
  name: string;
  password: string;
  balance?: number;
}

export interface State {
  user: PropsUser;
  isLoggedIn: boolean;
}
