import banner from "../../assets/decoratives/top_banner.png";
import mascot from "../../assets/mascot/mascot.png";
import frame from "../../assets/reel/reel_frame.png";

import banana from '../../assets/reel_symbols/banana_icon.png'
import flora from '../../assets/reel_symbols/flora_icon.png'
import hourglass from '../../assets/reel_symbols/hourglass_icon.png'
import joker from '../../assets/reel_symbols/joker_icon.png'
import leaf from '../../assets/reel_symbols/leaf_icon.png'
import mango from '../../assets/reel_symbols/mango_icon.png'

import {
  Application,
  extend,
} from '@pixi/react'
import {
  Container,
  Graphics,
  Sprite,
} from 'pixi.js'
import {  useEffect, useRef } from 'react'
import { Background } from "../../game/Background";

extend({
  Container,
  Graphics,
  Sprite
})

export function GameSlotMachine() {
  const reelSymbols : {key:string,img:string}[] = [
    { key: "banana", img: banana },
    { key: "flora", img: flora },
    { key: "hourglass", img: hourglass },
    { key: "joker", img: joker },
    { key: "leaf", img: leaf },
    { key: "mango", img: mango },
  ];
  console.log(reelSymbols)

  const parentRef = useRef(null)
  const widthRef = parentRef.current ? parentRef.current.offsetWidth : 400
  console.log(widthRef)

  useEffect(()=>{},[parentRef])

  return(
    <div ref={parentRef}>
      <img src={banner} alt="top_banner.png" className=" object-cover -mb-56" />
      <div className="flex flex-col items-center sm:max-w-md md:max-w-[370px] md:scale-90">
        <img src={mascot} alt="top_banner.png" className=" object-cover h-25 w-25 -mb-4 z-10 rotate-7" />
        {/* <img src={frame} alt="top_banner.png" className=" object-cover" /> */}
        <Application width={widthRef}  height={widthRef} backgroundColor={"#0000"}>
          <Background img={frame} width={widthRef} height={widthRef}/>
        </Application>
      </div>
    </div>
  )
}