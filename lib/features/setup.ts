import i18n from "@/locales/i18n";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createSlice } from "@reduxjs/toolkit";
import { Appearance, Platform } from "react-native";

export type ThemeType = "light" | "dark" | "auto";
export type LanguageType = "en" | "ko" | "auto";

export interface SetupInterface {
    language: LanguageType;
    theme: ThemeType;
}

const initialState: SetupInterface = {
    language: "ko",
    theme: "auto"
};

// initialize 

export const setupSlice = createSlice({
    name: "setup",
    initialState,
    reducers: {
        setLanguage: (state, action) => {
            state.language = action.payload;
            AsyncStorage.setItem("language", action.payload);
            i18n.changeLanguage(action.payload)
        },
        setTheme: (state, action) => {
            const data = action.payload;
            state.theme = data;

            if (data === "auto") {
                AsyncStorage.removeItem("theme");
                if (Platform.OS !== "web") {
                    Appearance.setColorScheme(null)
                }
            }
            else {
                AsyncStorage.setItem("theme", action.payload);
                if (Platform.OS !== "web") {
                    Appearance.setColorScheme(data);
                }
            }

        },
    },

});

export const { setLanguage, setTheme } = setupSlice.actions;

export default setupSlice.reducer;