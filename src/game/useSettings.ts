import banana from "../../public/assets/reel_symbols/banana_icon.png";
import flora from "../../public/assets/reel_symbols/flora_icon.png";
import hourglass from "../../public/assets/reel_symbols/hourglass_icon.png";
import joker from "../../public/assets/reel_symbols/joker_icon.png";
import leaf from "../../public/assets/reel_symbols/leaf_icon.png";
import mango from "../../public/assets/reel_symbols/mango_icon.png";

export function useSettings(matterContainer: {
  current: { offsetWidth: number; offsetHeight: number };
}) {
  const images = [banana, flora, hourglass, joker, leaf, mango];

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
  const bodySize = 50;
  const scaleImages = 0.25;

  return {
    images,
    containerSize,
    columns,
    verticalSpacing,
    bodySize,
    scaleImages,
  };
}
