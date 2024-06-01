import { createSlice } from "@reduxjs/toolkit";

const trendingMovieSlice = createSlice({
  name: "trendingMovie",
  initialState: null,
  reducers: {
    addMovie: (state, action) => {
      return action.payload;
    },
    removeMovie: (state) => {
      state.page = 1;
      state.list = [];
      state.totalPages = 0;
    },
  },
});

export const { addMovie, removeMovie } = trendingMovieSlice.actions;
export default trendingMovieSlice.reducer;
