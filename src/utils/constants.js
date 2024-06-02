export const NOW_PLAYING_TITLE = "Now Playing";
export const TOP_RATED_TITLE = "Top Rated";
export const ON_THE_AIR_TITLE = "On The Air";
export const ASSET_THUMBNAIL_URL = "https://image.tmdb.org/t/p/w154/";

export const BROWSE_TAB = Object.freeze({
  MOVIES: "movies",
  TV_SHOWS: "tvShows",
  GPT_SEARCH: "GPTSearch",
});

export const ASSET_BY = Object.freeze({
  TRENDING_MOVIE: { key: "trendingMovie", urlPath: "movie" },
  TRENDING_TV_SERIES: { key: "trendingTvSeries", urlPath: "tv" },
  NOW_PLAYING_MOVIES: { key: "nowPlayingMovies", urlPath: "movie/now_playing" },
  TOP_RATED_MOVIES: { key: "topRatedMovies", urlPath: "movie/top_rated" },
  NOW_PLAYING_TV_SHOWS: {
    key: "nowPlayingTvShows",
    urlPath: "tv/on_the_air",
  },
  TOP_RATED_TV_SHOWS: { key: "topRatedTvShows", urlPath: "tv/top_rated" },
});

export const GET_REQUEST_INIT = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${process.env.REACT_APP_TMDB_API_KEY}`,
  },
};
