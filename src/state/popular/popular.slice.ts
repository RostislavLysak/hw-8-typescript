import { ActionReducerMapBuilder, AnyAction, createSlice, Slice } from "@reduxjs/toolkit";
import { IPopularStore } from "../../types/popular.types";
import { getRepos } from "./popular.request";

const initialState: IPopularStore = {
    selectedLanguage: 'All',
    loading: false,
    repos: [],
    error: null
}

const popularSlice: Slice<IPopularStore> = createSlice({
    name: 'popular',
    initialState,
    reducers: {
        setSelectedLanguageAction: (state: IPopularStore, action: { payload: string }): void => {
            state.selectedLanguage = action.payload
        }
    },
    extraReducers: (builder: ActionReducerMapBuilder<IPopularStore>): void => {
        builder.addCase(getRepos.pending, (state: IPopularStore): void => {
            state.error = null
            state.loading = true
        })
        builder.addCase(getRepos.fulfilled, (state: IPopularStore, { payload }: AnyAction): void => {
            state.loading = false
            state.repos = payload
        })
        builder.addCase(getRepos.rejected, (state: IPopularStore, { payload }: AnyAction): void => {
            state.loading = false
            state.error = payload
        })
    }
})

export const {
    setSelectedLanguageAction
} = popularSlice.actions

export default popularSlice.reducer