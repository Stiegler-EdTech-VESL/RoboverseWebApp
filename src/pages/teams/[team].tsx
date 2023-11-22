import { useRouter } from "next/router";

import { api } from "~/utils/api";

import Image from "next/image";

import UserListTeam from "../../components/teamComps/UserListTeam";
import EqMatchListTeam from "../../components/teamComps/EqMatchListTeam";
import TeamHistory from "../../components/teamComps/TeamHistory";
import RankImage from "../../components/RankImage";

export default function TeamPage() {
  const router = useRouter();
  const slug = router.query.team;
  let teamName = slug;

  if (!teamName || Array.isArray(teamName)) {
    teamName = "GhostTeam";
  }

  const team = api.teams.getTeamByName.useQuery({ name: teamName });

  if (team.data == null) {
    return (
      <div className=" flex items-center justify-center text-5xl italic">
        <div className="fles flex-col items-center justify-center ">
          <div className="mt-[50%] font-poppins text-slate-400">
            Team, {slug}, not found
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <>
        <div className="flex flex-col  flex-wrap items-center justify-between py-10 lg:flex-row lg:place-content-evenly">
          <RankImage
            team_rank_title={team.data!.global_rank_title || "Charcoal"}
            width={100} height={100}
          />
          {/* team logo */}
          <div className="flex flex-row items-center rounded-md bg-white bg-opacity-20 p-5 ">
            <div className="shrink">
              <Image
                className="object-contain"
                alt={team.data?.name + "'s Profile Picture"}
                src={team.data?.logo ?? "/spinner.svg"}
                width={200}
                height={200}
                quality={100}
              ></Image>
            </div>
            {/* team name and stuff */}
            <div className="ml-5">
              <h1 className="text-2xl font-semibold text-white">
                {team.data?.name}
              </h1>
              <div className="flex flex-row space-x-2">
                <h2 className="font-medium italic text-slate-500">
                  Global Rating:
                </h2>
                <p className="slate-200">
                  {(
                    parseFloat(String(team.data?.global_ranking)) * 1000
                  ).toFixed(0)}
                </p>
              </div>
              <div className="flex flex-row space-x-2">
                <h2 className="font-medium italic text-slate-500">
                  District Rating:
                </h2>
                <p>
                  {(
                    parseFloat(String(team.data?.district_ranking)) * 1000
                  ).toFixed(0)}
                </p>
              </div>
              <div className="flex flex-row space-x-2">
                <h2 className="font-medium italic text-slate-500">W/L:</h2>
                <p>
                  {team.data?.totalEqMatchesWon} /{" "}
                  {team.data?.totalEqMatchesLost}
                </p>
              </div>
            </div>
          </div>

          <TeamHistory id={team.data?.id!} />

          {/* the thing next to the graph with players */}
          <div className="">
            <UserListTeam teamID={team.data?.id!} />
          </div>
        </div>

        {/* second half of the page */}
        <div className="">
          <div className="">
            <EqMatchListTeam teamId={team.data?.id!} />
          </div>
        </div>
      </>
    );
  }
}
