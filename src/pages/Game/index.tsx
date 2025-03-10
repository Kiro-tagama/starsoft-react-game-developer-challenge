/*
  imagens usadas
  
  bottom_panel - ok
  controls - ok
  decoratives
  mascot
  reel
  reels_symbols
  spinner - ok 
*/

import "../../styles/game.css";
import { GameControls } from "./GameControls";
import { GameInfo } from "./GameInfo";

export default function Game(){
  return(
    <div>Game
      <GameInfo/>
      <GameControls/>
    </div>
  )
}