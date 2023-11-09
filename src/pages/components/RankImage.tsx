import Image, { StaticImageData } from "next/image";
import { FC } from "react";
import { images } from "../../scripts/rankings-image-variables";

interface RankImageProps {
  team_rank_title: string;
  width: number;
  height: number;
}

const RankImage: FC<RankImageProps> = ({ team_rank_title, width, height }) => {
  const imgSrc = images.ranking[team_rank_title as keyof typeof images.ranking];

  if (!imgSrc) {
    console.error(`Image not found for rank: ${team_rank_title}`);
  }

  return (
    <Image
      alt="image of player's rank"
      src={imgSrc}
      width={width}
      height={height}
      quality={100}
    />
  );
};

export default RankImage;
