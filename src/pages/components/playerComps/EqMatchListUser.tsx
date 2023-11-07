import { FC } from "react";
import Image from "next/image";
import { api } from "~/utils/api";
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
  ended?: Date;
  matchType?: string;
  score?: number;
  rankAfter?: string;
  winner?: string | null;
  key?: string;
}

const getNewObj = () => {
  return {
    ended: undefined,
    matchType: undefined,
    score: undefined,
    rankAfter: undefined,
    winner: undefined,
    key: undefined,
  };
};

const EqMatchListUser: FC<eqMatchListUserProps> = ({ userId }) => {
  const user = api.users.getUserById.useQuery(
    { id: userId },
    { enabled: !!userId }
  );

  const userEquationMatches = api.eqMatches.getUserEquationMatches.useQuery(
    { userId: userId },
    { enabled: !!user.data?.id }
  );

  let matches: matchData[] = [];

  userEquationMatches.data?.map((match) => {
    if (match.EquationMatch.ended && match.score) {
      let matchInfo: matchData = {
        ended: match.EquationMatch.ended,
        matchType: match.EquationMatch.type,
        score: match.score,
        rankAfter: (Number(match.user_global_ranking_after) * 1000).toFixed(0),
        winner: match.winner ? "Win" : "Loss",
        key: match.id,
      };
      matches.push(matchInfo);
      matchInfo = getNewObj();
    }
  });

  const sortedMatches = matches.sort((a, b) => {
    if (a.ended && b.ended) {
      // Both dates are defined, so compare them.
      return b.ended.getTime() - a.ended.getTime();
    } else if (a.ended) {
      // Only a.ended is defined, so a comes first.
      return -1;
    } else if (b.ended) {
      // Only b.ended is defined, so b comes first.
      return 1;
    } else {
      // Neither date is defined, so they're equal.
      return 0;
    }
  });
  
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
          <TableColumn className="rounded-tl-md bg-green-500 text-black">
            Date
          </TableColumn>
          <TableColumn className="bg-green-500 py-2 text-black">
            Match Type
          </TableColumn>
          <TableColumn className="bg-green-500 text-black">Score</TableColumn>
          <TableColumn className="bg-green-500 text-black">
            Rank After
          </TableColumn>
          <TableColumn className="rounded-tr-md bg-green-500 text-black">
            W/L
          </TableColumn>
        </TableHeader>
        <TableBody
          className=" rounded-md bg-gray-900"
          emptyContent={"No rows to display."}
        >
          {sortedMatches.map((match) => {
            let i = sortedMatches.indexOf(match);
            return (
              <TableRow
                key={match.key}
                className={i % 2 == 0 ? "bg-zinc-800" : "bg-zinc-950"}
              >
                <TableCell>{match.ended?.toDateString()}</TableCell>
                <TableCell>{match.matchType}</TableCell>
                <TableCell>{match.score}</TableCell>
                <TableCell>{match.rankAfter}</TableCell>
                <TableCell>{match.winner}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    );
  }
};

export default EqMatchListUser;
