import { createSlice } from "@reduxjs/toolkit";

const nowPlayingMoviesSlice = createSlice({
  name: "nowPlayingMovies",
  initialState: {
    page: 1,
    list: [],
    totalPages: 0,
  },
  reducers: {
    addMovie: (state, action) => {
      state.list = action.payload.list;
      state.totalPages = action.payload.totalPages;
    },
  },
});

export const { addMovie } = nowPlayingMoviesSlice.actions;
export default nowPlayingMoviesSlice.reducer;
