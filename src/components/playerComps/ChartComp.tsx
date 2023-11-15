import PlayerGraph from "./PlayerGraph";
import { FC } from "react";
import { MatchData } from "~/pages/players/[player]";

interface Props {
  matches: MatchData[];
  currentRank: number;
}
const ChartComp: FC<Props> = ({ matches, currentRank }) => {
  const pastRank = matches[0]?.ranking;

  const isIncreased = currentRank > pastRank!;

  const isFiveMatches = matches.length == 5;

  return (
    <div className="flex flex-col items-center rounded-md bg-zinc-800 p-5">
      <div className="flex flex-row items-center gap-2">
        <svg
          className={` h-5 w-5${
            isIncreased ? " fill-green-500" : " fill-red-500"
          } `}
          data-name="Arrow"
          viewBox="0 0 32 32"
        >
          <path
            d="m26.71 10.29-10-10a1 1 0 0 0-1.41 0l-10 10 1.41 1.41L15 3.41V32h2V3.41l8.29 8.29z"
            transform={`
                  ${isIncreased ? "" : "scale (1, -1)"}
                  `}
            transform-origin="center"
          ></path>
        </svg>
        <p className="text-2xl text-white">
          {isFiveMatches ? (currentRank * 1000).toFixed(0) : 0}
        </p>
      </div>
      {isFiveMatches ? (
        <PlayerGraph matches={matches}></PlayerGraph>
      ) : (
        "Need 5 Ranked Matches"
      )}
    </div>
  );
};

export default ChartComp;
