import "../../styles/game.css";
import { useRef } from "react";

import { GameControls } from "./GameControls";
import { GameInfo } from "./GameInfo";
import { GameSlotMachine } from "./GameSlotMachine";

export default function Game(){
  const slotMachineRef = useRef<{ spinReels: () => void } | null>(null);

  const spinReelsForSlotMachine = ()=>{
    slotMachineRef.current?.spinReels()
  }

  return(
    <div>
      <GameSlotMachine 
        ref={slotMachineRef}
      />
      <GameInfo/>
      <GameControls
        spin={spinReelsForSlotMachine}
      />
    </div>
  )
}