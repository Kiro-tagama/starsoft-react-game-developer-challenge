import { useState } from "react";
import auto from "../../../public/assets/controls/auto.png";
import menu from "../../../public/assets/controls/menu.png";
import minus from "../../../public/assets/controls/minus.png";
import plus from "../../../public/assets/controls/plus.png";
import turbo from "../../../public/assets/controls/turbo.png";
import spinner from "../../../public/assets/spinner/button.png";
import {
  PropsGameControls,
  PropsGameHistoric,
} from "../../interfaces/interfaces";

interface PropsGameControlsParams {
  userName: string;
  balance: number;
  spin: () => void;
  bet: number;
  setBet: (value: number) => void;
  historic: PropsGameHistoric[];
}

export function GameControls({
  userName,
  balance,
  spin,
  bet,
  setBet,
  historic,
}: PropsGameControlsParams) {
  const controls: PropsGameControls[] = [
    { key: "turbo", img: turbo },
    { key: "minus", img: minus },
    { key: "spinner", img: spinner },
    { key: "plus", img: plus },
    { key: "auto", img: auto },
    { key: "menu", img: menu },
  ];

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const betControl = (action: "minus" | "plus") => {
    if (action === "minus" && bet > 1) setBet(bet - 1);
    if (action === "plus" && bet < balance) setBet(bet + 1);
  };

  const action: Record<(typeof controls)[number]["key"], () => void> = {
    turbo: () => console.log("turbo"),
    minus: () => betControl("minus"),
    spinner: () => spin(),
    plus: () => betControl("plus"),
    auto: () => console.log("auto"),
    menu: () => setIsOpen(true),
  };

  return (
    <>
      <div className="flex justify-between items-center mt-2">
        <span className="w-3" />
        {controls.map(({ key, img }, index: number) => (
          <img
            onClick={action[key]}
            src={img}
            alt={key}
            key={index}
            className={`${img == spinner ? "w-20 h-20" : "w-7 h-7"}`}
          />
        ))}
      </div>
      <div
        className={`fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 transition-opacity duration-300 z-20 ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        <div
          className={`bg-white p-6 rounded-lg shadow-lg max-w-lg w-full mx-4 transform transition-all duration-300 $`}
        >
          <div className="flex justify-between">
            <p className=" text-2xl font-bold mb-4">Modal Title</p>
            <button
              onClick={() => setIsOpen(false)}
              className="px-4 py-2 bg-red-600 text-white rounded-lg w-min"
            >
              Close
            </button>
            <p>nome: {userName}</p>
            <p>regras:</p>
            <li>Retorno coringa dá 100% e demais 50%</li>
            <li>
              O multiplicador reseta quando ganha e a recompensa é multiplicada
            </li>
            <p>historico:</p>
            <div>
              {historic.map((i: PropsGameHistoric) => (
                <p key={i.time}>{i.toString()}</p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
