import { FC } from "react";
import Image from "next/image";
import RankImage from "../RankImage";
import ChartComp from "./ChartComp";
import { MatchData } from "~/pages/players/[player]";

interface PlayerInfoProps {
  player: {  
  name: string;
  rank: number;
  rankImageTitle: string;
  rankTitle: string;
  totalWon: number;
  totalLost: number;
  image: string;
  matches: MatchData[];
}
}

const PlayerInfo: FC<PlayerInfoProps> = ({
player
}) => {
  return (
    <div className="flex w-2/3 lg:flex-row flex-col flex-wrap items-center justify-around rounded-md bg-white bg-opacity-20 py-5">
      <Image
        className="rounded-md"
        alt={player.name + "'s Profile Picture"}
        src={player.image ?? "/spinner.svg"}
        width={150}
        height={100}
        quality={100}
      ></Image>
      <div className="flex flex-col items-center gap-2 lg:order-none md:order-none order-last">
        <h2 className="font-md italic">Rating (over 5 matches)</h2>
        <ChartComp matches={player.matches} currentRank={player.rank}></ChartComp>
      </div>
      <div className="flex flex-col item-center gap-2">
        <p className="text-center text-xl text-white">{player.rankTitle}</p>
        <RankImage
          team_rank_title={player.rankImageTitle|| "Charcoal"}
          width={150}
          height={100}
        />
      </div>
    </div>
  );
};

export default PlayerInfo;
