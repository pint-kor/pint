import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as Location from "expo-location"

export interface MapInterface {
    mapLatitude: number;
    mapLatitudeDelta: number;
    mapLongitude: number;
    mapLongitudeDelta: number;
    myLatitude: number;
    myLongitude: number;
    myLocationStatus: "loading" | "succeeded" | "failed";
    mapCenterType: "myLocation" | "mapLocation";
}

const initialState: MapInterface = {
    mapLatitude: 37.5665,
    mapLatitudeDelta: 0.0922,
    mapLongitude: 126.9780,
    mapLongitudeDelta: 0.0421,
    myLatitude: 0,
    myLongitude: 0,
    myLocationStatus: "loading",
    mapCenterType: "mapLocation",
};

export const fetchMyLocation = createAsyncThunk(
    "map/fetchMyLocation",
    async (_, { rejectWithValue }) => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            return rejectWithValue("Permission to access location was denied")
        }

        let location = await Location.getLastKnownPositionAsync();

        if (!location) {
            location = await Location.getCurrentPositionAsync({});
        }

        return {
            myLatitude: location.coords.latitude,
            myLongitude: location.coords.longitude,
        };
    }
);

export const mapSlice = createSlice({
    name: "map",
    initialState,
    reducers: {
        setMapLocation: (state, action: {
            payload: {
                mapLatitude: number;
                mapLongitude: number;
                mapLatitudeDelta: number;
                mapLongitudeDelta: number;
            }
        }) => {
            const data = action.payload;
            state.mapLatitude = data.mapLatitude;
            state.mapLongitude = data.mapLongitude;
            state.mapLatitudeDelta = data.mapLatitudeDelta;
            state.mapLongitudeDelta = data.mapLongitudeDelta;
        },
        setMyLocation: (state, action: {
            payload: {
                myLatitude: number;
                myLongitude: number;
            }
        }) => {
            const data = action.payload;
            state.myLatitude = data.myLatitude;
            state.myLongitude = data.myLongitude;
        },
        setMapCenterType: (state, action: {
            payload: {
                mapCenterType: "myLocation" | "mapLocation";
            }
        }) => {
            const data = action.payload;
            state.mapCenterType = data.mapCenterType;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchMyLocation.pending, (state) => {
            state.myLocationStatus = "loading";
        });
        builder.addCase(fetchMyLocation.fulfilled, (state, action) => {
            state.myLocationStatus = "succeeded";
            state.myLatitude = action.payload.myLatitude;
            state.myLongitude = action.payload.myLongitude;
        });
        builder.addCase(fetchMyLocation.rejected, (state) => {
            state.myLocationStatus = "failed";
        });
    },
});

export const { setMapLocation, setMyLocation, setMapCenterType } = mapSlice.actions;

export default mapSlice.reducer;