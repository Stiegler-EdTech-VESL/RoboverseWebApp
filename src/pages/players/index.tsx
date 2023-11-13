import PlayersList from "../../components/playerComps/PlayersList";
import { FC, useState } from "react";
import TopPlayers from "../../components/playerComps/TopPlayers";
import ConferenceFilter from "../../components/playerComps/ConferenceFilter";

const Players: FC = () => {
  const [filterState, setFilterState] = useState("All Conferences");

  return (
    <div className="flex items-center justify-center">
      <div className="mx-20 mt-4 flex-grow self-center pb-4 text-center  text-3xl text-slate-300">

        <TopPlayers />
        <ConferenceFilter
          conference={filterState}
          onConferenceChange={setFilterState}
        />
        <PlayersList conference={filterState}></PlayersList>
      </div>
    </div>
  );
};

export default Players;
