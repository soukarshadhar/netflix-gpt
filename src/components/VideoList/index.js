import useFetchList from "../../hooks/useFetchList";
import { useSelector } from "react-redux";
import VideoCard from "../VideoCard";
import { addAssetActions } from "../../store/appStore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronRight,
  faChevronLeft,
} from "@fortawesome/free-solid-svg-icons";
import { useRef } from "react";

const VideoList = ({ type, title }) => {
  const listRef = useRef(null);
  const list = useSelector((state) => state[type.key].list);
  useFetchList(type.urlPath, addAssetActions[type.key], list.length !== 0);

  const handleOnLeftClick = () => {
    listRef.current.scrollLeft -= 100;
  };

  const handleOnRightClick = () => {
    listRef.current.scrollLeft += 100;
  };

  return (
    <div className="mb-5 list-container">
      <h5 className="fw-bold text-light">{title}</h5>
      <div className="list position-relative">
        <div id="left-arrow" onClick={handleOnLeftClick}>
          <FontAwesomeIcon icon={faChevronLeft} />
        </div>
        <div id="right-arrow" onClick={handleOnRightClick}>
          <FontAwesomeIcon icon={faChevronRight} />
        </div>
        <div ref={listRef} className="overflow-x-scroll w-100">
          {list.map((i, index) => (
            <VideoCard
              className={index !== 0 ? "ms-2" : ""}
              key={i.id}
              imageId={i.poster_path}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default VideoList;
