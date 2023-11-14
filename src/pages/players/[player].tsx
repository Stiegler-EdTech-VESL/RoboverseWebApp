import { useRouter } from "next/router";
import { api } from "~/utils/api";
import { useEffect } from "react";
import RankImage from "../../components/RankImage";
import Image from "next/image";
import PlayerHistory from "../../components/playerComps/PlayerHistory";
import EqMatchListUser from "../../components/playerComps/EqMatchListUser";
import { images } from "../../scripts/rankings-image-variables";

const Player = () => {
  const router = useRouter();

  useEffect(() => {
    if (!router.isReady) return;
  }, [router.isReady]);

  const slug = router.query.player;

  let playerName = slug;

  if (!playerName || Array.isArray(playerName)) {
    playerName = "GhostPlayer";
  }

  const player = api.users.getUserByName.useQuery({ name: playerName });
  const rankTitle = images.titles[player.data?.global_rank_title as keyof typeof images.titles];



  return (
    <>
      <div className="flex flex-col gap-2 flex-wrap items-center place-content-around py-10 mx-20">
        
      <h1 className="text-4xl font-semibold text-white">
              {player.data?.name}
            </h1>
        <div className="flex flex-row items-center place-content-around rounded-md bg-white bg-opacity-20 p-5 mb-10">
          <div className="shrink w-1/3">
            <Image
              className="object-contain mx-auto"
              alt={player.data?.name + "'s Profile Picture"}
              src={player.data?.image ?? "/spinner.svg"}
              width={200}
              height={200}
              quality={100}
            ></Image>
          </div>
          {/* team name and stuff */}
          <div className="w-1/3">
          <div className="flex flex-col gap-2">
            <div className="flex flex-row gap-2 text-lg w-fit">
              <h2 className="font-md italic text-slate-500">
                Ranking:
              </h2>
              <p className="slate-200">
                {(Number(player.data?.global_ranking)*1000).toFixed(0)}
              </p>
            </div>
            <div className="flex flex-row gap-2 text-lg w-fit">
              <h2 className="font-medium italic text-slate-500">W/L:</h2>
              <p>
                {player.data?.totalEqMatchesWon} / {player.data?.totalEqMatchesLost}
              </p>
            </div>
           <div className="w-1/3">
            <PlayerHistory id={player.data?.id!} />
            </div>
            </div>
          </div>
          <div className="w-1/3 flex flex-col gap-2 items-center text-xl">
            {rankTitle}
          <RankImage team_rank_title={player.data?.global_rank_title || "Charcoal"} width={100} height={100} />
          </div>
        </div>
        
        
        <EqMatchListUser userId={player.data?.id!}></EqMatchListUser>
      </div>

    </>
  );
};

export default Player;
