import { useRouter } from "next/router";
import { api } from "~/utils/api";
import { useEffect } from "react";
import RankImage from "../../components/RankImage";
import Image from "next/image";
import PlayerHistory from "../../components/playerComps/PlayerHistory";
import EqMatchListUser from "../../components/playerComps/EqMatchListUser";

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

  return (
    <>
      <div className="flex flex-col  flex-wrap items-center justify-between py-10 lg:flex-row lg:place-content-evenly">
        <RankImage team_rank_title={player.data?.global_rank_title || "Charcoal"} width={100} height={100} />
        {/* team logo */}
        <div className="flex flex-row items-center rounded-md bg-white bg-opacity-20 p-5 ">
          <div className="shrink">
            <Image
              className="object-contain"
              alt={player.data?.name + "'s Profile Picture"}
              src={player.data?.image ?? "/spinner.svg"}
              width={200}
              height={200}
              quality={100}
            ></Image>
          </div>
          {/* team name and stuff */}
          <div className="ml-5">
            <h1 className="text-2xl font-semibold text-white">
              {player.data?.name}
            </h1>
            <div className="flex flex-row space-x-2">
              <h2 className="font-medium italic text-slate-500">
                Global Rating:
              </h2>
              <p className="slate-200">
                {parseFloat(String(player.data?.global_ranking as any)) *
                  (1000 as any).toFixed(0)}
              </p>
            </div>
            <div className="flex flex-row space-x-2">
              <h2 className="font-medium italic text-slate-500">W/L:</h2>
              <p>
                {player.data?.totalEqMatchesWon} / {player.data?.totalEqMatchesLost}
              </p>
            </div>
          </div>
        </div>

        <PlayerHistory id={player.data?.id!} />
        <EqMatchListUser userId={player.data?.id!}></EqMatchListUser>
      </div>

    </>
  );
};

export default Player;
