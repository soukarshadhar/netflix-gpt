import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { GET_REQUEST_INIT } from "../utils/constants";

const useFetchList = (path, action, pageNo) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const page = isNaN(Number(pageNo)) || pageNo === null ? 1 : pageNo;

    const fetchList = async () => {
      try {
        const data = await fetch(
          `https://api.themoviedb.org/3/${path}?language=en-US&page=${page}&region=IN`,
          GET_REQUEST_INIT
        );
        const response = await data.json();
        action &&
          dispatch(
            action({ list: response.results, totalPages: response.total_pages })
          );
      } catch (err) {
        console.log(err);
      }
    };

    fetchList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [path, pageNo]);
};

export default useFetchList;
