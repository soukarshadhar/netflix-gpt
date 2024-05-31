import useFetchList from "../../hooks/useFetchList";
import { MOVIES } from "../../utils/constants";
import { useSelector } from "react-redux";
import VideoCard from "../VideoCard";

const VideoList = ({ type }) => {
  useFetchList(MOVIES[type].urlPath, MOVIES[type].action);
  const list = useSelector((state) => state[MOVIES[type].key].list);

  return (
    <div className="mx-5 mb-3 list-container">
      <h5 className="fw-bold text-light">{MOVIES[type].title}</h5>
      <div id="list" className="overflow-auto w-100">
        {list.map((i, index) => (
          <>
            {index !== 0 && <div key={i.id} className="mx-2 d-inline" />}
            <VideoCard key={i.id} imageId={i.poster_path} />
          </>
        ))}
      </div>
    </div>
  );
};

export default VideoList;
