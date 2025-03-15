/* eslint-disable @typescript-eslint/ban-ts-comment */
import joker from "../../public/assets/reel_symbols/joker_icon.png";
import { useDispatch } from "react-redux";
import { updateBalance } from "../store/userActions";
import { Body } from "matter-js";
import { RefObject, SetStateAction } from "react";
import { PropsGameSlotMachineParams } from "../interfaces/interfaces";
import { useSettings } from "./useSettings";

export function useStartGame(
  matterContainer: RefObject<HTMLDivElement | null>,
  bodiesRef: RefObject<Body[]>,
  setStarted: { (value: SetStateAction<boolean>): void; (arg0: boolean): void },
  setGameRuning: {
    (value: SetStateAction<boolean>): void;
    (arg0: boolean): void;
  },
  params: PropsGameSlotMachineParams
) {
  const dispatch = useDispatch();
  const { images, containerSize, columns, verticalSpacing } =
    // @ts-expect-error
    useSettings(matterContainer);

  const {
    bet,
    gain,
    multiplier,
    historic,
    turboSpin,
    setGain,
    setHistoric,
    setMultiplier,
  } = params;

  function validateSpinReels(data: string[]) {
    let localGain = 0;

    if (data[0] === data[1] && data[1] === data[2]) {
      console.log("🎉 Vitória! Três símbolos iguais!");

      localGain = data[0] === joker ? bet : bet * 0.5;
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

  const spin = (time = 5) => {
    time = turboSpin ? 1 : time;
    time = time * 1000;

    setStarted(false);
    setGameRuning(true);

    bodiesRef.current.forEach((body: Body) => {
      Body.setStatic(body, false);
      Body.setVelocity(body, { x: 0, y: Math.random() * 10 + 5 });
    });

    const stopTimes =
      time === 0
        ? [0, 0, 0]
        : [
            Math.random() * 500 + time * 0.6,
            Math.random() * 500 + time * 0.7,
            Math.random() * 500 + time * 0.8,
          ];

    stopTimes.forEach((stopTime, columnIndex) => {
      setTimeout(() => {
        const columnBodies = bodiesRef.current.filter(
          (body: Body) => Math.abs(body.position.x - columns[columnIndex]) < 30
        );

        const randomIndex = Math.floor(Math.random() * images.length);
        const targetBody = columnBodies[randomIndex];

        Body.setStatic(targetBody, true);
        Body.setPosition(targetBody, {
          x: columns[columnIndex], // Posição X da coluna
          y: containerSize.height / 2, // Posição Y central
        });

        const aboveBody =
          columnBodies[(randomIndex - 1 + images.length) % images.length];
        const belowBody = columnBodies[(randomIndex + 1) % images.length];

        Body.setStatic(aboveBody, true);
        Body.setPosition(aboveBody, {
          x: columns[columnIndex],
          y: containerSize.height / 2 - verticalSpacing, // Posição acima do meio
        });

        Body.setStatic(belowBody, true);
        Body.setPosition(belowBody, {
          x: columns[columnIndex],
          y: containerSize.height / 2 + verticalSpacing, // Posição abaixo do meio
        });

        columnBodies.forEach((body: Body, index: number) => {
          if (body !== targetBody && body !== aboveBody && body !== belowBody) {
            Body.setStatic(body, true);
            Body.setPosition(body, {
              x: body.position.x,
              y: -60 - index * verticalSpacing,
            });
          }
        });
      }, stopTime);
    });

    setTimeout(() => {
      const results = columns
        .map((x: number) => {
          const body = bodiesRef.current.find(
            (b: Body) =>
              Math.abs(b.position.x - x) < 30 &&
              b.position.y > containerSize.height / 2 - 40 &&
              b.position.y < containerSize.height / 2 + 40
          );
          return body?.render.sprite?.texture;
        })
        .filter(Boolean) as string[];

      if (time !== 0) validateSpinReels(results);
      setGameRuning(false);
    }, time);
  };

  return { spin };
}
