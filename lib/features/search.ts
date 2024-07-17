import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../store";

export interface SearchInterface {
  isOpenSearchModal: boolean;
  isOpenFilterModal: boolean;
  status: "loading" | "succeeded" | "failed";
  searchResult: any[];
  searchKeyword: string;
  searchPage: number;
  searchType: "keyword" | "category",
  sort: "distance" | "accuracy",
  center: "my" | "map", // my: 현재 위치, map: 지도 중심
  focusId?: string;
}

const initialState: SearchInterface = {
  isOpenSearchModal: false,
  isOpenFilterModal: false,
  status: "succeeded",
  searchResult: [],
  searchKeyword: "",
  searchPage: 1,
  searchType: "keyword",
  sort: "distance",
  center: "map",
  focusId: undefined, // focus할 place의 id
};

const KEYWORD_SEARCH_URL = "https://dapi.kakao.com/v2/local/search/keyword.json";
const BACKEND_URL = "http://192.168.0.59:8000";
const CATEGORY_SEARCH_URL = "https://dapi.kakao.com/v2/local/search/category.json";

export const searchWithProperties = createAsyncThunk(
  "search/searchWithProperties",
  async (_, { rejectWithValue, getState, dispatch }) => {
    const { searchKeyword, searchType, sort, center, searchPage } = (getState() as RootState).search;
    const { mapLatitude, mapLongitude, myLatitude, myLongitude } = (getState() as RootState).map;

    if (searchKeyword === "") return rejectWithValue("검색어가 없습니다.");

    try {
      if (searchType === "category") {
        const response = await axios.get(
          BACKEND_URL + '/places',
          {
            params: {
              "query": searchKeyword,
              "latitude": center === "my" ? myLatitude : mapLatitude,
              "longitude": center === "my" ? myLongitude : mapLongitude,
            }
          }
        )
        return response.data.places
      } else {
        const response = await axios.get(
          BACKEND_URL + '/places',
          {
            params: {
              "query": searchKeyword,
              "latitude": center === "my" ? myLatitude : mapLatitude,
              "longitude": center === "my" ? myLongitude : mapLongitude,
            }
          }
        )
        return response.data.places
      }
    } catch (e) {
      return rejectWithValue(e);
    }

    // dispatch(setPage(1));

    // const properties = {
    //   sort: sort,
    //   x: center === "my" ? myLongitude : mapLongitude,
    //   y: center === "my" ? myLatitude : mapLatitude,
    //   page: searchPage,
    // }

    // try {
    //   if (searchType === "category") {
    //     const response = await axios.get(
    //       CATEGORY_SEARCH_URL,
    //       {
    //         headers,
    //         params: {
    //           category_group_code: searchKeyword,
    //           ...properties
    //         }
    //       }
    //     )
    //     return response.data.documents 
    //   } else {
    //     const response = await axios.get(
    //       KEYWORD_SEARCH_URL,
    //       {
    //         headers,
    //         params: {
    //           query: searchKeyword,
    //           ...properties
    //         }
    //       }
    //     )
    //     return response.data.documents 
    //   }
    // } catch (error) {
    //   return rejectWithValue(error);
    // }
  }
);

export const searchNextPage = createAsyncThunk(
  "search/searchNextPage",
  async (_, { getState, rejectWithValue, dispatch }) => {

    const { searchKeyword, searchPage } = (getState() as RootState).search;
    dispatch(setPage(searchPage + 1));

    try {
      await dispatch(searchWithProperties());
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setIsOpenSearchModal: (state, action) => {
        state.isOpenSearchModal = action.payload;
    },
    setIsOpenFilterModal: (state, action) => {
        state.isOpenFilterModal = action.payload;
    },
    setSearchResult: (state, action) => {
      state.searchResult = action.payload;
    },
    setPage: (state, action: {
      payload: number;
    }) => {
      state.searchPage = action.payload;
    },
    setSearchProperties: (state, action: {
      payload: {
        searchKeyword: string;
        searchType: "keyword" | "category";
      }
    }) => {
      state.searchKeyword = action.payload.searchKeyword;
      state.searchType = action.payload.searchType;
    },
    setFocusId: (state, action) => {
      state.focusId = action.payload;
    },
    toggleFocusId: (state, action) => {
      state.focusId = (state.focusId === action.payload ? undefined : action.payload);
    },
    setSort: (state, action: {
        payload: "distance" | "accuracy";
    }) => {
        state.sort = action.payload;
    },
    setCenter: (state, action: {
        payload: "my" | "map";
    }) => {
        state.center = action.payload;
    },
    initializeSearch: (state) => {
      state.searchResult = [];
      state.searchKeyword = "";
      state.focusId = undefined;
      state.searchPage = 1;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(searchWithProperties.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(searchWithProperties.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.searchResult = action.payload;
    });
    builder.addCase(searchWithProperties.rejected, (state) => {
      state.status = "failed";
    });

    builder.addCase(searchNextPage.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(searchNextPage.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.searchResult = state.searchResult.concat(action.payload);
    });
    builder.addCase(searchNextPage.rejected, (state) => {
      state.status = "failed";
    });
  },
});

export const {
  setIsOpenSearchModal,
  setIsOpenFilterModal,
  setSort,
  setCenter,
  setSearchResult,
  setSearchProperties,
  setPage,
  toggleFocusId,
  setFocusId,
  initializeSearch,
} = searchSlice.actions;

export default searchSlice.reducer;
