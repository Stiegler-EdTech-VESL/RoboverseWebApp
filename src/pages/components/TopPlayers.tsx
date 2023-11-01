import { FC } from 'react';
import { api } from "~/utils/api";

const TopPlayers: FC = () => {
    const players = api.users.getTopUsers.useQuery();
    console.log(JSON.stringify(players.data));
    return (
        <></>
    )
};

export default TopPlayers;