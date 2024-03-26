import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { API_KEY_OPTIONS } from "../utils/constants";
import { addTopRatedSeries } from "../utils/seriesSlice";

export const useTopRatedSeries = () => {
  const dispatch = useDispatch();
  const topRatedSeries = useSelector((store) => store.series.topRatedSeries)


  const fetchData = async () => {
    const data = await fetch("https://api.themoviedb.org/3/tv/top_rated", API_KEY_OPTIONS);

    const jsonData = await data.json();
    console.log(jsonData.results);
    dispatch(addTopRatedSeries(jsonData.results));
  };

  useEffect(() => {
   !topRatedSeries && fetchData();
  }, []);
};


