import { FC } from 'react';
import { api } from "~/utils/api";
import Image from 'next/image';
import Link from 'next/link';

const TopPlayers: FC = () => {
    const players = api.users.getTopUsers.useQuery();
    console.log(JSON.stringify(players.data));
    return (
        <div className="flex items-center  justify-center border-b-2">
        {players.data?.map((player, idx) => {
          if (!player) {
            return null;
          }
          let container = "";
          let placementColor = "";
          let placement = "";
          switch (idx) {
            case 0:
              container =
                "order-2 border-yellow-500 mx-28 border-4 rounded-md mt-3";
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
              className={`mb-3  ${container} flex h-80 w-64 flex-col`}
              key={player.id}
            >
              <div className="flex items-center justify-center">
                <div
                  className={` ${placementColor} top-0 -mt-4  bg-black  px-2 text-2xl `}
                >
                  {placement}
                </div>
              </div>
              <div className="flex items-center justify-center align-middle">
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
              <div className="flex items-center justify-center">
                <div className="flex flex-col font-poppins text-3xl text-slate-200">
                  <div className="break-before-auto hover:underline">
                    <Link href={`/players/${player.name}`}>{player.name}</Link>
                  </div>
                  <div className="text-lg italic text-slate-400">
                    Rating:{" "}
                    {(Number(player.global_ranking) * 1000).toFixed(0)}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    )
};

export default TopPlayers;