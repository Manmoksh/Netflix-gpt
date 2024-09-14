import { API_OPTIONS } from "../utils/constant";
import { useDispatch } from "react-redux";
import { addUpcomingMovies } from "../utils/movieSlice";
import { useEffect } from "react";

export default function useUpcomingMovies() {
  const dispatch = useDispatch();
  async function getUpcomingMovies() {
    const data = await fetch(
      "https://api.themoviedb.org/3/movie/upcoming?page=1",
      API_OPTIONS
    );
    const result = await data.json();

    dispatch(addUpcomingMovies(result?.results));
  }
  useEffect(() => {
    getUpcomingMovies();
  }, []);
}
