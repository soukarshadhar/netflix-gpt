import { BROWSE_TAB } from "../../utils/constants";
import { useSelector } from "react-redux";
import Browse from "../Browse";
import { useEffect } from "react";
import { removeUser } from "../../store/user";
import { remove as removeNowPlayingMovies } from "../../store/nowPlayingMovies";
import { remove as removeTopRatedMovies } from "../../store/topRatedMovies";
import { remove as removeTrendingMovie } from "../../store/trendingMovie";
import { remove as removeNowPlayingTvShows } from "../../store/nowPlayingTvShows";
import { remove as removeTopRatedTvShows } from "../../store/topRatedTvShows";
import { remove as removeTrendingTvShow } from "../../store/trendingTvShow";
import { resetBrowseTab } from "../../store/activeBrowseTab";
import { clearForm } from "../../store/form";
import { useDispatch } from "react-redux";

const BrowseContainer = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      // Store cleanup on BrowseContainer Unmount
      dispatch(resetBrowseTab());
      dispatch(removeUser());
      dispatch(clearForm());
      dispatch(removeNowPlayingMovies());
      dispatch(removeNowPlayingTvShows());
      dispatch(removeTopRatedMovies());
      dispatch(removeTopRatedTvShows());
      dispatch(removeTrendingMovie());
      dispatch(removeTrendingTvShow());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const activeTab = useSelector((state) => state.activeBrowseTab);

  if (activeTab === BROWSE_TAB.GPTSearch) return <h1>Coming Soon...</h1>;

  return <Browse />;
};

export default BrowseContainer;
