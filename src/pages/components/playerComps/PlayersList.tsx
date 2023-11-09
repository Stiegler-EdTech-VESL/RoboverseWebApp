import { api } from "~/utils/api";
import Image from "next/image";
import Link from "next/link";
import { User } from "@prisma/client";
import { FC, useState, useEffect } from "react";
import RankImage from "../RankImage";

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
  teamId: string | null;
  rankTitle: string;
}

interface teamData {
  id: string;
  name: string;
}
const PlayersList: FC = () => {
  const [playersState, setPlayersState] = useState<playerData[]>([]);
  const [teamsList, setTeamsList] = useState<teamData[]>([]);
  const [loading, setLoading] = useState(true);
  const allPlayersData = api.users.getAllUserInfo.useQuery().data; // assuming this is a custom hook for fetching data
  function isNotZero(player: playerData) {
    return Number(player.globalRank) !== 0;
  }

  function isZero(rank: playerData) {
    return Number(rank.globalRank) === 0 && Number(rank.totalMatches === 0);
  }

  //set the stae of playersState when allPlayersData is queried
  useEffect(() => {
    if (allPlayersData) {
      const players = allPlayersData.map((user: User) => {
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
          teamId: user.team_id,
          rankTitle: user.global_rank_title,
        };
      });

      let nonZeroList = players.filter(isNotZero);
      let zeroList = players.filter(isZero);

      let sortedPlayers = nonZeroList.concat(zeroList);
      setPlayersState(sortedPlayers);
    }
  }, [allPlayersData]);

  const playerTeams = playersState.map((player) => {
    return player.teamId!;
  });
  const teams = api.teams.getTeamsByIds.useQuery({ ids: playerTeams }).data;
  //set the state of TeamList whenever teams is queried
  useEffect(() => {
    const teamInfo: teamData[] = teams!?.map((team) => {
      return {
        id: team.id,
        name: team.name,
      };
    });
    if (teamInfo) {
      setTeamsList(teamInfo);
      setLoading(false);
    }
  }, [teams]);

  if (loading) {
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
            Standings
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
          {playersState.map((player) => {
            let i = playersState.indexOf(player);
            let team = teamsList.find((team) => team.id === player.teamId);
            return (
              <TableRow
                key={i}
                className={i % 2 == 0 ? "bg-zinc-800" : "bg-zinc-950"}
              >
                <TableCell className="py-3">{i + 1}</TableCell>
                <TableCell>
                  <div className="flex flex-col">
                    <Link href={`/players/${player.name}`}>{player.name}</Link>
                    <p className="text-sm">{team?.name}</p>
                  </div>
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
                <TableCell>
                  <div className="flex flex-row items-center justify-between gap-2">
                    <div className="flex flex-1 justify-center">
                      {player.globalRank}
                    </div>
                    <div className="flex flex-1 justify-center">
                      <RankImage
                        team_rank_title={player.rankTitle}
                        width={50}
                        height={50}
                      />
                    </div>
                  </div>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    );
  }
};

export default PlayersList;
