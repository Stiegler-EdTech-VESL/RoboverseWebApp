import { FC } from "react";
import Image from "next/image";
import RankImage from "../RankImage";
import ChartComp from "./ChartComp";
import { MatchData } from "~/pages/players/[player]";

interface PlayerInfoProps {
  player: {
    name: string;
    conference: string;
    rank: number;
    rankImageTitle: string;
    rankTitle: string;
    totalWon: number;
    totalLost: number;
    image: string;
    matches: MatchData[];
  };
}

const PlayerInfo: FC<PlayerInfoProps> = ({ player }) => {
  return (
    <div className="flex w-2/3 flex-col flex-wrap items-center justify-around rounded-md bg-white bg-opacity-20 py-5 lg:flex-row">
      <div className="flex flex-col items-center gap-2">
        <Image
          className="rounded-md"
          alt={player.name + "'s Profile Picture"}
          src={player.image ?? "/spinner.svg"}
          width={150}
          height={100}
          quality={100}
        ></Image>
        <div className="items center flex flex-col">
          <p className="font-md text-center italic">Conference</p>
          <p className="text-center text-center text-xl text-white">
            {player.conference}
          </p>
        </div>
      </div>
      <div className="order-last flex flex-col items-center gap-2 md:order-none lg:order-none">
        <h2 className="font-md italic">Rating (over 5 matches)</h2>
        <ChartComp
          matches={player.matches}
          currentRank={player.rank}
        ></ChartComp>
      </div>
      <div className="item-center flex flex-col gap-2">
        <div className="items center flex flex-col">
          <p className="font-md text-center italic">Rank Title</p>
          <p className="text-center text-xl text-white">{player.rankTitle}</p>
        </div>
        <RankImage
          team_rank_title={player.rankImageTitle || "Charcoal"}
          width={150}
          height={100}
        />
      </div>
    </div>
  );
};

export default PlayerInfo;
