import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../store";

const BACKEND_URL = process.env.EXPO_PUBLIC_PINT_BACKEND_URL

export interface UserInterface {
    state: "idle" | "loading" | "succeeded" | "failed";
    user: {
        access_token: string;
        username: string;
    } | null;
    history: {
        recentSearch: string[];
    }
    myPosts: any[];
}

const initialState: UserInterface = {
    state: "idle",
    user: null,
    history: {
        recentSearch: [],
    },
    myPosts: [],
};

export const loginUser = createAsyncThunk(
    "user/login",
    async (data: {
        access_token: string;
    }, { getState, dispatch }) => {
        const state = getState() as RootState

        const response = await axios.get(BACKEND_URL + "/users/me", {
            headers: {
                Authorization: `Bearer ${data.access_token}`
            }
        })

        const { username, email } = response.data
        dispatch(setUser({
            access_token: data.access_token,
            username: username ?? email,
        }))
    }
);

export const fetchMyPosts = createAsyncThunk(
    "user/fetchMyPosts",
    async (_, { getState, dispatch }) => {
    }
)

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
        },
        __development_login: (state) => {
            state.user = {
                access_token: "dev_token",
                username: "dev_user",
            }
        },
        setUserState: (state, action: {
            payload: UserInterface["state"];
        }) => {
            state.state = action.payload;
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

export const { setUser, __development_login, __developement_logout, setUserState, clearRecentSearch, addRecentSearch, removeRecentSearch } = userSlice.actions;

export default userSlice.reducer;