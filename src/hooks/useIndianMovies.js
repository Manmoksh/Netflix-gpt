import { API_OPTIONS } from "../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { addIndianMovies } from "../utils/movieSlice";
import { useEffect } from "react";

export default function useIndianMovies() {
  const dispatch = useDispatch();

  const onTheAir = useSelector((store) => store.movie.indianMovies);

  async function getIndian() {
    const data = await fetch(
      "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&region=IN&sort_by=popularity.desc&watch_region=IN&with_origin_country=IN",
      API_OPTIONS
    );
    const result = await data.json();

    dispatch(addIndianMovies(result?.results));
  }
  useEffect(() => {
    !onTheAir && getIndian();
  }, []);
}
