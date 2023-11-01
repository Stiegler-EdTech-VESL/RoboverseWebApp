import PlayersList from "../components/PlayersList";
import { FC } from 'react';
import TopPlayers from "../components/TopPlayers";

const Players : FC = () => {
  return (
    <div className="flex items-center justify-center">
    <div className="mx-20 mt-4 flex-grow self-center pb-4 text-center  text-3xl text-slate-300">
      <TopPlayers />
      <PlayersList></PlayersList>
    </div>
  </div>
  )
}

export default Players;
