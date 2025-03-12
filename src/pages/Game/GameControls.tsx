import auto from "../../assets/controls/auto.png";
import menu from "../../assets/controls/menu.png";
import minus from "../../assets/controls/minus.png";
import plus from "../../assets/controls/plus.png";
import turbo from "../../assets/controls/turbo.png";
import spinner from "../../assets/spinner/button.png"
import { PropsGameControls } from "../../interfaces/interfaces";

export function GameControls({
  spin
}:{
  spin:()=>void
}) {
  const controls : PropsGameControls[] = [
    { key: "turbo", img: turbo },
    { key: "minus", img: minus },
    { key: "spinner", img: spinner },
    { key: "plus", img: plus },
    { key: "auto", img: auto },
    { key: "menu", img: menu },
  ];

  const action : Record<typeof controls[number]["key"], () => void> = {
    turbo: ()=>console.log("turbo"),
    minus: ()=>console.log("minus"),
    spinner: ()=>spin(),
    plus: ()=>console.log("plus"),
    auto: ()=>console.log("auto"),
    menu: ()=>console.log("menu"),
  }

  return(
    <div className="flex justify-between items-center mt-2">
      <span className="w-3"/>
      {controls.map(({key,img},index:number)=>
        <img 
          onClick={action[key]}
          src={img} 
          alt={key} 
          key={index}
          className={`${img == spinner ? "w-20 h-20":"w-7 h-7"}`}
        />
      )}
    </div>
  )
}