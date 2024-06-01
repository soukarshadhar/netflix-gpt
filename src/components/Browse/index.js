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

  if (activeTab === BROWSE_TAB.MOVIES) {
    path = ASSET_BY.TRENDING_MOVIE.urlPath;
    action = addAssetActions[ASSET_BY.TRENDING_MOVIE.key];
    selectorKey = ASSET_BY.TRENDING_MOVIE.key;
    firstListType = ASSET_BY.NOW_PLAYING_MOVIES;
    secondListType = ASSET_BY.TOP_RATED_MOVIES;
    title = NOW_PLAYING_TITLE;
  } else {
    path = ASSET_BY.TRENDING_TV_SERIES.urlPath;
    action = addAssetActions[ASSET_BY.TRENDING_TV_SERIES.key];
    selectorKey = ASSET_BY.TRENDING_TV_SERIES.key;
    firstListType = ASSET_BY.NOW_PLAYING_TV_SHOWS;
    secondListType = ASSET_BY.TOP_RATED_TV_SHOWS;
    title = ON_THE_AIR_TITLE;
  }

  useFetchTrending(path, action);
  const trendingVideo = useSelector((state) => state[selectorKey]);

  if (!trendingVideo) return null;

  return (
    <>
      <VideoBackground
        title={trendingVideo.title}
        description={trendingVideo.overview}
        videoKey={trendingVideo.video?.key}
      />
      <VideoList type={firstListType} title={title} />
      <VideoList type={secondListType} title={TOP_RATED_TITLE} />
    </>
  );
};

export default Browse;
