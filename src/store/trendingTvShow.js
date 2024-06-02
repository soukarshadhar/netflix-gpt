import { createSlice } from "@reduxjs/toolkit";

const trendingTvShowsSlice = createSlice({
  name: "trendingTvShow",
  initialState: null,
  reducers: {
    add: (state, action) => {
      return action.payload;
    },
    remove: () => {
      return null;
    },
  },
});

export const { add, remove } = trendingTvShowsSlice.actions;
export default trendingTvShowsSlice.reducer;
