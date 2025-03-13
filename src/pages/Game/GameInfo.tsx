import coin from "../../../public/assets/bottom_panel/coin_icon.png";
import multiplierBar from "../../../public/assets/bottom_panel/multiplier_bar.png";
import panel from "../../../public/assets/bottom_panel/panel.png";
import wallet from "../../../public/assets/bottom_panel/wallet_icon.png";
import win from "../../../public/assets/bottom_panel/win_icon.png";
import { PropsGameInfo } from "../../interfaces/interfaces";

export function GameInfo({
  balance,
  bet,
  gain,
  multiplier,
}: {
  balance: number;
  bet: number;
  gain: number;
  multiplier: number;
}) {
  const info: PropsGameInfo[] = [
    { icon: wallet, value: balance },
    { icon: coin, value: bet },
    { icon: win, value: gain },
  ];

  return (
    <div>
      <h2
        style={{ backgroundImage: `url(${multiplierBar})` }}
        className="infoCard"
      >
        Multiplicador {multiplier}x
      </h2>
      <div style={{ backgroundImage: `url(${panel})` }} className=" infoCard">
        {info.map((item: PropsGameInfo, index: number) => {
          const alt = item.icon.split("/");
          return (
            <div key={index}>
              <img
                src={item.icon}
                alt={alt[alt.length - 1]}
                className="w-5 h-5"
              />
              <p>R${item.value.toFixed(2)}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
