import { FC, useEffect } from "react";
import Image from "next/image";
import { api } from "~/utils/api";
import Link from "next/link";
import ProfileNamePic from "./ProfileNamePic";
import { useRouter } from "next/router";
import { match } from "assert";
import { EquationMatch } from "@prisma/client";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/react";

interface eqMatchListUserProps {
  userId: string;
}

interface matchData {
  ended: Date;
  matchType: string;
  score: number;
  rankAfter: string;
  winner: boolean;
  key: string;
}

const EqMatchListUser: FC<eqMatchListUserProps> = ({ userId }) => {
  const user = api.users.getUserById.useQuery(
    { id: userId },
    { enabled: !!userId }
  );
  // const userEqMatches = user.data?.UserInEquationMatch;

  const userEquationMatches = api.eqMatches.getUserEquationMatches.useQuery(
    { userId: userId },
    { enabled: !!user.data?.id }
  );

  let matches: matchData[] = [];

  userEquationMatches.data?.map((match) => {
    if (match.EquationMatch.ended && match.score && match.winner) {
      let matchInfo: matchData = {
        ended: match.EquationMatch.ended,
        matchType: match.EquationMatch.type,
        score: match.score,
        rankAfter: (Number(match.user_global_ranking_after)*1000).toFixed(0),
        winner: match.winner,
        key: match.id,
      };
      matches.push(matchInfo);
    }
  });

  console.log(JSON.stringify(matches));

  // userEqMatches?.map((match) => {
  //     matchIdList.push(match.equationMatchId)
  // });

  // const matchObjList = api.eqMatches.getEqMatches.useQuery({ids: matchIdList});

  if (!userEquationMatches.data) {
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
        <TableColumn className="bg-green-500 text-black">Date</TableColumn>
        <TableColumn className="bg-green-500 py-2 text-black">
          Match Type
        </TableColumn>
        <TableColumn className="bg-green-500 text-black">
          Score
        </TableColumn>
        <TableColumn className="bg-green-500 text-black">
          Rank After
        </TableColumn>
        <TableColumn className="bg-green-500 text-black">
          W/L
        </TableColumn>
      </TableHeader>
      <TableBody
        className=" rounded-md bg-gray-900"
        emptyContent={"No rows to display."}
      >
    {
        matches.map((match)=>{
            let i = matches.indexOf(match);
            return <TableRow key={match.key}>
                <TableCell>
                    {String(match.ended)}
                </TableCell>
                <TableCell>
                    {match.matchType}
                </TableCell>
                <TableCell>
                    {match.score}
                </TableCell>
                <TableCell>
                    {match.rankAfter}
                </TableCell>
                <TableCell>
                    {match.winner ? "winner" : "loser"}
                </TableCell>
            </TableRow>
        })
    }
      </TableBody>
    </Table>
  );}
};

export default EqMatchListUser;
