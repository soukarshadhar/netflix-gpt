import useFetchTrending from "../../hooks/useFetchTrending";
import { MOVIES_BY, MOVIES } from "../../utils/constants";
import { useSelector } from "react-redux";
import VideoBackground from "../VideoBackground";
import VideoList from "../VideoList";

const Browse = () => {
  useFetchTrending(MOVIES.trending.urlPath, MOVIES.trending.action);
  const trendingMovie = useSelector((state) => state.trendingMovie);
  if (!trendingMovie) return null;

  return (
    <>
      <VideoBackground
        title={trendingMovie.title}
        description={trendingMovie.overview}
        videoKey={trendingMovie.video.key}
      />
      <VideoList type={MOVIES_BY.NOW_PLAYING} />
      <VideoList type={MOVIES_BY.POPULAR} />
    </>
  );
};

export default Browse;
