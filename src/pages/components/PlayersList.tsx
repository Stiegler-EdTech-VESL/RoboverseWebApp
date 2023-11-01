import { api } from "~/utils/api";
import Image from "next/image";
import Link from "next/link";
import { User } from "@prisma/client";
import { FC } from "react";

import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
} from "@nextui-org/react";

interface playerData {
  name: string;
  globalRank: string | null;
  totalWins: number;
  totalLost: number | null;
  totalMatches: number;
  tournWins: number;
  tournLost: number;
}

const PlayersList: FC = () => {
  const players = api.users.getAllUserInfo.useQuery();
  let playersList: playerData[] = [];
  if (players.data) {
    playersList = players.data.map((user: User) => {
      return {
        name: user.name,
        globalRank:
          user.global_ranking === null
            ? "0"
            : ((user.global_ranking as any) * 1000).toFixed(0),
        totalWins: user.totalEqMatchesWon,
        totalLost: user.totalEqMatchesLost,
        totalMatches: user.totalEqMatches,
        tournWins: user.total_tourn_wins,
        tournLost: user.total_tourn_lost,
      };
    });

    function isNotZero(player: playerData) {
      return Number(player.globalRank) !== 0
    };

    function isZero(rank: playerData) {
      return Number(rank.globalRank) === 0 && Number(rank.totalMatches === 0)
    };

    let nonZeroList = playersList.filter(isNotZero);
    let zeroList = playersList.filter(isZero);

    let sortedPlayers = nonZeroList.concat(zeroList);

    if (!players.data) {
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
        <Table className=" rounded-md">
          <TableHeader className="">
            <TableColumn className="rounded-tl-md bg-green-500 text-black">
              Rank
            </TableColumn>
            <TableColumn className="bg-green-500 text-black">Name</TableColumn>
            <TableColumn className="bg-green-500 py-2 text-black">
              Total Matches
            </TableColumn>
            <TableColumn className="bg-green-500 text-black">
              Total W/L
            </TableColumn>
            <TableColumn className="bg-green-500 text-black">
              VESL W/L
            </TableColumn>
            <TableColumn className="rounded-tr-md bg-green-500 text-black">
              Global Rating
            </TableColumn>
          </TableHeader>
          <TableBody
            className=" rounded-md bg-gray-900"
            emptyContent={"No rows to display."}
          >
            {sortedPlayers.map((player) => {
              let i = sortedPlayers.indexOf(player);

              return (
                <TableRow
                  className={i % 2 == 0 ? "bg-zinc-800" : "bg-zinc-950"}
                >
                  <TableCell className="py-3">{i + 1}</TableCell>
                  <TableCell>
                    <Link href={`/teams/${player.name}`}>{player.name}</Link>
                  </TableCell>
                  <TableCell>
                    {player.totalMatches + player.tournLost + player.tournWins}
                  </TableCell>
                  <TableCell>
                    {player.totalWins} / {player.totalLost}
                  </TableCell>
                  <TableCell>
                    {player.tournWins} / {player.tournLost}
                  </TableCell>
                  <TableCell>{player.globalRank}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      );
    }
  }
};

export default PlayersList;
