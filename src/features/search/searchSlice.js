import { createSlice } from "@reduxjs/toolkit";

const searchSlice = createSlice({
  name: "search",
  initialState: { searchData: {} },
  reducers: {
    setResult: (state, action) => {
      const { searchData } = action.payload;
      return { ...state, searchData };
    },
    removeResult: (state, action) => {
      state.searchData = {};
    },
  },
});

export const { setResult, removeResult } = searchSlice.actions;

export default searchSlice.reducer;

export const selectSearchData = (state) => state.search.searchData;
