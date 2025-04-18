import {
  ForwardedRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { Engine, Render, Runner, Body } from "matter-js";
import {
  PropsGameSlotMachineParams,
  SlotMachineHandle,
} from "../interfaces/interfaces";

import { useLogicGame } from "../game/useLogicGame";
import { useStartGame } from "../game/useStartGame";

export function useSlotMachine(
  ref: ForwardedRef<SlotMachineHandle>,
  params: PropsGameSlotMachineParams
) {
  const { balance, bet } = params;

  // ref's
  const matterContainer = useRef<HTMLDivElement | null>(null);
  const engineRef = useRef(Engine.create());
  const renderRef = useRef<Render | null>(null);
  const runnerRef = useRef<Runner | null>(null);
  const bodiesRef = useRef<Body[]>([]);

  // params of running game
  const [started, setStarted] = useState<boolean>(false);
  const [gameRuning, setGameRuning] = useState<boolean>(false);

  const logicGame = useLogicGame(
    matterContainer && matterContainer,
    engineRef,
    renderRef,
    bodiesRef,
    runnerRef,
    started
  );

  const { spin } = useStartGame(
    matterContainer && matterContainer,
    bodiesRef,
    setStarted,
    setGameRuning,
    params
  );

  useEffect(() => {
    console.log(bodiesRef);
    if (logicGame && bodiesRef) {
      logicGame();
    }

    // reset the game
    setTimeout(() => spin(0), 0);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // action of button to running game
  useImperativeHandle(ref, () => ({
    spinReels: () => {
      if (gameRuning) return;
      if (balance > 0 && bet <= balance) spin();
    },
  }));

  return { matterContainer };
}
