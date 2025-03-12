import { useEffect, useRef, useImperativeHandle, forwardRef, useState } from "react";
import { Engine, Render, Bodies, World } from "matter-js";

import banner from "../../assets/decoratives/top_banner.png";
import mascot from "../../assets/mascot/mascot.png";
import frame from "../../assets/reel/reel_frame.png";

import banana from "../../assets/reel_symbols/banana_icon.png";
import flora from "../../assets/reel_symbols/flora_icon.png";
import hourglass from "../../assets/reel_symbols/hourglass_icon.png";
import joker from "../../assets/reel_symbols/joker_icon.png";
import leaf from "../../assets/reel_symbols/leaf_icon.png";
import mango from "../../assets/reel_symbols/mango_icon.png";

export const GameSlotMachine = forwardRef((_, ref) => {
  const matterContainer = useRef<HTMLDivElement>(null);
  const patternRef = useRef<HTMLDivElement>(null);

  const reelSymbols = [banana, flora, hourglass, joker, leaf, mango];
  const engine = useRef(Engine.create()).current;
  let reels = useRef<Bodies.Rectangle[][]>([]).current;

  const [middleResult,setMiddleResult] = useState<string[]>([]);

  function getUniqueSymbols() {
    const shuffled = [...reelSymbols].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, 3); // Pega três elementos únicos
  }

  useImperativeHandle(ref, () => ({
    spinReels: () => {
      reels.forEach((column, index) => {
        let spinTime = 2000 + index * 500; // Cada coluna para em tempos diferentes

        let interval = setInterval(() => {
          const newSymbols = getUniqueSymbols();
          column.forEach((symbol, i) => {
            symbol.render.sprite.texture = newSymbols[i]; // Garante que são únicos na coluna
          });
        }, 100);

        setTimeout(() => {
          clearInterval(interval);

          // Exibir os símbolos do meio no console
          const middleSymbols = reels.map(column => column[1].render.sprite.texture);
          console.log("Símbolos do meio:", middleSymbols);
        }, spinTime);
      });
    },
  }));

  useEffect(() => {
    const frameWidth =  patternRef.current?.clientWidth || 400;
    const frameHeight = frameWidth * 0.9;

    if (matterContainer.current) matterContainer.current.innerHTML = "";

    const render = Render.create({
      element: matterContainer.current,
      engine,
      options: { 
        width: frameWidth, 
        height: frameHeight, 
        wireframes: false, 
        background: "transparent" 
      },
    });

    function createSymbol(x: number, y: number, size: number, texture: string) {
      return Bodies.rectangle(x, y, size, size, {
        isStatic: true,
        render: {
          sprite: { texture, xScale: size / 200, yScale: size / 200 },
        },
      });
    }

    const middle = frameWidth / 2;
    const size = 40;
    const positions = [-115, 0, 115];
    const verticalPosition = [
      middle/2-size/2,
      middle,
      middle*1.5+size/2
    ]

    reels = positions.map((offset) => {
      const uniqueSymbols = getUniqueSymbols();
      return [
        createSymbol(middle + offset, verticalPosition[0]-20, size, uniqueSymbols[0]),
        createSymbol(middle + offset, verticalPosition[1]-20, 65, uniqueSymbols[1]),
        createSymbol(middle + offset, verticalPosition[2]-20, size, uniqueSymbols[2]),
      ];
    });

    World.add(engine.world, reels.flat());
    Engine.run(engine);
    Render.run(render);

    return () => {
      Render.stop(render);
      World.clear(engine.world);
      Engine.clear(engine);
    };
  }, []);

  return (
    <div ref={patternRef} className="flex flex-col items-center">
      <img src={banner} alt="top_banner.png" className="object-cover -mb-56" />
      <div className="relative flex flex-col items-center">
        <img src={mascot} alt="mascot.png" className="object-cover h-25 w-25 -mb-4 z-10 rotate-7" />
        <div ref={matterContainer} className="bg-cover bg-center" 
        style={{backgroundImage: `url(${frame})`}}/>
      </div>
    </div>
  );
});
