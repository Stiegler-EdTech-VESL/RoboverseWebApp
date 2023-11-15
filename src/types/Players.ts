interface User {
    id: string;
    name: string;
    user_id: string;
    team_id: string;
    elo_contribute: number;
}

export interface UserDataID {
    id: string;
}

interface Team {
    id: string;
    name: string;
    totalEqMatches: number;
    totalEqMatchesWon: number;
    totalEqMatchesLost: number;
}

interface EquationEntry {
    id: string;
    name: string;
    user_id: string;
    team_id: string;
    elo_contribute: number;
}

export interface Player {
    Equation: EquationEntry[];
    Perms: null; 
    Team: Team;
    UserInEquationMatch: any[]; // Replace with the appropriate type if known
    current_eq_id: string | null;
    discord_id: string;
    email: string;
    emailVerified: null; 
    epic_id: string | null;
    global_mu: string;
    global_rank_title: string;
    global_ranking: string;
    global_sigma: string;
    id: string;
    image: string;
    name: string;
    perm_id: string | null;
    progression_lvl: number;
    team_id: string;
    totalEqMatches: number;
    totalEqMatchesLost: number;
    totalEqMatchesWon: number;
    total_tourn_lost: number;
    total_tourn_wins: number;
}

export interface PlayerData {
    name: string;
    rank: string;
    rankTitle: string;
    totalMatch: number;
    totalWins: number;
    totalLost: number;
    tournWins: number;
    tournLost: number;
    team: string;
    conference: string;
}

export interface PlayersApiResponse {
    players: PlayerData[];
}
  