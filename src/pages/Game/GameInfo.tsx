import coin from '../../assets/bottom_panel/coin_icon.png'
import multiplierBar from '../../assets/bottom_panel/multiplier_bar.png'
import panel from '../../assets/bottom_panel/panel.png'
import wallet from '../../assets/bottom_panel/wallet_icon.png'
import win from '../../assets/bottom_panel/win_icon.png'

interface PropsInfo{
  icon: string;
  value: number;
}

export function GameInfo() {
  const info :PropsInfo[] = [
    {icon:wallet,value:0.00},
    {icon:coin,value:0.00},
    {icon:win,value:0.00}
  ]

  return(
    <div>
      <h2 style={{ backgroundImage: `url(${multiplierBar})`}} className='infoCard'>
        Multiplicador 10x
      </h2>
      <div style={{ backgroundImage: `url(${panel})`}} className=' infoCard'>
        {info.map((item:PropsInfo,index:number)=>{
          const alt = item.icon.split("/")
          return <div key={index} className='bg-em'>
            <img 
              src={item.icon} 
              alt={alt[alt.length-1]} 
              className="w-5 h-5"
            />
            <p>R${item.value.toFixed(2)}</p>
          </div>
        })}
      </div>
    </div>
  )
}