import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../store";

const BACKEND_URL = process.env.EXPO_PUBLIC_PINT_BACKEND_URL

export interface UserInterface {
    state: "idle" | "loading" | "succeeded" | "failed";
    user: {
        access_token: string;
        username: string;
        userId: string;
        email: string;
        myPosts: string[];
        heartedPosts: string[]
        bookmarkedPosts: string[];
    };
    history: {
        recentSearch: string[];
    }
}

const initialState: UserInterface = {
    state: "idle",
    user: {
        access_token: "",
        username: "",
        userId: "",
        email: "",
        myPosts: [],
        heartedPosts: [],
        bookmarkedPosts: []
    },
    history: {
        recentSearch: [],
    },
};

export const loginUser = createAsyncThunk(
    "user/login",
    async (data: {
        username: string;
        password: string;
    }, { getState, dispatch }) => {
        const state = getState() as RootState

        const res = await axios.post(BACKEND_URL + "/auth/jwt/login", {
            username: data.username,
            password: data.password
        }, {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        })

        const { access_token } = res.data

        const response = await axios.get(BACKEND_URL + "/users/me", {
            headers: {
                Authorization: `Bearer ${access_token}`
            }
        })

        dispatch(setUser({
            access_token,
            username: response.data.username,
            userId: response.data._id,
            email: response.data.email,
            bookmarkedPosts: response.data.bookMarkPosts,
            heartedPosts: response.data.heartPosts,
            myPosts: response.data.myPosts
        }))
    }
);

export const fetchUserInfo = createAsyncThunk(
    "user/fetchUser",
    async (_, { getState, dispatch, fulfillWithValue }) => {
        const state = getState() as RootState

        const response = await axios.get(BACKEND_URL + "/users/me", {
            headers: {
                Authorization: `Bearer ${state.user.user?.access_token}`
            }
        })

        dispatch(setUser({
            access_token: state.user.user?.access_token!,
            username: response.data.username,
            userId: response.data._id,
            email: response.data.email,
            bookmarkedPosts: response.data.bookMarkPosts,
            heartedPosts: response.data.heartPosts,
            myPosts: response.data.myPosts
        }))

        return fulfillWithValue(response.data)
    }
)

export const fetchMyPosts = createAsyncThunk(
    "user/fetchMyPosts",
    async (_, { getState, dispatch }) => {
    }
)

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, action: {
            payload: UserInterface["user"];
        }) => {
            state.user = action.payload;
        },
        __development_login: (state) => {
            state.user = {
                access_token: "dev_token",
                username: "dev_user",
                userId: "dev_userId",
                email: "dev_email",
                myPosts: [],
                heartedPosts: [],
                bookmarkedPosts: []
            }
        },
        setUserState: (state, action: {
            payload: UserInterface["state"];
        }) => {
            state.state = action.payload;
        },
        __developement_logout: (state) => {
            state.user = {
                access_token: "",
                username: "",
                userId: "",
                email: "",
                myPosts: [],
                heartedPosts: [],
                bookmarkedPosts: []
            };
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
    extraReducers: (builder) => {
        builder.addCase(loginUser.pending, (state) => {
            state.state = "loading";
        })
        builder.addCase(loginUser.fulfilled, (state) => {
            state.state = "succeeded";
        })
        builder.addCase(loginUser.rejected, (state) => {
            state.state = "failed";
        })
    }
});

export const { setUser, __development_login, __developement_logout, setUserState, clearRecentSearch, addRecentSearch, removeRecentSearch } = userSlice.actions;

export default userSlice.reducer;