import { forwardRef } from "react";

import banner from "../../../public/assets/decoratives/top_banner.png";
import mascot from "../../../public/assets/mascot/mascot.png";
import frame from "../../../public/assets/reel/reel_frame.png";
import { useSlotMachine } from "../../hooks/useSlotMachine";
import { PropsGameSlotMachineParams } from "../../interfaces/interfaces";

export const GameSlotMachine = forwardRef(
  (params: PropsGameSlotMachineParams, ref) => {
    const { patternRef, matterContainer } = useSlotMachine(ref, params);
    return (
      <div ref={patternRef} className="flex flex-col items-center">
        <img
          src={banner}
          alt="top_banner.png"
          className="object-cover -mb-56"
        />
        <div className="relative flex flex-col items-center">
          <img
            src={mascot}
            alt="mascot.png"
            className="object-cover h-25 w-25 -mb-4 z-10 rotate-7"
          />
          <div
            ref={matterContainer}
            className="bg-cover bg-center"
            style={{ backgroundImage: `url(${frame})` }}
          />
        </div>
      </div>
    );
  }
);
