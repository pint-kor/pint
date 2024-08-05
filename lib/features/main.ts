import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import axios from 'axios'

interface MainInterface {
    events: any[];
    posts: any[];
    hotplaces: any[],
}

const initialState: MainInterface = {
    events: [],
    posts: [],
    hotplaces: [],
}

const BACKEND_URL = process.env.EXPO_PUBLIC_PINT_BACKEND_URL;

export const getPostById = createAsyncThunk(
    "main/getPostById",
    async (postId: string, { getState }) => {
        const state = getState() as RootState;
        const response = await axios.get(BACKEND_URL + "/blog/" + postId)
        const post = response.data;
        return post;
    }
)

export const loadPosts = createAsyncThunk(
    "main/loadPosts",
    async (_, { getState }) => {
        const state = getState() as RootState;
        const response = await axios.get(BACKEND_URL + "/blog")
        const posts = response.data;
        return posts;
    }
)

export const mainSlice = createSlice({
    name: "main",
    initialState,
    reducers: {
        setEvents: (state, action) => {
            state.events = action.payload;
        },
        setPosts: (state, action) => {
            state.posts = action.payload;
        },
        setHotplaces: (state, action) => {
            state.hotplaces = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(loadPosts.fulfilled, (state, action) => {
            state.posts = action.payload;
        })
    }
})

export const { setEvents, setPosts, setHotplaces } = mainSlice.actions;

export default mainSlice.reducer;