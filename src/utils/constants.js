import { addMovie as addNowPlayingMovieAction } from "../store/nowPlayingMovies";
import { addMovie as addPopularMovieAction } from "../store/popularMovies";
import { addMovie as addTrendingMovieAction } from "../store/trendingMovie";

export const TRENDING_TV_SERIES = "tv";

export const MOVIES_BY = Object.freeze({
  NOW_PLAYING: "nowPlaying",
  POPULAR: "popular",
});

export const MOVIES = Object.freeze({
  trending: { urlPath: "movie", action: addTrendingMovieAction },
  nowPlaying: {
    title: "Now Playing",
    urlPath: "movie/now_playing",
    key: "nowPlayingMovies",
    action: addNowPlayingMovieAction,
  },
  popular: {
    title: "Popular",
    urlPath: "movie/popular",
    key: "popularMovies",
    action: addPopularMovieAction,
  },
});

export const MOVIE_THUMBNAIL_URL = "https://image.tmdb.org/t/p/w154/";

export const GET_REQUEST_INIT = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkNjE2MDQ3ZGZmMTY0YjQxYWUyMGU5NTJjZTc3ZWJiMSIsInN1YiI6IjY2NTk3OWRkNTNlYmQ1ZDY4Njk0MWI5YyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.lQAREVgQK8S1vKFaFpfNAcdqrmTltFQcawdkb6miaE0",
  },
};
