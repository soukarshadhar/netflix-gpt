import { createSlice } from "@reduxjs/toolkit";

const trendingTvShowsSlice = createSlice({
  name: "trendingTvShows",
  initialState: null,
  reducers: {
    add: (state, action) => {
      return action.payload;
    },
    remove: (state) => {
      state.page = 1;
      state.list = [];
      state.totalPages = 0;
    },
  },
});

export const { add, remove } = trendingTvShowsSlice.actions;
export default trendingTvShowsSlice.reducer;
