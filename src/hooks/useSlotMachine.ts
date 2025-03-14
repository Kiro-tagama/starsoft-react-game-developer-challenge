import {
  ForwardedRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { Engine, Render, Runner, Bodies, Composite, Body } from "matter-js";
import { useDispatch } from "react-redux";
import { updateBalance } from "../store/userActions";
import { PropsGameSlotMachineParams } from "../interfaces/interfaces";

// Importação das imagens
import banana from "../../public/assets/reel_symbols/banana_icon.png";
import flora from "../../public/assets/reel_symbols/flora_icon.png";
import hourglass from "../../public/assets/reel_symbols/hourglass_icon.png";
import joker from "../../public/assets/reel_symbols/joker_icon.png";
import leaf from "../../public/assets/reel_symbols/leaf_icon.png";
import mango from "../../public/assets/reel_symbols/mango_icon.png";

interface SlotMachineHandle {
  spinReels: () => void;
}

export function useSlotMachine(
  ref: ForwardedRef<SlotMachineHandle>,
  params: PropsGameSlotMachineParams
) {
  const {
    balance,
    bet,
    gain,
    multiplier,
    historic,
    turboSpin,
    setGain,
    setHistoric,
    setMultiplier,
  } = params;

  const images = [banana, flora, hourglass, joker, leaf, mango];
  const matterContainer = useRef<HTMLDivElement>(null);
  const engineRef = useRef(Engine.create());
  const renderRef = useRef<Render | null>(null);
  const runnerRef = useRef<Runner | null>(null);

  const [started, setStarted] = useState<boolean>(false);
  const [gameRuning, setGameRuning] = useState<boolean>(false);
  const bodiesRef = useRef<Body[]>([]);

  // Dimensões do contêiner
  const containerSize = {
    width: matterContainer.current?.offsetWidth || 360,
    height: matterContainer.current?.offsetHeight || 300,
  };

  // Posições das colunas no eixo X
  const columns = [
    containerSize.width / 6, // Coluna 1
    containerSize.width / 2, // Coluna 2
    (5 * containerSize.width) / 6, // Coluna 3
  ];

  const verticalSpacing = 100;
  const bodiesSize = 50;
  const scaleImages = 0.25;

  useEffect(() => {
    spin(0);

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
        const body = Bodies.rectangle(x, y, bodiesSize, bodiesSize, {
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

    return () => {
      clearInterval(interval);
      if (renderRef.current) {
        Render.stop(renderRef.current);
        renderRef.current.canvas.remove();
        renderRef.current = null;
      }
      Runner.stop(runnerRef.current);
      Composite.clear(world, true);
      Engine.clear(engine);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const spin = (time = 5) => {
    time = turboSpin ? 1 : time;
    time = time * 1000;

    setStarted(false);
    setGameRuning(true);

    bodiesRef.current.forEach((body) => {
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
          (body) => Math.abs(body.position.x - columns[columnIndex]) < 30
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

        columnBodies.forEach((body, index) => {
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
      const results = columns.map((x) => {
        const body = bodiesRef.current.find(
          (b) =>
            Math.abs(b.position.x - x) < 30 &&
            b.position.y > containerSize.height / 2 - 40 &&
            b.position.y < containerSize.height / 2 + 40
        );
        return body?.render.sprite ? body.render.sprite.texture : null;
      });

      if (time !== 0) {
        validateSpinReels(results);
      }
      setGameRuning(false);
    }, time);
  };

  useImperativeHandle(ref, () => ({
    spinReels: () => {
      if (gameRuning) return;
      if (balance > 0 && bet <= balance) spin();
    },
  }));

  const dispatch = useDispatch();

  function validateSpinReels(data: (string | null)[]) {
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

  return { matterContainer };
}
