import { createSlice } from "@reduxjs/toolkit";

const topRatedMoviesSlice = createSlice({
  name: "topRatedMovies",
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
    removeMovie: (state) => {
      state.page = 1;
      state.list = [];
      state.totalPages = 0;
    },
  },
});

export const { addMovie, removeMovie } = topRatedMoviesSlice.actions;
export default topRatedMoviesSlice.reducer;
