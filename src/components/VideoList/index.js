import useFetchList from "../../hooks/useFetchList";
import { useSelector } from "react-redux";
import VideoCard from "../VideoCard";
import { addAssetActions } from "../../store/appStore";

const VideoList = ({ type, title }) => {
  useFetchList(type.urlPath, addAssetActions[type.key]);
  const list = useSelector((state) => state[type.key].list);

  return (
    <div className="mx-5 mb-3 list-container">
      <h5 className="fw-bold text-light">{title}</h5>
      <div id="list" className="overflow-x-scroll w-100">
        {list.map((i, index) => (
          <VideoCard
            className={index !== 0 ? "ms-2" : ""}
            key={i.id}
            imageId={i.poster_path}
          />
        ))}
      </div>
    </div>
  );
};

export default VideoList;
