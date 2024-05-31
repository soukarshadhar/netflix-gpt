import { useEffect } from "react";
import { useDispatch } from "react-redux";

const useFetchList = (type, action, pageNo) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const page = isNaN(Number(pageNo)) || pageNo === null ? 1 : pageNo;

    const fetchList = async () => {
      try {
        const data = await fetch(
          `https://api.themoviedb.org/3/${type}?language=en-US&page=${page}`,
          {
            method: "GET",
            headers: {
              accept: "application/json",
              Authorization:
                "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkNjE2MDQ3ZGZmMTY0YjQxYWUyMGU5NTJjZTc3ZWJiMSIsInN1YiI6IjY2NTk3OWRkNTNlYmQ1ZDY4Njk0MWI5YyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.lQAREVgQK8S1vKFaFpfNAcdqrmTltFQcawdkb6miaE0",
            },
          }
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
  }, [pageNo]);
};

export default useFetchList;
