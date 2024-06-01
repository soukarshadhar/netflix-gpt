import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faInfoCircle } from "@fortawesome/free-solid-svg-icons";

const VideoBackground = ({ title, description, videoKey }) => {
  return (
    <div className="position-relative">
      <div className="ratio ratio-16x9 video-iframe">
        <iframe
          className="pe-none"
          src={`https://www.youtube.com/embed?playlist=${videoKey}&autoplay=1&controls=0&disablekb=1&mute=1&loop=1`}
          title="Trending video"
          referrerPolicy="strict-origin-when-cross-origin"
        />
      </div>
      <div className="position-absolute about-video">
        <h1 className="text-light fw-bold">{title}</h1>
        <p className="text-light">{description}</p>
        <div className="d-flex">
          <Button className="me-3 bg-opacity-75 bg-light text-black rounded">
            <FontAwesomeIcon className="me-2" icon={faPlay} />
            Play
          </Button>
          <Button className="bg-opacity-75 bg-dark rounded">
            <FontAwesomeIcon className="me-2" icon={faInfoCircle} />
            More Info
          </Button>
        </div>
      </div>
    </div>
  );
};

export default VideoBackground;
