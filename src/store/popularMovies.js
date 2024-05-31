import { createSlice } from "@reduxjs/toolkit";

const popularMoviesSlice = createSlice({
  name: "popularMovies",
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

export const { addMovie } = popularMoviesSlice.actions;
export default popularMoviesSlice.reducer;
