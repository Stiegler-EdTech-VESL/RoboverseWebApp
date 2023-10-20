import { api } from "~/utils/api";
import Image from "next/image";
import Link from "next/link";
import { Team } from "@prisma/client";
import { FC } from 'react';

import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
} from "@nextui-org/react";

interface TeamsListProps {
  distID: string,
}

const TeamsList: FC <TeamsListProps> = ({distID})  => {


  const teams = api.teams.getAllTeamsWithRank.useQuery({
    districtId: distID,
  });



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
      // <div className={`w-full `}>
        <Table className=" rounded-md">
          <TableHeader className="">
            <TableColumn className="bg-green-500 text-black rounded-tl-md">Rank</TableColumn>
            <TableColumn className="bg-green-500 text-black">Name</TableColumn>
            <TableColumn className="bg-green-500 text-black py-2" >
              Total Matches
            </TableColumn>
            <TableColumn className="bg-green-500 text-black">
              Total Wins
            </TableColumn>
            <TableColumn className="bg-green-500 text-black">
              Total Losses
            </TableColumn>
            <TableColumn className="bg-green-500 text-black rounded-tr-md">
              {distID == "Global" ? "Global" : "District"} Rating
            </TableColumn>
          </TableHeader>
          <TableBody
            className=" rounded-md bg-gray-900"
            emptyContent={"No rows to display."}
          >
            {teams.data.map((team: Team, i) => {
              const totalWins = team.totalEqMatchesWon;
              const totalLosses = team.totalEqMatchesLost;
              const totalMatches = team.totalEqMatches;

              if (
                distID !== "Global" &&
                team.districtId !== distID
              ) {
                return <> </>;
              }

              return (
                <TableRow
                key={i}
                className={
                    i % 2 == 0 ? "bg-zinc-800" : "bg-zinc-950"
                  }
                  
                >
                  <TableCell className="py-3">{i + 1}</TableCell>
                  <TableCell><Link href={`/teams/${team.name}`}>{team.name}</Link></TableCell>
                  <TableCell>{totalMatches}</TableCell>
                  <TableCell>{totalWins}</TableCell>
                  <TableCell>{totalLosses}</TableCell>
                  <TableCell>
                    {typeof parseFloat(
                      String(
                        distID == "Global"
                          ? team.global_ranking
                          : team.district_ranking
                      )
                    ) === "number"
                      ? (
                          parseFloat(
                            String(
                              distID == "Global"
                                ? team.global_ranking
                                : team.district_ranking
                            )
                          ) * 1000
                        ).toFixed(0)
                      : "Unranked"}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      // {/* </div> */}
    );
  }
}

export default TeamsList;