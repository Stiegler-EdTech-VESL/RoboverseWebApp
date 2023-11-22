import { useRouter } from "next/router";
import { api } from "~/utils/api";
import { useEffect, useState } from "react";
import RankImage from "../../components/RankImage";
import Image from "next/image";
import ChartComp from "~/components/playerComps/ChartComp";
import PlayerInfo from "../../components/playerComps/PlayerInfo";
import EqMatchListUser from "../../components/playerComps/EqMatchListUser";
import { images } from "../../scripts/rankings-image-variables";

export interface MatchData {
  id: string;
  ranking: number;
  date: Date | null;
}

interface PlayerData {
  id: string;
  name: string;
  rank: number;
  conference: string;
  rankImageTitle: string;
  rankTitle: string;
  totalWon: number;
  totalLost: number;
  totalTournW: number;
  totalTournL: number;
  image: string;
  matches: MatchData[];
}

const Player = () => {
  const router = useRouter();

  const [playerState, setPlayerState] = useState<PlayerData>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!router.isReady) return;
  }, [router.isReady]);

  const slug = router.query.player;

  let playerName = slug;

  if (!playerName || Array.isArray(playerName)) {
    playerName = "GhostPlayer";
  }

  const { data, status } = api.users.getUserByName.useQuery({
    name: playerName,
  });

  useEffect(() => {
    setIsLoading(true);
    if (status === "success" && data) {
      const title = images.titles[data.rankTitle as keyof typeof images.titles];

      const user = {
        ...data,
        rankTitle: title,
        rankImageTitle: data.rankTitle,
      };
      setPlayerState(user);
      setIsLoading(false);
    }
  }, [status]);

  if (isLoading || status === "loading") {
    return (
      <div className=" flex items-center justify-center text-5xl italic">
        <div className="fles flex-col items-center justify-center ">
          <Image
            className="mt-[50%]"
            width={200}
            height={200}
            alt={"Loading"}
            src={"/spinner.svg"}
          ></Image>
        </div>
      </div>
    );
  } else {
    return (
      <>
        <div className="flex flex-col flex-wrap items-center gap-4 py-10">
          <h1 className="text-5xl font-semibold text-white">
            {playerState?.name}
          </h1>
          <PlayerInfo player={playerState!}></PlayerInfo>

          <div className="flex flex-row items-center w-1/2 justify-between">
            <div className="flex flex-col items-center">
              <p className="font-md text-center italic">Total Matches: </p>
              <p className="text-center text-xl text-white">{playerState!.totalLost + playerState!.totalWon}</p>
            </div>
            <div className="flex flex-col items-center">
              <p className="font-md text-center italic">Total Wins/Losses: </p>
              <p className="text-center text-xl text-white">{playerState!.totalWon} / {playerState!.totalLost}</p>
            </div>
            <div className="flex flex-col items-center">
              <p className="font-md text-center italic">Comp Wins/Losses : </p>
              <p className="text-center text-xl text-white">{playerState!.totalTournW} / {playerState!.totalTournL}</p>
            </div>
            </div>
            <div className="mt-4 w-full px-20">
            <EqMatchListUser userId={playerState!.id}></EqMatchListUser>
          </div>
        </div>
      </>
    );
  }
};

export default Player;
