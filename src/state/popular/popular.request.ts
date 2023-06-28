import { createAsyncThunk } from "@reduxjs/toolkit"
import { fetchPopularRepos } from "../../plugins/api"
import { cache } from "../../utils"
import { setSelectedLanguageAction } from "./popular.slice"

const fetchPopularReposMemoized = cache(fetchPopularRepos)


export const getRepos = createAsyncThunk(
    'popular/getRepos',
    async (selectedLanguage: string, { rejectWithValue, dispatch }) => {

        dispatch(setSelectedLanguageAction(selectedLanguage))

        try {
            return await fetchPopularReposMemoized(selectedLanguage)
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)