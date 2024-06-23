import { createSlice } from "@reduxjs/toolkit";

export interface UserInterface {
    user: {
        username: string;
    } | null;
    history: {
        recentSearch: string[];
    }
}

const initialState: UserInterface = {
    user: null,
    history: {
        recentSearch: [],
    }
};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
        },
        __development_login: (state) => {
            state.user = {
                username: "dev_user",
            }
        },
        __developement_logout: (state) => {
            state.user = null;
        },
        clearRecentSearch: (state) => {
            state.history.recentSearch = [];
        },
        addRecentSearch: (state, action) => {
            // check if the search already exists
            if (state.history.recentSearch.includes(action.payload)) {
                // remove the search from the list
                state.history.recentSearch = state.history.recentSearch.filter(search => search !== action.payload);
            }
            state.history.recentSearch.push(action.payload);
        },
        removeRecentSearch: (state, action: {
            type: string;
            payload: number;
        }) => {
            state.history.recentSearch = state.history.recentSearch.filter((_, index) => index !== action.payload);
        }
    },
});

export const { setUser, __development_login, __developement_logout, clearRecentSearch, addRecentSearch, removeRecentSearch } = userSlice.actions;

export default userSlice.reducer;