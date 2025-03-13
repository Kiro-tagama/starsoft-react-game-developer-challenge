/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useEffect, useRef, useImperativeHandle, RefObject } from "react";
import { Engine, Render, Bodies, World } from "matter-js";

import banana from "../../public/assets/reel_symbols/banana_icon.png";
import flora from "../../public/assets/reel_symbols/flora_icon.png";
import hourglass from "../../public/assets/reel_symbols/hourglass_icon.png";
import joker from "../../public/assets/reel_symbols/joker_icon.png";
import leaf from "../../public/assets/reel_symbols/leaf_icon.png";
import mango from "../../public/assets/reel_symbols/mango_icon.png";

import { useDispatch } from "react-redux";
import { updateBalance } from "../store/userActions";
import { PropsGameSlotMachineParams } from "../interfaces/interfaces";

export function useSlotMachine(
  ref: RefObject<unknown>,
  params: PropsGameSlotMachineParams
) {
  const {
    bet,
    gain,
    multiplier,
    historic,
    setGain,
    setHistoric,
    setMultiplier,
  } = params;

  const matterContainer = useRef<HTMLDivElement>(null);
  const patternRef = useRef<HTMLDivElement>(null);

  const reelSymbols = [banana, flora, hourglass, joker, leaf, mango];
  const engine = useRef(Engine.create()).current;
  let reels = useRef<Bodies.Rectangle[][]>([]).current;

  function getUniqueSymbols() {
    const shuffled = [...reelSymbols].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, 3); // Pega três elementos únicos
  }

  const dispatch = useDispatch();

  function validateSpinReels(data: string[]) {
    let localGain = 0;

    if (data[0] === data[1] && data[1] === data[2]) {
      console.log("🎉 Vitória! Três símbolos iguais!");

      localGain = data[0] === "joker" ? bet : bet * 0.5;
      localGain = localGain * multiplier;

      setGain(gain + localGain);
      setMultiplier(1);
    } else {
      console.log("❌ Derrota! Símbolos diferentes.");
      localGain = localGain - bet;
      setMultiplier(multiplier + 1);
    }

    dispatch(updateBalance(localGain));

    const registro = {
      time: new Date().toLocaleTimeString(),
      bet: bet,
      result: localGain,
    };

    setHistoric([...historic, registro]);

    console.log("📜 Relatório atualizado:", registro);
  }

  useImperativeHandle(ref, () => ({
    spinReels: () => {
      let completedSpins = 0;
      const middleSymbols: string[] = [];
      reels.forEach((column, index) => {
        console.log("click");
        const spinTime = 2000 + index * 500;

        const interval = setInterval(() => {
          const newSymbols = getUniqueSymbols();
          column.forEach((symbol, i) => {
            symbol.render.sprite.texture = newSymbols[i];
          });
        }, 100);

        setTimeout(() => {
          clearInterval(interval);

          middleSymbols[index] = column[1].render.sprite.texture;
          completedSpins++;

          if (completedSpins === reels.length) {
            validateSpinReels(middleSymbols);
          }
        }, spinTime);
      });
    },
  }));

  useEffect(() => {
    const frameWidth = patternRef.current?.clientWidth || 400;
    const frameHeight = frameWidth * 0.9;

    if (matterContainer.current) matterContainer.current.innerHTML = "";

    const render = Render.create({
      // @ts-ignore
      element: matterContainer.current,
      engine,
      options: {
        width: frameWidth,
        height: frameHeight,
        wireframes: false,
        background: "transparent",
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
      middle / 2 - size / 2,
      middle,
      middle * 1.5 + size / 2,
    ];

    // eslint-disable-next-line react-hooks/exhaustive-deps
    reels = positions.map((offset) => {
      const uniqueSymbols = getUniqueSymbols();
      return [
        createSymbol(
          middle + offset,
          verticalPosition[0] - 20,
          size,
          uniqueSymbols[0]
        ),
        createSymbol(
          middle + offset,
          verticalPosition[1] - 20,
          65,
          uniqueSymbols[1]
        ),
        createSymbol(
          middle + offset,
          verticalPosition[2] - 20,
          size,
          uniqueSymbols[2]
        ),
      ];
    });

    World.add(engine.world, reels.flat());
    Engine.run(engine);
    Render.run(render);

    return () => {
      Render.stop(render);
      World.clear(engine.world, true);
      Engine.clear(engine);
    };
  }, []);

  return { patternRef, matterContainer };
}
