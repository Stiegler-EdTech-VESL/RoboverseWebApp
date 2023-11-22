import { api } from "~/utils/api";
import Image from "next/image";
import Link from "next/link";
import { Team } from "@prisma/client";
import { FC } from "react";

import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
} from "@nextui-org/react";
import { Decimal } from "@prisma/client/runtime/library";

interface TeamsListProps {
  distID: string;
}

interface teamData {
  name: string;
  globalRank: string | null;
  districtRank: string| null;
  totalWins: number;
  totalLost: number;
  totalMatches: number;
}

const TeamsList: FC<TeamsListProps> = ({ distID }) => {
  const teams = api.teams.getAllTeamsWithRank.useQuery({
    districtId: distID,
  });

  const isFilterGlobal: boolean = distID === "Global";

  let teamsList: teamData[] = [];


  if (teams.data) {
    teamsList = teams.data.map((team: Team) => {
      return {
        name: team.name,
        globalRank: (team.global_ranking === null ? '0' : (team.global_ranking as any * 1000).toFixed(0)),
        districtRank: (team.global_ranking === null ? '0' : (team.district_ranking as any * 1000).toFixed(0)), //just change it to a string here
        totalWins: team.totalEqMatchesWon,
        totalLost: team.totalEqMatchesLost,
        totalMatches: team.totalEqMatches,
      };
    });

    isFilterGlobal
      ? teamsList.sort((a, b) => (b.globalRank as any) - (a.globalRank as any))
      : teamsList.sort(
          (a, b) => (b.districtRank as any) - (a.districtRank as any)
        );
  }



  if (!teams.data) {
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
            Total Wins
          </TableColumn>
          <TableColumn className="bg-green-500 text-black">
            Total Losses
          </TableColumn>
          <TableColumn className="rounded-tr-md bg-green-500 text-black">
            {isFilterGlobal ? "Global Rating" : "District Ranking"}
          </TableColumn>
        </TableHeader>
        <TableBody
          className=" rounded-md bg-gray-900"
          emptyContent={"No rows to display."}
        >
          {teamsList.map((team) => {
            let i = teamsList.indexOf(team);

            return (
              <TableRow className={i % 2 == 0 ? "bg-zinc-800" : "bg-zinc-950"}>
                <TableCell className="py-3">{i + 1}</TableCell>
                <TableCell>
                  <Link href={`/teams/${team.name}`}>{team.name}</Link>
                </TableCell>
                <TableCell>{team.totalMatches}</TableCell>
                <TableCell>{team.totalWins}</TableCell>
                <TableCell>{team.totalLost}</TableCell>
                <TableCell>
                  {isFilterGlobal ? team.globalRank : team.districtRank}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    );
  }
};

export default TeamsList;
