import { setStorageItemAsync } from "@/hooks/useStorageState";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export interface AuthInterface {
    auth_type: null | "kakao" | "google"
    access_token: string | null;
}

const initialState: AuthInterface = {
    auth_type: null,
    access_token: null,
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        kakaoSignIn: (state, action: {
            payload: {
                access_token: string;
            }
        }) => {
            const data = action.payload;
            state.auth_type = "kakao";
            state.access_token = data.access_token;

            AsyncStorage.multiSet([
              ["access_token", data.access_token],
              ["auth_type", "kakao"],
            ]);
        },
        signOut: (state) => {
            console.log(state.access_token)

            if (state.auth_type === "kakao") {
                axios.post("https://kapi.kakao.com/v1/user/logout", {
                    headers: {
                        Authorization: `Bearer ${state.access_token}`,
                    },
                }).then((response) => {
                    console.log(response);
                }).catch((error) => {
                    console.log(error);
                });
            }

            state.access_token = null;
            state.auth_type = null;

            AsyncStorage.multiRemove(["access_token", "auth_type"]);
        },
    },
});

export const { kakaoSignIn, signOut } = authSlice.actions;

export default authSlice.reducer;