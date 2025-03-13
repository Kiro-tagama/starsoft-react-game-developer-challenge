import "../../styles/game.css";
import { useEffect, useRef, useState } from "react";

import { GameControls } from "./GameControls";
import { GameInfo } from "./GameInfo";
import { GameSlotMachine } from "./GameSlotMachine";

import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../store/store";
import { PropsGameHistoric } from "../../interfaces/interfaces";

export default function Game() {
  const { user, isLoggedIn } = useSelector((state: RootState) => state.user);
  const navigate = useNavigate();
  const slotMachineRef = useRef<{ spinReels: () => void } | null>(null);

  const spinReelsForSlotMachine = () => {
    slotMachineRef.current?.spinReels();
  };

  const [multiplier, setMultiplier] = useState<number>(1);
  const [bet, setBet] = useState<number>(1);
  const [gain, setGain] = useState<number>(0);
  const [historic, setHistoric] = useState<PropsGameHistoric[]>([]);

  useEffect(() => {
    if (!isLoggedIn) navigate("/");
  }, []);

  return (
    <div>
      <GameSlotMachine
        ref={slotMachineRef}
        bet={bet}
        gain={gain}
        historic={historic}
        setGain={setGain}
        setHistoric={setHistoric}
        multiplier={multiplier}
        setMultiplier={setMultiplier}
      />

      <GameInfo
        balance={Number(user.balance)}
        bet={bet}
        gain={gain}
        multiplier={multiplier}
      />
      <GameControls
        userName={user.name}
        balance={Number(user.balance)}
        spin={spinReelsForSlotMachine}
        bet={bet}
        setBet={setBet}
        historic={historic}
      />
    </div>
  );
}
