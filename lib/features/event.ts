import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export interface EventProps {
    events: {
        "addr1": string,
        "addr2": string,
        "booktour": string,
        "cat1": string,
        "cat2": string,
        "cat3": string,
        "contentid": string,
        "contenttypeid": string,
        "createdtime": string,
        "eventstartdate": string,
        "eventenddate": string,
        "firstimage": string,
        "firstimage2": string,
        "cpyrhtDivCd": string,
        "mapx": string,
        "mapy": string,
        "mlevel": string,
        "modifiedtime": string,
        "areacode": string,
        "sigungucode": string,
        "tel": string,
        "title": string,
    }[],
    loading: boolean,
    fulfilled: boolean,
    rejected: boolean,
}

const initialState: EventProps = {
    events: [],
    loading: false,
    fulfilled: false,
    rejected: false,
}

const TOUR_API_URL = process.env.EXPO_PUBLIC_EVENT_TOUR_API_URL
const TOUR_API_KEY = process.env.EXPO_PUBLIC_EVENT_TOUR_API_KEY

export const searchFestival = createAsyncThunk(
    'event/queryEvent',
    async ({ startDate }: { startDate: string }, { rejectWithValue }) => {
        return;
        try {
            // const response = await axios.get(`apis.data.go.kr/B551011/KorService1/searchFestival1?serviceKey=${TOUR_API_KEY}&numOfRows=10&pageNo=1&MobileOS=ETC&MobileApp=AppTest&_type=json&listYN=Y&arrange=A&eventStartDate=${startDate}`)
            let response = await fetch(`https://apis.data.go.kr/B551011/KorService1/searchFestival1?serviceKey=${TOUR_API_KEY}&numOfRows=15&pageNo=1&MobileOS=ETC&MobileApp=AppTest&_type=json&listYN=Y&arrange=C&eventStartDate=${startDate}`)
            // let response = await fetch('https://api.sampleapis.com/coffee/hot')
            // let response = await fetch("http://127.0.0.1:3000/event")
            // const response = await axios.get(`https://apis.data.go.kr/B551011/KorService1/searchFestival1?serviceKey=EXFJkOU1ok42jwI0KHXTJuMY5wINJrYRnAp4Xp34che%2FY246CX%2FZMWHe15P3wSeyXKXT%2BHXfS%2FKZlQwIPDE5tg%3D%3D&numOfRows=10&pageNo=1&MobileOS=IOS&MobileApp=AppTest&_type=json&listYN=Y&arrange=A&eventStartDate=${startDate}`)
            let json = await response.json()
            console.log(json)
            return json
        } catch (e) {
            console.log(e)
            return rejectWithValue(e)
        }
    }
)

export const eventSlice = createSlice({
    name: 'event',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(searchFestival.pending, (state) => {
            state.loading = true
            state.rejected = false
            state.fulfilled = false
        })
        builder.addCase(searchFestival.rejected, (state, action) => {
            state.loading = false
            state.rejected = true
            state.fulfilled = false

        })
        builder.addCase(searchFestival.fulfilled, (state, action) => {
            state.loading = false
            state.rejected = false
            state.fulfilled = true
            state.events = action.payload.response.body.items.item 
        })
    }
})

export default eventSlice.reducer