import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { API_KEY_OPTIONS } from "../utils/constants";
import { addPopularSeries } from "../utils/seriesSlice";

export const usePopularSeries = () => {
  const dispatch = useDispatch();
  const popularSeries = useSelector((store) => store.series.popularSeries)


  const fetchData = async () => {
    const data = await fetch("https://api.themoviedb.org/3/tv/popular", API_KEY_OPTIONS);

    const jsonData = await data.json();
    // console.log(jsonData.results);
    dispatch(addPopularSeries(jsonData.results));
  };

  useEffect(() => {
   !popularSeries && fetchData();
  }, []);
};


