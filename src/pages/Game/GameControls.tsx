import { useEffect, useState } from "react";
import auto from "../../../public/assets/controls/auto.png";
import menu from "../../../public/assets/controls/menu.png";
import minus from "../../../public/assets/controls/minus.png";
import plus from "../../../public/assets/controls/plus.png";
import turbo from "../../../public/assets/controls/turbo.png";
import spinner from "../../../public/assets/spinner/button.png";
import {
  PropsGameControls,
  PropsGameControlsParams,
  PropsGameHistoric,
} from "../../interfaces/interfaces";
import { useNavigate } from "react-router-dom";

export function GameControls({
  userName,
  balance,
  spin,
  bet,
  historic,
  turboSpin,
  setTurboSpin,
  setBet,
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
  const [automatic, setAutomatic] = useState<boolean>(false);

  const betControl = (action: "minus" | "plus") => {
    if (action === "minus" && bet > 1) setBet(bet - 1);
    if (action === "plus" && bet < balance) setBet(bet + 1);
  };

  const action: Record<(typeof controls)[number]["key"], () => void> = {
    turbo: () => setTurboSpin(!turboSpin),
    minus: () => betControl("minus"),
    spinner: () => spin(),
    plus: () => betControl("plus"),
    auto: () => setAutomatic(!automatic),
    menu: () => setIsOpen(true),
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;

    const startInterval = () => {
      if (automatic && balance > 0 && bet <= balance) {
        setTimeout(() => {
          spin();
        }, 100);
        interval = setInterval(
          () => {
            spin();
          },
          turboSpin ? 1500 : 5000
        );
      } else {
        setAutomatic(false);
      }
    };

    startInterval();

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [automatic, balance, bet, turboSpin, spin]);

  const navigate = useNavigate();

  return (
    <>
      <div className="flex justify-between items-center mt-2">
        <span className="w-3" />
        {controls.map(({ key, img }: PropsGameControls) => (
          <div key={key} className="flex">
            <img
              onClick={action[key]}
              src={img}
              alt={key}
              className={`${img == spinner ? "w-20 h-20" : "w-7 h-7"} transition-transform duration-200 ease-in-out active:scale-90`}
            />
            {key == "turbo" || key == "auto" ? (
              <div
                className={`w-1.5 h-1.5 rounded-full bg-black/50 ${key == "turbo" && turboSpin ? "bg-emerald-50" : null} ${key == "auto" && automatic ? "bg-emerald-50" : null}`}
              />
            ) : null}
          </div>
        ))}
      </div>
      <div
        className={`fixed inset-0 flex items-center justify-center  bg-opacity-50 transition-opacity duration-300 z-20 ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        <div
          className={`bg-emerald-50 text-[#081a13] p-6 rounded-lg shadow-lg max-w-lg w-full mx-4 transform transition-all duration-300`}
        >
          <div className="flex justify-between items-center">
            <p className=" text-2xl font-bold ">Info.</p>
            <button
              className="!w-min h-min px-4 py-2 rounded-lg !bg-[#081a13] !text-emerald-50"
              onClick={() => navigate("/")}
            >
              Home
            </button>
          </div>
          <p>nome: {userName}</p>
          <br />
          <p>regras:</p>
          <li>Retorno: coringa 100% e demais 50%</li>
          <li>O multiplicador reseta quando ganha e a recompensa multiplica</li>
          <br />
          <p>historico:</p>
          <div className=" overflow-y-auto max-h-32">
            {historic.map((i: PropsGameHistoric) => (
              <p key={i.time}>
                {i.time} - aposta: {i.bet.toFixed(2)}
                {i.result > 0 ? " - ganhou: R$" + i.result.toFixed(2) : null}
              </p>
            ))}
          </div>
          <br />
          <button
            onClick={() => setIsOpen(false)}
            className="!bg-[#081a13] !text-emerald-50"
          >
            Close
          </button>
        </div>
      </div>
    </>
  );
}
