export interface PropsGameControls {
  key: string;
  img: string;
}

export interface PropsGameInfo {
  icon: string;
  value: number;
}

export interface PropsGameHistoric {
  time: string;
  bet: number;
  result: number;
}

export interface PropsGameSlotMachineParams {
  bet: number;
  gain: number;
  multiplier: number;
  historic: PropsGameHistoric[];
  setGain: (value: number) => void;
  setHistoric: (value: PropsGameHistoric[]) => void;
  setMultiplier: (value: number) => void;
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
