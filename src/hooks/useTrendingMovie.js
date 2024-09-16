//api.themoviedb.org/3/
import { API_OPTIONS } from "../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { addTrendingMovies } from "../utils/movieSlice";
import { useEffect } from "react";

export default function useTrendingMovies() {
  const dispatch = useDispatch();

  const trendingMovies = useSelector((store) => store.movie.trendingMovies);

  async function getTrendingMovies() {
    const data = await fetch(
      "https://api.themoviedb.org/3/trending/movie/day",
      API_OPTIONS
    );
    const result = await data.json();

    dispatch(addTrendingMovies(result?.results));
  }
  useEffect(() => {
    !trendingMovies && getTrendingMovies();
  }, []);
}
