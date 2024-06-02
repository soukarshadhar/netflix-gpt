import { createSlice } from "@reduxjs/toolkit";

const trendingMovieSlice = createSlice({
  name: "trendingMovie",
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

export const { add, remove } = trendingMovieSlice.actions;
export default trendingMovieSlice.reducer;
