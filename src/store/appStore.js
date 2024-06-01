import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./user";

import nowPlayingMoviesReducer, {
  addMovie as addNowPlayingMovieAction,
} from "./nowPlayingMovies";

import topRatedMoviesReducer, {
  addMovie as addTopRatedMovieAction,
} from "./topRatedMovies";

import trendingMovieReducer, {
  addMovie as addTrendingMovieAction,
} from "./trendingMovie";

import activeBrowseTabReducer from "./activeBrowseTab";

import nowPlayingTvShowsReducer, {
  add as addNowPlayingTvShowsAction,
} from "./nowPlayingTvShows";

import topRatedTvShowsReducer, {
  add as addTopRatedTvShowsAction,
} from "./topRatedTvShows";

import trendingTvShowsReducer, {
  add as addTrendingTvShowsAction,
} from "./trendingTvShows";

import { ASSET_BY } from "../utils/constants";

export const addAssetActions = {
  [ASSET_BY.TRENDING_MOVIE.key]: addTrendingMovieAction,
  [ASSET_BY.NOW_PLAYING_MOVIES.key]: addNowPlayingMovieAction,
  [ASSET_BY.TOP_RATED_MOVIES.key]: addTopRatedMovieAction,
  [ASSET_BY.NOW_PLAYING_TV_SHOWS.key]: addNowPlayingTvShowsAction,
  [ASSET_BY.TOP_RATED_TV_SHOWS.key]: addTopRatedTvShowsAction,
  [ASSET_BY.TRENDING_TV_SERIES.key]: addTrendingTvShowsAction,
};

export default configureStore({
  reducer: {
    user: userReducer,
    activeBrowseTab: activeBrowseTabReducer,
    [ASSET_BY.NOW_PLAYING_MOVIES.key]: nowPlayingMoviesReducer,
    [ASSET_BY.TOP_RATED_MOVIES.key]: topRatedMoviesReducer,
    [ASSET_BY.TRENDING_MOVIE.key]: trendingMovieReducer,
    [ASSET_BY.NOW_PLAYING_TV_SHOWS.key]: nowPlayingTvShowsReducer,
    [ASSET_BY.TOP_RATED_TV_SHOWS.key]: topRatedTvShowsReducer,
    [ASSET_BY.TRENDING_TV_SERIES.key]: trendingTvShowsReducer,
  },
});
