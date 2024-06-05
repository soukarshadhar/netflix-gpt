import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { setSearchText, setSearchList } from "../../store/search";
import { geminiModel } from "../../utils/genAiApi";
import {
  buildPrompt,
  removeDuplicateAssetsFromList,
} from "../../utils/functions";
import { useEffect } from "react";
import { clearSearch } from "../../store/search";
import { GET_REQUEST_INIT } from "../../utils/constants";
import VideoCard from "../VideoCard";

const Search = () => {
  const dispatch = useDispatch();
  const search = useSelector((state) => state.search);

  useEffect(() => {
    return () => {
      dispatch(clearSearch());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleOnChange = (e) => {
    dispatch(setSearchText(e.target.value));
  };

  const fetchAssetDetails = async (assetName) => {
    const response = await fetch(
      `https://api.themoviedb.org/3/search/multi?query=${assetName}&include_adult=false&language=en-US`,
      GET_REQUEST_INIT
    );
    const data = await response.json();
    return data;
  };

  const handleOnSearch = async () => {
    try {
      const prompt = buildPrompt(search.text);
      const result = await geminiModel.generateContent(prompt);
      const response = await result.response;
      const dataString = response.text().replace(/(```json)|(```)/g, "");
      const data = JSON.parse(dataString);
      const promiseList = [];
      const assetList = [];
      data.forEach((i) => promiseList.push(fetchAssetDetails(i)));
      const promiseResults = await Promise.all(promiseList);
      promiseResults.forEach((i) => assetList.push(...i.results));
      const filteredMediaType = assetList.filter(
        (i) =>
          (i.media_type === "movie" || i.media_type === "tv") && !!i.poster_path
      );
      dispatch(setSearchList(removeDuplicateAssetsFromList(filteredMediaType)));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="search-container">
      <div className="px-5 d-flex mb-3">
        <Form.Control
          className="bg-dark text-light"
          type="text"
          placeholder="Search"
          value={search.text}
          onChange={handleOnChange}
        />
        <Button className="ms-3 btn-submit" onClick={handleOnSearch}>
          Search
        </Button>
      </div>
      <div className="grid">
        {search.list.map((item) => (
          <span key={item.id} className="p-2">
            <VideoCard imageId={item.poster_path} />
          </span>
        ))}
      </div>
    </div>
  );
};

export default Search;
