import PlayersList from "../components/PlayersList";
import { FC } from 'react';

const Players : FC = () => {
  return (
    <div className="flex items-center justify-center">
    <div className="mx-20 mt-4 flex-grow self-center pb-4 text-center  text-3xl text-slate-300">
      {/* <TeamsList distID={selectedValue} /> */}
      <PlayersList></PlayersList>
    </div>
  </div>
  )
}

export default Players;
