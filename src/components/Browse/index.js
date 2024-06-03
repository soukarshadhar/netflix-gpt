import useFetchTrending from "../../hooks/useFetchTrending";
import {
  ASSET_BY,
  BROWSE_TAB,
  NOW_PLAYING_TITLE,
  ON_THE_AIR_TITLE,
  TOP_RATED_TITLE,
} from "../../utils/constants";
import { useSelector } from "react-redux";
import VideoBackground from "../VideoBackground";
import VideoList from "../VideoList";
import { addAssetActions } from "../../store/appStore";

const Browse = () => {
  const activeTab = useSelector((state) => state.activeBrowseTab);

  let path = "";
  let action = null;
  let selectorKey = "";
  let firstListType = null;
  let secondListType = null;
  let title = "";

  if (activeTab === BROWSE_TAB.movies) {
    path = ASSET_BY.trendingMovie.urlPath;
    action = addAssetActions[ASSET_BY.trendingMovie.key];
    selectorKey = ASSET_BY.trendingMovie.key;
    firstListType = ASSET_BY.nowPlayingMovies;
    secondListType = ASSET_BY.topRatedMovies;
    title = NOW_PLAYING_TITLE;
  } else {
    path = ASSET_BY.trendingTvShow.urlPath;
    action = addAssetActions[ASSET_BY.trendingTvShow.key];
    selectorKey = ASSET_BY.trendingTvShow.key;
    firstListType = ASSET_BY.nowPlayingTvShows;
    secondListType = ASSET_BY.topRatedTvShows;
    title = ON_THE_AIR_TITLE;
  }

  const trendingVideo = useSelector((state) => state[selectorKey]);
  useFetchTrending(path, action, !!trendingVideo);

  if (!trendingVideo) return null;

  return (
    <>
      <VideoBackground
        title={trendingVideo.title}
        description={trendingVideo.overview}
        videoKey={trendingVideo.key}
      />
      <VideoList type={firstListType} title={title} />
      <VideoList type={secondListType} title={TOP_RATED_TITLE} />
    </>
  );
};

export default Browse;
