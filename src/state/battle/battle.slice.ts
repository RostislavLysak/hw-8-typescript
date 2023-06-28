import { AnyAction, Slice, createSlice, ActionReducerMapBuilder } from "@reduxjs/toolkit";
import { getUsers } from "./battle.request";
import { IBattleStore, IPlayers } from "../../types/battle.types";

const initialState: IBattleStore = {
    loading: true,
    winner: '',
    loser: '',
    error: null,
    players: [{ name: '', image: null }, { name: '', image: null }]
}

const battleSlice: Slice<IBattleStore> = createSlice({
    name: 'battle',
    initialState,
    reducers: {
        getPlayerAction: (state: IBattleStore, action: {
            payload: IPlayers & {
                index: number,
            }
        }) => {
            const { index, ...payload } = action.payload
            const player = state.players[index]

            if (!player) {
                state.players[index] = { name: '', image: null }
            }

            state.players[index] = { ...player, ...payload }
        }
    },
    extraReducers: (builder: ActionReducerMapBuilder<IBattleStore>) => {
        builder.addCase(getUsers.pending, (state: IBattleStore): void => {

        })
        builder.addCase(getUsers.fulfilled, (state: IBattleStore, { payload }: AnyAction): void => {
            const [winner, loser] = payload
            state.winner = winner
            state.loser = loser
            state.loading = false
        })
        builder.addCase(getUsers.rejected, (state: IBattleStore, { payload }: AnyAction): void => {
            state.error = payload
            state.loading = false
        })
    }

})


export const { getPlayerAction } = battleSlice.actions

export default battleSlice.reducer