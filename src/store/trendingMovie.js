import { createSlice } from "@reduxjs/toolkit";

const trendingMovieSlice = createSlice({
  name: "trendingMovie",
  initialState: null,
  reducers: {
    addMovie: (state, action) => {
      return action.payload;
    },
  },
});

export const { addMovie } = trendingMovieSlice.actions;
export default trendingMovieSlice.reducer;
