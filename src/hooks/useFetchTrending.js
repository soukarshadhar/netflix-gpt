import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { GET_REQUEST_INIT } from "../utils/constants";

const useFetchTrending = (path, action, skip = false) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchTrending = async () => {
      try {
        const listData = await fetch(
          `https://api.themoviedb.org/3/trending/${path}/day?language=en-US&region=IN`,
          GET_REQUEST_INIT
        );
        const listResponse = await listData.json();
        const list = listResponse.results;
        const item = list[Math.floor(Math.random() * (list.length - 1))];
        const { id, title, overview, name } = item;

        const data = await fetch(
          `https://api.themoviedb.org/3/${path}/${id}/videos?language=en-US&region=IN`,
          GET_REQUEST_INIT
        );
        const itemResp = await data.json();
        const videoKeys = itemResp.results.map((i) => i.key);
        const obj = {};
        obj["id"] = id;
        obj["title"] = title || name;
        obj["overview"] = overview;
        obj["key"] = videoKeys.join(",");
        action && dispatch(action(obj));
      } catch (err) {
        console.log(err);
      }
    };

    if (!skip) fetchTrending();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [path, skip]);
};

export default useFetchTrending;
