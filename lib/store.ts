import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from '@/lib/features/user';
import authReducer from '@/lib/features/auth';
import setupReducer, { setLanguage, setTheme } from '@/lib/features/setup';
import searchReducer from '@/lib/features/search';
import eventReducer from '@/lib/features/event';
import mapReducer from '@/lib/features/map';
import postReducer from '@/lib/features/post';
import mainReducer from '@/lib/features/main';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getLocales } from "expo-localization";

const rootReducer = combineReducers({
    user: userReducer,
    auth: authReducer,
    setup: setupReducer,
    search: searchReducer,
    map: mapReducer,
    event: eventReducer,
    post: postReducer,
    main: mainReducer,
})

export const store = configureStore({
    reducer: rootReducer,
});

export const initializeStore = async () => {
    const data = await AsyncStorage.multiGet(["language", "theme"]);

    const language = data[0][1];
    const theme = data[1][1];

    store.dispatch(setLanguage(language ?? getLocales()[0]?.languageCode ?? "en"));
    store.dispatch(setTheme(theme ?? "light"));
}

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;
