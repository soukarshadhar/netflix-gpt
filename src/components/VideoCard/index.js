import { ASSET_THUMBNAIL_URL } from "../../utils/constants";
const VideoCard = ({ imageId, className = "" }) => {
  return (
    <img
      className={className}
      src={`${ASSET_THUMBNAIL_URL}${imageId}`}
      alt="thumbnail"
    />
  );
};

export default VideoCard;
