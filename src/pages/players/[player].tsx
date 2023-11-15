import { useRouter } from "next/router";
import { api } from "~/utils/api";
import { useEffect, useState } from "react";
import RankImage from "../../components/RankImage";
import Image from "next/image";
import ChartComp from "~/components/playerComps/ChartComp";
import PlayerInfo from '../../components/playerComps/PlayerInfo';
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
  rankImageTitle: string;
  rankTitle: string;
  totalWon: number;
  totalLost: number;
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
          {/* <div className="flex flex-row items-center justify-between w-1/2 rounded-md bg-white bg-opacity-20">
            <div className="w-1/3 shrink">
              <Image
                className="mx-auto object-contain"
                alt={playerState?.name + "'s Profile Picture"}
                src={playerState?.image ?? "/spinner.svg"}
                width={200}
                height={200}
                quality={100}
              ></Image>
            </div>

            <div className="w-1/3">
              <div className="flex flex-col gap-3">
                <div className="flex w-fit flex-row gap-2 text-lg">
                  <h2 className="font-md italic text-slate-500">W/L:</h2>
                  <p className="font-semibold text-white">
                    {playerState?.totalWon} / {playerState?.totalLost}
                  </p>
                </div>
                <ChartComp matches={playerState!.matches} currentRank={playerState!.rank}/>
              </div>
            </div>
            <div className="flex w-1/3 flex-col items-center text-xl">
              <div className="flex h-[200px] w-[200px] flex-col items-center justify-center gap-2 rounded-md bg-zinc-800">
                {playerState?.rankTitle}
                <RankImage
                  team_rank_title={data?.rankTitle || "Charcoal"}
                  width={100}
                  height={100}
                />
              </div>
            </div>
          </div> */}
          <div className="w-full px-20 mt-4">
          <EqMatchListUser userId={playerState!.id}></EqMatchListUser>
          </div>
        </div>
      </>
    );
  }
};

export default Player;
