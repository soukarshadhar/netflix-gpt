export const SIGN_IN_LABEL = "Sign In";
export const SIGN_UP_LABEL = "Sign Up";
export const NOW_PLAYING_TITLE = "Now Playing";
export const TOP_RATED_TITLE = "Top Rated";
export const ON_THE_AIR_TITLE = "On The Air";
export const ASSET_THUMBNAIL_URL = "https://image.tmdb.org/t/p/w154/";

export const FORM_TYPE = Object.freeze({
  signIn: "signin",
  signUp: "signup",
});

export const FORM_FIELD_TYPE = Object.freeze({
  email: "email",
  password: "password",
  name: "fullName",
});

export const BROWSE_TAB = Object.freeze({
  movies: "movies",
  tvShows: "tvShows",
  GPTSearch: "GPTSearch",
});

export const ASSET_BY = Object.freeze({
  trendingMovie: { key: "trendingMovie", urlPath: "movie" },
  trendingTvShow: { key: "trendingTvShow", urlPath: "tv" },
  nowPlayingMovies: { key: "nowPlayingMovies", urlPath: "movie/now_playing" },
  topRatedMovies: { key: "topRatedMovies", urlPath: "movie/top_rated" },
  nowPlayingTvShows: {
    key: "nowPlayingTvShows",
    urlPath: "tv/on_the_air",
  },
  topRatedTvShows: { key: "topRatedTvShows", urlPath: "tv/top_rated" },
});

export const GET_REQUEST_INIT = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${process.env.REACT_APP_TMDB_API_KEY}`,
  },
};

export const buildFormConfig = (type) => {
  if (type === FORM_TYPE.signIn) {
    return [
      { id: FORM_FIELD_TYPE.email, label: "Email" },
      { id: FORM_FIELD_TYPE.password, label: "Password" },
    ];
  } else {
    return [
      { id: FORM_FIELD_TYPE.name, label: "Full Name" },
      { id: FORM_FIELD_TYPE.email, label: "Email" },
      { id: FORM_FIELD_TYPE.password, label: "Password" },
    ];
  }
};
