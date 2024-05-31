import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./user";
import nowPlayingMoviesReducer from "./nowPlayingMovies";
import popularMoviesReducer from "./popularMovies";
import trendingMovieReducer from "./trendingMovie";

export default configureStore({
  reducer: {
    user: userReducer,
    nowPlayingMovies: nowPlayingMoviesReducer,
    popularMovies: popularMoviesReducer,
    trendingMovie: trendingMovieReducer,
  },
});
