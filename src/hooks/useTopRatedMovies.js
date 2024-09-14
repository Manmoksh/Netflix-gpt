import { API_OPTIONS } from "../utils/constant";
import { useDispatch } from "react-redux";
import { addTopRatedMovies } from "../utils/movieSlice";
import { useEffect } from "react";

export default function useTopRatedMovies() {
  const dispatch = useDispatch();
  async function getTopRatedMovies() {
    const data = await fetch(
      "https://api.themoviedb.org/3/movie/top_rated?page=1",
      API_OPTIONS
    );
    const result = await data.json();

    dispatch(addTopRatedMovies(result?.results));
  }
  useEffect(() => {
    getTopRatedMovies();
  }, []);
}
