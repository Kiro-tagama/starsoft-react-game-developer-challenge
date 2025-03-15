/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Engine, Render, Runner, Bodies, Composite, Body } from "matter-js";

import { useSettings } from "./useSettings";
import { RefObject } from "react";

export function useLogicGame(
  matterContainer: RefObject<HTMLDivElement | null>,
  engineRef: RefObject<Engine>,
  renderRef: RefObject<Render | null>,
  bodiesRef: RefObject<Body[]>,
  runnerRef: RefObject<Runner | null>,
  started: boolean
) {
  const {
    images,
    containerSize,
    columns,
    scaleImages,
    verticalSpacing,
    bodySize,
    // @ts-expect-error
  } = useSettings(matterContainer);

  const engine = engineRef.current;
  const world = engine.world;

  if (!matterContainer.current || renderRef.current) return;

  renderRef.current = Render.create({
    element: matterContainer.current,
    engine,
    options: {
      width: containerSize.width,
      height: containerSize.height,
      wireframes: false,
      background: "transparent",
    },
  });

  const bodies: Body[] = [];

  // Cria os corpos (ícones) para cada coluna
  columns.forEach((x) => {
    images.forEach((src, index) => {
      const y = index * verticalSpacing - containerSize.height; // Posição inicial acima da tela
      const body = Bodies.rectangle(x, y, bodySize, bodySize, {
        restitution: 0.1,
        frictionAir: 0.02,
        isStatic: started,
        render: {
          sprite: { texture: src, xScale: scaleImages, yScale: scaleImages },
        },
      });
      Composite.add(world, body);
      bodies.push(body);
    });
  });

  bodiesRef.current = bodies;

  Render.run(renderRef.current);
  runnerRef.current = Runner.create();
  Runner.run(runnerRef.current, engine);

  // Intervalo para reposicionar os ícones quando saírem da tela
  const interval = setInterval(() => {
    bodiesRef.current.forEach((body) => {
      if (body.position.y > containerSize.height) {
        Body.setPosition(body, { x: body.position.x, y: -60 });
      }
    });
  }, 16);

  const logicGame = () => {
    clearInterval(interval);
    if (renderRef.current) {
      Render.stop(renderRef.current);
      renderRef.current.canvas.remove();
      renderRef.current = null;
    }
    // @ts-ignore
    Runner.stop(runnerRef.current);
    Composite.clear(world, true);
    Engine.clear(engine);
  };

  return logicGame;
}
