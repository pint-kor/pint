import { createSlice } from "@reduxjs/toolkit";

interface PostInterface {
    currentPost: {
        content: string;
        placeId: string;
    },
    isPostModalOpen: boolean;
}

const initialState: PostInterface = {
    currentPost: {
        content: "",
        placeId: "",
    },
    isPostModalOpen: false,
}

export const postSlice = createSlice({
    name: "post",
    initialState,
    reducers: {
        setCurrentPost: (state, action) => {
            state.currentPost = action.payload;
        },
        setIsPostModalOpen: (state, action) => {
            state.isPostModalOpen = action.payload;
        },
    }
});

export const { setCurrentPost, setIsPostModalOpen } = postSlice.actions;

export default postSlice.reducer;