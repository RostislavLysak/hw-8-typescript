export interface IPlayers {
    name: string;
    image: null | string;
}

export interface IBattleStore {
    loading: boolean,
    winner: any,
    loser: any,
    error: null | string,
    players: IPlayers[]
}