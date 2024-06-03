import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./user";

import nowPlayingMoviesReducer, {
  add as addNowPlayingMovieAction,
} from "./nowPlayingMovies";

import topRatedMoviesReducer, {
  add as addTopRatedMovieAction,
} from "./topRatedMovies";

import trendingMovieReducer, {
  add as addTrendingMovieAction,
} from "./trendingMovie";

import activeBrowseTabReducer from "./activeBrowseTab";

import nowPlayingTvShowsReducer, {
  add as addNowPlayingTvShowsAction,
} from "./nowPlayingTvShows";

import topRatedTvShowsReducer, {
  add as addTopRatedTvShowsAction,
} from "./topRatedTvShows";

import trendingTvShowReducer, {
  add as addTrendingTvShowAction,
} from "./trendingTvShow";

import formReducer from "./form";

import { ASSET_BY } from "../utils/constants";

export const addAssetActions = {
  [ASSET_BY.trendingMovie.key]: addTrendingMovieAction,
  [ASSET_BY.nowPlayingMovies.key]: addNowPlayingMovieAction,
  [ASSET_BY.topRatedMovies.key]: addTopRatedMovieAction,
  [ASSET_BY.nowPlayingTvShows.key]: addNowPlayingTvShowsAction,
  [ASSET_BY.topRatedTvShows.key]: addTopRatedTvShowsAction,
  [ASSET_BY.trendingTvShow.key]: addTrendingTvShowAction,
};

export default configureStore({
  reducer: {
    user: userReducer,
    activeBrowseTab: activeBrowseTabReducer,
    form: formReducer,
    [ASSET_BY.nowPlayingMovies.key]: nowPlayingMoviesReducer,
    [ASSET_BY.topRatedMovies.key]: topRatedMoviesReducer,
    [ASSET_BY.trendingMovie.key]: trendingMovieReducer,
    [ASSET_BY.nowPlayingTvShows.key]: nowPlayingTvShowsReducer,
    [ASSET_BY.topRatedTvShows.key]: topRatedTvShowsReducer,
    [ASSET_BY.trendingTvShow.key]: trendingTvShowReducer,
  },
});
