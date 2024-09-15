import { API_OPTIONS } from "../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { addPopularMovies } from "../utils/movieSlice";
import { useEffect } from "react";

export default function usePopularMovies() {
  const dispatch = useDispatch();

  const popularMovies = useSelector((store) => store.movie.popularMovies);

  async function getPopularMovies() {
    const data = await fetch(
      "https://api.themoviedb.org/3/movie/popular?page=1",
      API_OPTIONS
    );
    const result = await data.json();

    dispatch(addPopularMovies(result?.results));
  }
  useEffect(() => {
    !popularMovies && getPopularMovies();
  }, []);
}
