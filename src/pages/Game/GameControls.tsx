import auto from "../../assets/controls/auto.png";
import menu from "../../assets/controls/menu.png";
import minus from "../../assets/controls/minus.png";
import plus from "../../assets/controls/plus.png";
import turbo from "../../assets/controls/turbo.png";
import spinner from "../../assets/spinner/button.png"

export function GameControls() {
  const imgs = [turbo,minus,spinner,plus,auto,menu]

  return(
    <div className="flex justify-between items-center">
      {imgs.map((img:string,index:number)=>{
        const alt = img.split("/")
        return <img 
          src={img} 
          alt={alt[alt.length-1]} 
          key={index}
          className={`${img == spinner ? "w-10 h-10":"w-5 h-5"}`}
        />
      })}
    </div>
  )
}