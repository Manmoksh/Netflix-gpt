movie / { movie_id };

import { API_OPTIONS } from "../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { addMovieDetail } from "../utils/movieSlice";
import { useEffect } from "react";

export default function useMovieDetail() {
  const dispatch = useDispatch();
  const nowPlayingMovies = useSelector((store) => store.movie.nowPlayingMovies);
  async function getNowPlayingMovies() {
    const data = await fetch(
      "https://api.themoviedb.org/3/movie/",
      API_OPTIONS
    );
    const result = await data.json();
  }
  useEffect(() => {
    getNowPlayingMovies();
  }, []);
}
