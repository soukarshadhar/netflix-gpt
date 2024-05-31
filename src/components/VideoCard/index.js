import { MOVIE_THUMBNAIL_URL } from "../../utils/constants";
const VideoCard = ({ imageId }) => {
  return <img src={`${MOVIE_THUMBNAIL_URL}${imageId}`} alt="thumbnail" />;
};

export default VideoCard;
