import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { setPosts } from "./main";
import { RootState } from "../store";
import * as Crypto from 'expo-crypto'
import axios from "axios";

interface PostInterface {
    currentPost: {
        uploadState: "idle" | "loading" | "succeeded" | "failed";
        content: string;
        date: {
            year: number;
            month: number;
            day: number;
        }
        images: string[];
        place: {
            id: string;
            latitude: number;
            longitude: number;
        }
    },
    isPostModalOpen: boolean;
    isPostDeleteModalOpen: boolean;
    postDeleteState: "idle" | "loading" | "succeeded" | "failed";
}

let currentDate = new Date();

const initialState: PostInterface = {
    currentPost: {
        content: "",
        date: {
            year: currentDate.getFullYear(),
            month: currentDate.getMonth(),
            day: currentDate.getDate(),
        },
        images: [],
        place: {
            id: "",
            latitude: 0,
            longitude: 0,
        },
        uploadState: "idle"
    },
    isPostModalOpen: false,
    isPostDeleteModalOpen: false,
    postDeleteState: "idle"
}

const BACKEND_URL = process.env.EXPO_PUBLIC_PINT_BACKEND_URL;

export const uploadPost = createAsyncThunk(
    "post/uploadPost",
    async (_, { dispatch, getState, rejectWithValue }) => {
        const state: RootState = getState() as RootState;
        const currentPost = state.post.currentPost;
        const posts = state.main.posts;
        const userId = state.user.user?.userId;

        try {
            const response = await axios.post(
              BACKEND_URL + "/blog",
              {
                content: currentPost.content,
                visited_at: new Date(
                  currentPost.date.year,
                  currentPost.date.month,
                  currentPost.date.day
                ).toISOString(),
                placeId: currentPost.place.id,
                location: {
                  type: "Point",
                  coordinates: [
                    currentPost.place.longitude,
                    currentPost.place.latitude,
                  ],
                },
                isPrivate: false,
              },
              {
                headers: {
                  Authorization: `Bearer ${state.user.user?.access_token}`,
                },
              }
            );

            return response.data;
        } catch (e) {
            return rejectWithValue(e);
        }
    }
)

export const deletePost = createAsyncThunk(
    "post/deletePost",
    async (postId: string, { dispatch, getState, rejectWithValue }) => {
        const state: RootState = getState() as RootState;
        const access_token = state.user.user?.access_token;

        try {
            const response = await axios.delete(BACKEND_URL + `/blog/${postId}`, {
                headers: {
                    Authorization: `Bearer ${access_token}`
                }
            })

            return response.data;
        } catch (e) {
            return rejectWithValue(e);
        }
    }
)

export const updatePost = createAsyncThunk(
    "post/updatePost",
    async (postId: string, { dispatch, getState, rejectWithValue }) => {
        const state: RootState = getState() as RootState;
        const currentPost = state.post.currentPost;
        const userId = state.user.user?.userId;

        try {
            const response = await axios.patch(BACKEND_URL + `/posts/${postId}`, {
                content: currentPost.content,
                visited_at: new Date(currentPost.date.year, currentPost.date.month, currentPost.date.day),
                placeId: currentPost.place.id,
                location: {
                    type: "Point",
                    coordinates: [currentPost.place.longitude, currentPost.place.latitude]
                },
                isPrivate: false,
            }, {
                headers: {
                    Authorization: `Bearer ${state.user.user?.access_token}`
                }
            })

            return response.data;
        } catch (e) {
            return rejectWithValue(e);
        }
    }
)

export const postSlice = createSlice({
    name: "post",
    initialState,
    reducers: {
        initializeCurrentPost: (state) => {
            currentDate = new Date();
            state.currentPost = {
                content: "",
                date: {
                    year: currentDate.getFullYear(),
                    month: currentDate.getMonth(),
                    day: currentDate.getDate(),
                },
                images: [],
                place: {
                    id: "",
                    latitude: 0,
                    longitude: 0,
                },
                uploadState: "idle"
            }
        },
        setCurrentPost: (state, action) => {
            state.currentPost = action.payload;
        },
        setCurrentPostContent: (state, action: {
            payload: string;
        }) => {
            state.currentPost.content = action.payload;
        },
        setCurrentPostDate: (state, action: {
            payload: {
                year: number;
                month: number;
                day: number;
            },
        }) => {
            state.currentPost.date = {
                year: action.payload.year,
                month: action.payload.month,
                day: action.payload.day,
            }
        },
        setCurrentPostImages: (state, action: {
            payload: string[];
        }) => {
            state.currentPost.images = action.payload;
        },
        setRepresentativeImage: (state, action: {
            payload: number;
        }) => {
            // 
            const temp = state.currentPost.images[action.payload];
            state.currentPost.images[action.payload] = state.currentPost.images[0];
            state.currentPost.images[0] = temp;

        },
        setPostPlace: (state, action: {
            payload: {
                id: string;
                latitude: number;
                longitude: number;
            }
        }) => {
            state.currentPost.place = action.payload;
        },
        setIsPostModalOpen: (state, action) => {
            state.isPostModalOpen = action.payload;
        },
        setIsPostDeleteModalOpen: (state, action) => {
            state.isPostDeleteModalOpen = action.payload;
        },
        setPostDeleteState: (state, action) => {
            state.postDeleteState = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(uploadPost.pending, (state) => {
            state.currentPost.uploadState = "loading";
        });
        builder.addCase(uploadPost.fulfilled, (state) => {
            state.currentPost.uploadState = "succeeded";
        });
        builder.addCase(uploadPost.rejected, (state) => {
            state.currentPost.uploadState = "failed";
        });

        builder.addCase(deletePost.pending, (state) => {
            state.postDeleteState = "loading";
        });
        builder.addCase(deletePost.fulfilled, (state) => {
            state.postDeleteState = "succeeded";
        });
        builder.addCase(deletePost.rejected, (state) => {
            state.postDeleteState = "failed";
        });
    }
});

export const {
  initializeCurrentPost,
  setCurrentPost,
  setIsPostModalOpen,
  setIsPostDeleteModalOpen,
  setCurrentPostContent,
  setCurrentPostDate,
  setRepresentativeImage,
  setCurrentPostImages,
  setPostPlace,
  setPostDeleteState,
} = postSlice.actions;

export default postSlice.reducer;