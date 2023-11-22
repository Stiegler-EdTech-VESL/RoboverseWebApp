import { api } from "~/utils/api";
import Image from "next/image";
import Link from "next/link";
import { FC, useState, useEffect } from "react";
import RankImage from "../RankImage";
import { QuestionMarkCircleIcon } from "@heroicons/react/24/solid";

import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
} from "@nextui-org/react";

export interface playerData {
  name: string;
  rank: string;
  rankTitle: string;
  totalMatch: number;
  totalWins: number;
  totalLost: number;
  tournWins: number;
  tournLost: number;
  team: string;
  conference: string;
}

type Props = {
  conference: string;
  onModalChange: (newType: boolean) => void;
};

const PlayersList: FC<Props> = ({ conference, onModalChange }) => {
  const handleModalChange = () => {
    onModalChange(true);
  };

  const [playersState, setPlayersState] = useState<playerData[]>([]);
  const [sortedPlayers, setsortedPlayers] = useState<playerData[]>([]);

  const [loading, setLoading] = useState(true);

  const { data, status } = api.users.getAllUserInfo.useQuery();

  useEffect(() => {
    setLoading(true);
    if (status === "success") {
      const users = data.map((i) => {
        return {
          name: i.name,
          rank: ((i.global_ranking as any) * 1000).toFixed(0),
          rankTitle: i.global_rank_title,
          totalMatch: i.totalEqMatches,
          totalWins: i.totalEqMatchesWon,
          totalLost: !i.totalEqMatchesLost ? 0 : i.totalEqMatchesLost,
          tournWins: i.total_tourn_wins,
          tournLost: i.total_tourn_lost,
          team: i.Team?.name ?? "Guests",
          conference: i.Team?.District?.name ?? "Independent",
        };
      });
      const nonZeroList = users.filter((player) => Number(player.rank) !== 0);
      const someZeroList = users.filter(
        (player) => Number(player.rank) === 0 && player.totalMatch > 0
      );
      const zeroList = users.filter(
        (player) => Number(player.rank) === 0 && player.totalMatch === 0
      );
      const updatedSortedPlayers = nonZeroList
        .concat(someZeroList)
        .concat(zeroList);
      setsortedPlayers(updatedSortedPlayers);
      setPlayersState(updatedSortedPlayers);
      setLoading(false);
    }
  }, [status]);

  useEffect(() => {
    setLoading(true);
    const playersToDisplay =
      conference === "All Conferences"
        ? [...sortedPlayers]
        : sortedPlayers.filter((player) => player.conference === conference);

    setPlayersState(playersToDisplay);
    setLoading(false);
  }, [conference, sortedPlayers]);

  if (loading || status === "loading") {
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
      <Table
        className=" rounded-md"
        aria-labelledby="contents"
        aria-label="table of players"
      >
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
            <div className="flex flex-row justify-center gap-2">
              Global Rating{" "}
              <QuestionMarkCircleIcon
                className="w-6 hover:cursor-pointer hover:border hover:border-transparent"
                onClick={handleModalChange}
              ></QuestionMarkCircleIcon>
            </div>
          </TableColumn>
        </TableHeader>
        <TableBody
          className=" rounded-md bg-gray-900"
          emptyContent={"No rows to display."}
        >
          {playersState.map((player) => {
            let i = playersState.indexOf(player);
            return (
              <TableRow
                key={i}
                className={
                  i % 2 == 0 ? "bg-zinc-800 text-2xl" : "bg-zinc-950 text-2xl"
                }
              >
                <TableCell className="py-3">{i + 1}</TableCell>
                <TableCell>
                  <div className="flex flex-col truncate">
                    <Link
                      className="hover:text-green-500"
                      href={`/players/${player.name}`}
                    >
                      {player.name}
                    </Link>
                    <p className="text-sm">{player.team}</p>
                  </div>
                </TableCell>
                <TableCell>
                  {player.totalLost +
                    player.totalWins +
                    player.tournLost +
                    player.tournWins}
                </TableCell>
                <TableCell>
                  {player.totalWins} / {player.totalLost}
                </TableCell>
                <TableCell>
                  {player.tournWins} / {player.tournLost}
                </TableCell>
                <TableCell>
                  <div className="flex flex-row items-center">
                    <div className="flex flex-1 justify-center">
                      {player.rank}
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
