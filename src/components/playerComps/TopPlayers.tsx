import { FC } from "react";
import { api } from "~/utils/api";
import Image from "next/image";
import Link from "next/link";

const TopPlayers: FC = () => {
  const players = api.users.getTopUsers.useQuery();
  return (
    <div className="flex place-content-evenly px-5 py-5 border-b-2 border-zinc-500/75">
      {players.data?.map((player, idx) => {
        if (!player) {
          return null;
        }
        let container = "";
        let placementColor = "";
        let placement = "";
        switch (idx) {
          case 0:
            container = "order-2 border-yellow-500 border-4 rounded-md mt-3";
            placementColor = "text-yellow-500";
            placement = "1st";
            break;
          case 1:
            placementColor = "text-zinc-400";
            container = "order-1 border-zinc-400 border-4 rounded-md mt-10";
            placement = "2nd";
            break;
          case 2:
            container = "order-3 border-yellow-900 border-4 rounded-md mt-10";
            placementColor = "text-yellow-900";
            placement = "3rd";
            break;
        }
        return (
          <div
            className={`mb-3  ${container} flex h-80 w-64 flex-col gap-2 items-center px-5`}
            key={player.id}
          >
            <div className="flex justify-center">
              <div
                className={` ${placementColor} top-0 -mt-4  bg-black  px-2 text-2xl `}
              >
                {placement}
              </div>
            </div>
            <div className="flex flex-col h-full justify-around">
            <div className="flex justify-center">
              <Image
                className="max-h-48 min-h-[192px] object-contain"
                alt={player.name + "'s Profile Picture"}
                src={player.image || "/spinner.svg"}
                objectFit="contain"
                // sizes={"max-height: 20px"}
                width={200}
                height={100}
                quality={100}
              ></Image>
            </div>
            <div className="flex w-full flex-col items-center justify-center">
              <div className="text-lg font-semibold hover:text-green-500 w-11/12 truncate">
                <Link href={`/players/${player.name}`}>{player.name}</Link>
              </div>

              <div className="text-md italic text-slate-400">
                Rating: {(Number(player.global_ranking) * 1000).toFixed(0)}
              </div>
            </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default TopPlayers;
