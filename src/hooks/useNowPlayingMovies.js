import { API_OPTIONS } from "../utils/constant";
import { useDispatch } from "react-redux";
import { addNowPlayingMovies } from "../utils/movieSlice";
import { useEffect } from "react";

export default function useNowPlayingMovies() {
  const dispatch = useDispatch();
  async function getNowPlayingMovies() {
    const data = await fetch(
      "https://api.themoviedb.org/3/movie/now_playing?page=1",
      API_OPTIONS
    );
    const result = await data.json();
    dispatch(addNowPlayingMovies(result?.results));
  }
  useEffect(() => {
    getNowPlayingMovies();
  }, []);
}
