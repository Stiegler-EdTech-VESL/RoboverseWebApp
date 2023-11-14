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
  const rankTitle =
    images.titles[player.data?.global_rank_title as keyof typeof images.titles];

  return (
    <>
      <div className="mx-20 flex flex-col flex-wrap place-content-around items-center gap-2 py-10">
        <h1 className="text-4xl font-semibold text-white">
          {player.data?.name}
        </h1>
        <div className="mb-10 flex flex-row place-content-around items-center rounded-md bg-white bg-opacity-20 p-5">
          <div className="w-1/3 shrink">
            <Image
              className="mx-auto object-contain"
              alt={player.data?.name + "'s Profile Picture"}
              src={player.data?.image ?? "/spinner.svg"}
              width={200}
              height={200}
              quality={100}
            ></Image>
          </div>
          {/* team name and stuff */}
          <div className="w-1/3">
            <div className="flex flex-col gap-3">

              <div className="flex w-fit flex-row gap-2 text-lg">
                <h2 className="font-md italic text-slate-500">W/L:</h2>
                <p className="font-semibold text-white">
                  {player.data?.totalEqMatchesWon} /{" "}
                  {player.data?.totalEqMatchesLost}
                </p>
              </div>
          
                <h2 className="font-md italic text-slate-500 text-lg">Rating:</h2>
              
              <PlayerHistory id={player.data?.id!} />
            </div>
          </div>
          <div className="flex w-1/3 flex-col items-center text-xl">
            <div className="flex h-[200px] w-[200px] flex-col items-center justify-center gap-2 rounded-md bg-zinc-800">
              {rankTitle}
              <RankImage
                team_rank_title={player.data?.global_rank_title || "Charcoal"}
                width={100}
                height={100}
              />
            </div>
          </div>
        </div>

        <EqMatchListUser userId={player.data?.id!}></EqMatchListUser>
      </div>
    </>
  );
};

export default Player;
