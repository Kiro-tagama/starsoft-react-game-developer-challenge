import "../../styles/game.css";
import { GameControls } from "./GameControls";
import { GameInfo } from "./GameInfo";
import { GameSlotMachine } from "./GameSlotMachine";

export default function Game(){
  return(
    <div>
      <GameSlotMachine/>
      <GameInfo/>
      <GameControls/>
    </div>
  )
}