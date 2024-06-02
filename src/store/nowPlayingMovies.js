import { createSlice } from "@reduxjs/toolkit";

const nowPlayingMoviesSlice = createSlice({
  name: "nowPlayingMovies",
  initialState: {
    page: 1,
    list: [],
    totalPages: 0,
  },
  reducers: {
    add: (state, action) => {
      state.list = action.payload.list;
      state.totalPages = action.payload.totalPages;
    },
    remove: (state) => {
      state.page = 1;
      state.list = [];
      state.totalPages = 0;
    },
  },
});

export const { add, remove } = nowPlayingMoviesSlice.actions;
export default nowPlayingMoviesSlice.reducer;
