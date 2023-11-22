import PlayersList from "../../components/playerComps/PlayersList";
import { FC, useState } from "react";
import TopPlayers from "../../components/playerComps/TopPlayers";
import ConferenceFilter from "../../components/playerComps/ConferenceFilter";
import RankGuide from "~/components/RankGuide";

const Players: FC = () => {
  const [filterState, setFilterState] = useState("All Conferences");
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <RankGuide
        isModalOpen={isModalOpen}
        onModalChange={setIsModalOpen}
      ></RankGuide>
      <div className="flex items-center justify-center">
        <div className="mx-20 mt-4 flex-grow self-center pb-4 text-center text-slate-300">
          <TopPlayers />
          <ConferenceFilter
            conference={filterState}
            onConferenceChange={setFilterState}
          />
          <PlayersList
            conference={filterState}
            onModalChange={setIsModalOpen}
          ></PlayersList>
        </div>
      </div>
    </>
  );
};

export default Players;
