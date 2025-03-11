import {
  Assets,
  Texture,
} from 'pixi.js';
import {
  useEffect,
  useRef,
  useState,
} from 'react';

export function Background({img,width,height}:{img:string,width:number,height:number}) {
  const spriteRef = useRef(null)
  const [texture, setTexture] = useState(Texture.EMPTY)

  useEffect(() => {
      if (texture === Texture.EMPTY) {
          Assets
              .load(img)
              .then((result) => {
                  setTexture(result)
              });
      }
  }, [texture]);

  return (
      <pixiSprite
          ref={spriteRef}
          anchor={0.5}
          eventMode={'static'}
          texture={texture}
          x={(width/2)}
          y={(height/2)} 
          height={height}
          width={width}
          />
  );
}
