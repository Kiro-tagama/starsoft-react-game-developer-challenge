export interface PropsGameControls {
  key: string;
  img: string;
}

export interface PropsGameInfo {
  icon: string;
  value: number;
}

export interface PropsGameInfoParams {
  balance: number;
  bet: number;
  gain: number;
  multiplier: number;
}

export interface PropsGameControlsParams {
  userName: string;
  balance: number;
  spin: () => void;
  bet: number;
  turboSpin: boolean;
  setTurboSpin: (value: boolean) => void;
  setBet: (value: number) => void;
  historic: PropsGameHistoric[];
}

export interface PropsGameHistoric {
  time: string;
  bet: number;
  result: number;
}

export interface SlotMachineHandle {
  spinReels: () => void;
}

export interface PropsGameSlotMachineParams {
  balance: number;
  bet: number;
  gain: number;
  multiplier: number;
  turboSpin: boolean;
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
